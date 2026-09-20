import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';
import SocialLinks from './SocialLinks.jsx';

function Footer() {
  return (
    <footer className="bg-black text-neutral-200">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-flex bg-white px-3 py-2">
            <img
              src="/logo-whiteBG.png"
              alt="Taskmare Labs"
              className="h-10 w-auto object-contain"
            />
          </span>
          <p className="mt-5 max-w-md text-sm leading-6 text-neutral-400">
            Modern app, AI and software development for founders and growing teams.
          </p>
          <p className="mt-3 text-sm font-semibold text-neutral-300">Gokul Nagar, Chandpur, Bijnor, Uttar Pradesh, India</p>
          <p className="mt-6 text-sm font-semibold text-neutral-500">© 2026 Taskmare Labs. All rights reserved.</p>
        </div>

        <div className="grid gap-5 md:justify-items-end">
          <nav className="flex flex-wrap gap-5 text-sm font-bold text-neutral-200">
            {navigation.map((item) => (
              <NavLink key={item.href} to={item.href} className="transition hover:text-white">
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </NavLink>
          </nav>
          <SocialLinks variant="footer" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
