import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Đăng ký user mới với username
 */
export async function signUp(username: string, password: string, email?: string) {
  try {
    // Nếu không có email, tạo email dummy từ username
    const userEmail = email || `${username}@pinyin.local`;
    
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password,
      options: {
        data: {
          username: username,
          full_name: username,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

/**
 * Đăng nhập với username hoặc email
 */
export async function signIn(usernameOrEmail: string, password: string) {
  try {
    // Nếu không có @, convert username thành email dummy
    const email = usernameOrEmail.includes('@') 
      ? usernameOrEmail 
      : `${usernameOrEmail}@pinyin.local`;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

/**
 * Đăng nhập bằng Google
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { data: null, error };
  }
}

/**
 * Đăng xuất
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
}

/**
 * Lấy thông tin user hiện tại
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Lấy profile của user
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Kiểm tra user có phải admin không
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    return profile?.is_admin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Cập nhật profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
}

/**
 * Lắng nghe thay đổi auth state
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
