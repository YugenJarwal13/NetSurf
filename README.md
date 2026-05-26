<div align="center">

<img src="https://img.shields.io/badge/version-2.4.3-blue?style=flat-square" alt="version"/> <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey?style=flat-square" alt="platform"/> <img src="https://img.shields.io/badge/license-Private%20Repo-red?style=flat-square" alt="license"/> <img src="https://img.shields.io/badge/status-Active-brightgreen?style=flat-square" alt="status"/> <img src="https://img.shields.io/badge/WebArena%20TSR-76%25-orange?style=flat-square" alt="benchmark"/>

# 🌊 NetSurf

### *Intent-in-the-Loop Agentic AI for Web Browsing*

**A locally-hosted, privacy-first desktop browser where the AI agent lives *inside* the browser - not alongside it.**

[🌐 Website & Download](https://net-surf.vercel.app/) • [🎥 Demo Video](https://www.youtube.com/watch?v=BRdd47T5l-8) • [📄 Research Paper](https://drive.google.com/file/d/1E5f29wvzpnI7NV-SP5EtBZpsruVwDcLG/view?usp=sharing) •

> **Note:** The main source repository is private. This showcase repo exists to document the project's architecture, research contributions, and technical achievements. Visit the website to download the browser and watch the full demo.

</div>

---

## What is NetSurf?

Modern browsers have barely changed their interaction model in 30 years — they render pages and wait for you to drive every click. **NetSurf breaks that pattern.**

It's a fully functional Chrome-alternative desktop browser built on Electron 39, with a built-in LLM reasoning loop running *inside* the browser host process. You type a goal in natural language. NetSurf figures out the clicks, scrolls, form fills, and navigations to get it done — while keeping you in control at every step.

No cloud execution cluster. No background daemon. No browser extension sandbox. Just a browser that thinks.

---

## Key Numbers

| Metric | Result |
|--------|--------|
| WebArena Task Success Rate | **76%** (+24pts over Playwright baseline) |
| Ad-blocking score | **100 / 100** (outperforms Brave) |
| Memory footprint (5 tabs + agent) | **~347 MB** (within 5% of vanilla Chromium) |
| First LLM API call latency (p99) | **198 ms** |
| DOM token reduction via sanitization | **38% fewer tokens** on commercial sites |
| Supported LLM providers | **6** (GPT-4o, Claude, Gemini, DeepSeek, Qwen, OpenRouter) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ELECTRON MAIN PROCESS                        │
│                                                                 │
│  ┌──────────────────┐    ┌─────────────────┐                   │
│  │   EkoService /   │    │   safeStorage   │                   │
│  │  Jarvis Agent    │    │  (OS Keychain)  │                   │
│  │                  │    │                 │                   │
│  │ Goal decomp.     │    │ Encrypted API   │                   │
│  │ Task orchestr.   │    │ keys — never    │                   │
│  │ ReAct loop       │    │ exposed to UI   │                   │
│  └────────┬─────────┘    └─────────────────┘                   │
│           │  CDP (Chrome DevTools Protocol)                     │
│           ▼                                                     │
│  ┌──────────────────┐    ┌─────────────────┐                   │
│  │  WebviewAgent    │    │   FileAgent     │                   │
│  │                  │    │                 │                   │
│  │ navigate()       │    │ read / write    │                   │
│  │ click()          │    │ local files     │                   │
│  │ type()           │    │                 │                   │
│  │ screenshot()     │    └─────────────────┘                   │
│  └────────┬─────────┘                                          │
│           │  IPC contextBridge (typed)                         │
│           ▼                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Renderer Process                      │  │
│  │   AgentPanel · TabStore · Settings · History            │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │  <webview> sandboxed             │
│                             ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           WebView Process (Sandboxed Chromium)           │  │
│  │              Rendered page — fully isolated              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
              │  HTTPS (sanitized prompts + observations only)
              ▼
    ┌──────────────────────────────────────────┐
    │          LLM Cloud Providers             │
    │  GPT-4o · Claude · Gemini · DeepSeek    │
    │  Qwen (Alibaba) · OpenRouter            │
    └──────────────────────────────────────────┘
```

**Three security boundaries govern all data flows:**
1. Typed IPC `contextBridge` → React renderer cannot access Node.js APIs directly
2. CDP / `WebContents` → Main Process controls tab WebViews via debugger protocol
3. HTTPS boundary → Only sanitized task prompts and page observations reach the LLM. Raw credentials and page content never leave the device.

---

## How the Agent Works

### Physical Event Synthesis (Anti-Bot Bypass)

Most automation frameworks dispatch `element.click()` via JavaScript — Chromium marks these as `Event.isTrusted = false`. Anti-bot systems (Cloudflare Turnstile, reCAPTCHA v3, Imperva) use this flag as a primary detection signal.

NetSurf bypasses this entirely:

```
1. Runtime.evaluate  →  Get floating-point bounding box of target element
                         (accounts for scroll offset, CSS transforms, sub-pixel rendering)

2. Input.dispatchMouseEvent  →  mousedown at computed centroid
   [40–90ms micro-delay, uniformly sampled]
   Input.dispatchMouseEvent  →  mouseup at computed centroid

   Result: Chromium marks these as hardware-trusted events.
           Indistinguishable from a real mouse.

3. Input.dispatchKeyEvent  →  Per-character timing jitter from empirically
                               calibrated inter-keystroke interval distribution.
                               Resists keystroke-dynamics profiling.
```

### Multimodal Observation Pipeline

After each action, the agent collects a **two-channel observation**:

```
Channel 1: Sanitized DOM text snapshot
           → Ghostery filter engine removes ads/trackers BEFORE DOM construction
           → 38% fewer LLM tokens on commercial sites
           → Reasoning quality improves on ad-heavy pages

Channel 2: Rendered viewport screenshot
           → Handles Shadow DOM, canvas elements, CSS-synthesized components
           → Catches interactive elements with no semantic HTML annotation

Both channels → conversation history → streamed via IPC → AgentPanel (live)
```

### Intent-in-the-Loop

```
User types goal
      │
      ▼
Agent decomposes into action sequence  ←──────────────────┐
      │                                                    │
      ▼                                                    │
Executes action (CDP physical event)                       │
      │                                                    │
      ▼                                                    │
Collects 2-channel observation                             │
      │                                                    │
      ▼                                                    │
Streams reasoning step to AgentPanel  ◄── User watches    │
      │                                                    │
      ▼                                             User injects
Task complete? ──No──► Next action                 correction via
      │                                            reply field
      ▼                                                    │
   Done                                                    │
                                                           │
      User can interrupt + correct at any step ───────────┘
      Agent resumes with revised context.
      No restart. No re-execution from scratch.
```

---

## Tech Stack

**Core Runtime**

![Electron](https://img.shields.io/badge/Electron_39-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**AI & Agent Layer**

![LangChain](https://img.shields.io/badge/Jarvis_Agent_Core-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Anthropic](https://img.shields.io/badge/Anthropic_Claude-CC785C?style=for-the-badge&logo=anthropic&logoColor=white)
![Google](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

**UI & State**

![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Privacy & Filtering**

![Ghostery](https://img.shields.io/badge/Ghostery_Adblocker-00AEF0?style=for-the-badge)

**Build & Distribution**

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![electron-builder](https://img.shields.io/badge/electron--builder-2C2C32?style=for-the-badge)

---

## Features

**Browser Core**
- Full multi-tab sandboxing (each tab = isolated Chromium renderer process)
- Standard keyboard shortcuts: `Ctrl+T`, `Ctrl+W`, `Ctrl+L`, `Ctrl+Shift+A`
- Forward/back/reload, address bar, tab management — identical to Chrome UX
- Optimized rendering pipeline with support for displays up to **240Hz**

**AI Agent**
- Unified omnibox: accepts URLs, search queries, or natural language task descriptions from the same field
- Three agent modes: **Research** · **Navigate** · **Act** (adjusts system prompt without changing reasoning loop)
- Live AgentPanel: chronological stream of reasoning steps, planned actions, and observations
- Mid-task human correction via reply field — no restart required
- Physical event synthesis that bypasses anti-bot detection (Cloudflare, reCAPTCHA v3)

**Privacy**
- All LLM reasoning runs inside the Electron Main Process — no external daemon
- Only sanitized task prompts + page observations sent to LLM providers
- API keys stored in OS-native secure storage (`electron.safeStorage`) — renderer process never holds unencrypted keys
- Ghostery filter engine intercepts ads and trackers **before DOM construction**

**Multi-LLM Support**

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-4o-mini |
| Anthropic | Claude 3.5 Sonnet, Haiku |
| Google | Gemini 2.0 Flash, deep-research variants |
| DeepSeek | DeepSeek-V3 |
| Qwen (Alibaba) | Qwen-series |
| OpenRouter | Any supported model |
| Local | Ollama / llama.cpp (in progress) |

---

## Benchmark Results

Evaluated on a 50-task WebArena subset (e-commerce, forums, document management, version control). Baseline: deterministic Playwright scripts with pre-specified XPath/CSS selectors.

```
Task Success Rate (TSR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NetSurf (Full)          ████████████████████████  76%
Playwright Baseline     ████████████████          52%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                          +24 pts (p<0.01)

Ablation Study (20-task subset, GPT-4o, T=0)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full NetSurf            ████████████████████████  85%  (5.2 steps)
− Network sanitization  ██████████████████████    80%  (5.5 steps)
− Vision (DOM only)     ████████████████          65%  (7.4 steps)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hardware: Intel Core i5-12th Gen · 16GB DDR5 · NVMe SSD · Windows 11
```

**Failure mode breakdown** (24 unsuccessful trials):
- Visual disambiguation on heavily obfuscated CSS interfaces — 8 tasks
- CAPTCHA gates requiring human intervention — 6 tasks
- Multi-hop reasoning errors (premature page-load assumption) — 10 tasks

---

## Research

<a id="research"></a>

> **NetSurf: Intent-in-the-Loop Agentic AI for Web Browsing**
> Kritavya Patel · **Yugen Jarwal** · Sai Sharath Chandra Koppu · Dr. Kiran Sharma
> BML Munjal University, Gurugram, India
> *Manuscript submitted — not yet published*

**Core contributions of the paper:**
1. Single-process agentic browser architecture integrating Electron 39, the Jarvis Agent framework, and sandboxed processes in a unified binary — eliminating external daemons and cloud dependencies
2. CDP-based physical event synthesis converting LLM-generated element targets to coordinate-level hardware-trusted events
3. Formalization of the **intent-in-the-loop** paradigm — agent operates on the live browser surface, actions streamed in real time, human corrections injected without interrupting the reasoning loop
4. Network-level DOM sanitization pipeline using Ghostery filter lists — reduces median LLM token counts by **38%** on commercial sites

---

## Download & Try It

The browser is fully available for download — no source code required.

**→ [net-surf.vercel.app](https://net-surf.vercel.app/)**

- Download for Windows (NSIS installer) or macOS (DMG)
- Watch the full demo video on the website
- Bring your own API key for any supported LLM provider

---

## Roadmap

- [ ] **Local VLM inference** via Ollama / llama.cpp (eliminate cloud API dependency)
- [ ] **Multi-tab agent scheduling** (parallel task execution across isolated WebViews)
- [ ] **Session-persistent memory** via local vector store + RAG layer
- [ ] **Semi-automated CAPTCHA resolution** integrated into reasoning loop
- [ ] **Open-weight model parity** with GPT-4o on WebArena benchmark

---

## Contributors

| Name | Role |
|------|------|
| [Kritavya Patel](https://github.com/Kritavya) | Co-founder|
| **Yugen Jarwal** | Co-founder|
| Sai Sharath Chandra Koppu | Co-founder|

---

<div align="center">

*The source repository is private. This page documents the project's architecture, research, and capabilities.*
*For questions, reach out via [yugen.jarwal.23cse@bmu.edu.in](mailto:yugen.jarwal.23cse@bmu.edu.in)*

</div>
