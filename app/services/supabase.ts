import { createClient } from '@supabase/supabase-js';

// Thay bằng thông tin từ Supabase project của bạn
// Lấy từ: https://supabase.com/dashboard/project/_/settings/api

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Phrase {
  id: number;
  vietnamese: string;
  pinyin: string;
  chinese: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at?: string;
}

/**
 * Lấy tất cả phrases từ Supabase
 */
export async function fetchPhrases(): Promise<Phrase[]> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching phrases:', error);
    return [];
  }
}

/**
 * Lấy phrases theo category
 */
export async function fetchPhrasesByCategory(category: string): Promise<Phrase[]> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching phrases by category:', error);
    return [];
  }
}

/**
 * Thêm phrase mới
 */
export async function addPhrase(phrase: Omit<Phrase, 'id' | 'created_at'>): Promise<Phrase | null> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .insert([phrase])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding phrase:', error);
    return null;
  }
}

/**
 * Cập nhật phrase
 */
export async function updatePhrase(id: number, updates: Partial<Phrase>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('phrases')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating phrase:', error);
    return false;
  }
}

/**
 * Xóa phrase
 */
export async function deletePhrase(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('phrases')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting phrase:', error);
    return false;
  }
}

/**
 * Import nhiều phrases cùng lúc (từ Excel/CSV)
 */
export async function bulkImportPhrases(phrases: Omit<Phrase, 'id' | 'created_at'>[]): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('phrases')
      .insert(phrases);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error bulk importing phrases:', error);
    return false;
  }
}

/**
 * Lấy danh sách categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('phrases')
      .select('category');

    if (error) throw error;
    
    const categories = [...new Set(data?.map(p => p.category) || [])];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// ============================================
// USER PROGRESS TRACKING
// ============================================

export interface UserProgress {
  id: number;
  user_id: string;
  phrase_id: number;
  is_correct: boolean;
  user_input: string;
  attempt_time: string;
}

/**
 * Lưu kết quả học tập của user
 */
export async function saveUserProgress(
  phraseId: number,
  isCorrect: boolean,
  userInput: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .insert([{
        phrase_id: phraseId,
        is_correct: isCorrect,
        user_input: userInput,
      }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving user progress:', error);
    return false;
  }
}

/**
 * Lấy thống kê học tập của user
 */
export async function getUserStats(userId: string): Promise<{
  total: number;
  correct: number;
  percentage: number;
}> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('is_correct')
      .eq('user_id', userId);

    if (error) throw error;

    const total = data?.length || 0;
    const correct = data?.filter(p => p.is_correct).length || 0;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, percentage };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return { total: 0, correct: 0, percentage: 0 };
  }
}

/**
 * Lấy lịch sử học tập gần đây
 */
export async function getRecentProgress(userId: string, limit = 20): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('attempt_time', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting recent progress:', error);
    return [];
  }
}

