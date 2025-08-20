// React import not needed in React 17+ with Vite/TS config

import { MapPin, Settings, User, ShoppingCart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-primary">
              Saapaadu
            </div>
            <nav className="flex items-center gap-8">
              <a href="#vendors" className="text-gray-600 hover:text-primary transition-colors">For Vendors</a>
              <a href="#customers" className="text-gray-600 hover:text-primary transition-colors">For Customers</a>
              <a href="#prediction" className="text-gray-600 hover:text-primary transition-colors">Prediction Model</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="container text-center">
            <h1 className="animate-fade-in">
              Redistribute Surplus Food, Reduce Waste
            </h1>
            <p className="subtitle animate-fade-in" style={{animationDelay: '0.2s'}}>
              Saapaadu connects food vendors and customers to save leftover meals by reselling at discounted prices.
              Vendors create time-bound Hotspots to sell leftover meals and customers discover and book nearby Hotspots easily.
            </p>
            <div className="mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <a href="/signup" className="btn btn-primary btn-lg">
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Vendor Features */}
        <section id="vendors" className="py-20">
          <div className="container">
            <div className="section-header">
              <h2>For Vendors</h2>
              <p className="subtitle">Optimize your business and reduce food waste</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3>Vendor Hotspots</h3>
                  <p>
                    Easily create Hotspots with meal counts, pickup windows, locations, and dietary options.
                    Manage your orders efficiently and reduce food wastage while ensuring profits.
                  </p>
                </div>
              </div>

              <div className="card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-secondary" />
                  </div>
                  <h3>Data-Driven Prediction Model</h3>
                  <p>
                    Our model analyzes order data to predict next day meal preparation, avoiding overproduction and misuse,
                    helping vendors maximize profits and minimize waste.
                  </p>
                </div>
              </div>

              <div className="card animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-accent" />
                  </div>
                  <h3>Seamless Database Integration</h3>
                  <p>
                    Connects effortlessly to your existing shop databases with minimal setup for quick deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Features */}
        <section id="customers" className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>For Customers</h2>
              <p className="subtitle">Discover great deals and help reduce food waste</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3>Discover Hotspots</h3>
                  <p>
                    Browse and locate nearby Hotspots in list or map view, filter by veg/non-veg options, and place discounted orders.
                  </p>
                </div>
              </div>

              <div className="card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-secondary" />
                  </div>
                  <h3>Level-Based Discounts</h3>
                  <p>
                    Earn experience points and level up to unlock bigger discounts based on your regular orders, rewarding loyal customers.
                  </p>
                </div>
              </div>

              <div className="card animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-accent" />
                  </div>
                  <h3>Real-Time Notifications</h3>
                  <p>
                    Receive instant email alerts about Hotspots appearing nearby, so you never miss a delicious deal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prediction Model Callout */}
        <section id="prediction" className="py-20">
          <div className="container">
            <div className="card bg-gradient-to-r from-primary to-secondary text-white text-center">
              <div className="card-body py-16">
                <h2 className="text-white mb-4">Intelligent Prediction Model</h2>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  Saapaadu's intelligent prediction model ensures vendors prepare the right amount of meals daily, 
                  reducing waste and preventing misuse by customers exploiting reselling loopholes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>Connect with Us</h2>
              <p className="subtitle">Get in touch for support or partnerships</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-primary rounded-full"></div>
                          <span>support@saapaadu.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-secondary rounded-full"></div>
                          <span>+91 12345 67890</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-4">Quick Links</h3>
                      <div className="space-y-2">
                        <a href="/signup" className="block text-primary hover:underline">Sign Up</a>
                        <a href="/login" className="block text-primary hover:underline">Login</a>
                        <a href="#vendors" className="block text-primary hover:underline">Vendor Guide</a>
                        <a href="#customers" className="block text-primary hover:underline">Customer Guide</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark text-white py-12">
        <div className="container text-center">
          <div className="text-2xl font-bold text-secondary mb-4">Saapaadu</div>
          <p className="text-gray-400 mb-4">Redistributing surplus food, one meal at a time</p>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Saapaadu. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
