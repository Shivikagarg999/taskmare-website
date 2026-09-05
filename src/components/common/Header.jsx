import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b hairline bg-paper/90 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between">
        <NavLink to="/" className="flex items-center">
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
      </div>
      <nav className="container-page flex gap-4 overflow-x-auto pb-3 text-sm font-bold text-neutral-600 md:hidden">
        {navigation.map((item) => (
          <NavLink key={item.href} to={item.href} className={({ isActive }) => `shrink-0 transition hover:text-ink ${isActive ? 'text-ink' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
