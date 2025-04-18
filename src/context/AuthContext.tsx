
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, AuthError } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        
        if (currentSession?.user) {
          setUser({
            id: currentSession.user.id,
            name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || '',
            email: currentSession.user.email || '',
            avatar: currentSession.user.user_metadata.avatar_url,
          });
          console.log("User set in auth state change:", currentSession.user.id);
        } else {
          setUser(null);
          console.log("User cleared in auth state change");
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.id);
      setSession(currentSession);
      
      if (currentSession?.user) {
        setUser({
          id: currentSession.user.id,
          name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || '',
          email: currentSession.user.email || '',
          avatar: currentSession.user.user_metadata.avatar_url,
        });
        console.log("User set in initial session:", currentSession.user.id);
      } else {
        console.log("No initial session found");
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        throw error;
      }
      
      console.log("Login successful:", data.user?.id);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error caught:", authError.message);
      toast({
        title: "Login failed",
        description: authError.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) {
        console.error("Signup error:", error.message);
        throw error;
      }
      
      console.log("Signup successful:", data.user?.id);
      toast({
        title: "Account created",
        description: `Welcome to Lightfolio, ${name}!`,
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Signup error caught:", authError.message);
      toast({
        title: "Signup failed",
        description: authError.message || "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error.message);
        throw error;
      }
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error caught:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error("Reset password error:", error.message);
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Reset password error caught:", authError.message);
      toast({
        title: "Password reset failed",
        description: authError.message || "Please check your email and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
