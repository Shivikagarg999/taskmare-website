import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';

function Footer() {
  return (
    <footer className="bg-[#8f0714] text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xl font-black">Taskmare Labs</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-red-50">
            Modern app, AI and software development for founders and growing teams.
          </p>
          <p className="mt-3 text-sm font-semibold text-red-50">Bijnor, Uttar Pradesh, India</p>
          <p className="mt-6 text-sm font-semibold text-red-100">© 2026 Taskmare Labs. All rights reserved.</p>
        </div>

        <nav className="flex flex-wrap gap-5 text-sm font-bold text-white">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} className="transition hover:text-red-100">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
