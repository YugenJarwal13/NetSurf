import { Github, Twitter, MessageCircle } from 'lucide-react';

const docsUrl = 'https://github.com/Kritavya/agentic-browser-electron';

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Demo', 'Architecture', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'GitHub', 'Community', 'Blog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
  },
];

function getFooterHref(link: string) {
  if (link === 'Documentation' || link === 'GitHub') return docsUrl;
  if (link === 'Features') return '#features';
  if (link === 'Demo') return '#demo';
  if (link === 'Architecture') return '#architecture';
  return '#';
}

const socials = [
  { icon: Github, label: 'GitHub' },
  { icon: Twitter, label: 'Twitter' },
  { icon: MessageCircle, label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-void">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/netsurf.png"
                alt="NetSurf logo"
                className="w-8 h-8 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="text-white font-black text-lg tracking-tight">NetSurf</span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-[280px]">
              Tell the web what to do. NetSurf gets it done.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={getFooterHref(link)}
                      target={link === 'Documentation' || link === 'GitHub' ? '_blank' : undefined}
                      rel={link === 'Documentation' || link === 'GitHub' ? 'noreferrer' : undefined}
                      className="text-text-muted text-sm hover:text-text-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} NetSurf. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href="#"
                  className="text-text-muted hover:text-text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
