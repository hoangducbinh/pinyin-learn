/**
 * Search Vietnamese text with diacritics normalization
 * Allows searching without needing exact diacritics
 */
export function searchVietnameseText(text: string, query: string): boolean {
  if (!query) return true;
  
  // Normalize Vietnamese diacritics for comparison
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };
  
  return normalize(text).includes(normalize(query));
}
