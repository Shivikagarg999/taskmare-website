import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import AiDevelopmentPage from './pages/AiDevelopmentPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import StartProjectPage from './pages/StartProjectPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ai-development" element={<AiDevelopmentPage />} />
        <Route path="/start-project" element={<StartProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
