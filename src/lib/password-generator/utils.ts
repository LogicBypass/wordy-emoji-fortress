import { 
  dicewareWords, 
  emojis, 
  sentenceTemplates, 
  wordCategories, 
  leetTransformations, 
  wordToEmoji,
  commonPasswords
} from './data';

// Step 1: Entropy & Selection Engine
export function generateRandomTokens(): string[] {
  // Generate secure random bytes (128 bits = 16 bytes)
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  
  // Use the random bytes to select 5 words from diceware list
  const tokens: string[] = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor((array[i * 3] * 256 * 256 + array[i * 3 + 1] * 256 + array[i * 3 + 2]) % dicewareWords.length);
    tokens.push(dicewareWords[randomIndex]);
  }
  
  return tokens;
}

// Step 2: Mnemonic Story Builder
export function buildMnemonicStory(tokens: string[]): { sentence: string; emojis: string } {
  // Pick a random template
  const template = sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)];
  
  // Map tokens to parts of speech based on our categories
  const parts: Record<string, string> = {
    subject: '',
    verb: '',
    object: '',
    location: '',
    time: ''
  };
  
  // Try to find a match for each token in our categories
  const unusedTokens = [...tokens];
  
  // First pass - try to place tokens in their ideal categories
  for (const [category, words] of Object.entries(wordCategories)) {
    for (let i = 0; i < unusedTokens.length; i++) {
      if (words.includes(unusedTokens[i])) {
        parts[category] = unusedTokens[i];
        unusedTokens.splice(i, 1);
        break;
      }
    }
  }
  
  // Second pass - fill in any missing categories with remaining tokens
  const missingCategories = Object.keys(parts).filter(category => !parts[category] && template.includes(`[${category}]`));
  
  for (let i = 0; i < missingCategories.length && i < unusedTokens.length; i++) {
    parts[missingCategories[i]] = unusedTokens[i];
    unusedTokens.splice(i, 1);
  }
  
  // Replace template placeholders with our words
  let sentence = template;
  for (const [category, word] of Object.entries(parts)) {
    if (word) {
      sentence = sentence.replace(`[${category}]`, word);
    }
  }
  
  // Clean up any unfilled placeholders
  sentence = sentence.replace(/\[\w+\]/g, '').replace(/\s+/g, ' ').trim();
  
  // Create emoji version
  const words = sentence.split(' ');
  const emojiSentence = words.map(word => wordToEmoji[word] || '').filter(emoji => emoji).join('');
  
  return {
    sentence,
    emojis: emojiSentence
  };
}

// Step 3: Contextual Leet Transformer
export function applyLeetTransformations(text: string): string {
  // Split the text into words
  const words = text.split(' ');
  
  // Apply leet transformations with a certain probability
  let result = '';
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let leetWord = '';
    
    // Apply transformations character by character
    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      const before = j > 0 ? word.substring(j - 1, j) : '';
      const after = j < word.length - 1 ? word.substring(j + 1, j + 2) : '';
      
      // Find a matching transformation
      const matchingTransformations = leetTransformations.filter(
        transform => transform.from === char.toLowerCase() && transform.condition(before, after)
      );
      
      if (matchingTransformations.length > 0 && Math.random() < 0.3) {
        // Apply the transformation with a 30% chance if conditions are met
        leetWord += matchingTransformations[0].to;
      } else {
        leetWord += char;
      }
    }
    
    // Add to result
    result += leetWord + (i < words.length - 1 ? '' : '');
  }
  
  // Add one random capitalization pivot
  const chars = result.split('');
  const randomIndex = Math.floor(Math.random() * chars.length);
  if (/[a-z]/.test(chars[randomIndex])) {
    chars[randomIndex] = chars[randomIndex].toUpperCase();
  }
  
  // Remove all spaces
  return chars.join('').replace(/\s+/g, '');
}

