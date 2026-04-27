import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { 
  Building2, TrendingUp, Key, Star, ShieldCheck, 
  MapPin, Phone, ArrowRight, CheckCircle2, ChevronDown, 
  Gem, Feather, Mail, Menu, X
} from 'lucide-react';
import './index.css';

// --- Global Framer Motion Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileMenuOpen) setMobileMenuOpen(false); // close on scroll
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}
    >
      <ScrollLink to="hero" smooth={true} duration={1000} className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>
        <Feather className="nav-brand-icon" size={32} strokeWidth={1.5} />
        <span className="nav-brand-text">STHAPANA</span>
      </ScrollLink>
      
      <div className="nav-links">
        <ScrollLink to="about" smooth={true} duration={800} offset={-80} className="nav-link" style={{cursor: 'pointer'}}>About Us</ScrollLink>
        <ScrollLink to="projects" smooth={true} duration={800} offset={-80} className="nav-link" style={{cursor: 'pointer'}}>Opportunities</ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={800} className="nav-link btn-primary" style={{ padding: '0.6rem 1.5rem', cursor: 'pointer' }}>
          Consultation
        </ScrollLink>
      </div>

      <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={32} color="#fff" /> : <Menu size={32} color="#fff" />}
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ScrollLink to="about" smooth={true} duration={800} offset={-80} className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</ScrollLink>
            <ScrollLink to="projects" smooth={true} duration={800} offset={-80} className="nav-link" onClick={() => setMobileMenuOpen(false)}>Opportunities</ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={800} className="nav-link btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem 2rem', marginTop: '1rem' }}>
              Consultation
            </ScrollLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="hero">
      <motion.div 
        className="hero-bg"
        style={{ y: yBg }}
      ></motion.div>
      <div className="hero-overlay"></div>
      
      <motion.div 
        className="hero-content"
        style={{ opacity: opacityText }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={fadeUp} className="hero-tagline">
          Luxury Real Estate Advisory
        </motion.span>
        <motion.h1 variants={fadeUp} className="hero-title">
          Discover Luxury Living in Noida’s Finest Addresses
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', color: 'var(--color-text-muted)', fontWeight: 300 }}>
          Carefully curated, transparently advised, and thoughtfully matched to your lifestyle. Because luxury is not just bought. It is understood.
        </motion.p>
        <motion.div variants={fadeUp} className="hero-buttons">
          <ScrollLink to="contact" smooth={true} duration={800} className="btn-primary" style={{cursor: 'pointer'}}>
            Step Inside <ArrowRight size={18} style={{marginLeft: '12px'}}/>
          </ScrollLink>
        </motion.div>
      </motion.div>
      
      <ScrollLink to="highlights" smooth={true} duration={800} style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', zIndex: 2 }}>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
          <ChevronDown size={40} strokeWidth={1} />
        </motion.div>
      </ScrollLink>
    </section>
  );
};

