import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
