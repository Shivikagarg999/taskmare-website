import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';

function Footer() {
  return (
    <footer className="border-t hairline bg-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xl font-black text-ink">Taskmare Labs</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Modern app, AI and software development for founders and growing teams.
          </p>
          <p className="mt-3 text-sm font-semibold text-neutral-500">Bijnor, Uttar Pradesh, India</p>
          <p className="mt-6 text-sm font-semibold text-neutral-500">© 2026 Taskmare Labs. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm font-bold text-neutral-600">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} className="hover:text-ink">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
