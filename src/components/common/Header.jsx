import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b hairline bg-paper/90 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between">
        <NavLink to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img src="/logo-whiteBG.png" alt="Taskmare Labs" className="h-12 w-auto object-contain mix-blend-multiply" />
        </NavLink>

        <nav className="hidden items-center gap-8 text-[13px] font-bold text-neutral-600 md:flex">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => `nav-link transition hover:text-ink ${isActive ? 'nav-link-active text-ink' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="btn-motion hidden rounded-md bg-brand px-4 py-2 text-[13px] font-black text-white hover:bg-brand-dark sm:inline-flex"
        >
          Start Your Project
        </NavLink>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md border hairline bg-white text-ink md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t hairline bg-paper md:hidden">
          <nav className="container-page grid gap-1 py-4 text-sm font-bold text-neutral-700">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `rounded-md px-3 py-3 transition hover:bg-white hover:text-ink ${isActive ? 'bg-white text-ink' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-md bg-brand px-3 py-3 text-center font-black text-white"
            >
              Start Your Project
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
