import { NavLink } from 'react-router-dom';
import { navigation } from '../../data/home.js';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/taksmare/' },
  { label: 'Instagram', href: 'https://www.instagram.com/taskmare_labs' },
];

function Footer() {
  return (
    <footer className="bg-[#8f0714] text-[#f8d7dc]">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-flex bg-white px-3 py-2">
            <img
              src="/logo-whiteBG.png"
              alt="Taskmare Labs"
              className="h-10 w-auto object-contain"
            />
          </span>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#f2bcc4]">
            Modern app, AI and software development for founders and growing teams.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#efc0c7]">Bijnor, Uttar Pradesh, India</p>
          <p className="mt-6 text-sm font-semibold text-[#dda1aa]">© 2026 Taskmare Labs. All rights reserved.</p>
        </div>

        <div className="grid gap-5 md:justify-items-end">
          <nav className="flex flex-wrap gap-5 text-sm font-bold text-[#f8d7dc]">
            {navigation.map((item) => (
              <NavLink key={item.href} to={item.href} className="transition hover:text-[#fff1f3]">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-[#efc0c7]">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-[#fff1f3]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
