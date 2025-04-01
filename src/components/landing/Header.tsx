
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <header className="w-full py-4 px-6 border-b border-border fixed top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-xl text-foreground">Lightfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button 
              variant="default"
              onClick={() => window.location.href = "/workspace"}
            >
              Go to Workspace
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleAuthClick('login')}
              >
                Log in
              </Button>
              <Button
                onClick={() => handleAuthClick('signup')}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 p-4 bg-background border-b border-border animate-fade-in">
          <nav className="flex flex-col space-y-4 mb-4">
            <a 
              href="#features" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
          </nav>
          
          {user ? (
            <Button 
              className="w-full"
              onClick={() => {
                window.location.href = "/workspace";
                setMobileMenuOpen(false);
              }}
            >
              Go to Workspace
            </Button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  handleAuthClick('login');
                  setMobileMenuOpen(false);
                }}
              >
                Log in
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  handleAuthClick('signup');
                  setMobileMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      )}
    </header>
  );
};

export default Header;