const DistinctionHighlights = () => {
  const features = [
    { title: "20+ Years Market Intelligence", icon: <Building2 size={36} strokeWidth={1} /> },
    { title: "Deep Market Insight", icon: <TrendingUp size={36} strokeWidth={1} /> },
    { title: "Exclusive Properties", icon: <Key size={36} strokeWidth={1} /> },
    { title: "Tailored Consultation", icon: <Star size={36} strokeWidth={1} /> }
  ];

  return (
    <div id="highlights" style={{ background: 'var(--color-background)' }}>
      <motion.div 
        className="highlights-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp}
            className="highlight-card"
          >
            <div className="highlight-icon">
              {item.icon}
            </div>
            <div className="highlight-text">{item.title}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="section">
      <div className="overview-grid">
        <motion.div 
          className="overview-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeRight}
        >
          <span style={{ color: 'var(--color-primary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>The Paradigm Shift</span>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem', marginTop: '1rem', fontSize: '3rem' }}>A Woman’s Perspective in Luxury</h2>
          <p className="overview-desc">
            Founded by <strong style={{ color: '#fff' }}>Oruj Fatima</strong> and <strong style={{ color: '#fff' }}>Sukhdeep Kaur</strong>, Sthapana Estates is distinguished by a perspective that is both intuitive and deeply perceptive.
          </p>
          <p className="overview-desc">
            We possess an intimate understanding of every subtlety—be it location dynamics, architectural value, developer credibility, or long-term investment potential. Our journey has been closely aligned with iconic developments such as Gulshan Dynasty.
          </p>
          
          <div style={{ marginTop: '3rem' }}>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {['The emotional essence of a home', 'The finesse of design and detailing', 'The harmony between aesthetics, comfort, and functionality'].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  style={{ color: 'var(--color-text-muted)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}
                >
                  <ShieldCheck size={24} style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} /> {text}
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: '3rem', paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-primary)' }}
          >
            <p style={{ fontStyle: 'italic', color: '#fff', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>
              "Because a home is not merely lived in—it is felt."
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 1 }}
           className="overview-image-container"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Interior" 
            className="overview-image"
          />
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      name: "Gulshan Dynasty",
      desc: "Ultra-luxury residences in Sector 144, Noida.",
      points: ["Resale & Rental Opportunities", "Ready premium living experience"]
    },
    {
      name: "Max Estate 105",
      desc: "A new benchmark in luxury living.",
      points: ["Modern design & curated lifestyle", "Premium connectivity advantage"]
    },
    {
      name: "ACE Terra",
      desc: "Upcoming premium development on Yamuna Expy.",
      points: ["High growth corridor", "Future-ready investments"]
    },
    {
      name: "Eldeco EOE",
      desc: "Luxury living with trusted legacy.",
      points: ["Premium specifications", "Strategic location infrastructure"]
    }
  ];

  return (
    <section id="projects" className="section" style={{ background: 'var(--color-surface)', overflow: 'hidden' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
      >
        <span style={{ color: 'var(--color-primary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, display: 'block', textAlign: 'center' }}>Portfolio</span>
        <h2 className="section-title">Featured Opportunities</h2>
        <p className="section-subtitle">
          Curated residential masterpieces that reflect enduring value, trust, and refined living.
        </p>
      </motion.div>

      <motion.div 
        className="features-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {projects.map((proj, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp}
            className="feature-item"
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-heading)' }}>
              <Gem size={28} style={{ color: 'var(--color-primary)' }} strokeWidth={1} /> {proj.name}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 300 }}>{proj.desc}</p>
            <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
              {proj.points.map((pt, ptIdx) => (
                <li key={ptIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#fff', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="var(--color-primary)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="section">
      <motion.div 
        className="contact-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <motion.div className="contact-info" variants={fadeRight}>
          <span style={{ color: 'var(--color-primary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Get In Touch</span>
          <h2 className="section-title" style={{ textAlign: 'left', fontSize: '3.5rem', marginBottom: '1rem' }}>Begin Your Journey</h2>
          <p className="overview-desc" style={{ marginBottom: '3rem' }}>
            Allow us to introduce you to a home that feels inherently yours. Schedule a private consultation to experience the location, ecosystem, and future firsthand.
          </p>

          <div className="contact-card">
            <div className="icon"><MapPin size={24} /></div>
            <div className="contact-card-content">
              <h4>Headquarters</h4>
              <p>Gulshan One29, Noida Expressway</p>
            </div>
          </div>
          
          <div className="contact-card">
            <div className="icon"><Phone size={24} /></div>
            <div className="contact-card-content">
              <h4>Private Consultation</h4>
              <p>+91 88829 88847</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon"><Mail size={24} /></div>
            <div className="contact-card-content">
              <h4>Concierge</h4>
              <p>luxury@sthapanaestates.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeUp} 
          style={{ background: 'var(--color-surface)', padding: '4rem 3rem', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="YOUR FULL NAME" required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="EMAIL ADDRESS" required />
            </div>
            <div className="form-group">
              <input type="tel" className="form-control" placeholder="PHONE NUMBER" required />
            </div>
            <div className="form-group" style={{ marginBottom: '3rem' }}>
              <input type="text" className="form-control" placeholder="AREA OF INTEREST (e.g. Gulshan Dynasty)" />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Request Callback
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <motion.div 
        className="footer-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <ScrollLink to="hero" smooth={true} duration={1000} style={{ cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Feather color="var(--color-primary)" size={40} strokeWidth={1} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#fff', letterSpacing: '4px' }}>STHAPANA</span>
        </ScrollLink>
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--color-text-muted)', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Where Luxury Meets Understanding.
        </h3>
        <div className="footer-nav">
          <a href="#">About Us</a>
          <a href="#">Our Vision</a>
          <a href="#">Privacy Policy</a>
          <a href="tel:+918882988847" style={{ color: 'var(--color-text)' }}>+91-8882988847</a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Sthapana Estates. An Artful Approach to Luxury Real Estate.
        </div>
      </motion.div>
    </footer>
  );
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <DistinctionHighlights />
      <AboutUs />
      <FeaturedProjects />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
