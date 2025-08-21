import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Zap, Check, PhoneCall, Mail, MessageSquare, 
  Users, BarChart3, Target, LineChart, TrendingUp, BarChart2, Award,
  Heart, ThumbsUp, Send, Save, Clock, User, Sparkles, ArrowLeft, Linkedin, Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Utility function to combine class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Types
interface StatCardProps {
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface StepContentProps {
  stepNumber: number;
  title: string;
  description: string;
  highlightText: string;
  highlightDetails: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

interface TouchpointItemProps {
  type: 'linkedin' | 'twitter' | 'reddit';
  text: string;
  subtext: string;
  timeAgo: string;
}

// Custom Styles - Inline CSS as a string for easy portability
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  .landing-page-root {
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
  }
  
  .button-primary {
    background: #8B5CF6;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
  
  .button-primary:hover {
    background: #7C3AED;
    box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.2);
    transform: scale(1.02);
  }
  
  .button-outline {
    border: 1px solid #D1D5DB;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    color: #222233;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
  
  .button-outline:hover {
    background: #F5F7FA;
    transform: scale(1.02);
  }
  
  .gradient-text {
    background: linear-gradient(to right, #8B5CF6, #9B87F5, #8B5CF6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .section-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background: rgba(139, 92, 246, 0.05);
    color: #8B5CF6;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .animate-float {
    animation: floating 6s ease-in-out infinite;
  }
  
  @keyframes floating {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-15px) scale(1.02); }
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// TouchpointItem Component
const TouchpointItem: React.FC<TouchpointItemProps> = ({ type, text, subtext, timeAgo }) => {
  const renderIcon = () => {
    switch (type) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'reddit':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex justify-between bg-white bg-opacity-5 p-3 rounded-lg">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-lg bg-purple-500 bg-opacity-20 text-purple-500 flex items-center justify-center mr-3">
          {renderIcon()}
        </div>
        <div>
          <span className="text-white text-opacity-90 text-sm">{text}</span>
          <span className="block text-white text-opacity-60 text-xs">{subtext}</span>
        </div>
      </div>
      <span className="text-white text-opacity-50 text-xs">{timeAgo}</span>
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<StatCardProps> = ({ value, description, icon }) => {
  return (
    <div className="bg-gray-100 rounded-xl border border-gray-100 relative overflow-hidden group">
      <div className="p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 bg-opacity-10 text-purple-500 mb-6 relative z-10">
          {icon}
        </div>
        <div className="flex items-baseline gap-1">
          <div className="text-5xl font-bold text-purple-500 relative z-10">{value}</div>
        </div>
        <div className="text-gray-700 text-opacity-80 mt-2 text-xl font-semibold relative z-10">
          {description}
        </div>
        <div className="text-gray-600 text-sm mt-2 relative z-10 leading-relaxed">
          Connecting surplus food with those who need it most
        </div>
      </div>
    </div>
  );
};

// StepContent Component
const StepContent: React.FC<StepContentProps> = ({
  stepNumber,
  title,
  description,
  highlightText,
  highlightDetails,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div 
      className={`relative px-4 py-3 cursor-pointer transition-all duration-300 w-full ${
        isActive 
          ? 'bg-white border-l-4 border-purple-500 rounded-r-lg' 
          : 'bg-gray-50 bg-opacity-60 border-l-4 border-gray-200 rounded-r-lg hover:bg-gray-50 hover:bg-opacity-80'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div 
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              isActive 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {stepNumber}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 bg-opacity-10 text-purple-500 mb-1">
            {icon}
          </div>
          
          <h3 className="text-base font-bold text-gray-800 mb-1">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
          
          {isActive && (
            <div className="bg-white rounded-md p-2 text-xs text-gray-700 border border-gray-100 transition-all duration-300">
              <span className="font-medium text-gray-800">{highlightText}</span> {highlightDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// AnimatedBackground Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gray-100 rounded-3xl" />
    </div>
  );
};

// PlatformDemo Component
const PlatformDemo = () => {
  return (
    <div className="relative max-w-5xl mx-auto mb-20">
      {/* Gradient background */}
      <div className="absolute inset-0 -m-10 bg-gradient-to-br from-purple-500 from-opacity-20 via-purple-500 via-opacity-20 to-purple-500 to-opacity-20 rounded-3xl blur-3xl opacity-40"></div>
      
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white border-opacity-20 backdrop-blur-sm">
        {/* Platform UI Header - Tabs and Navigation */}
        <div className="bg-white border-b border-gray-200 flex items-center px-6 py-3">
          <div className="flex space-x-1 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            <div className="px-4 py-2 text-purple-500 bg-purple-500 bg-opacity-10 rounded-t-lg font-medium text-sm border-b-2 border-purple-500">
              Available Food (24)
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-t-lg font-medium text-sm">
              Requests (12)
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-t-lg font-medium text-sm">
              Donations (156)
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-t-lg font-medium text-sm">
              Partners
            </div>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-green-700">248 Meals Saved</span>
            </div>
            <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-orange-700">12 Days Active</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Food Donation Post */}
        <div className="bg-gray-50 p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel - Food Listing */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Alert Area */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Hey! There's fresh surplus food available near you. What would you like to do?
                    </p>
                    <div className="mt-3 bg-purple-500 bg-opacity-5 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium">Connect those in need with available food</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Food Donation Post */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">Local Restaurant</h3>
                        <div className="ml-2 text-xs text-white bg-green-600 px-1.5 py-0.5 rounded">Donor</div>
                      </div>
                      <p className="text-xs text-gray-500">Available now • 2 hours left</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      Fresh meals available! We have 20 portions of delicious home-cooked food that's perfectly good but surplus to our needs. Pick up available between 6-8 PM. First come, first served! 🍽️
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 py-2 border-t border-b border-gray-100 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>24</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>8</span>
                    </div>
                    <div className="ml-auto flex items-center space-x-1 bg-purple-500 bg-opacity-10 text-purple-500 px-2 py-1 rounded-md">
                      <Save className="w-4 h-4" />
                      <span className="text-xs font-medium">Save for Later</span>
                    </div>
                  </div>
                  
                  {/* Response Options */}
                  <div className="mt-4 relative">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
                        <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
                        Quick Response
                      </div>
                      <div className="ml-2 text-xs text-gray-500">Auto-generated</div>
                      <div className="ml-auto">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Claim Food
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-200">
                      Hi! I'm interested in collecting the surplus food. I can pick it up within the specified time and ensure it goes to families in need. Thank you for this wonderful initiative to reduce food waste while helping our community!
                    </div>
                  </div>
                </div>
                
                {/* Impact Score */}
                <div className="bg-purple-500 bg-opacity-5 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Community Impact</span>
                    <span className="text-purple-500 font-bold">+15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">60/100 meals saved this week</div>
                </div>
                
                <div className="flex items-center justify-between p-3 border-t border-gray-200">
                  <button className="text-gray-500 flex items-center text-sm hover:text-gray-700">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <button className="text-red-500 flex items-center text-sm hover:text-red-700">
                    <X className="w-4 h-4 mr-1" />
                    Not Suitable
                  </button>
                  <button className="text-gray-500 flex items-center text-sm hover:text-gray-700">
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Context and Insights */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              {/* Freshness Level */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Freshness Level</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-500 font-medium">Very Fresh</span>
                </div>
              </div>
              
              {/* Previous Donations */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Previous Donations</h3>
                <div className="text-purple-500 font-medium text-sm">8 Successful</div>
              </div>
              
              {/* Demand Level */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Demand Level</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="text-right text-sm font-medium text-orange-500">High</div>
              </div>
              
              {/* Food Categories */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Food Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-500 bg-opacity-10 text-purple-500 text-xs px-2 py-1 rounded-md">Main Course</span>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md">Vegetarian</span>
                  <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md">Fresh</span>
                </div>
              </div>
              
              {/* Pickup Time */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Pickup Window</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-purple-500 font-medium">6-8 PM Today</span>
                </div>
              </div>
              
              {/* Recommended Actions */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 text-purple-500 mr-1" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Send className="w-4 h-4 mr-2" />
                    Claim Food
                  </button>
                  <button className="w-full border border-purple-500 text-purple-500 py-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-purple-50 transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Contact Donor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating UI Element */}
      <div className="absolute -left-8 top-1/3 z-10 animate-float">
        <div className="bg-white bg-opacity-70 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white border-opacity-20 flex items-center">
          <div className="bg-purple-500 bg-opacity-20 rounded-lg p-2 mr-3">
            <Heart className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-gray-800 text-xs font-medium">New donation</div>
            <div className="text-gray-600 text-xs">Fresh meals available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Standalone Component
const StandaloneLandingPage = () => {
  // Navbar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // HowItWorks state
  const [activeStep, setActiveStep] = useState(1);
  
  // Refs
  const statsRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Steps data for HowItWorks
  const steps = [
    {
      id: 1,
      icon: <Target className="w-4 h-4" />,
      title: "Find Surplus Food Near You",
      description: "Our platform connects you with restaurants, cafes, and individuals who have extra food to share, identifying fresh meals in your neighborhood.",
      highlightText: "We locate:",
      highlightDetails: "Fresh surplus food, active donors, and pickup opportunities",
      gifUrl: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Find+Food"
    },
    {
      id: 2,
      icon: <Users className="w-4 h-4" />,
      title: "Connect Donors with Recipients",
      description: "Left2serve creates meaningful connections between those who have extra food and those who need it, building a community of care.",
      highlightText: "We facilitate:",
      highlightDetails: "Safe pickups, verified donations, and community connections",
      gifUrl: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Connect+People"
    },
    {
      id: 3,
      icon: <LineChart className="w-4 h-4" />,
      title: "Reduce Waste, Feed Community",
      description: "With every meal saved from waste, we're building stronger communities and creating a more sustainable future for everyone.",
      highlightText: "We achieve:",
      highlightDetails: "Zero waste goals, fed families, and stronger neighborhoods",
      gifUrl: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Impact+Results"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Left2serve helped us redirect our surplus food to families who really needed it. It's been incredible to see the community impact.",
      name: "",
      title: "Restaurant Owner",
      company: "Local Eatery",
      bgColor: "bg-purple-100",
    },
    {
      id: 2,
      quote: "Through Left2serve, we could help hundreds of families access fresh meals. It's like unlocking community support we never thought was possible.",
      name: "Vedhanathan Pon Abiram T",
      title: "Community Organizer",
      company: "Food Bank Network",
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      quote: "With Left2serve, we could reach families in our community who needed support the most.",
      name: "Vishnu Prasad P",
      title: "Volunteer Coordinator",
      company: "Local NGO",
      bgColor: "bg-gray-200",
    }
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  return (
    <div className="landing-page-root min-h-screen bg-white overflow-hidden">
      {/* Inject Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Navbar */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
          isScrolled 
            ? "bg-white bg-opacity-80 backdrop-blur-lg shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
<div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center text-xl font-bold text-gray-600">
                Saapaadu
              </div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Community Stories
            </a>
            <a href="#product" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Platform
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Join Us
            </a>
            <Link to="/login" className="button-primary">
  Login
</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
            <div className="flex flex-col space-y-4">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community Stories
              </a>
              <a 
                href="#product" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Us
              </a>
              <a 
                href="#cta" 
                className="button-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Now
              </a>
            </div>
          </div>
        )}
      </nav>
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-20 pb-32 overflow-hidden" style={{ backgroundColor: '#F9F6F3' }}>
          <AnimatedBackground />
          
          <div className="container max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-10 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500 bg-opacity-10 text-purple-500 mb-6">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium tracking-wide">Where Extra Food Finds Extra Love</span>
              </div>
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight max-w-4xl mx-auto mb-6 text-gray-800 leading-tight">
                Where Extra Food <br />
                <span className="text-purple-500 font-extrabold">Finds Extra Love</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Connecting surplus food with those who need it most through our community platform
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
                <a href="#cta" className="button-primary flex items-center group font-medium">
                  Start Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#how-it-works" className="button-outline">
                  See How It Works
                </a>
              </div>
              
              {/* Modern Platform Showcase */}
              <div ref={demoRef}>
                <PlatformDemo />
              </div>
              
              {/* Stats Section */}
              <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard 
                  value="500+" 
                  description="Meals Saved Daily" 
                  icon={<TrendingUp className="w-8 h-8" />} 
                />
                <StatCard 
                  value="80%" 
                  description="Food Waste Reduction" 
                  icon={<BarChart2 className="w-8 h-8" />} 
                />
                <StatCard 
                  value="200+" 
                  description="Community Partners" 
                  icon={<Award className="w-8 h-8" />} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="relative py-16 overflow-hidden bg-white" id="problem">
          <div className="container max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-10 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-tag">
                The Food Waste Problem
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-800 mb-6">
                Food Waste Hurts Everyone. <br />
                <span className="text-purple-500 font-extrabold">Left2serve</span> Helps.
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Every day, tons of perfectly good food goes to waste while people in our community go hungry. Left2serve bridges this gap by connecting surplus food with those who need it most.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Traditional Food Waste */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden group transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 bg-red-50 px-4 py-2 rounded-bl-2xl">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  Traditional Food System
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-4">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">40% of food is wasted</p>
                      <p className="text-gray-600 mt-1">Tons of perfectly good food thrown away daily</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-4">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">1 in 8 people face hunger</p>
                      <p className="text-gray-600 mt-1">Families struggle to access nutritious meals</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-4">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">No connection between surplus and need</p>
                      <p className="text-gray-600 mt-1">Food donors don't know where to help</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-12 grid grid-cols-3 gap-4">
                  <div className="aspect-square flex flex-col items-center justify-center bg-red-50 rounded-xl p-3">
                    <PhoneCall className="w-8 h-8 text-red-500 mb-2" />
                    <div className="text-sm text-center text-red-500 font-medium">Food Waste</div>
                  </div>
                  
                  <div className="aspect-square flex flex-col items-center justify-center bg-red-50 rounded-xl p-3">
                    <Mail className="w-8 h-8 text-red-500 mb-2" />
                    <div className="text-sm text-center text-red-500 font-medium">Hunger</div>
                  </div>
                  
                  <div className="aspect-square flex flex-col items-center justify-center bg-red-50 rounded-xl p-3">
                    <MessageSquare className="w-8 h-8 text-red-500 mb-2" />
                    <div className="text-sm text-center text-red-500 font-medium">Disconnect</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500"></div>
              </div>
              
              {/* Left2serve Solution */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden group transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 bg-purple-50 px-4 py-2 rounded-bl-2xl">
                  <Check className="w-5 h-5 text-purple-500" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  Left2serve Solution
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-500 rounded-full">Community Platform</span>
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-4">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Affordable, quality food for everyone</p>
                      <p className="text-gray-600 mt-1">Connect surplus with those who need it</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-4">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Real-time food sharing network</p>
                      <p className="text-gray-600 mt-1">Instant connections between donors and recipients</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-4">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Unmatched quality and community impact</p>
                      <p className="text-gray-600 mt-1">Building stronger neighborhoods through food sharing</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-12 grid grid-cols-3 gap-4">
                  <div className="aspect-square flex flex-col items-center justify-center bg-purple-50 rounded-xl p-3">
                    <Users className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-sm text-center text-purple-500 font-medium">Community</div>
                  </div>
                  
                  <div className="aspect-square flex flex-col items-center justify-center bg-purple-50 rounded-xl p-3">
                    <Zap className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-sm text-center text-purple-500 font-medium">Zero Waste</div>
                  </div>
                  
                  <div className="aspect-square flex flex-col items-center justify-center bg-purple-50 rounded-xl p-3">
                    <BarChart3 className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-sm text-center text-purple-500 font-medium">Feed Families</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-4 bg-white" id="how-it-works">
          <div className="container max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-10">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <div className="section-tag">
                From Waste to Nourishment
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-800 mb-4">
                How <span className="gradient-text">Left2serve</span> Works in 3 Steps
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our platform makes it easy to share surplus food and help those in need, creating stronger communities one meal at a time.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row h-auto lg:h-96">
                {/* Steps Section - Now on the left */}
                <div className="lg:w-1/3 flex flex-col gap-1 p-4 bg-gray-50">
                  {steps.map((step) => (
                    <StepContent
                      key={step.id}
                      stepNumber={step.id}
                      title={step.title}
                      description={step.description}
                      highlightText={step.highlightText}
                      highlightDetails={step.highlightDetails}
                      icon={step.icon}
                      isActive={activeStep === step.id}
                      onClick={() => handleStepClick(step.id)}
                    />
                  ))}
                </div>
                
                {/* Image Display - Now covering the entire right section */}
                <div className="lg:w-2/3 relative h-64 lg:h-full">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                        activeStep === step.id ? 'opacity-100 z-10' : 'opacity-0 z-1'
                      }`}
                    >
                      <img 
                        src={step.gifUrl} 
                        alt={`Step ${step.id}: ${step.title}`} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 bg-white" id="testimonials">
          <div className="container max-w-6xl mx-auto px-6 md:px-8 py-6 md:py-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Crafted by community leaders</h2>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Stats box */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden">
                <div className="h-full bg-purple-100 p-8 flex flex-col">
                  <div className="mt-auto">
                    <div className="text-5xl font-bold mb-2">500+</div>
                    <div className="text-gray-600">meals saved from waste</div>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="font-bold text-lg">
                      <span className="font-black">L2</span>•<span className="font-black">S</span> Left2serve
                    </div>
                  </div>
                </div>
              </div>

              {/* Community box */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden border border-gray-100">
                <div className="h-full flex items-center justify-center p-6">
                  <div className="font-black text-2xl italic">Community</div>
                </div>
              </div>

              {/* First testimonial */}
              <div className="col-span-12 md:col-span-8 lg:col-span-6 rounded-xl overflow-hidden">
                <div className={`h-full ${testimonials[0].bgColor} p-8 flex flex-col`}>
                  <div className="text-2xl font-medium mb-8">
                    "{testimonials[0].quote}"
                  </div>
                  <div className="mt-auto">
                    <div className="font-medium">{testimonials[0].name}</div>
                    <div className="text-gray-600 text-sm">{testimonials[0].title}</div>
                  </div>
                </div>
              </div>

              {/* Second testimonial */}
              <div className="col-span-12 md:col-span-7 lg:col-span-6 rounded-xl overflow-hidden">
                <div className={`h-full ${testimonials[1].bgColor} p-8 flex flex-col`}>
                  <div className="text-2xl font-medium mb-8">
                    "{testimonials[1].quote}"
                  </div>
                  <div className="mt-auto">
                    <div className="font-bold text-lg">foodbank network</div>
                  </div>
                </div>
              </div>

              {/* Impact box */}
              <div className="col-span-12 md:col-span-5 lg:col-span-3 rounded-xl overflow-hidden border border-gray-100">
                <div className="h-full flex items-center justify-center p-6">
                  <div className="font-black text-xl">
                    <span className="inline-block bg-black text-white px-1 py-0.5 rounded">♻</span> impact°
                  </div>
                </div>
              </div>

              {/* Third testimonial */}
              <div className="col-span-12 md:col-span-12 lg:col-span-3 rounded-xl overflow-hidden">
                <div className={`h-full ${testimonials[2].bgColor} p-8 flex flex-col`}>
                  <div className="text-2xl font-medium mb-8">
                    "{testimonials[2].quote}"
                  </div>
                  <div className="mt-auto">
                    <div className="font-bold flex items-center">
                      <span className="inline-block mr-1">●</span> local ngo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6" id="cta">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: '#222233' }}>
              {/* Background placeholder */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gray-700 opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 opacity-90"></div>
              </div>
              
              <div className="relative z-10 p-12 md:p-16 text-white">
                <div className="max-w-lg">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500 bg-opacity-20 text-purple-400 mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium tracking-wide">Start Your Community Journey Today</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Ready to Turn
                    <span className="text-red-500 font-extrabold"> Waste </span> 
                    into 
                    <span className="text-purple-400 font-extrabold"> Nourishment</span>?
                  </h2>
                  
                  <p className="text-lg text-gray-100 mb-8">
                    Join hundreds of community members who are making a difference by sharing surplus food with those in need.
                  </p>
                  
                  <div className="flex flex-col space-y-3 mb-8">
                    {[
                      "Affordable, quality food for everyone",
                      "Real-time food sharing network",
                      "Unmatched quality and community impact"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-100 text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a
                    href="#"
                    className="button-primary flex items-center text-lg px-8 py-4 shadow-lg hover:shadow-xl rounded-full group"
                  >
                    Start Now
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      
    </div>
  );
};

export default StandaloneLandingPage;