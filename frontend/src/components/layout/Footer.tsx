import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { COMPANY } from '@/utils/constants';

const FOOTER_LINKS = {
  Products: [
    { label: 'Sliding Windows', path: '/products?type=window&category=sliding-windows' },
    { label: 'Casement Windows', path: '/products?type=window&category=casement-windows' },
    { label: 'Sliding Doors', path: '/products?type=door&category=sliding-doors' },
    { label: 'French Doors', path: '/products?type=door&category=french-doors' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Get a Quote', path: '/inquiry' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo variant="light" className="mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Crafting precision uPVC doors and windows for modern Indian homes since 2008.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: COMPANY.social.facebook, label: 'Facebook' },
                { icon: Globe, href: COMPANY.social.instagram, label: 'Instagram' },
                { icon: Share2, href: COMPANY.social.linkedin, label: 'LinkedIn' },
                { icon: Globe, href: COMPANY.social.youtube, label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/60 text-sm hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-400" />
                {COMPANY.address}
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white">
                  <Phone className="w-4 h-4 text-accent-400" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white">
                  <Mail className="w-4 h-4 text-accent-400" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="rounded-xl overflow-hidden h-48 mb-8">
            <iframe
              src={COMPANY.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office location"
            />
          </div>
          <p className="text-center text-white/40 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
