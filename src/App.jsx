import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Smartphone } from 'lucide-react';
import './index.css';

// Animation Variables
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Navbar = ({ setView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    if (setView) {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="navbar" style={{ background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)' }}>
      <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { if(setView) { setView('home'); window.scrollTo(0,0); } }}>
        <div className="nav-logo-container">
          <img src="/logos.png" alt="Sthapana Estates" className="nav-logo" />
        </div>
      </div>
      <div className="nav-links">
        <a href="#overview" onClick={(e) => handleLinkClick(e, 'overview')}>Overview</a>
        <a href="#amenities" onClick={(e) => handleLinkClick(e, 'amenities')}>Amenities</a>
        <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Gallery</a>
        <a href="#floor-plan" onClick={(e) => handleLinkClick(e, 'floor-plan')}>Floor Plan</a>
        <a href="#location" onClick={(e) => handleLinkClick(e, 'location')}>Location Advantage</a>
        <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact Us</a>
      </div>
    </nav>
  );
};

const Hero = ({ openPopup, handleEmailSubmit }) => {
  return (
    <section id="overview" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="hero-title">Sthapana Estates in Noida</motion.h1>
          <motion.h3 variants={fadeInUp} className="hero-subtitle">Luxury Real Estate Advisory</motion.h3>

          <motion.ul variants={fadeInUp} className="hero-checklist">
            <li><CheckCircle2 size={20} /> 20+ Years Market Intelligence</li>
            <li><CheckCircle2 size={20} /> Deep Market Insight</li>
            <li><CheckCircle2 size={20} /> Exclusive Properties</li>
            <li><CheckCircle2 size={20} /> Tailored Consultation</li>
          </motion.ul>

          <motion.p variants={fadeInUp} className="hero-price">Starting from <strong>₹ 2.5 Cr onwards*</strong></motion.p>
          <motion.div variants={fadeInUp} className="hero-payment">40:60 payment plan</motion.div>

          <motion.div variants={fadeInUp} className="hero-buttons">
            <button className="btn-outline-white" onClick={openPopup}>Download Brochure</button>
            <button className="btn-phone-dark">+91-8882988847</button>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
            <div>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Advisory by</p>
              <div style={{ background: 'white', color: 'black', padding: '5px 10px', borderRadius: '4px', display: 'inline-block', fontWeight: 600, fontSize: '0.85rem' }}>Oruj Fatima</div>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Co-Advisory by</p>
              <div style={{ background: 'white', color: 'black', padding: '5px 10px', borderRadius: '4px', display: 'inline-block', fontWeight: 600, fontSize: '0.85rem' }}>Sukhdeep Kaur</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-form-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="form-box-title">ENQUIRE NOW</div>
          <form onSubmit={handleEmailSubmit}>
            <input type="text" name="name" className="form-input" placeholder="Name*" required />
            <input type="email" name="email" className="form-input" placeholder="Email*" required />
            <input type="tel" name="mobile" className="form-input" placeholder="Mobile Number*" required />
            <button type="submit" className="btn-form-submit">Submit</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Amenities = ({ openPopup }) => {
  return (
    <section id="amenities" className="section">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="section-title">Live your luxury life with Sthapana</h2>
        <button className="btn-outline-white" style={{ background: '#d32f2f', border: 'none' }} onClick={openPopup}>
          Get Floor Plan - Download Brochure
        </button>
      </motion.div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "/assets/img1.jpg",
    "/assets/im2.jpg",
    "/assets/img3.jpg"
  ];
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeInUp}
        >
          Project Gallery
        </motion.h2>
        <div className="gallery-grid">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <img src={src} alt="Gallery image" className="gallery-img" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Portfolio = ({ openPopup }) => {
  const projects = [
    { name: "Gulshan Dynasty", desc: "Sector 144, Noida" },
    { name: "Max Estate 105", desc: "Modern design & lifestyle" },
    { name: "ACE Terra", desc: "Yamuna Expy" },
    { name: "Eldeco EOE", desc: "Premium specifications" }
  ];

  return (
    <section id="floor-plan" className="section-theme-color">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeInUp}
        >
          Available Floor Plan
        </motion.h2>
        <motion.div
          className="cards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {projects.map((proj, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="portfolio-card">
              <h3 className="portfolio-title">{proj.name}</h3>
              <p className="portfolio-desc">{proj.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="btn-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          onClick={openPopup}
        >
          Enquire Now
        </motion.button>
      </div>

      {/* Torn Edge effect matching the image styling perfectly */}
      {/* <div className="torn-edge-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 50" preserveAspectRatio="none">
          <path d="M0,50 L1000,50 L1000,20 Q950,5 900,25 T800,20 T700,30 T600,10 T500,25 T400,10 T300,25 T200,15 T100,25 T0,15 Z" fill="#ffffff" />
        </svg>
      </div> */}
    </section>
  );
};

const LocationAdvantage = () => {
  return (
    <section id="location" className="location-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeInUp}
        >
          Location Advantage
        </motion.h2>
        <div className="location-grid">
          <motion.div
            className="location-map"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.930467554!2d77.38711485!3d28.4950337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce883fb184e9f%3A0xeae7afaf42dfb!2sGulshan%20One29!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
          <motion.div
            className="location-points"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <ul>
              {[
                { bold: "Proximity to Headquarters", text: "and key commercial attractions." },
                { bold: "Close to Noida Expressway", text: "— seamless access for national and international visitors." },
                { bold: "Well-connected by road and rail", text: ", ensuring smooth transit." },
                { bold: "", text: "Growing tourism, infrastructure, and hospitality ecosystem in Noida." },
                { bold: "", text: "Surging demand for premium accommodation and private retreats." }
              ].map((item, idx) => (
                <motion.li key={idx} variants={fadeInUp}>
                  <CheckCircle2 color="#d32f2f" />
                  <span>{item.bold ? <strong>{item.bold} </strong> : ""}{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Consultation = ({ handleEmailSubmit }) => {
  return (
    <section id="contact" className="consultation-section">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="section-title">Flexible Payment Plan</h2>
        <p className="consultation-subtitle">Receive Invitation For Private Viewing</p>

        <form className="consultation-form" onSubmit={handleEmailSubmit}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <input type="text" name="name" className="form-input" placeholder="Name*" style={{ margin: 0 }} required />
            <input type="email" name="email" className="form-input" placeholder="Email*" style={{ margin: 0 }} required />
          </div>
          <input type="tel" name="mobile" className="form-input" placeholder="Mobile Number*" required />
          <textarea name="message" className="form-input form-textarea" placeholder="Message*" required></textarea>
          <button type="submit" className="btn-submit-brown">Submit</button>
        </form>
      </motion.div>
    </section>
  );
};

const WelcomePopup = ({ isOpen, setIsOpen, handleEmailSubmit }) => {
  useEffect(() => {
    // Show popup shortly after load for new visitors
    const timer = setTimeout(() => {
      const hasVisited = sessionStorage.getItem('visited_sthapana');
      if (!hasVisited) {
        setIsOpen(true);
        sessionStorage.setItem('visited_sthapana', 'true');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="popup-overlay">
          <motion.div
            className="popup-content"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <button className="popup-close" onClick={() => setIsOpen(false)}>×</button>
            <div className="form-box-title" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>ENQUIRE NOW</div>
            <form onSubmit={(e) => {
              handleEmailSubmit(e);
              setIsOpen(false);
            }}>
              <input type="text" name="name" className="form-input" placeholder="Name*" required />
              <input type="email" name="email" className="form-input" placeholder="Email*" required />
              <input type="tel" name="mobile" className="form-input" placeholder="Mobile Number*" required />
              <button type="submit" className="btn-form-submit">Submit</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PageHeader = ({ title }) => (
  <div style={{ background: '#d32f2f', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '70px' }}>
    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{title}</h1>
  </div>
);

const AboutUs = () => (
  <div className="page-section" style={{ minHeight: '60vh', paddingBottom: '60px' }}>
    <PageHeader title="About Us" />
    <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '40px auto 0', lineHeight: '1.8' }}>
      <h2 style={{ color: '#d32f2f', marginBottom: '20px' }}>Sthapana Estates in Noida</h2>
      <h4 style={{ marginBottom: '20px' }}>Where Luxury Meets Reliability</h4>
      <p style={{ marginBottom: '20px' }}>
        Sthapana Estates isn't just a real estate advisory — it's an experience deeply rooted in
        delivering luxury, trust, and premium spaces. Nestled in Noida, we offer more than just
        properties — we provide a sanctuary where modern luxury meets comfort.
      </p>
      <p style={{ marginBottom: '40px' }}>
        Whether you're looking for an investment or a dream home, Sthapana Estates promises an
        elevated lifestyle — complete with first-class amenities and market intelligence.
      </p>
      <h4 style={{ marginBottom: '20px' }}>Strategic Location in the Heart of Noida</h4>
      <p>
        Enjoy a prime location placing you minutes away from cultural landmarks, expressways,
        and major infrastructural advancements.
      </p>
    </div>
  </div>
);

const PrivacyPolicy = () => (
  <div className="page-section" style={{ minHeight: '60vh', paddingBottom: '60px' }}>
    <PageHeader title="Privacy Policy" />
    <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '40px auto 0', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '20px' }}>We at Sthapana Estates are firmly committed towards respecting and safeguarding your privacy to the best of our abilities. Thus safeguarding your trust is our top-most priority.</p>
      <h4 style={{ marginBottom: '20px' }}>Below mentioned are our Privacy Policies:</h4>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}>We will collect from you, only those information which are mandatory for us to provide you best-quality services.</li>
        <li style={{ marginBottom: '10px' }}>Only the most trustworthy and specialized professionals will be allowed to access your personal information.</li>
        <li style={{ marginBottom: '10px' }}>In no circumstances and at no cost, your personal information will be shared with any third-party organization without your prior written approval.</li>
        <li style={{ marginBottom: '10px' }}>We will strictly and constantly monitor the safety of your information with us.</li>
      </ul>
    </div>
  </div>
);

const CookiePolicy = () => (
  <div className="page-section" style={{ minHeight: '60vh', paddingBottom: '60px' }}>
    <PageHeader title="Cookie Policy" />
    <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '40px auto 0', lineHeight: '1.8' }}>
      <h4 style={{ marginBottom: '10px' }}>What Are Cookies</h4>
      <p style={{ marginBottom: '20px' }}>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>

      <h4 style={{ marginBottom: '10px' }}>How We Use Cookies</h4>
      <p style={{ marginBottom: '20px' }}>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>

      <h4 style={{ marginBottom: '10px' }}>Disabling Cookies</h4>
      <p style={{ marginBottom: '20px' }}>You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>

      <h4 style={{ marginBottom: '10px' }}>The Cookies We Set</h4>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}><strong>Forms related cookies:</strong> When you submit data through a form such as those found on contact pages, cookies may be set to remember your user details for future correspondence.</li>
        <li style={{ marginBottom: '10px' }}><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences.</li>
      </ul>
    </div>
  </div>
);

const Footer = ({ setView, openPopup }) => {
  return (
    <footer className="footer">
      <div className="footer-text">
        © 2026 Sthapana Estates. All Rights Reserved.
      </div>
      <div className="footer-links">
        <a href="#about" onClick={(e) => { e.preventDefault(); setView('about'); window.scrollTo(0, 0); }}>About</a>
        <a href="#privacy" onClick={(e) => { e.preventDefault(); setView('privacy'); window.scrollTo(0, 0); }}>Privacy Policy</a>
        <a href="#cookies" onClick={(e) => { e.preventDefault(); setView('cookies'); window.scrollTo(0, 0); }}>Cookie Policy</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); openPopup(); }}>Contact</a>
      </div>

      <div className="whatsapp-float">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" width="28" height="28">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.2 7.6-14.1 2.8-5.6 1.4-10.6-.4-14.1-3.7-7.4-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </div>
    </footer>
  );
};

const MobileBottomBar = () => {
  return (
    <div className="mobile-bottom-bar">
      <a href="https://wa.me/918882988847" target="_blank" rel="noopener noreferrer" className="mobile-bottom-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="20" height="20">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.2 7.6-14.1 2.8-5.6 1.4-10.6-.4-14.1-3.7-7.4-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        WhatsApp
      </a>
      <div className="mobile-bottom-divider"></div>
      <a href="tel:+918882988847" className="mobile-bottom-btn">
        <Smartphone size={20} />
        Call Us
      </a>
    </div>
  );
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [view, setView] = useState('home');
  const openPopup = () => setIsPopupOpen(true);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let name = "", email = "", mobile = "", message = "";

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.name === 'name' || input.placeholder?.includes('Name')) name = input.value;
      else if (input.name === 'email' || input.type === 'email') email = input.value;
      else if (input.name === 'mobile' || input.type === 'tel') mobile = input.value;
      else if (input.tagName.toLowerCase() === 'textarea') message = input.value;
    });

    const subject = encodeURIComponent("New Enquiry from Sthapana Estates");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMobile: ${mobile}${message ? `\nMessage: ${message}` : ""}`);
    window.location.href = `mailto:Info@sthapanaestates.com?subject=${subject}&body=${body}`;
    form.reset();
  };

  return (
    <div className="app">
      <WelcomePopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} handleEmailSubmit={handleEmailSubmit} />
      <Navbar setView={setView} />

      {view === 'home' && (
        <>
          <Hero openPopup={openPopup} handleEmailSubmit={handleEmailSubmit} />
          <Amenities openPopup={openPopup} />
          <Gallery />
          <Portfolio openPopup={openPopup} />
          <LocationAdvantage />
          <Consultation handleEmailSubmit={handleEmailSubmit} />
        </>
      )}

      {view === 'about' && <AboutUs />}
      {view === 'privacy' && <PrivacyPolicy />}
      {view === 'cookies' && <CookiePolicy />}

      <Footer setView={setView} openPopup={openPopup} />
      <MobileBottomBar />
    </div>
  );
}

export default App;
