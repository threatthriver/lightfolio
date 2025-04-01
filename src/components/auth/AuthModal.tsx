
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup' | 'reset-password';
}

const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset-password'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, signup, resetPassword, isLoading, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If user is already logged in, close the modal and navigate to workspace
  useEffect(() => {
    if (user) {
      console.log("User detected in AuthModal, navigating to workspace:", user);
      onClose();
      navigate('/workspace');
    }
  }, [user, navigate, onClose]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (mode === 'login' && !password) {
      setError('Please enter your password');
      return false;
    }
    
    if (mode === 'signup') {
      if (!name) {
        setError('Please enter your name');
        return false;
      }
      
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    try {
      if (mode === 'login') {
        await login(email, password);
        console.log("Login successful in handleSubmit, should navigate soon...");
        // No manual navigation needed here - useEffect will handle it when user is set
      } else if (mode === 'signup') {
        await signup(name, email, password);
        toast({
          title: "Verification email sent",
          description: "Please check your email to verify your account.",
        });
      } else if (mode === 'reset-password') {
        await resetPassword(email);
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
      // Error is already handled in auth context with toast
    }
  };

  const handleTabChange = (value: string) => {
    setMode(value as 'login' | 'signup' | 'reset-password');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-md animate-scale">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {mode === 'login' ? 'Welcome back' : 
             mode === 'signup' ? 'Create your account' : 
             'Reset your password'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={mode} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="username"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password-login">Password</Label>
                  <Button 
                    type="button" 
                    variant="link" 
                    size="sm" 
                    className="px-0 text-xs"
                    onClick={() => setMode('reset-password')}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={isLoading}
                  autoComplete="name"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input
                  id="password-signup"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="reset-password">
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email-reset">Email</Label>
                <Input
                  id="email-reset"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center justify-center p-4 bg-muted/50 rounded-md">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">We'll send you a link to reset your password</p>
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="ml-2">{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setMode('login')}
                  disabled={isLoading}
                >
                  Back to login
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
