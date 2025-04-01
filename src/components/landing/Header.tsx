
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Loader2, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset-password'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleAuthClick = (mode: 'login' | 'signup' | 'reset-password') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await logout();
    if (location.pathname === '/workspace') {
      navigate('/');
    }
  };

  const goToWorkspace = () => {
    navigate('/workspace');
  };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name.charAt(0).toUpperCase();
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
          {isLoading ? (
            <Button variant="ghost" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                onClick={goToWorkspace}
              >
                Workspace
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={goToWorkspace}>
                    Workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
          
          {isLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : user ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center p-2 bg-accent rounded-md mb-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  goToWorkspace();
                  setMobileMenuOpen(false);
                }}
              >
                Go to Workspace
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Log out
              </Button>
            </div>
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
