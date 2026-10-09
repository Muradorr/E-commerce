import { Link } from 'react-router-dom';
import Icon from './Icon';

const exploreLinks = [
  { to: '/', label: 'Shop All' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/orders', label: 'Orders' },
];

const supportNotes = ['Cash on delivery nationwide', 'Free delivery on every order', '7-day easy returns'];

const socialLinks = [
  { name: 'x', label: 'X' },
  { name: 'facebook', label: 'Facebook' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'instagram', label: 'Instagram' },
];

function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-6xl border-t border-zinc-200 px-4 sm:px-6">
      <div className="flex flex-col gap-10 py-12 md:flex-row md:justify-between">
        <div className="flex gap-16">
          <div>
            <h3 className="text-base font-extrabold text-zinc-950">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-zinc-950">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-zinc-950">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              {supportNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-zinc-400">Social Media</h3>
          <ul className="mt-4 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <button
                  type="button"
                  aria-label={social.label}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-950 text-white transition hover:-translate-y-1 hover:bg-zinc-700 active:scale-90"
                >
                  <Icon name={social.name} className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-6 text-xs text-zinc-400">
        <p>© 2026 Ridleys. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
