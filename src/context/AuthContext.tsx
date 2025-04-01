
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('lightfolio_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('lightfolio_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This is a mock auth implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email && password) {
        const newUser = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email: email,
        };
        setUser(newUser);
        localStorage.setItem('lightfolio_user', JSON.stringify(newUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${newUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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
      // This is a mock auth implementation - in a real app, you'd call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      if (name && email && password) {
        const newUser = {
          id: `user-${Date.now()}`,
          name: name,
          email: email,
        };
        setUser(newUser);
        localStorage.setItem('lightfolio_user', JSON.stringify(newUser));
        toast({
          title: "Account created",
          description: `Welcome to Lightfolio, ${name}!`,
        });
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lightfolio_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
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
