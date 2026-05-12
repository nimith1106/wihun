import React from 'react';

const siteMap = [
  {
    title: 'Platform',
    links: ['Features', 'Security', 'Performance', 'Integrations', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Case Studies', 'Blog', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'SLA'],
  },
];

export default function HyperFooter() {
  return (
    <footer className="relative bg-[#F5F5F7] text-obsidian">
      {/* Marquee */}
      <div className="overflow-hidden py-6 border-b border-black/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="font-inter font-bold text-6xl md:text-8xl tracking-tighter text-black/5 mx-8">
              ENGINEERING DIGITAL DOMINANCE — ENGINEERING DIGITAL DOMINANCE —&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <span className="font-inter font-bold text-2xl tracking-tight text-obsidian">
              SYNAPSE<span className="text-volt">.</span>
            </span>
            <p className="font-inter text-sm text-steel mt-4 leading-relaxed max-w-xs">
              Engineering high-performance digital ecosystems for organizations that refuse to compromise.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((s) => (
                <span key={s} className="text-xs font-inter font-medium text-steel hover:text-obsidian cursor-pointer transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Site map */}
          {siteMap.map((col) => (
            <div key={col.title}>
              <h4 className="font-inter font-semibold text-sm text-obsidian mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="font-inter text-sm text-steel hover:text-obsidian cursor-pointer transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-20 pt-8 border-t border-black/5">
          <p className="font-mono text-xs text-steel">
            © {new Date().getFullYear()} Synapse Systems. All rights reserved.
          </p>
          <p className="font-mono text-xs text-steel mt-2 md:mt-0">
            Designed & Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}