// Step 4: Local Strength Evaluator
export function evaluatePasswordStrength(password: string): {
  score: number;
  entropy: number;
  timeToCrack: string;
  strengthText: string;
} {
  // 1. Shannon entropy calculation
  const uniqueChars = new Set(password.split('')).size;
  const entropy = password.length * Math.log2(Math.max(uniqueChars, 2));
  
  // 2. Check against common passwords
  const isCommonPassword = commonPasswords.some(common => 
    password.toLowerCase().includes(common.toLowerCase())
  );
  
  // 3. Check minimum length
  const meetsLengthRequirement = password.length >= 8;
  
  // 4. Check for character variety
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(password);
  
  const characterVariety = 
    (hasLowercase ? 1 : 0) +
    (hasUppercase ? 1 : 0) +
    (hasNumbers ? 1 : 0) +
    (hasSpecialChars ? 1 : 0);
  
  // 5. Calculate brute force time
  const guessesPerSecond = 10000000000; // 10^10
  const possibleCombinations = Math.pow(2, entropy);
  const secondsToCrack = possibleCombinations / guessesPerSecond;
  
  // Format time to crack
  let timeToCrack: string;
  if (secondsToCrack < 60) {
    timeToCrack = `${Math.round(secondsToCrack)} seconds`;
  } else if (secondsToCrack < 3600) {
    timeToCrack = `${Math.round(secondsToCrack / 60)} minutes`;
  } else if (secondsToCrack < 86400) {
    timeToCrack = `${Math.round(secondsToCrack / 3600)} hours`;
  } else if (secondsToCrack < 31536000) {
    timeToCrack = `${Math.round(secondsToCrack / 86400)} days`;
  } else {
    timeToCrack = `${Math.round(secondsToCrack / 31536000)} years`;
  }
  
  // Calculate final score (0-4)
  let score = 0;
  
  // Entropy score (0-1.5)
  if (entropy > 60) score += 1.5;
  else if (entropy > 40) score += 1;
  else if (entropy > 28) score += 0.5;
  
  // Length score (0-1)
  if (password.length >= 12) score += 1;
  else if (password.length >= 8) score += 0.5;
  
  // Character variety score (0-1)
  score += characterVariety * 0.25;
  
  // Penalty for common passwords
  if (isCommonPassword) score = Math.max(0, score - 2);
  
  // Round to nearest 0.5
  score = Math.round(score * 2) / 2;
  
  // Get text representation of strength
  let strengthText = "";
  if (score >= 3.5) strengthText = "Very Strong";
  else if (score >= 3) strengthText = "Strong";
  else if (score >= 2) strengthText = "Medium";
  else if (score >= 1) strengthText = "Weak";
  else strengthText = "Very Weak";
  
  return {
    score,
    entropy,
    timeToCrack,
    strengthText
  };
}

// Main password generation pipeline
export function generatePassword(): {
  originalWords: string[];
  sentence: string;
  emojiSentence: string;
  transformedPassword: string;
  strength: {
    score: number;
    entropy: number;
    timeToCrack: string;
    strengthText: string;
  };
  stages: {
    stage1: string;
    stage2: string;
    stage3: string;
    stage4: string;
  };
} {
  // Keep generating until we get a strong enough password
  let score = 0;
  let originalWords: string[];
  let story: { sentence: string; emojis: string };
  let transformedPassword: string;
  let strengthEvaluation: {
    score: number;
    entropy: number;
    timeToCrack: string;
    strengthText: string;
  };
  
  // Stage tracking
  let stages = {
    stage1: "Starting entropy generation...",
    stage2: "Building mnemonic story...",
    stage3: "Applying leet transformations...",
    stage4: "Evaluating password strength..."
  };
  
  do {
    // Step 1: Generate random tokens
    stages.stage1 = "Generated random tokens";
    originalWords = generateRandomTokens();
    
    // Step 2: Build mnemonic story
    stages.stage2 = `Created story: "${originalWords.join(', ')}" → sentence`;
    story = buildMnemonicStory(originalWords);
    
    // Step 3: Apply leet transformations
    stages.stage3 = `Applied transformations to "${story.sentence}"`;
    transformedPassword = applyLeetTransformations(story.sentence);
    
    // Step 4: Evaluate strength
    strengthEvaluation = evaluatePasswordStrength(transformedPassword);
    stages.stage4 = `Evaluated strength: ${strengthEvaluation.score}/4 (${strengthEvaluation.strengthText})`;
    score = strengthEvaluation.score;
    
    // If score is too low, restart the process
    if (score < 3) {
      stages.stage1 = "Restarting due to low strength score...";
    }
  } while (score < 3);
  
  return {
    originalWords,
    sentence: story.sentence,
    emojiSentence: story.emojis,
    transformedPassword,
    strength: strengthEvaluation,
    stages
  };
}
