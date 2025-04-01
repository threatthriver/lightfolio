
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, FileText, Database, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-32 -left-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 md:pt-20 md:pb-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              Introducing Lightfolio
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Organize your <span className="text-primary">ideas</span>, <br className="hidden md:block" />
              all in one place
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 animate-slide-up" style={{animationDelay: '100ms'}}>
              Create documents, databases, and wikis that evolve with your ideas. Lightfolio is your all-in-one workspace for notes, tasks, and knowledge management.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '200ms'}}>
              {user ? (
                <Button size="lg" asChild>
                  <Link to="/workspace" className="flex items-center">
                    Go to Workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => setShowAuthModal(true)}>
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#features">Learn More</a>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex-1 max-w-md animate-scale" style={{animationDelay: '300ms'}}>
            <div className="relative">
              {/* Editor interface mock */}
              <div className="relative bg-card rounded-xl shadow-lg border border-border overflow-hidden p-6 z-10">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center mr-3">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-lg font-medium">Weekly Planning</div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">My Projects</h3>
                  <div className="h-10 bg-accent/50 rounded w-full"></div>
                  <div className="h-28 bg-accent/30 rounded w-full"></div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-1.5 py-1 px-2.5 bg-primary/10 rounded-md">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm font-medium">Text</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1 px-2.5 bg-muted rounded-md">
                      <Database className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Database</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1 px-2.5 bg-muted rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Calendar</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-lg animate-float"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-lg animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="signup"
        />
      )}
    </div>
  );
};

export default Hero;
