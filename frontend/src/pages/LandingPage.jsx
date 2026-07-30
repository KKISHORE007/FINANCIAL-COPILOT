import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, ShieldCheck, Zap, Target } from 'lucide-react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/images/hero1.png',
    '/images/hero2.png',
    '/images/hero3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E2E8F0] font-sans relative overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 bg-opacity-30 backdrop-blur-md bg-[#0D1117]">
        <div className="text-2xl font-bold text-[#00B386] tracking-tighter">FinNudge.</div>
        <div className="flex items-center space-x-4">
          <Link to="/auth" className="text-white hover:text-[#00B386] transition font-medium px-4">Log In</Link>
          <Link to="/auth" className="bg-[#00B386] hover:bg-[#00926C] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-[#00B386]/20 inline-block">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/60 via-[#0D1117]/80 to-[#0D1117]"></div>

        <div className="relative z-10 text-center max-w-4xl px-4 mt-[-10vh]">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
            Stop losing money <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B386] to-[#00DFC0]">silently.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-400 font-light">
            Meet your AI-powered financial copilot. Track wealth, intercept lifestyle inflation, and hit your goals before it's too late.
          </p>
          <Link to="/auth" className="inline-block bg-[#00B386] hover:bg-[#00926C] hover:scale-105 transform transition-all duration-300 text-white font-bold text-lg py-4 px-10 rounded-full shadow-[0_0_20px_rgba(0,179,134,0.4)]">
            Start Your Journey ➔
          </Link>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="py-24 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful yet Intuitive</h2>
            <p className="text-gray-400 text-lg">Hover over our features to see how we turbocharge your wealth.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-[#161B22] border border-[#21262D] rounded-2xl p-8 hover:border-[#00B386] hover:shadow-[0_0_30px_rgba(0,179,134,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-[#00B386]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#00B386] transition-colors duration-300">
                <LineChart className="w-8 h-8 text-[#00B386] group-hover:text-[#0D1117] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Dashboard</h3>
              <p className="text-gray-400 leading-relaxed font-light">Real-time sync of all your transactions, stocks, and fixed deposits in one glassy interface.</p>
            </div>

            <div className="group bg-[#161B22] border border-[#21262D] rounded-2xl p-8 hover:border-[#F59E0B] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-[#F59E0B]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#F59E0B] transition-colors duration-300">
                <ShieldCheck className="w-8 h-8 text-[#F59E0B] group-hover:text-[#0D1117] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Nudges</h3>
              <p className="text-gray-400 leading-relaxed font-light">Get proactive alerts when your spending outpaces your income. Catch lifestyle inflation early.</p>
            </div>

            <div className="group bg-[#161B22] border border-[#21262D] rounded-2xl p-8 hover:border-[#3B82F6] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-[#3B82F6]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#3B82F6] transition-colors duration-300">
                <Zap className="w-8 h-8 text-[#3B82F6] group-hover:text-[#0D1117] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Copilot</h3>
              <p className="text-gray-400 leading-relaxed font-light">Chat with your personalized AI. Ask for budget tips, recovery plans, and actionable advice instantly.</p>
            </div>

            <div className="group bg-[#161B22] border border-[#21262D] rounded-2xl p-8 hover:border-[#8B5CF6] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="bg-[#8B5CF6]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6] transition-colors duration-300">
                <Target className="w-8 h-8 text-[#8B5CF6] group-hover:text-[#0D1117] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Goals Tracking</h3>
              <p className="text-gray-400 leading-relaxed font-light">Set firm targets and securely path your net worth towards ultimate financial freedom.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default LandingPage;
