import React, { useEffect, useRef, useState } from 'react';

const Homepage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000);

    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Smooth scroll to sections
    const handleScroll = (e: MouseEvent) => {
      e.preventDefault();
      const aboutSection = document.querySelector('#services') as HTMLElement | null;
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (scrollDownRef.current) {
      scrollDownRef.current.addEventListener('click', handleScroll);
    }

    document.addEventListener('mousemove', handleMouseMove);

    // Advanced intersection observer with staggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(testimonialInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      if (scrollDownRef.current) {
        scrollDownRef.current.removeEventListener('click', handleScroll);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="loading-pulse"></div>
            <h1>Localhost Labs</h1>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Floating cursor follower */}
      <div 
        className="cursor-follower"
        style={{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px',
        }}
      ></div>

      {/* Hero Section */}
      <header ref={heroRef} className="hero">
        <div className="hero-content animate-on-scroll">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            Building the Future
          </div>
          <h1>
            <span className="gradient-text">Localhost</span>
            <span className="text-split">Labs</span>
          </h1>
          <p className="subtitle">
            We craft exceptional digital experiences that captivate, engage, and convert
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              <span>Get in Touch</span>
              <div className="btn-glow"></div>
            </a>
            <a ref={scrollDownRef} href="#services" className="btn-secondary">
              <span>Explore Work</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="hero-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="floating-elements">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className={`floating-element floating-element-${i % 3}`}>
                <div className="element-glow"></div>
              </div>
            ))}
          </div>
          <div className="code-rain" aria-hidden="true">
            {Array(15).fill(0).map((_, i) => (
              <div key={i} className="code-column">
                {Array(10).fill(0).map((_, j) => (
                  <div key={j} className="code-char">
                    {String.fromCharCode(33 + Math.random() * 94)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll</span>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="section services">
        <div className="section-header">
          <div className="section-tag">What We Do</div>
          <h2>Our <span className="gradient-text">Services</span></h2>
          <p>Cutting-edge solutions tailored to your vision</p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className={`service-card animate-on-scroll delay-${i}`}>
              <div className="service-glow"></div>
              <div className="service-icon">
                <div className="icon-bg"></div>
                {React.createElement('div', { 
                  dangerouslySetInnerHTML: { __html: icons[i] }
                })}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-hover-effect">
                <span>Learn More →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section portfolio">
        <div className="section-header">
          <div className="section-tag">Portfolio</div>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p>Showcasing our finest creations</p>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item, i) => (
            <div key={i} className={`portfolio-item animate-on-scroll delay-${i % 3}`}>
              <div className="portfolio-image">
                <img src={item.image} alt={item.title} />
                <div className="image-overlay"></div>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-meta">
                  <span className="portfolio-category">{item.category}</span>
                  <span className="portfolio-year">{item.year}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.link} className="portfolio-link">
                  <span>View Project</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="section-header">
          <div className="section-tag">Testimonials</div>
          <h2>Client <span className="gradient-text">Success</span></h2>
        </div>
        <div className="testimonial-container">
          <div className="testimonial-slider">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className={`testimonial ${i === currentTestimonial ? 'active' : ''}`}
              >
                <div className="quote-icon">"</div>
                <p className="quote">{testimonial.quote}</p>
                <div className="client-info">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="client-details">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.title} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`nav-dot ${i === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(i)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="section-header">
          <div className="section-tag">Get in Touch</div>
          <h2>Let's Build Something <span className="gradient-text">Amazing</span></h2>
          <p>Ready to bring your vision to life? Let's talk.</p>
        </div>
        <div className="contact-container">
          <form className="contact-form animate-on-scroll">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" required />
              <div className="input-focus"></div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" required />
              <div className="input-focus"></div>
            </div>
            <div className="form-group">
              <label>Project Budget</label>
              <select required>
                <option value="">Select Budget Range</option>
                <option value="5k-10k">$5K - $10K</option>
                <option value="10k-25k">$10K - $25K</option>
                <option value="25k+">$25K+</option>
              </select>
              <div className="input-focus"></div>
            </div>
            <div className="form-group">
              <label>Project Details</label>
              <textarea placeholder="Tell us about your project..." required></textarea>
              <div className="input-focus"></div>
            </div>
            <button type="submit" className="btn-primary submit-btn">
              <span>Send Message</span>
              <div className="btn-glow"></div>
            </button>
          </form>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p>hello@localhostlabs.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .homepage {
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        /* Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
        }

        .loading-logo {
          position: relative;
          margin-bottom: 2rem;
        }

        .loading-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border: 2px solid #ff6b6b;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }

        .loading-logo h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          margin-top: 1rem;
        }

        .loading-bar {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-progress {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
          transform: translateX(-100%);
          animation: loading 2s ease-out;
        }

        @keyframes loading {
          to { transform: translateX(0); }
        }

        /* Cursor Follower */
        .cursor-follower {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-content {
          text-align: center;
          z-index: 2;
          max-width: 800px;
          padding: 0 2rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease 0.5s both;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          background: #ff6b6b;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero h1 {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1s ease 0.7s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-split {
          display: inline-block;
          animation: slideInRight 1s ease 0.9s both;
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease 1.1s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 1.3s both;
        }

        .btn-primary, .btn-secondary {
          position: relative;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .btn-primary:hover .btn-glow {
          left: 100%;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .btn-secondary:hover .btn-arrow {
          transform: translate(2px, -2px);
        }

        /* Hero Background */
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }

        .gradient-orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #ff6b6b 0%, transparent 70%);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .gradient-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #4ecdc4 0%, transparent 70%);
          bottom: 20%;
          right: 10%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-element {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: floatRandom 8s linear infinite;
        }

        .floating-element-0 {
          animation-delay: 0s;
          left: 10%;
          top: 20%;
        }

        .floating-element-1 {
          animation-delay: 2s;
          left: 80%;
          top: 30%;
        }

        .floating-element-2 {
          animation-delay: 4s;
          left: 60%;
          top: 70%;
        }

        @keyframes floatRandom {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, -50px) rotate(90deg); }
          50% { transform: translate(-30px, -100px) rotate(180deg); }
          75% { transform: translate(-70px, -20px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        .code-rain {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }

        .code-column {
          position: absolute;
          top: -100%;
          width: 20px;
          height: 200vh;
          animation: rain linear infinite;
        }

        .code-column:nth-child(odd) {
          animation-duration: 10s;
          animation-delay: 0s;
        }

        .code-column:nth-child(even) {
          animation-duration: 15s;
          animation-delay: 5s;
        }

        @keyframes rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .code-char {
          color: #4ecdc4;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 20px;
          animation: flicker 2s linear infinite;
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          animation: bounce 2s infinite;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          position: relative;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollWheel 2s infinite;
        }

        @keyframes scrollWheel {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        /* Section Styles */
        .section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-tag {
          display: inline-block;
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 107, 107, 0.2);
        }

        .section h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .section p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .service-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .service-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover .service-glow {
          opacity: 1;
        }

        .service-icon {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          border-radius: 20px;
          opacity: 0.1;
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }

        .service-card p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .service-hover-effect {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }

        .service-hover-effect span {
          color: white;
          font-weight: 600;
        }

        .service-card:hover .service-hover-effect {
          transform: translateY(0);
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .portfolio-item {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .portfolio-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .portfolio-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .portfolio-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .portfolio-item:hover .portfolio-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(76, 205, 196, 0.8));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .portfolio-item:hover .image-overlay {
          opacity: 1;
        }

        .portfolio-content {
          padding: 2rem;
        }

        .portfolio-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .portfolio-category {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .portfolio-year {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .portfolio-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }

        .portfolio-content p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #ff6b6b;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .portfolio-link svg {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .portfolio-link:hover {
          color: #4ecdc4;
        }

        .portfolio-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* Testimonials */
        .testimonial-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-slider {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .testimonial {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .testimonial.active {
          opacity: 1;
          transform: translateY(0);
        }

        .quote-icon {
          font-size: 4rem;
          color: #ff6b6b;
          line-height: 1;
          margin-bottom: 1rem;
        }

        .quote {
          font-size: 1.5rem;
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .client-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .client-info img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid rgba(255, 107, 107, 0.3);
        }

        .client-details h4 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .client-details p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .testimonial-nav {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-dot.active {
          background: #ff6b6b;
          transform: scale(1.2);
        }

        /* Contact Section */
        .contact-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
        }

        .form-group {
          position: relative;
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff6b6b;
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .input-focus {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          transition: width 0.3s ease;
        }

        .form-group input:focus + .input-focus,
        .form-group select:focus + .input-focus,
        .form-group textarea:focus + .input-focus {
          width: 100%;
        }

        .submit-btn {
          width: 100%;
          padding: 1.25rem;
          font-size: 1.1rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .contact-icon {
          font-size: 2rem;
          width: 50px;
          text-align: center;
        }

        .contact-item h4 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .contact-item p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        /* Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-0 { transition-delay: 0s; }
        .delay-1 { transition-delay: 0.2s; }
        .delay-2 { transition-delay: 0.4s; }
        .delay-3 { transition-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-secondary {
            width: 200px;
            justify-content: center;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section {
            padding: 4rem 1rem;
          }

          .gradient-orb-1,
          .gradient-orb-2 {
            width: 200px;
            height: 200px;
          }

          .client-info {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 1rem;
          }

          .service-card {
            padding: 2rem;
          }

          .contact-form {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced Data
const services = [
  {
    title: 'Web Development',
    description: 'Cutting-edge websites and web applications built with modern frameworks and optimized for performance'
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences'
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed to maximize engagement and conversion rates'
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable, secure cloud infrastructure and DevOps solutions for modern businesses'
  }
];

const icons = [
  `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>`,
  `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>`,
  `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>`,
  `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>`
];

const portfolioItems = [
  {
    title: 'E-commerce Platform',
    description: 'A high-performance online marketplace with advanced analytics and seamless user experience',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    link: '#',
    category: 'E-commerce',
    year: '2024'
  },
  {
    title: 'Travel Companion App',
    description: 'Mobile-first travel planning application with AI-powered recommendations',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    link: '#',
    category: 'Mobile App',
    year: '2024'
  },
  {
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time data visualization platform with advanced reporting capabilities',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    link: '#',
    category: 'SaaS',
    year: '2023'
  }
];

const testimonials = [
  {
    quote: 'Localhost Labs completely transformed our digital presence. Their attention to detail and innovative approach exceeded all expectations.',
    name: 'Sarah Chen',
    title: 'CEO',
    company: 'TechFlow',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: 'Working with this team was incredible. They delivered a product that not only looked amazing but performed flawlessly.',
    name: 'Michael Rodriguez',
    title: 'CTO',
    company: 'InnovateCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: 'The level of creativity and technical expertise they brought to our project was outstanding. Highly recommend!',
    name: 'Emily Johnson',
    title: 'Product Manager',
    company: 'StartupHub',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export default Homepage;