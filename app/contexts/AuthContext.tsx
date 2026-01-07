import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser, getUserProfile, onAuthStateChange, type UserProfile } from '../services/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user ban đầu
    getCurrentUser().then(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      }
      setLoading(false);
    });

    // Lắng nghe thay đổi auth state
    const { data: { subscription } } = onAuthStateChange(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile?.is_admin || false;

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
