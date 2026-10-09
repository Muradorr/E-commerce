import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';

const navLinks = [
  { to: '/', label: 'The shop' },
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/orders', label: 'Orders' },
];

function Navbar({ cartCount, favoritesCount, cartPulse = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) => {
    if (isActive === true) {
      return 'rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-950 transition';
    }
    return 'rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-950';
  };

  const getMobileLinkClass = ({ isActive }) => {
    if (isActive === true) {
      return 'block rounded-xl bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-950';
    }
    return 'block rounded-xl px-4 py-3 text-sm font-semibold text-zinc-500 hover:bg-zinc-50';
  };

  const getBadgeClass = (count) => {
    const base =
      'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ';
    if (count > 0) {
      return base + 'bg-zinc-800 text-white';
    }
    return base + 'bg-zinc-200 text-zinc-600';
  };

  const getFavoritesButtonClass = ({ isActive }) => {
    const base = 'relative flex h-10 w-10 items-center justify-center rounded-full transition ';
    if (isActive === true) {
      return base + 'bg-zinc-50 text-zinc-800';
    }
    return base + 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200';
  };

  const renderDesktopLinks = () => {
    return navLinks.map((link) => (
      <li key={link.to}>
        <NavLink to={link.to} end={link.to === '/'} className={getLinkClass}>
          {link.label}
        </NavLink>
      </li>
    ));
  };

  const renderMobileMenu = () => {
    if (menuOpen === false) {
      return null;
    }
    return (
      <ul className="mt-3 space-y-1 border-t border-zinc-100 pt-3 md:hidden">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={getMobileLinkClass}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <nav aria-label="Main navigation" className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-editorial text-3xl tracking-tight text-zinc-950">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <Icon name="logo" className="h-5 w-5" />
            </span>
            Ridleys
          </Link>

          <ul className="hidden items-center gap-1 md:flex">{renderDesktopLinks()}</ul>

          <div className="flex items-center gap-2">
            <NavLink
              to="/favorites"
              id="nav-favorites"
              aria-label={'Favorites, ' + favoritesCount + (favoritesCount === 1 ? ' item' : ' items')}
              className={getFavoritesButtonClass}
            >
              <Icon
                name="heart"
                filled={favoritesCount > 0}
                className={'h-5 w-5 ' + (favoritesCount > 0 ? 'text-zinc-800' : '')}
              />
              <span className={getBadgeClass(favoritesCount)}>{favoritesCount}</span>
            </NavLink>

            <Link
              to="/cart"
              id="nav-cart"
              aria-label={'Shopping cart, ' + cartCount + (cartCount === 1 ? ' item' : ' items')}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition hover:bg-zinc-200"
            >
              <span key={cartPulse} className={'flex ' + (cartPulse > 0 ? 'animate-cart-bump' : '')}>
                <Icon name="cart" className="h-5 w-5" />
              </span>
              <span className={getBadgeClass(cartCount)}>{cartCount}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen === true ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition hover:bg-zinc-200 md:hidden"
            >
              <Icon name={menuOpen === true ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>
        {renderMobileMenu()}
      </div>
    </header>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  cartPulse: PropTypes.number,
};

export default Navbar;
