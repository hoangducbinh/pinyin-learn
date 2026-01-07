export interface Phrase {
  id: number;
  vietnamese: string;
  pinyin: string;
  chinese: string;
  category: string;
  hskLevel: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Vocabulary {
  id: number;
  vietnamese: string;
  pinyin: string;
  chinese: string;
  category: string;
  hskLevel: string;
  partOfSpeech: string;
}

// Import JSON files
import hsk1Phrases from './phrases/hsk1.json';
import hsk2Phrases from './phrases/hsk2.json';
import hsk3Phrases from './phrases/hsk3.json';
import hsk4Phrases from './phrases/hsk4.json';
import hsk5Phrases from './phrases/hsk5.json';
import hsk6Phrases from './phrases/hsk6.json';

import hsk1Vocab from './vocabulary/hsk1.json';
import hsk2Vocab from './vocabulary/hsk2.json';
import hsk3Vocab from './vocabulary/hsk3.json';
import hsk4Vocab from './vocabulary/hsk4.json';
import hsk5Vocab from './vocabulary/hsk5.json';
import hsk6Vocab from './vocabulary/hsk6.json';

import hsk30Vocab1 from './vocabulary/hsk30/hsk30_level1.json';
import hsk30Vocab2 from './vocabulary/hsk30/hsk30_level2.json';
import hsk30Vocab3 from './vocabulary/hsk30/hsk30_level3.json';
import hsk30Vocab4 from './vocabulary/hsk30/hsk30_level4.json';
import hsk30Vocab5 from './vocabulary/hsk30/hsk30_level5.json';
import hsk30Vocab6 from './vocabulary/hsk30/hsk30_level6.json';
import hsk30Vocab79 from './vocabulary/hsk30/hsk30_level7-9.json';

// Combine all phrases
export const phrases: Phrase[] = [
  ...hsk1Phrases as Phrase[],
  ...hsk2Phrases as Phrase[],
  ...hsk3Phrases as Phrase[],
  ...hsk4Phrases as Phrase[],
  ...hsk5Phrases as Phrase[],
  ...hsk6Phrases as Phrase[],
];

// Combine all vocabulary
export const vocabulary: Vocabulary[] = [
  ...hsk1Vocab as Vocabulary[],
  ...hsk2Vocab as Vocabulary[],
  ...hsk3Vocab as Vocabulary[],
  ...hsk4Vocab as Vocabulary[],
  ...hsk5Vocab as Vocabulary[],
  ...hsk6Vocab as Vocabulary[],
  ...hsk30Vocab1 as Vocabulary[],
  ...hsk30Vocab2 as Vocabulary[],
  ...hsk30Vocab3 as Vocabulary[],
  ...hsk30Vocab4 as Vocabulary[],
  ...hsk30Vocab5 as Vocabulary[],
  ...hsk30Vocab6 as Vocabulary[],
  ...hsk30Vocab79 as Vocabulary[],
];

// Extract unique categories
export const categories = Array.from(new Set(phrases.map(p => p.category)));

// Extract unique HSK levels
export const hskLevels = Array.from(new Set([
  ...phrases.map(p => p.hskLevel),
  ...vocabulary.map(v => v.hskLevel),
])).sort();

// Helper functions
export function getPhrasesByLevel(level: string): Phrase[] {
  return phrases.filter(p => p.hskLevel === level);
}

export function getVocabularyByLevel(level: string): Vocabulary[] {
  return vocabulary.filter(v => v.hskLevel === level);
}

export function getPhrasesByCategory(category: string): Phrase[] {
  return phrases.filter(p => p.category === category);
}
