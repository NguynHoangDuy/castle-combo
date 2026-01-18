/**
 * Castle Combo - Character Placeholder Generator
 * Quirky cartoon style inspired by Stéphane Escapa's art
 * Features: Exaggerated noses, oddball expressions, satirical medieval characters
 * Run with: node generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// Character definitions with quirky features
const castleCharacters = [
  // Royalty
  { name: 'king', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous', noseSize: 'large', expression: 'pompous',
    hair: { style: 'balding_crown', color: '#5D4E37' },
    outfit: { type: 'royal', primary: '#1E3A8A', secondary: '#FCD34D', accent: '#B91C1C' },
    accessory: 'crown', features: ['double_chin', 'rosy_cheeks', 'bushy_brows'], age: 'old' },

  { name: 'queen', gender: 'female', skinTone: '#FBE8E0',
    nose: 'pointed_up', noseSize: 'medium', expression: 'smug',
    hair: { style: 'tall_updo', color: '#2D1B0E' },
    outfit: { type: 'royal_gown', primary: '#7C3AED', secondary: '#FCD34D', accent: '#EC4899' },
    accessory: 'tiara', features: ['beauty_mark', 'long_neck', 'heavy_lids'], age: 'adult' },

  { name: 'prince', gender: 'male', skinTone: '#F5D0C5',
    nose: 'pointy', noseSize: 'medium', expression: 'snooty',
    hair: { style: 'swoopy', color: '#5D4E37' },
    outfit: { type: 'noble', primary: '#2563EB', secondary: '#FCD34D', accent: '#1E40AF' },
    accessory: 'small_crown', features: ['dimples', 'thin_brows'], age: 'young' },

  { name: 'princess', gender: 'female', skinTone: '#FBE8E0',
    nose: 'button', noseSize: 'small', expression: 'dreamy',
    hair: { style: 'long_wavy', color: '#FCD34D' },
    outfit: { type: 'princess_gown', primary: '#EC4899', secondary: '#FDF2F8', accent: '#BE185D' },
    accessory: 'tiara', features: ['big_eyes', 'rosy_cheeks', 'freckles'], age: 'young' },

  // High Nobility
  { name: 'duke', gender: 'male', skinTone: '#E8C4B8',
    nose: 'hook', noseSize: 'huge', expression: 'haughty',
    hair: { style: 'powdered_wig', color: '#E5E7EB' },
    outfit: { type: 'noble_coat', primary: '#1E3A8A', secondary: '#9CA3AF', accent: '#FCD34D' },
    accessory: 'monocle', features: ['thin_mustache', 'wrinkles', 'sunken_cheeks'], age: 'old' },

  { name: 'duchess', gender: 'female', skinTone: '#FBE8E0',
    nose: 'upturned', noseSize: 'medium', expression: 'condescending',
    hair: { style: 'big_curls', color: '#92400E' },
    outfit: { type: 'noble_gown', primary: '#7C3AED', secondary: '#DDD6FE', accent: '#5B21B6' },
    accessory: 'feather_hat', features: ['makeup', 'double_chin', 'pearls'], age: 'adult' },

  { name: 'baron', gender: 'male', skinTone: '#D4A574',
    nose: 'crooked', noseSize: 'large', expression: 'scheming',
    hair: { style: 'slicked', color: '#1C1917' },
    outfit: { type: 'noble', primary: '#1E3A8A', secondary: '#374151', accent: '#FCD34D' },
    accessory: 'none', features: ['goatee', 'narrow_eyes', 'sharp_cheekbones'], age: 'adult' },

  // Military
  { name: 'general', gender: 'male', skinTone: '#D4A574',
    nose: 'roman', noseSize: 'huge', expression: 'stern',
    hair: { style: 'military', color: '#9CA3AF' },
    outfit: { type: 'military', primary: '#6B7280', secondary: '#991B1B', accent: '#FCD34D' },
    accessory: 'plumed_helmet', features: ['scar', 'thick_neck', 'bushy_brows', 'square_jaw'], age: 'old' },

  { name: 'captain', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous', noseSize: 'medium', expression: 'determined',
    hair: { style: 'short_messy', color: '#78350F' },
    outfit: { type: 'officer', primary: '#991B1B', secondary: '#6B7280', accent: '#FCD34D' },
    accessory: 'captain_hat', features: ['stubble', 'cleft_chin'], age: 'adult' },

  { name: 'knight', gender: 'male', skinTone: '#F5D0C5',
    nose: 'hidden', noseSize: 'hidden', expression: 'hidden',
    hair: { style: 'hidden', color: '#78350F' },
    outfit: { type: 'full_armor', primary: '#9CA3AF', secondary: '#6B7280', accent: '#FCD34D' },
    accessory: 'knight_helmet', features: ['armor_shine'], age: 'adult' },

  { name: 'guard', gender: 'male', skinTone: '#D4A574',
    nose: 'potato', noseSize: 'large', expression: 'bored',
    hair: { style: 'helmet_hair', color: '#1C1917' },
    outfit: { type: 'guard_armor', primary: '#7F1D1D', secondary: '#6B7280', accent: '#1C1917' },
    accessory: 'guard_helmet', features: ['droopy_eyes', 'five_oclock_shadow'], age: 'adult' },

  { name: 'archer', gender: 'female', skinTone: '#F5D0C5',
    nose: 'small_pointy', noseSize: 'small', expression: 'focused',
    hair: { style: 'ponytail', color: '#92400E' },
    outfit: { type: 'ranger', primary: '#166534', secondary: '#78350F', accent: '#22C55E' },
    accessory: 'hood_down', features: ['freckles', 'determined_brow'], age: 'young' },

  { name: 'soldier', gender: 'male', skinTone: '#F5D0C5',
    nose: 'round', noseSize: 'medium', expression: 'nervous',
    hair: { style: 'buzzcut', color: '#78350F' },
    outfit: { type: 'soldier', primary: '#991B1B', secondary: '#6B7280', accent: '#7F1D1D' },
    accessory: 'simple_helmet', features: ['big_ears', 'adam_apple'], age: 'young' },

  { name: 'squire', gender: 'male', skinTone: '#FBE8E0',
    nose: 'button', noseSize: 'small', expression: 'eager',
    hair: { style: 'bowl_cut', color: '#FCD34D' },
    outfit: { type: 'squire', primary: '#B91C1C', secondary: '#E5E7EB', accent: '#7F1D1D' },
    accessory: 'none', features: ['freckles', 'big_eyes', 'gap_teeth', 'big_ears'], age: 'child' },

  // Religious
  { name: 'archbishop', gender: 'male', skinTone: '#F5D0C5',
    nose: 'long_droopy', noseSize: 'huge', expression: 'pious',
    hair: { style: 'bald_fringe', color: '#E5E7EB' },
    outfit: { type: 'archbishop', primary: '#FCD34D', secondary: '#FFFFFF', accent: '#B45309' },
    accessory: 'mitre', features: ['long_beard', 'deep_wrinkles', 'bags_under_eyes'], age: 'old' },

  { name: 'bishop', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous_red', noseSize: 'large', expression: 'jolly',
    hair: { style: 'tonsure', color: '#6B7280' },
    outfit: { type: 'bishop', primary: '#7C3AED', secondary: '#FFFFFF', accent: '#5B21B6' },
    accessory: 'bishop_hat', features: ['round_face', 'rosy_cheeks', 'kind_eyes'], age: 'old' },

  { name: 'priest', gender: 'male', skinTone: '#D4A574',
    nose: 'thin_long', noseSize: 'large', expression: 'somber',
    hair: { style: 'receding', color: '#1C1917' },
    outfit: { type: 'priest', primary: '#1C1917', secondary: '#FFFFFF', accent: '#374151' },
    accessory: 'cross', features: ['gaunt', 'hollow_cheeks'], age: 'adult' },

  { name: 'monk', gender: 'male', skinTone: '#F5D0C5',
    nose: 'round_red', noseSize: 'medium', expression: 'content',
    hair: { style: 'tonsure', color: '#78350F' },
    outfit: { type: 'monk', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'hood_up', features: ['round_face', 'peaceful_smile'], age: 'adult' },

  { name: 'nun', gender: 'female', skinTone: '#FBE8E0',
    nose: 'small_round', noseSize: 'small', expression: 'serene',
    hair: { style: 'hidden', color: 'hidden' },
    outfit: { type: 'nun', primary: '#1C1917', secondary: '#FFFFFF', accent: '#374151' },
    accessory: 'wimple', features: ['gentle_eyes', 'thin_lips', 'rosy_cheeks'], age: 'adult' },

  // Nobility
  { name: 'count', gender: 'male', skinTone: '#E8C4B8',
    nose: 'vampire', noseSize: 'large', expression: 'sinister',
    hair: { style: 'widow_peak', color: '#1C1917' },
    outfit: { type: 'count', primary: '#5B21B6', secondary: '#1C1917', accent: '#FCD34D' },
    accessory: 'cape', features: ['pointed_beard', 'arched_brows', 'pale'], age: 'adult' },

  { name: 'countess', gender: 'female', skinTone: '#FBE8E0',
    nose: 'elegant', noseSize: 'medium', expression: 'mysterious',
    hair: { style: 'braided_crown', color: '#78350F' },
    outfit: { type: 'noble_gown', primary: '#7C3AED', secondary: '#A855F7', accent: '#FCD34D' },
    accessory: 'jeweled_headpiece', features: ['beauty_mark', 'long_lashes', 'knowing_smile'], age: 'adult' },

  { name: 'lord', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous', noseSize: 'huge', expression: 'grumpy',
    hair: { style: 'balding', color: '#9CA3AF' },
    outfit: { type: 'noble', primary: '#4C1D95', secondary: '#374151', accent: '#FCD34D' },
    accessory: 'none', features: ['jowls', 'bushy_brows', 'frown_lines'], age: 'old' },

  { name: 'lady', gender: 'female', skinTone: '#FBE8E0',
    nose: 'delicate', noseSize: 'small', expression: 'coy',
    hair: { style: 'elaborate', color: '#1C1917' },
    outfit: { type: 'noble_gown', primary: '#A855F7', secondary: '#E9D5FF', accent: '#7C3AED' },
    accessory: 'fan', features: ['batting_lashes', 'high_cheekbones', 'tiny_mouth'], age: 'adult' },

  { name: 'nobleman', gender: 'male', skinTone: '#F5D0C5',
    nose: 'hooked', noseSize: 'large', expression: 'arrogant',
    hair: { style: 'fancy', color: '#78350F' },
    outfit: { type: 'noble', primary: '#6D28D9', secondary: '#4C1D95', accent: '#FCD34D' },
    accessory: 'feathered_cap', features: ['pointy_beard', 'smirk'], age: 'adult' },

  { name: 'noblewoman', gender: 'female', skinTone: '#FBE8E0',
    nose: 'upturned', noseSize: 'small', expression: 'dignified',
    hair: { style: 'ringlets', color: '#92400E' },
    outfit: { type: 'noble_gown', primary: '#C084FC', secondary: '#E9D5FF', accent: '#A855F7' },
    accessory: 'pearls', features: ['rosy_cheeks', 'dimples', 'curled_lashes'], age: 'adult' },

  // Castle Staff
  { name: 'steward', gender: 'male', skinTone: '#E8C4B8',
    nose: 'long_thin', noseSize: 'large', expression: 'disapproving',
    hair: { style: 'receding', color: '#6B7280' },
    outfit: { type: 'servant', primary: '#1C1917', secondary: '#374151', accent: '#6B7280' },
    accessory: 'keys', features: ['thin_lips', 'wrinkles', 'hunched'], age: 'old' },

  { name: 'butler', gender: 'male', skinTone: '#F5D0C5',
    nose: 'pointy', noseSize: 'large', expression: 'dignified',
    hair: { style: 'slicked', color: '#1C1917' },
    outfit: { type: 'butler', primary: '#1C1917', secondary: '#FFFFFF', accent: '#374151' },
    accessory: 'tray', features: ['thin_mustache', 'straight_posture', 'raised_brow'], age: 'adult' },

  { name: 'maid', gender: 'female', skinTone: '#FBE8E0',
    nose: 'button', noseSize: 'small', expression: 'cheerful',
    hair: { style: 'bun', color: '#78350F' },
    outfit: { type: 'maid', primary: '#1C1917', secondary: '#FFFFFF', accent: '#3B82F6' },
    accessory: 'maid_cap', features: ['rosy_cheeks', 'bright_eyes', 'dimples'], age: 'young' },

  { name: 'cook', gender: 'male', skinTone: '#D4A574',
    nose: 'potato', noseSize: 'huge', expression: 'jolly',
    hair: { style: 'hidden', color: '#78350F' },
    outfit: { type: 'chef', primary: '#FFFFFF', secondary: '#E5E7EB', accent: '#374151' },
    accessory: 'chef_hat', features: ['round_face', 'big_belly', 'rosy_cheeks', 'mustache'], age: 'adult' },

  { name: 'herald', gender: 'male', skinTone: '#F5D0C5',
    nose: 'long', noseSize: 'medium', expression: 'proud',
    hair: { style: 'pageboy', color: '#FCD34D' },
    outfit: { type: 'herald', primary: '#7C3AED', secondary: '#FCD34D', accent: '#5B21B6' },
    accessory: 'trumpet', features: ['puffed_cheeks', 'clean_shaven'], age: 'young' },

  // Special Characters
  { name: 'wizard', gender: 'male', skinTone: '#E8C4B8',
    nose: 'crooked_long', noseSize: 'huge', expression: 'mysterious',
    hair: { style: 'wild_long', color: '#E5E7EB' },
    outfit: { type: 'wizard', primary: '#1E3A8A', secondary: '#3B82F6', accent: '#FCD34D' },
    accessory: 'wizard_hat', features: ['long_beard', 'bushy_brows', 'sparkle_eyes', 'warts'], age: 'old' },

  { name: 'jester', gender: 'male', skinTone: '#FBE8E0',
    nose: 'red_ball', noseSize: 'huge', expression: 'crazy',
    hair: { style: 'wild', color: '#EF4444' },
    outfit: { type: 'jester', primary: '#FACC15', secondary: '#EF4444', accent: '#22C55E' },
    accessory: 'jester_hat', features: ['face_paint', 'gap_teeth', 'crossed_eyes', 'big_grin'], age: 'adult' },

  { name: 'advisor', gender: 'male', skinTone: '#F5D0C5',
    nose: 'hawk', noseSize: 'large', expression: 'cunning',
    hair: { style: 'balding', color: '#6B7280' },
    outfit: { type: 'advisor', primary: '#1E40AF', secondary: '#374151', accent: '#FCD34D' },
    accessory: 'scroll', features: ['glasses', 'thin_beard', 'calculating_eyes'], age: 'old' },

  { name: 'alchemist', gender: 'female', skinTone: '#F5D0C5',
    nose: 'button', noseSize: 'small', expression: 'manic',
    hair: { style: 'frizzy', color: '#6B7280' },
    outfit: { type: 'alchemist', primary: '#4C1D95', secondary: '#166534', accent: '#FCD34D' },
    accessory: 'goggles', features: ['wild_eyes', 'soot_marks', 'singed_brows'], age: 'adult' },

  { name: 'scribe', gender: 'male', skinTone: '#F5D0C5',
    nose: 'pointy', noseSize: 'medium', expression: 'squinting',
    hair: { style: 'messy', color: '#78350F' },
    outfit: { type: 'scribe', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'quill', features: ['ink_stains', 'bags_under_eyes', 'hunched'], age: 'adult' },

  { name: 'treasurer', gender: 'male', skinTone: '#E8C4B8',
    nose: 'hooked', noseSize: 'huge', expression: 'greedy',
    hair: { style: 'combover', color: '#1C1917' },
    outfit: { type: 'treasurer', primary: '#166534', secondary: '#1C1917', accent: '#FCD34D' },
    accessory: 'coins', features: ['beady_eyes', 'thin_lips', 'rubbing_hands'], age: 'old' },

  { name: 'chamberlain', gender: 'male', skinTone: '#F5D0C5',
    nose: 'long_droopy', noseSize: 'large', expression: 'weary',
    hair: { style: 'thin_gray', color: '#9CA3AF' },
    outfit: { type: 'chamberlain', primary: '#1C1917', secondary: '#4B5563', accent: '#FCD34D' },
    accessory: 'staff', features: ['bags_under_eyes', 'thin_mustache', 'stooped'], age: 'old' },

  { name: 'executioner', gender: 'male', skinTone: '#D4A574',
    nose: 'hidden', noseSize: 'hidden', expression: 'hidden',
    hair: { style: 'hidden', color: 'hidden' },
    outfit: { type: 'executioner', primary: '#1C1917', secondary: '#7F1D1D', accent: '#1C1917' },
    accessory: 'hood_mask', features: ['muscular', 'imposing'], age: 'adult' },

  { name: 'master_builder', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous', noseSize: 'large', expression: 'proud',
    hair: { style: 'short', color: '#78350F' },
    outfit: { type: 'builder', primary: '#78350F', secondary: '#A16207', accent: '#451A03' },
    accessory: 'blueprints', features: ['thick_arms', 'square_jaw', 'callused_hands'], age: 'adult' },
];

const villageCharacters = [
  // Farmers & Agricultural
  { name: 'farmer', gender: 'male', skinTone: '#D4A574',
    nose: 'potato', noseSize: 'large', expression: 'cheerful',
    hair: { style: 'messy', color: '#78350F' },
    outfit: { type: 'farmer', primary: '#78350F', secondary: '#A16207', accent: '#451A03' },
    accessory: 'straw_hat', features: ['sunburnt', 'missing_tooth', 'weathered'], age: 'adult' },

  { name: 'shepherd', gender: 'female', skinTone: '#F5D0C5',
    nose: 'small_round', noseSize: 'small', expression: 'gentle',
    hair: { style: 'braids', color: '#92400E' },
    outfit: { type: 'shepherd', primary: '#6B7280', secondary: '#9CA3AF', accent: '#4B5563' },
    accessory: 'crook', features: ['freckles', 'windswept', 'kind_eyes'], age: 'young' },

  { name: 'miller', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous', noseSize: 'large', expression: 'dusty',
    hair: { style: 'messy', color: '#E5E7EB' },
    outfit: { type: 'miller', primary: '#F5F5DC', secondary: '#D4D4D4', accent: '#A3A3A3' },
    accessory: 'flour_bag', features: ['flour_covered', 'round_face', 'squinty'], age: 'adult' },

  { name: 'fisherman', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous_red', noseSize: 'huge', expression: 'weathered',
    hair: { style: 'messy', color: '#1C1917' },
    outfit: { type: 'fisherman', primary: '#3B82F6', secondary: '#1E40AF', accent: '#78350F' },
    accessory: 'fish', features: ['beard', 'squint_lines', 'windburnt'], age: 'adult' },

  { name: 'beekeeper', gender: 'female', skinTone: '#F5D0C5',
    nose: 'hidden', noseSize: 'hidden', expression: 'hidden',
    hair: { style: 'hidden', color: 'hidden' },
    outfit: { type: 'beekeeper', primary: '#FCD34D', secondary: '#FFFFFF', accent: '#B45309' },
    accessory: 'bee_veil', features: ['mysterious'], age: 'adult' },

  { name: 'gardener', gender: 'female', skinTone: '#FBE8E0',
    nose: 'button', noseSize: 'small', expression: 'nurturing',
    hair: { style: 'kerchief', color: '#92400E' },
    outfit: { type: 'gardener', primary: '#166534', secondary: '#22C55E', accent: '#15803D' },
    accessory: 'flowers', features: ['dirt_smudges', 'warm_smile', 'rosy_cheeks'], age: 'adult' },

  { name: 'vineyard_owner', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous_purple', noseSize: 'huge', expression: 'merry',
    hair: { style: 'wavy', color: '#1C1917' },
    outfit: { type: 'vintner', primary: '#7C3AED', secondary: '#5B21B6', accent: '#FCD34D' },
    accessory: 'wine', features: ['rosy_cheeks', 'belly', 'handlebar_mustache'], age: 'old' },

  { name: 'herbalist', gender: 'female', skinTone: '#E8C4B8',
    nose: 'hooked', noseSize: 'large', expression: 'knowing',
    hair: { style: 'wild_gray', color: '#9CA3AF' },
    outfit: { type: 'herbalist', primary: '#166534', secondary: '#22C55E', accent: '#15803D' },
    accessory: 'herbs', features: ['wrinkles', 'wise_eyes', 'warts', 'crooked_teeth'], age: 'old' },

  // Craftsmen
  { name: 'blacksmith', gender: 'male', skinTone: '#D4A574',
    nose: 'broken', noseSize: 'large', expression: 'tough',
    hair: { style: 'bald', color: '#1C1917' },
    outfit: { type: 'smith', primary: '#78350F', secondary: '#1C1917', accent: '#6B7280' },
    accessory: 'hammer', features: ['muscular', 'soot_covered', 'burn_scars', 'bushy_brows'], age: 'adult' },

  { name: 'carpenter', gender: 'male', skinTone: '#F5D0C5',
    nose: 'bulbous', noseSize: 'medium', expression: 'focused',
    hair: { style: 'short', color: '#78350F' },
    outfit: { type: 'carpenter', primary: '#78350F', secondary: '#A16207', accent: '#451A03' },
    accessory: 'saw', features: ['sawdust', 'measuring_squint', 'strong_arms'], age: 'adult' },

  { name: 'woodcutter', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous', noseSize: 'large', expression: 'rugged',
    hair: { style: 'wild', color: '#92400E' },
    outfit: { type: 'woodcutter', primary: '#166534', secondary: '#78350F', accent: '#15803D' },
    accessory: 'axe', features: ['huge_beard', 'muscular', 'weathered', 'missing_finger'], age: 'adult' },

  { name: 'mason', gender: 'male', skinTone: '#D4A574',
    nose: 'crooked', noseSize: 'medium', expression: 'stoic',
    hair: { style: 'dusty', color: '#6B7280' },
    outfit: { type: 'mason', primary: '#6B7280', secondary: '#9CA3AF', accent: '#4B5563' },
    accessory: 'chisel', features: ['stone_dust', 'thick_hands', 'squinting'], age: 'adult' },

  { name: 'potter', gender: 'female', skinTone: '#FBE8E0',
    nose: 'small_round', noseSize: 'small', expression: 'creative',
    hair: { style: 'messy_bun', color: '#78350F' },
    outfit: { type: 'potter', primary: '#B45309', secondary: '#D97706', accent: '#92400E' },
    accessory: 'pot', features: ['clay_stains', 'artistic_hands', 'focused_look'], age: 'adult' },

  { name: 'weaver', gender: 'female', skinTone: '#FBE8E0',
    nose: 'delicate', noseSize: 'small', expression: 'patient',
    hair: { style: 'bun', color: '#1C1917' },
    outfit: { type: 'weaver', primary: '#7C3AED', secondary: '#A855F7', accent: '#5B21B6' },
    accessory: 'thread', features: ['nimble_fingers', 'spectacles', 'gentle_smile'], age: 'adult' },

  { name: 'tanner', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous', noseSize: 'large', expression: 'gruff',
    hair: { style: 'shaggy', color: '#78350F' },
    outfit: { type: 'tanner', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'hide', features: ['stained_hands', 'rough_skin', 'squinting'], age: 'adult' },

  { name: 'cobbler', gender: 'male', skinTone: '#F5D0C5',
    nose: 'long_thin', noseSize: 'large', expression: 'meticulous',
    hair: { style: 'balding', color: '#9CA3AF' },
    outfit: { type: 'cobbler', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'shoe', features: ['spectacles', 'hunched', 'tiny_eyes'], age: 'old' },

  // Merchants & Traders
  { name: 'merchant', gender: 'male', skinTone: '#E8C4B8',
    nose: 'hooked', noseSize: 'huge', expression: 'shrewd',
    hair: { style: 'oily', color: '#1C1917' },
    outfit: { type: 'merchant', primary: '#166534', secondary: '#15803D', accent: '#FCD34D' },
    accessory: 'coin_bag', features: ['beady_eyes', 'rings', 'rubbing_hands', 'fake_smile'], age: 'adult' },

  { name: 'trader', gender: 'female', skinTone: '#D4A574',
    nose: 'pointy', noseSize: 'medium', expression: 'alert',
    hair: { style: 'practical', color: '#78350F' },
    outfit: { type: 'trader', primary: '#B45309', secondary: '#D97706', accent: '#92400E' },
    accessory: 'goods', features: ['travel_worn', 'sharp_eyes', 'weather_beaten'], age: 'adult' },

  { name: 'innkeeper', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous_red', noseSize: 'huge', expression: 'jolly',
    hair: { style: 'balding', color: '#92400E' },
    outfit: { type: 'innkeeper', primary: '#78350F', secondary: '#A16207', accent: '#451A03' },
    accessory: 'mug', features: ['big_belly', 'rosy_cheeks', 'bushy_brows', 'hearty_laugh'], age: 'adult' },

  { name: 'jeweler', gender: 'female', skinTone: '#FBE8E0',
    nose: 'elegant', noseSize: 'small', expression: 'discerning',
    hair: { style: 'elegant', color: '#1C1917' },
    outfit: { type: 'jeweler', primary: '#5B21B6', secondary: '#7C3AED', accent: '#FCD34D' },
    accessory: 'gem', features: ['loupe_eye', 'precise_hands', 'pearls'], age: 'adult' },

  { name: 'baker', gender: 'female', skinTone: '#FBE8E0',
    nose: 'button', noseSize: 'small', expression: 'warm',
    hair: { style: 'under_cap', color: '#FCD34D' },
    outfit: { type: 'baker', primary: '#FFFFFF', secondary: '#F5F5DC', accent: '#D4D4D4' },
    accessory: 'bread', features: ['flour_dusted', 'rosy_cheeks', 'plump', 'warm_smile'], age: 'adult' },

  { name: 'butcher', gender: 'male', skinTone: '#D4A574',
    nose: 'pig', noseSize: 'huge', expression: 'intimidating',
    hair: { style: 'short', color: '#1C1917' },
    outfit: { type: 'butcher', primary: '#FFFFFF', secondary: '#EF4444', accent: '#DC2626' },
    accessory: 'cleaver', features: ['thick_arms', 'bloody_apron', 'handlebar_mustache'], age: 'adult' },

  { name: 'tailor', gender: 'male', skinTone: '#F5D0C5',
    nose: 'thin_long', noseSize: 'large', expression: 'fussy',
    hair: { style: 'neat', color: '#6B7280' },
    outfit: { type: 'tailor', primary: '#7C3AED', secondary: '#A855F7', accent: '#5B21B6' },
    accessory: 'tape', features: ['spectacles', 'thin_fingers', 'pursed_lips'], age: 'adult' },

  { name: 'banker', gender: 'male', skinTone: '#E8C4B8',
    nose: 'hawk', noseSize: 'huge', expression: 'calculating',
    hair: { style: 'slicked', color: '#1C1917' },
    outfit: { type: 'banker', primary: '#1C1917', secondary: '#374151', accent: '#FCD34D' },
    accessory: 'ledger', features: ['beady_eyes', 'thin_lips', 'cold_stare'], age: 'adult' },

  // Warriors & Fighters
  { name: 'barbarian', gender: 'male', skinTone: '#D4A574',
    nose: 'broken', noseSize: 'large', expression: 'fierce',
    hair: { style: 'wild_long', color: '#92400E' },
    outfit: { type: 'barbarian', primary: '#78350F', secondary: '#451A03', accent: '#92400E' },
    accessory: 'horned_helm', features: ['war_paint', 'huge_muscles', 'battle_scars', 'wild_eyes'], age: 'adult' },

  { name: 'mercenary', gender: 'female', skinTone: '#D4A574',
    nose: 'broken', noseSize: 'medium', expression: 'hardened',
    hair: { style: 'short_messy', color: '#1C1917' },
    outfit: { type: 'mercenary', primary: '#6B7280', secondary: '#4B5563', accent: '#374151' },
    accessory: 'sword', features: ['scar', 'steely_eyes', 'smirk'], age: 'adult' },

  { name: 'hunter', gender: 'male', skinTone: '#D4A574',
    nose: 'hawk', noseSize: 'medium', expression: 'alert',
    hair: { style: 'practical', color: '#166534' },
    outfit: { type: 'hunter', primary: '#166534', secondary: '#15803D', accent: '#14532D' },
    accessory: 'bow', features: ['keen_eyes', 'weathered', 'quiet_demeanor'], age: 'adult' },

  { name: 'bandit', gender: 'male', skinTone: '#D4A574',
    nose: 'broken', noseSize: 'large', expression: 'menacing',
    hair: { style: 'unkempt', color: '#1C1917' },
    outfit: { type: 'bandit', primary: '#1C1917', secondary: '#374151', accent: '#7F1D1D' },
    accessory: 'mask', features: ['scar', 'missing_tooth', 'stubble', 'shifty_eyes'], age: 'adult' },

  { name: 'militia', gender: 'male', skinTone: '#F5D0C5',
    nose: 'round', noseSize: 'medium', expression: 'brave',
    hair: { style: 'simple', color: '#78350F' },
    outfit: { type: 'militia', primary: '#78350F', secondary: '#92400E', accent: '#6B7280' },
    accessory: 'pitchfork', features: ['determined_jaw', 'common_face', 'earnest_eyes'], age: 'adult' },

  { name: 'veteran', gender: 'male', skinTone: '#D4A574',
    nose: 'crooked', noseSize: 'large', expression: 'grizzled',
    hair: { style: 'gray', color: '#9CA3AF' },
    outfit: { type: 'veteran', primary: '#6B7280', secondary: '#4B5563', accent: '#374151' },
    accessory: 'eyepatch', features: ['many_scars', 'missing_ear', 'thousand_yard_stare'], age: 'old' },

  { name: 'scout', gender: 'female', skinTone: '#F5D0C5',
    nose: 'small_pointy', noseSize: 'small', expression: 'wary',
    hair: { style: 'short', color: '#78350F' },
    outfit: { type: 'scout', primary: '#166534', secondary: '#15803D', accent: '#14532D' },
    accessory: 'cloak', features: ['alert_eyes', 'lithe', 'windswept'], age: 'young' },

  // Common Folk
  { name: 'beggar', gender: 'male', skinTone: '#D4A574',
    nose: 'bulbous_red', noseSize: 'huge', expression: 'pitiful',
    hair: { style: 'wild_messy', color: '#6B7280' },
    outfit: { type: 'rags', primary: '#78350F', secondary: '#6B7280', accent: '#4B5563' },
    accessory: 'bowl', features: ['missing_teeth', 'hollow_cheeks', 'sad_eyes', 'dirty'], age: 'old' },

  { name: 'peasant', gender: 'male', skinTone: '#D4A574',
    nose: 'potato', noseSize: 'large', expression: 'simple',
    hair: { style: 'messy', color: '#78350F' },
    outfit: { type: 'peasant', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'none', features: ['weathered', 'humble', 'honest_face'], age: 'adult' },

  { name: 'servant', gender: 'female', skinTone: '#FBE8E0',
    nose: 'small', noseSize: 'small', expression: 'meek',
    hair: { style: 'simple_bun', color: '#78350F' },
    outfit: { type: 'servant', primary: '#6B7280', secondary: '#9CA3AF', accent: '#4B5563' },
    accessory: 'cloth', features: ['downcast_eyes', 'work_worn', 'thin'], age: 'young' },

  { name: 'child', gender: 'female', skinTone: '#FBE8E0',
    nose: 'tiny_button', noseSize: 'tiny', expression: 'playful',
    hair: { style: 'pigtails', color: '#FCD34D' },
    outfit: { type: 'child', primary: '#3B82F6', secondary: '#60A5FA', accent: '#2563EB' },
    accessory: 'doll', features: ['huge_eyes', 'rosy_cheeks', 'gap_teeth', 'dimples'], age: 'child' },

  { name: 'elder', gender: 'male', skinTone: '#E8C4B8',
    nose: 'long_droopy', noseSize: 'huge', expression: 'wise',
    hair: { style: 'wispy', color: '#E5E7EB' },
    outfit: { type: 'elder', primary: '#78350F', secondary: '#92400E', accent: '#451A03' },
    accessory: 'cane', features: ['long_beard', 'deep_wrinkles', 'kind_eyes', 'hunched'], age: 'old' },

  // Entertainers & Special
  { name: 'musician', gender: 'male', skinTone: '#F5D0C5',
    nose: 'roman', noseSize: 'medium', expression: 'charming',
    hair: { style: 'flowing', color: '#1C1917' },
    outfit: { type: 'musician', primary: '#EF4444', secondary: '#F97316', accent: '#FCD34D' },
    accessory: 'lute', features: ['roguish_smile', 'sparkling_eyes', 'goatee'], age: 'young' },

  { name: 'storyteller', gender: 'female', skinTone: '#E8C4B8',
    nose: 'hooked', noseSize: 'large', expression: 'animated',
    hair: { style: 'wild_gray', color: '#9CA3AF' },
    outfit: { type: 'storyteller', primary: '#7C3AED', secondary: '#A855F7', accent: '#5B21B6' },
    accessory: 'book', features: ['expressive_face', 'wild_eyes', 'gesturing_hands'], age: 'old' },

  { name: 'fortune_teller', gender: 'female', skinTone: '#D4A574',
    nose: 'hooked', noseSize: 'large', expression: 'mysterious',
    hair: { style: 'wild_black', color: '#1C1917' },
    outfit: { type: 'fortune', primary: '#7C3AED', secondary: '#1C1917', accent: '#FCD34D' },
    accessory: 'crystal_ball', features: ['piercing_eyes', 'gold_jewelry', 'knowing_smile', 'headscarf'], age: 'adult' },
];

// ============ SVG GENERATOR FUNCTIONS ============

function generateCharacterSVG(char, type) {
  const displayName = char.name.replace(/_/g, ' ').toUpperCase();
  const bannerColor = type === 'castle' ? '#4B5563' : '#78350F';
  const bannerLight = type === 'castle' ? '#6B7280' : '#92400E';
  const cardBg = getCardBackground(char, type);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="bg_${char.name}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${cardBg.top}"/>
      <stop offset="100%" style="stop-color:${cardBg.bottom}"/>
    </linearGradient>
    <linearGradient id="skin_${char.name}" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" style="stop-color:${lightenColor(char.skinTone, 20)}"/>
      <stop offset="100%" style="stop-color:${darkenColor(char.skinTone, 15)}"/>
    </linearGradient>
    <filter id="shadow_${char.name}">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/>
    </filter>
    <clipPath id="clip_${char.name}">
      <rect x="4" y="4" width="192" height="272" rx="12"/>
    </clipPath>
  </defs>

  <!-- Card border -->
  <rect x="0" y="0" width="200" height="280" rx="14" fill="${bannerColor}"/>

  <!-- Card background -->
  <rect x="4" y="4" width="192" height="272" rx="12" fill="url(#bg_${char.name})"/>

  <!-- Background decoration -->
  <g opacity="0.1" clip-path="url(#clip_${char.name})">
    ${generateQuirkyBackground(char)}
  </g>

  <!-- Character -->
  <g transform="translate(100, 135)">
    ${generateQuirkyBody(char)}
    ${generateQuirkyHead(char)}
  </g>

  <!-- Type banner -->
  <rect x="4" y="4" width="192" height="28" rx="12" fill="${bannerColor}"/>
  <rect x="4" y="18" width="192" height="14" fill="${bannerColor}"/>
  <text x="100" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="11"
        fill="white" font-weight="bold" letter-spacing="2">${type.toUpperCase()}</text>

  <!-- Name banner -->
  <rect x="4" y="244" width="192" height="32" rx="0" fill="${bannerColor}"/>
  <rect x="4" y="244" width="192" height="14" fill="${bannerColor}"/>
  <rect x="4" y="264" width="192" height="12" rx="12" fill="${bannerColor}"/>
  <text x="100" y="262" text-anchor="middle" font-family="Georgia, serif" font-size="12"
        fill="white" font-weight="bold">${displayName}</text>
</svg>`;
}

function getCardBackground(char, type) {
  const primary = char.outfit.primary;
  if (type === 'castle') {
    return { top: lightenColor(primary, 80), bottom: lightenColor(primary, 40) };
  } else {
    return { top: lightenColor(primary, 70), bottom: lightenColor(primary, 30) };
  }
}

function generateQuirkyBackground(char) {
  const shapes = [];
  // Add some whimsical background shapes
  for (let i = 0; i < 5; i++) {
    const x = 20 + (i * 40);
    const y = 60 + (i % 2) * 80;
    const size = 30 + (i % 3) * 15;
    shapes.push(`<circle cx="${x}" cy="${y}" r="${size}" fill="white"/>`);
  }
  return shapes.join('');
}

function generateQuirkyHead(char) {
  let head = '';
  const isHidden = char.nose === 'hidden';

  // Head shape varies by character
  const headWidth = char.gender === 'female' ? 38 : 42;
  const headHeight = char.age === 'child' ? 42 : 48;

  // Base head
  if (!isHidden) {
    head += `<ellipse cx="0" cy="-45" rx="${headWidth}" ry="${headHeight}" fill="url(#skin_${char.name})" filter="url(#shadow_${char.name})"/>`;

    // Ears
    head += `<ellipse cx="-${headWidth - 3}" cy="-45" rx="8" ry="12" fill="${char.skinTone}"/>`;
    head += `<ellipse cx="${headWidth - 3}" cy="-45" rx="8" ry="12" fill="${char.skinTone}"/>`;
  }

  // Hair (behind head for some styles)
  head += generateQuirkyHair(char, 'back');

  // Face features
  if (!isHidden) {
    head += generateQuirkyFace(char);
  }

  // Hair (in front)
  head += generateQuirkyHair(char, 'front');

  // Accessory
  head += generateQuirkyAccessory(char);

  return head;
}

function generateQuirkyHair(char, layer) {
  if (char.hair.style === 'hidden' || char.hair.style === 'bald') return '';

  const color = char.hair.color;
  const dark = darkenColor(color, 30);
  let hair = '';

  if (layer === 'back') {
    switch(char.hair.style) {
      case 'long_wavy':
      case 'wild_long':
      case 'flowing':
        hair = `<path d="M-45 -70 Q-55 0 -40 60" fill="${color}" stroke="${dark}" stroke-width="1"/>
                <path d="M45 -70 Q55 0 40 60" fill="${color}" stroke="${dark}" stroke-width="1"/>`;
        break;
      case 'wild_gray':
      case 'wild_black':
      case 'wild':
        hair = `<ellipse cx="-35" cy="-30" rx="20" ry="50" fill="${color}"/>
                <ellipse cx="35" cy="-30" rx="20" ry="50" fill="${color}"/>`;
        break;
    }
  } else {
    switch(char.hair.style) {
      case 'balding_crown':
      case 'balding':
      case 'bald_fringe':
        hair = `<ellipse cx="-30" cy="-75" rx="15" ry="12" fill="${color}"/>
                <ellipse cx="30" cy="-75" rx="15" ry="12" fill="${color}"/>`;
        break;
      case 'tall_updo':
        hair = `<ellipse cx="0" cy="-95" rx="25" ry="35" fill="${color}" stroke="${dark}" stroke-width="2"/>
                <ellipse cx="0" cy="-70" rx="35" ry="20" fill="${color}"/>`;
        break;
      case 'swoopy':
      case 'fancy':
        hair = `<path d="M-35 -85 Q0 -100 35 -85 Q40 -60 35 -50 L-35 -50 Q-40 -60 -35 -85" fill="${color}" stroke="${dark}" stroke-width="1"/>
                <path d="M25 -90 Q40 -95 35 -75" fill="${color}" stroke="${dark}" stroke-width="1"/>`;
        break;
      case 'long_wavy':
        hair = `<ellipse cx="0" cy="-80" rx="40" ry="25" fill="${color}"/>
                <path d="M-38 -65 Q-45 -20 -35 30" fill="${color}"/>
                <path d="M38 -65 Q45 -20 35 30" fill="${color}"/>`;
        break;
      case 'powdered_wig':
        hair = `<ellipse cx="0" cy="-80" rx="45" ry="30" fill="${color}"/>
                <circle cx="-30" cy="-85" r="15" fill="${color}"/>
                <circle cx="30" cy="-85" r="15" fill="${color}"/>
                <circle cx="0" cy="-95" r="12" fill="${color}"/>
                <ellipse cx="-40" cy="-40" rx="12" ry="25" fill="${color}"/>
                <ellipse cx="40" cy="-40" rx="12" ry="25" fill="${color}"/>`;
        break;
      case 'big_curls':
      case 'ringlets':
        hair = `<circle cx="-25" cy="-80" r="18" fill="${color}"/>
                <circle cx="25" cy="-80" r="18" fill="${color}"/>
                <circle cx="0" cy="-85" r="15" fill="${color}"/>
                <circle cx="-35" cy="-55" r="12" fill="${color}"/>
                <circle cx="35" cy="-55" r="12" fill="${color}"/>`;
        break;
      case 'slicked':
      case 'oily':
        hair = `<ellipse cx="0" cy="-78" rx="38" ry="22" fill="${color}"/>
                <path d="M-35 -70 Q0 -95 35 -70" fill="${dark}"/>`;
        break;
      case 'military':
      case 'short':
      case 'short_messy':
      case 'buzzcut':
      case 'practical':
      case 'simple':
        hair = `<ellipse cx="0" cy="-80" rx="35" ry="18" fill="${color}"/>`;
        break;
      case 'tonsure':
        hair = `<ellipse cx="0" cy="-90" rx="20" ry="10" fill="${char.skinTone}"/>
                <path d="M-35 -70 A35 35 0 0 1 35 -70" fill="${color}"/>`;
        break;
      case 'wild_long':
      case 'wild':
      case 'frizzy':
        hair = `<ellipse cx="0" cy="-75" rx="45" ry="30" fill="${color}"/>
                <circle cx="-30" cy="-90" r="12" fill="${dark}"/>
                <circle cx="30" cy="-85" r="14" fill="${dark}"/>
                <circle cx="0" cy="-95" r="10" fill="${dark}"/>`;
        break;
      case 'pageboy':
      case 'bowl_cut':
        hair = `<ellipse cx="0" cy="-78" rx="40" ry="25" fill="${color}"/>
                <rect x="-38" y="-65" width="76" height="15" fill="${color}"/>`;
        break;
      case 'ponytail':
        hair = `<ellipse cx="0" cy="-78" rx="38" ry="22" fill="${color}"/>
                <ellipse cx="25" cy="-50" rx="8" ry="25" fill="${color}" transform="rotate(20 25 -50)"/>`;
        break;
      case 'braids':
      case 'braided_crown':
        hair = `<ellipse cx="0" cy="-78" rx="38" ry="22" fill="${color}"/>
                <path d="M-35 -60 Q-40 0 -30 40" stroke="${color}" stroke-width="10" fill="none"/>
                <path d="M35 -60 Q40 0 30 40" stroke="${color}" stroke-width="10" fill="none"/>`;
        break;
      case 'bun':
      case 'messy_bun':
      case 'simple_bun':
        hair = `<ellipse cx="0" cy="-78" rx="38" ry="20" fill="${color}"/>
                <circle cx="0" cy="-95" r="15" fill="${color}"/>`;
        break;
      case 'kerchief':
      case 'under_cap':
        hair = `<path d="M-40 -70 Q0 -100 40 -70 L35 -50 Q0 -55 -35 -50 Z" fill="${char.outfit.secondary}"/>`;
        break;
      case 'pigtails':
        hair = `<ellipse cx="0" cy="-80" rx="35" ry="18" fill="${color}"/>
                <ellipse cx="-38" cy="-60" rx="10" ry="20" fill="${color}"/>
                <ellipse cx="38" cy="-60" rx="10" ry="20" fill="${color}"/>`;
        break;
      case 'widow_peak':
        hair = `<path d="M-38 -70 L0 -85 L38 -70 Q40 -90 0 -100 Q-40 -90 -38 -70" fill="${color}"/>`;
        break;
      case 'elaborate':
      case 'elegant':
        hair = `<ellipse cx="0" cy="-82" rx="40" ry="25" fill="${color}"/>
                <ellipse cx="0" cy="-100" rx="20" ry="15" fill="${color}"/>
                <circle cx="-20" cy="-98" r="8" fill="${dark}"/>
                <circle cx="20" cy="-98" r="8" fill="${dark}"/>`;
        break;
      case 'wavy':
        hair = `<ellipse cx="0" cy="-78" rx="40" ry="24" fill="${color}"/>
                <path d="M-35 -60 Q-40 -40 -30 -20" fill="${color}"/>
                <path d="M35 -60 Q40 -40 30 -20" fill="${color}"/>`;
        break;
      case 'gray':
      case 'thin_gray':
      case 'wispy':
        hair = `<ellipse cx="-20" cy="-85" rx="15" ry="10" fill="${color}"/>
                <ellipse cx="20" cy="-85" rx="15" ry="10" fill="${color}"/>`;
        break;
      case 'unkempt':
      case 'messy':
      case 'shaggy':
      case 'dusty':
      case 'wild_messy':
        hair = `<ellipse cx="0" cy="-78" rx="42" ry="26" fill="${color}"/>
                <circle cx="-25" cy="-95" r="10" fill="${dark}"/>
                <circle cx="20" cy="-92" r="8" fill="${dark}"/>
                <circle cx="35" cy="-80" r="7" fill="${dark}"/>`;
        break;
      case 'combover':
      case 'receding':
        hair = `<path d="M-35 -75 Q-20 -95 35 -80" fill="${color}" stroke="${dark}" stroke-width="2"/>
                <ellipse cx="-30" cy="-70" rx="12" ry="15" fill="${color}"/>`;
        break;
      case 'helmet_hair':
        hair = `<ellipse cx="0" cy="-82" rx="35" ry="15" fill="${color}"/>`;
        break;
      default:
        hair = `<ellipse cx="0" cy="-80" rx="38" ry="22" fill="${color}"/>`;
    }
  }

  return hair;
}

function generateQuirkyFace(char) {
  let face = '';
  const eyeY = char.age === 'child' ? -50 : -55;
  const isFemale = char.gender === 'female';
  const isChild = char.age === 'child';

  // QUIRKY NOSE - the signature element!
  face += generateQuirkyNose(char);

  // Eyes
  const eyeSize = isChild ? 12 : (isFemale ? 10 : 8);
  const eyeSpacing = isChild ? 12 : 15;

  // Eye whites
  face += `<ellipse cx="-${eyeSpacing}" cy="${eyeY}" rx="${eyeSize}" ry="${eyeSize - 2}" fill="white" stroke="#1C1917" stroke-width="1"/>`;
  face += `<ellipse cx="${eyeSpacing}" cy="${eyeY}" rx="${eyeSize}" ry="${eyeSize - 2}" fill="white" stroke="#1C1917" stroke-width="1"/>`;

  // Pupils - with expression
  let pupilOffset = { x: 0, y: 0 };
  let pupilSize = isChild ? 5 : 4;

  switch(char.expression) {
    case 'crazy':
    case 'manic':
      pupilOffset = { x: 2, y: -2 };
      face += `<circle cx="-${eyeSpacing + 2}" cy="${eyeY - 1}" r="${pupilSize}" fill="#1C1917"/>`;
      face += `<circle cx="${eyeSpacing - 2}" cy="${eyeY + 1}" r="${pupilSize}" fill="#1C1917"/>`;
      break;
    case 'scheming':
    case 'sinister':
    case 'calculating':
    case 'cunning':
      face += `<ellipse cx="-${eyeSpacing}" cy="${eyeY}" rx="${pupilSize}" ry="${pupilSize - 1}" fill="#1C1917"/>`;
      face += `<ellipse cx="${eyeSpacing}" cy="${eyeY}" rx="${pupilSize}" ry="${pupilSize - 1}" fill="#1C1917"/>`;
      break;
    case 'bored':
    case 'weary':
      face += `<ellipse cx="-${eyeSpacing}" cy="${eyeY + 2}" rx="${pupilSize}" ry="${pupilSize - 1}" fill="#1C1917"/>`;
      face += `<ellipse cx="${eyeSpacing}" cy="${eyeY + 2}" rx="${pupilSize}" ry="${pupilSize - 1}" fill="#1C1917"/>`;
      break;
    default:
      face += `<circle cx="-${eyeSpacing}" cy="${eyeY}" r="${pupilSize}" fill="#1C1917"/>`;
      face += `<circle cx="${eyeSpacing}" cy="${eyeY}" r="${pupilSize}" fill="#1C1917"/>`;
  }

  // Eye shine
  face += `<circle cx="-${eyeSpacing + 2}" cy="${eyeY - 2}" r="2" fill="white"/>`;
  face += `<circle cx="${eyeSpacing + 2}" cy="${eyeY - 2}" r="2" fill="white"/>`;

  // Eyebrows based on expression
  face += generateEyebrows(char, eyeY, eyeSpacing);

  // Eyelashes for females
  if (isFemale && !isChild) {
    face += `<path d="M-${eyeSpacing + eyeSize} ${eyeY - 3} Q-${eyeSpacing} ${eyeY - eyeSize - 5} -${eyeSpacing - eyeSize} ${eyeY - 3}" fill="none" stroke="#1C1917" stroke-width="2"/>`;
    face += `<path d="M${eyeSpacing - eyeSize} ${eyeY - 3} Q${eyeSpacing} ${eyeY - eyeSize - 5} ${eyeSpacing + eyeSize} ${eyeY - 3}" fill="none" stroke="#1C1917" stroke-width="2"/>`;
  }

  // Mouth based on expression
  face += generateQuirkyMouth(char);

  // Cheeks
  if (char.features?.includes('rosy_cheeks') || isFemale || isChild) {
    face += `<ellipse cx="-25" cy="-30" rx="10" ry="6" fill="#F87171" opacity="0.3"/>`;
    face += `<ellipse cx="25" cy="-30" rx="10" ry="6" fill="#F87171" opacity="0.3"/>`;
  }

  // Special features
  face += generateSpecialFeatures(char);

  return face;
}

function generateQuirkyNose(char) {
  const noseY = -38;
  let nose = '';

  switch(char.nose) {
    case 'bulbous':
    case 'potato':
      const bulbSize = char.noseSize === 'huge' ? 18 : (char.noseSize === 'large' ? 14 : 10);
      nose = `<ellipse cx="0" cy="${noseY}" rx="${bulbSize}" ry="${bulbSize + 4}" fill="${darkenColor(char.skinTone, 10)}"/>
              <ellipse cx="0" cy="${noseY + 3}" rx="${bulbSize - 2}" ry="${bulbSize}" fill="${char.skinTone}"/>
              <ellipse cx="-${bulbSize/3}" cy="${noseY + bulbSize/2}" rx="3" ry="2" fill="${darkenColor(char.skinTone, 20)}"/>
              <ellipse cx="${bulbSize/3}" cy="${noseY + bulbSize/2}" rx="3" ry="2" fill="${darkenColor(char.skinTone, 20)}"/>`;
      break;

    case 'bulbous_red':
    case 'bulbous_purple':
    case 'round_red':
      const redColor = char.nose === 'bulbous_purple' ? '#9333EA' : '#EF4444';
      const redSize = char.noseSize === 'huge' ? 16 : 12;
      nose = `<ellipse cx="0" cy="${noseY}" rx="${redSize}" ry="${redSize + 2}" fill="${redColor}" opacity="0.7"/>
              <ellipse cx="0" cy="${noseY}" rx="${redSize - 2}" ry="${redSize}" fill="${darkenColor(char.skinTone, 5)}"/>
              <ellipse cx="0" cy="${noseY + 2}" rx="${redSize - 4}" ry="${redSize - 2}" fill="${redColor}" opacity="0.5"/>`;
      break;

    case 'hook':
    case 'hooked':
    case 'hawk':
      const hookSize = char.noseSize === 'huge' ? 20 : 15;
      nose = `<path d="M0 ${noseY - hookSize} Q${hookSize/2} ${noseY - hookSize/2} ${hookSize/3} ${noseY} Q${hookSize/4} ${noseY + 8} 0 ${noseY + 10} Q-${hookSize/4} ${noseY + 8} -${hookSize/3} ${noseY} Q-${hookSize/2} ${noseY - hookSize/2} 0 ${noseY - hookSize}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1"/>`;
      break;

    case 'pointy':
    case 'pointed_up':
    case 'small_pointy':
      const pointSize = char.noseSize === 'small' ? 8 : 12;
      nose = `<path d="M0 ${noseY - pointSize} L${pointSize/2} ${noseY + 5} L0 ${noseY + 8} L-${pointSize/2} ${noseY + 5} Z" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 15)}" stroke-width="1"/>`;
      break;

    case 'upturned':
      nose = `<ellipse cx="0" cy="${noseY + 5}" rx="8" ry="6" fill="${char.skinTone}"/>
              <path d="M-4 ${noseY + 8} Q0 ${noseY + 2} 4 ${noseY + 8}" fill="${darkenColor(char.skinTone, 15)}"/>`;
      break;

    case 'button':
    case 'tiny_button':
      const btnSize = char.nose === 'tiny_button' ? 5 : 8;
      nose = `<circle cx="0" cy="${noseY + 5}" r="${btnSize}" fill="${darkenColor(char.skinTone, 10)}"/>
              <circle cx="1" cy="${noseY + 4}" r="${btnSize - 2}" fill="${char.skinTone}"/>`;
      break;

    case 'long_thin':
    case 'thin_long':
      nose = `<path d="M0 ${noseY - 15} Q3 ${noseY} 2 ${noseY + 12} L-2 ${noseY + 12} Q-3 ${noseY} 0 ${noseY - 15}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 15)}" stroke-width="1"/>`;
      break;

    case 'long_droopy':
      nose = `<path d="M0 ${noseY - 12} Q8 ${noseY} 5 ${noseY + 15} Q0 ${noseY + 20} -5 ${noseY + 15} Q-8 ${noseY} 0 ${noseY - 12}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 15)}" stroke-width="1"/>`;
      break;

    case 'crooked':
    case 'broken':
      nose = `<path d="M-2 ${noseY - 12} Q5 ${noseY - 5} 3 ${noseY + 5} Q-2 ${noseY + 10} 0 ${noseY + 12} Q2 ${noseY + 10} -3 ${noseY + 5} Q-5 ${noseY - 5} -2 ${noseY - 12}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1"/>`;
      break;

    case 'roman':
      nose = `<path d="M0 ${noseY - 15} Q10 ${noseY - 5} 6 ${noseY + 8} L0 ${noseY + 12} L-6 ${noseY + 8} Q-10 ${noseY - 5} 0 ${noseY - 15}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 15)}" stroke-width="1"/>`;
      break;

    case 'vampire':
      nose = `<path d="M0 ${noseY - 10} L6 ${noseY + 10} L0 ${noseY + 5} L-6 ${noseY + 10} Z" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 15)}" stroke-width="1"/>`;
      break;

    case 'pig':
      nose = `<ellipse cx="0" cy="${noseY + 5}" rx="14" ry="10" fill="${darkenColor(char.skinTone, 10)}"/>
              <circle cx="-5" cy="${noseY + 7}" r="4" fill="${darkenColor(char.skinTone, 25)}"/>
              <circle cx="5" cy="${noseY + 7}" r="4" fill="${darkenColor(char.skinTone, 25)}"/>`;
      break;

    case 'red_ball':
      nose = `<circle cx="0" cy="${noseY + 5}" r="14" fill="#EF4444"/>
              <circle cx="-3" cy="${noseY + 2}" r="4" fill="#FCA5A5"/>`;
      break;

    case 'elegant':
    case 'delicate':
    case 'small':
    case 'small_round':
      nose = `<ellipse cx="0" cy="${noseY + 5}" rx="6" ry="8" fill="${darkenColor(char.skinTone, 8)}"/>`;
      break;

    case 'round':
      nose = `<ellipse cx="0" cy="${noseY + 3}" rx="10" ry="12" fill="${darkenColor(char.skinTone, 10)}"/>
              <ellipse cx="0" cy="${noseY + 5}" rx="8" ry="9" fill="${char.skinTone}"/>`;
      break;

    case 'crooked_long':
      nose = `<path d="M-2 ${noseY - 18} Q8 ${noseY - 8} 4 ${noseY + 5} Q0 ${noseY + 15} -4 ${noseY + 5} Q-8 ${noseY - 8} -2 ${noseY - 18}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1"/>`;
      break;

    case 'long':
      nose = `<path d="M0 ${noseY - 12} Q6 ${noseY} 4 ${noseY + 12} L0 ${noseY + 15} L-4 ${noseY + 12} Q-6 ${noseY} 0 ${noseY - 12}" fill="${char.skinTone}" stroke="${darkenColor(char.skinTone, 12)}" stroke-width="1"/>`;
      break;

    case 'hidden':
    default:
      // No nose or minimal
      break;
  }

  return nose;
}

function generateEyebrows(char, eyeY, eyeSpacing) {
  let brows = '';
  const browY = eyeY - 12;
  const browColor = char.hair.color === 'hidden' ? '#78350F' : darkenColor(char.hair.color, 20);

  switch(char.expression) {
    case 'stern':
    case 'fierce':
    case 'intimidating':
    case 'grumpy':
    case 'hardened':
      brows = `<line x1="-${eyeSpacing + 10}" y1="${browY + 5}" x2="-${eyeSpacing - 8}" y2="${browY - 3}" stroke="${browColor}" stroke-width="4" stroke-linecap="round"/>
               <line x1="${eyeSpacing - 8}" y1="${browY - 3}" x2="${eyeSpacing + 10}" y2="${browY + 5}" stroke="${browColor}" stroke-width="4" stroke-linecap="round"/>`;
      break;
    case 'pompous':
    case 'haughty':
    case 'condescending':
    case 'arrogant':
    case 'snooty':
      brows = `<path d="M-${eyeSpacing + 8} ${browY + 2} Q-${eyeSpacing} ${browY - 8} -${eyeSpacing - 8} ${browY}" fill="none" stroke="${browColor}" stroke-width="3"/>
               <path d="M${eyeSpacing - 8} ${browY} Q${eyeSpacing} ${browY - 8} ${eyeSpacing + 8} ${browY + 2}" fill="none" stroke="${browColor}" stroke-width="3"/>`;
      break;
    case 'surprised':
    case 'eager':
    case 'manic':
      brows = `<path d="M-${eyeSpacing + 8} ${browY + 3} Q-${eyeSpacing} ${browY - 10} -${eyeSpacing - 8} ${browY + 3}" fill="none" stroke="${browColor}" stroke-width="3"/>
               <path d="M${eyeSpacing - 8} ${browY + 3} Q${eyeSpacing} ${browY - 10} ${eyeSpacing + 8} ${browY + 3}" fill="none" stroke="${browColor}" stroke-width="3"/>`;
      break;
    case 'worried':
    case 'nervous':
    case 'pitiful':
      brows = `<line x1="-${eyeSpacing + 8}" y1="${browY - 3}" x2="-${eyeSpacing - 8}" y2="${browY + 3}" stroke="${browColor}" stroke-width="3" stroke-linecap="round"/>
               <line x1="${eyeSpacing - 8}" y1="${browY + 3}" x2="${eyeSpacing + 8}" y2="${browY - 3}" stroke="${browColor}" stroke-width="3" stroke-linecap="round"/>`;
      break;
    default:
      brows = `<line x1="-${eyeSpacing + 8}" y1="${browY}" x2="-${eyeSpacing - 8}" y2="${browY}" stroke="${browColor}" stroke-width="3" stroke-linecap="round"/>
               <line x1="${eyeSpacing - 8}" y1="${browY}" x2="${eyeSpacing + 8}" y2="${browY}" stroke="${browColor}" stroke-width="3" stroke-linecap="round"/>`;
  }

  // Bushy brows
  if (char.features?.includes('bushy_brows')) {
    brows += `<ellipse cx="-${eyeSpacing}" cy="${browY}" rx="12" ry="5" fill="${browColor}"/>
              <ellipse cx="${eyeSpacing}" cy="${browY}" rx="12" ry="5" fill="${browColor}"/>`;
  }

  return brows;
}

function generateQuirkyMouth(char) {
  const mouthY = -18;
  let mouth = '';

  switch(char.expression) {
    case 'jolly':
    case 'merry':
    case 'cheerful':
    case 'hearty_laugh':
      mouth = `<ellipse cx="0" cy="${mouthY + 5}" rx="15" ry="12" fill="#7F1D1D"/>
               <ellipse cx="0" cy="${mouthY + 10}" rx="10" ry="6" fill="#EC4899"/>
               <path d="M-12 ${mouthY} Q0 ${mouthY - 5} 12 ${mouthY}" fill="white"/>`;
      break;
    case 'crazy':
    case 'big_grin':
      mouth = `<path d="M-20 ${mouthY} Q0 ${mouthY + 25} 20 ${mouthY}" fill="#7F1D1D" stroke="#1C1917" stroke-width="1"/>
               <path d="M-15 ${mouthY + 2} L15 ${mouthY + 2}" fill="white"/>`;
      break;
    case 'smug':
    case 'scheming':
    case 'sinister':
    case 'cunning':
    case 'knowing_smile':
      mouth = `<path d="M-12 ${mouthY + 3} Q0 ${mouthY + 10} 15 ${mouthY - 2}" fill="none" stroke="#7F1D1D" stroke-width="3"/>`;
      break;
    case 'stern':
    case 'grumpy':
    case 'disapproving':
    case 'stoic':
      mouth = `<path d="M-12 ${mouthY + 5} L12 ${mouthY + 5}" stroke="#7F1D1D" stroke-width="3"/>`;
      break;
    case 'pompous':
    case 'dignified':
    case 'pious':
      mouth = `<path d="M-8 ${mouthY + 5} Q0 ${mouthY + 2} 8 ${mouthY + 5}" fill="none" stroke="#7F1D1D" stroke-width="2"/>`;
      break;
    case 'dreamy':
    case 'gentle':
    case 'serene':
    case 'peaceful':
    case 'content':
      mouth = `<path d="M-10 ${mouthY + 3} Q0 ${mouthY + 10} 10 ${mouthY + 3}" fill="none" stroke="#B91C1C" stroke-width="2"/>`;
      break;
    case 'pitiful':
    case 'sad':
      mouth = `<path d="M-10 ${mouthY + 10} Q0 ${mouthY + 2} 10 ${mouthY + 10}" fill="none" stroke="#7F1D1D" stroke-width="2"/>`;
      break;
    case 'mysterious':
      mouth = `<path d="M-6 ${mouthY + 5} Q0 ${mouthY + 8} 6 ${mouthY + 5}" fill="none" stroke="#7F1D1D" stroke-width="2"/>`;
      break;
    default:
      mouth = `<path d="M-10 ${mouthY + 3} Q0 ${mouthY + 8} 10 ${mouthY + 3}" fill="none" stroke="#7F1D1D" stroke-width="2"/>`;
  }

  // Gap teeth
  if (char.features?.includes('gap_teeth')) {
    mouth += `<rect x="-2" y="${mouthY}" width="4" height="8" fill="white"/>`;
  }

  // Missing teeth
  if (char.features?.includes('missing_tooth') || char.features?.includes('missing_teeth')) {
    mouth += `<rect x="3" y="${mouthY + 2}" width="5" height="6" fill="#1C1917"/>`;
  }

  return mouth;
}

function generateSpecialFeatures(char) {
  let features = '';

  // Facial hair
  if (char.features?.includes('beard') || char.features?.includes('huge_beard')) {
    const beardColor = char.hair.color === 'hidden' ? '#78350F' : char.hair.color;
    features += `<ellipse cx="0" cy="-10" rx="30" ry="25" fill="${beardColor}"/>
                 <ellipse cx="0" cy="-5" rx="25" ry="22" fill="${darkenColor(beardColor, 15)}"/>`;
  }

  if (char.features?.includes('long_beard')) {
    const beardColor = char.hair.color === 'hidden' ? '#E5E7EB' : char.hair.color;
    features += `<ellipse cx="0" cy="0" rx="28" ry="40" fill="${beardColor}"/>
                 <ellipse cx="0" cy="10" rx="20" ry="35" fill="${darkenColor(beardColor, 10)}"/>`;
  }

  if (char.features?.includes('goatee') || char.features?.includes('pointed_beard') || char.features?.includes('pointy_beard')) {
    const beardColor = char.hair.color;
    features += `<path d="M-8 -15 Q0 10 8 -15 Q5 -10 0 15 Q-5 -10 -8 -15" fill="${beardColor}"/>`;
  }

  if (char.features?.includes('thin_beard')) {
    const beardColor = char.hair.color;
    features += `<path d="M-15 -20 Q-20 0 -10 15 Q0 20 10 15 Q20 0 15 -20" fill="none" stroke="${beardColor}" stroke-width="3"/>`;
  }

  if (char.features?.includes('mustache') || char.features?.includes('handlebar_mustache')) {
    const mustacheColor = char.hair.color === 'hidden' ? '#78350F' : char.hair.color;
    if (char.features?.includes('handlebar_mustache')) {
      features += `<path d="M-25 -28 Q-15 -22 0 -25 Q15 -22 25 -28" fill="none" stroke="${mustacheColor}" stroke-width="4"/>
                   <path d="M-25 -28 Q-30 -32 -28 -35" fill="none" stroke="${mustacheColor}" stroke-width="3"/>
                   <path d="M25 -28 Q30 -32 28 -35" fill="none" stroke="${mustacheColor}" stroke-width="3"/>`;
    } else {
      features += `<path d="M-20 -28 Q0 -22 20 -28" fill="${mustacheColor}"/>`;
    }
  }

  if (char.features?.includes('thin_mustache')) {
    const mustacheColor = char.hair.color;
    features += `<path d="M-15 -26 Q0 -23 15 -26" fill="none" stroke="${mustacheColor}" stroke-width="2"/>`;
  }

  if (char.features?.includes('stubble') || char.features?.includes('five_oclock_shadow')) {
    features += `<ellipse cx="0" cy="-15" rx="28" ry="20" fill="${char.hair.color}" opacity="0.15"/>`;
  }

  // Wrinkles
  if (char.features?.includes('wrinkles') || char.features?.includes('deep_wrinkles') || char.age === 'old') {
    features += `<path d="M-30 -60 Q-25 -58 -22 -60" fill="none" stroke="${darkenColor(char.skinTone, 25)}" stroke-width="1" opacity="0.5"/>
                 <path d="M22 -60 Q25 -58 30 -60" fill="none" stroke="${darkenColor(char.skinTone, 25)}" stroke-width="1" opacity="0.5"/>
                 <path d="M-28 -25 Q-24 -23 -20 -25" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.4"/>
                 <path d="M20 -25 Q24 -23 28 -25" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.4"/>`;
  }

  // Scars
  if (char.features?.includes('scar') || char.features?.includes('battle_scars') || char.features?.includes('many_scars')) {
    features += `<path d="M-28 -50 L-20 -35" stroke="${lightenColor(char.skinTone, 20)}" stroke-width="2" opacity="0.7"/>`;
  }

  // Glasses/Spectacles
  if (char.features?.includes('glasses') || char.features?.includes('spectacles')) {
    features += `<circle cx="-15" cy="-55" r="12" fill="none" stroke="#374151" stroke-width="2"/>
                 <circle cx="15" cy="-55" r="12" fill="none" stroke="#374151" stroke-width="2"/>
                 <line x1="-3" y1="-55" x2="3" y2="-55" stroke="#374151" stroke-width="2"/>
                 <line x1="-27" y1="-55" x2="-35" y2="-60" stroke="#374151" stroke-width="2"/>
                 <line x1="27" y1="-55" x2="35" y2="-60" stroke="#374151" stroke-width="2"/>`;
  }

  // Freckles
  if (char.features?.includes('freckles')) {
    features += `<circle cx="-20" cy="-35" r="2" fill="#92400E" opacity="0.4"/>
                 <circle cx="-15" cy="-30" r="1.5" fill="#92400E" opacity="0.4"/>
                 <circle cx="-25" cy="-32" r="1.5" fill="#92400E" opacity="0.4"/>
                 <circle cx="20" cy="-35" r="2" fill="#92400E" opacity="0.4"/>
                 <circle cx="15" cy="-30" r="1.5" fill="#92400E" opacity="0.4"/>
                 <circle cx="25" cy="-32" r="1.5" fill="#92400E" opacity="0.4"/>`;
  }

  // Beauty mark
  if (char.features?.includes('beauty_mark')) {
    features += `<circle cx="18" cy="-28" r="2.5" fill="#1C1917"/>`;
  }

  // Warts
  if (char.features?.includes('warts')) {
    features += `<circle cx="-25" cy="-40" r="3" fill="${darkenColor(char.skinTone, 15)}"/>
                 <circle cx="30" cy="-50" r="2" fill="${darkenColor(char.skinTone, 15)}"/>`;
  }

  // Double chin
  if (char.features?.includes('double_chin') || char.features?.includes('jowls')) {
    features += `<ellipse cx="0" cy="5" rx="30" ry="15" fill="${darkenColor(char.skinTone, 5)}"/>`;
  }

  return features;
}

function generateQuirkyBody(char) {
  const outfit = char.outfit;
  const primary = outfit.primary;
  const secondary = outfit.secondary;
  const accent = outfit.accent;

  let body = '';

  // Base body shape
  const bodyWidth = char.features?.includes('muscular') || char.features?.includes('thick_arms') ? 55 :
                    char.features?.includes('big_belly') || char.features?.includes('plump') ? 58 : 48;
  const bodyHeight = char.features?.includes('big_belly') ? 62 : 55;

  body += `<ellipse cx="0" cy="35" rx="${bodyWidth}" ry="${bodyHeight}" fill="${primary}" filter="url(#shadow_${char.name})"/>`;
  body += `<ellipse cx="0" cy="40" rx="${bodyWidth - 5}" ry="${bodyHeight - 8}" fill="${darkenColor(primary, 20)}"/>`;

  // Outfit details based on type
  switch(outfit.type) {
    case 'royal':
    case 'royal_gown':
      body += `<path d="M-30 0 L-${bodyWidth} 60 L${bodyWidth} 60 L30 0" fill="${secondary}" opacity="0.4"/>`;
      body += `<rect x="-8" y="-5" width="16" height="50" fill="${secondary}"/>`;
      body += `<circle cx="0" cy="5" r="6" fill="${accent}"/>`;
      body += `<circle cx="0" cy="20" r="5" fill="${accent}"/>`;
      body += `<circle cx="0" cy="33" r="4" fill="${accent}"/>`;
      break;
    case 'princess_gown':
    case 'noble_gown':
      body += `<path d="M-25 -5 Q0 5 25 -5 L35 25 Q0 35 -35 25 Z" fill="${secondary}"/>`;
      body += `<ellipse cx="0" cy="0" rx="22" ry="10" fill="${secondary}" opacity="0.6"/>`;
      break;
    case 'full_armor':
      body += `<rect x="-25" y="0" width="50" height="40" fill="${secondary}" rx="3"/>`;
      body += `<line x1="-20" y1="12" x2="20" y2="12" stroke="${darkenColor(secondary, 30)}" stroke-width="2"/>`;
      body += `<line x1="-20" y1="24" x2="20" y2="24" stroke="${darkenColor(secondary, 30)}" stroke-width="2"/>`;
      body += `<line x1="-20" y1="36" x2="20" y2="36" stroke="${darkenColor(secondary, 30)}" stroke-width="2"/>`;
      break;
    case 'jester':
      body += `<path d="M-20 0 L0 60" stroke="${secondary}" stroke-width="25"/>`;
      body += `<path d="M20 0 L0 60" stroke="${primary}" stroke-width="25"/>`;
      body += `<circle cx="-5" cy="10" r="5" fill="${accent}"/>`;
      body += `<circle cx="5" cy="25" r="5" fill="${accent}"/>`;
      body += `<circle cx="-5" cy="40" r="5" fill="${accent}"/>`;
      break;
    case 'chef':
    case 'baker':
    case 'butcher':
      body += `<path d="M-22 5 L-22 55 L22 55 L22 5 Q0 -5 -22 5" fill="${secondary}"/>`;
      if (outfit.type === 'butcher') {
        body += `<ellipse cx="5" cy="30" rx="8" ry="12" fill="#EF4444" opacity="0.5"/>`;
      }
      break;
    default:
      body += `<path d="M-20 -5 Q0 5 20 -5 L25 25 Q0 35 -25 25 Z" fill="${secondary}"/>`;
  }

  // Arms
  const armY = 25;
  body += `<ellipse cx="-${bodyWidth - 5}" cy="${armY}" rx="14" ry="22" fill="${primary}" transform="rotate(-10 -${bodyWidth - 5} ${armY})"/>`;
  body += `<ellipse cx="${bodyWidth - 5}" cy="${armY}" rx="14" ry="22" fill="${primary}" transform="rotate(10 ${bodyWidth - 5} ${armY})"/>`;

  // Hands
  body += `<circle cx="-${bodyWidth}" cy="${armY + 25}" r="10" fill="${char.skinTone}"/>`;
  body += `<circle cx="${bodyWidth}" cy="${armY + 25}" r="10" fill="${char.skinTone}"/>`;

  return body;
}

function generateQuirkyAccessory(char) {
  let acc = '';

  switch(char.accessory) {
    case 'crown':
      acc = `<g transform="translate(0, -95)">
        <path d="M-30 15 L-30 -5 L-20 5 L-10 -10 L0 0 L10 -10 L20 5 L30 -5 L30 15 Z" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
        <circle cx="-15" cy="0" r="4" fill="#EF4444"/>
        <circle cx="0" cy="-5" r="5" fill="#3B82F6"/>
        <circle cx="15" cy="0" r="4" fill="#22C55E"/>
        <rect x="-30" y="12" width="60" height="8" fill="#FCD34D" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'tiara':
      acc = `<g transform="translate(0, -92)">
        <path d="M-28 8 Q-15 -5 0 -12 Q15 -5 28 8" fill="none" stroke="#FCD34D" stroke-width="4"/>
        <circle cx="0" cy="-12" r="6" fill="#FCD34D"/>
        <circle cx="0" cy="-12" r="4" fill="#EC4899"/>
        <circle cx="-12" cy="-5" r="3" fill="#FCD34D"/>
        <circle cx="12" cy="-5" r="3" fill="#FCD34D"/>
      </g>`;
      break;

    case 'small_crown':
      acc = `<g transform="translate(0, -90)">
        <path d="M-18 8 L-18 0 L-10 5 L0 -5 L10 5 L18 0 L18 8 Z" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
        <circle cx="0" cy="-2" r="3" fill="#3B82F6"/>
      </g>`;
      break;

    case 'wizard_hat':
      acc = `<g transform="translate(0, -90)">
        <path d="M-40 20 L0 -60 L40 20 Z" fill="#1E3A8A" stroke="#FCD34D" stroke-width="2"/>
        <ellipse cx="0" cy="20" rx="45" ry="12" fill="#1E3A8A" stroke="#FCD34D" stroke-width="2"/>
        <circle cx="10" cy="-25" r="5" fill="#FCD34D"/>
        <circle cx="-8" cy="-10" r="4" fill="#FCD34D"/>
        <circle cx="15" cy="5" r="3" fill="#FCD34D"/>
      </g>`;
      break;

    case 'jester_hat':
      acc = `<g transform="translate(0, -85)">
        <path d="M-25 15 Q-45 -20 -25 -40" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M0 15 Q0 -30 5 -50" fill="#FACC15" stroke="#B45309" stroke-width="2"/>
        <path d="M25 15 Q45 -20 25 -40" fill="#22C55E" stroke="#166534" stroke-width="2"/>
        <circle cx="-25" cy="-40" r="8" fill="#FCD34D"/>
        <circle cx="5" cy="-50" r="8" fill="#FCD34D"/>
        <circle cx="25" cy="-40" r="8" fill="#FCD34D"/>
      </g>`;
      break;

    case 'knight_helmet':
    case 'plumed_helmet':
      acc = `<g transform="translate(0, -55)">
        <ellipse cx="0" cy="-25" rx="45" ry="40" fill="#9CA3AF"/>
        <rect x="-20" y="-20" width="40" height="22" fill="#1C1917"/>
        <line x1="-18" y1="-10" x2="18" y2="-10" stroke="#9CA3AF" stroke-width="2"/>
        <path d="M0 -65 L0 -50" stroke="#6B7280" stroke-width="4"/>
        <ellipse cx="0" cy="-68" rx="10" ry="6" fill="#EF4444"/>
      </g>`;
      break;

    case 'guard_helmet':
    case 'simple_helmet':
      acc = `<g transform="translate(0, -70)">
        <ellipse cx="0" cy="0" rx="42" ry="32" fill="#6B7280"/>
        <rect x="-3" y="-5" width="6" height="30" fill="#6B7280"/>
      </g>`;
      break;

    case 'chef_hat':
      acc = `<g transform="translate(0, -95)">
        <ellipse cx="0" cy="25" rx="35" ry="10" fill="white" stroke="#E5E7EB" stroke-width="2"/>
        <ellipse cx="0" cy="5" rx="30" ry="28" fill="white" stroke="#E5E7EB" stroke-width="2"/>
      </g>`;
      break;

    case 'straw_hat':
      acc = `<g transform="translate(0, -90)">
        <ellipse cx="0" cy="15" rx="50" ry="14" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
        <ellipse cx="0" cy="5" rx="32" ry="20" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
      </g>`;
      break;

    case 'mitre':
    case 'bishop_hat':
      acc = `<g transform="translate(0, -95)">
        <path d="M-28 20 L-28 -5 L0 -40 L28 -5 L28 20 Z" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
        <line x1="0" y1="-35" x2="0" y2="15" stroke="#B45309" stroke-width="3"/>
        <line x1="-22" y1="-5" x2="22" y2="-5" stroke="#B45309" stroke-width="3"/>
      </g>`;
      break;

    case 'wimple':
      acc = `<g transform="translate(0, -60)">
        <ellipse cx="0" cy="-15" rx="45" ry="38" fill="white"/>
        <path d="M-42 15 Q-48 45 -38 70" fill="white"/>
        <path d="M42 15 Q48 45 38 70" fill="white"/>
        <ellipse cx="0" cy="-40" rx="40" ry="18" fill="#1C1917"/>
      </g>`;
      break;

    case 'hood_up':
      acc = `<g transform="translate(0, -65)">
        <path d="M-40 40 Q-50 0 0 -35 Q50 0 40 40" fill="${char.outfit.primary}" stroke="${darkenColor(char.outfit.primary, 30)}" stroke-width="2"/>
      </g>`;
      break;

    case 'hood_mask':
      acc = `<g transform="translate(0, -55)">
        <ellipse cx="0" cy="-15" rx="45" ry="42" fill="#1C1917"/>
        <ellipse cx="-15" cy="-20" rx="10" ry="8" fill="#374151"/>
        <ellipse cx="15" cy="-20" rx="10" ry="8" fill="#374151"/>
      </g>`;
      break;

    case 'monocle':
      acc = `<g transform="translate(18, -55)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#B45309" stroke-width="2"/>
        <circle cx="0" cy="0" r="10" fill="white" opacity="0.2"/>
        <path d="M10 5 Q22 18 18 40" stroke="#B45309" stroke-width="1.5" fill="none"/>
      </g>`;
      break;

    case 'horned_helm':
      acc = `<g transform="translate(0, -70)">
        <ellipse cx="0" cy="0" rx="45" ry="32" fill="#6B7280"/>
        <path d="M-38 -10 Q-55 -50 -35 -60" fill="#78350F" stroke="#451A03" stroke-width="2"/>
        <path d="M38 -10 Q55 -50 35 -60" fill="#78350F" stroke="#451A03" stroke-width="2"/>
      </g>`;
      break;

    case 'bee_veil':
      acc = `<g transform="translate(0, -70)">
        <ellipse cx="0" cy="0" rx="48" ry="40" fill="#FCD34D" opacity="0.3" stroke="#B45309" stroke-width="2"/>
        <ellipse cx="0" cy="-20" rx="38" ry="18" fill="#FCD34D"/>
      </g>`;
      break;

    case 'maid_cap':
      acc = `<g transform="translate(0, -88)">
        <ellipse cx="0" cy="8" rx="32" ry="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <path d="M-22 5 Q0 -12 22 5" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <path d="M-18 10 Q-28 18 -22 28" fill="white"/>
        <path d="M18 10 Q28 18 22 28" fill="white"/>
      </g>`;
      break;

    case 'feather_hat':
    case 'feathered_cap':
      acc = `<g transform="translate(0, -88)">
        <ellipse cx="0" cy="10" rx="40" ry="12" fill="${char.outfit.primary}"/>
        <ellipse cx="0" cy="0" rx="32" ry="18" fill="${char.outfit.primary}"/>
        <path d="M22 -5 Q45 -35 30 -50" fill="#EF4444" stroke="#B91C1C" stroke-width="1"/>
        <path d="M25 -8 Q52 -40 38 -55" fill="#22C55E" stroke="#166534" stroke-width="1"/>
      </g>`;
      break;

    case 'captain_hat':
      acc = `<g transform="translate(0, -88)">
        <ellipse cx="0" cy="12" rx="38" ry="10" fill="${char.outfit.primary}"/>
        <ellipse cx="0" cy="2" rx="32" ry="15" fill="${char.outfit.primary}"/>
        <rect x="-32" y="8" width="64" height="5" fill="#FCD34D"/>
      </g>`;
      break;

    case 'jeweled_headpiece':
      acc = `<g transform="translate(0, -88)">
        <path d="M-32 10 Q0 -5 32 10" fill="none" stroke="#FCD34D" stroke-width="4"/>
        <circle cx="0" cy="0" r="6" fill="#A855F7"/>
        <circle cx="-18" cy="5" r="4" fill="#3B82F6"/>
        <circle cx="18" cy="5" r="4" fill="#22C55E"/>
      </g>`;
      break;

    case 'eyepatch':
      acc = `<g transform="translate(0, -55)">
        <ellipse cx="-15" cy="0" rx="12" ry="10" fill="#1C1917"/>
        <path d="M-27 0 Q-42 -18 -38 -35" stroke="#1C1917" stroke-width="2" fill="none"/>
        <path d="M-3 0 Q18 -22 38 -28" stroke="#1C1917" stroke-width="2" fill="none"/>
      </g>`;
      break;

    case 'goggles':
      acc = `<g transform="translate(0, -55)">
        <ellipse cx="-15" cy="0" rx="15" ry="12" fill="none" stroke="#78350F" stroke-width="3"/>
        <ellipse cx="15" cy="0" rx="15" ry="12" fill="none" stroke="#78350F" stroke-width="3"/>
        <ellipse cx="-15" cy="0" rx="11" ry="8" fill="#A855F7" opacity="0.4"/>
        <ellipse cx="15" cy="0" rx="11" ry="8" fill="#A855F7" opacity="0.4"/>
        <rect x="-2" y="-4" width="4" height="8" fill="#78350F"/>
      </g>`;
      break;

    case 'cross':
      acc = `<g transform="translate(0, 15)">
        <rect x="-3" y="-15" width="6" height="25" fill="#FCD34D"/>
        <rect x="-10" y="-8" width="20" height="6" fill="#FCD34D"/>
      </g>`;
      break;

    case 'pearls':
      acc = `<g transform="translate(0, 5)">
        <path d="M-25 0 Q0 15 25 0" fill="none" stroke="#E5E7EB" stroke-width="3"/>
        <circle cx="-20" cy="4" r="4" fill="white"/>
        <circle cx="-10" cy="10" r="4" fill="white"/>
        <circle cx="0" cy="12" r="5" fill="white"/>
        <circle cx="10" cy="10" r="4" fill="white"/>
        <circle cx="20" cy="4" r="4" fill="white"/>
      </g>`;
      break;

    case 'crystal_ball':
      acc = `<g transform="translate(35, 40)">
        <circle cx="0" cy="0" r="18" fill="#A855F7" opacity="0.6"/>
        <circle cx="0" cy="0" r="15" fill="#C4B5FD" opacity="0.4"/>
        <circle cx="-5" cy="-5" r="5" fill="white" opacity="0.6"/>
      </g>`;
      break;

    case 'lute':
      acc = `<g transform="translate(-42, 35)">
        <ellipse cx="0" cy="0" rx="14" ry="18" fill="#92400E"/>
        <rect x="-3" y="-32" width="6" height="32" fill="#78350F"/>
        <ellipse cx="0" cy="0" rx="7" ry="9" fill="#1C1917"/>
      </g>`;
      break;

    case 'trumpet':
      acc = `<g transform="translate(40, 25)">
        <rect x="-22" y="-3" width="22" height="6" fill="#FCD34D"/>
        <ellipse cx="5" cy="0" rx="12" ry="14" fill="#FCD34D" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'cane':
    case 'crook':
      acc = `<g transform="translate(45, 20)">
        <path d="M0 0 L0 50" stroke="#78350F" stroke-width="5"/>
        <path d="M0 0 Q-18 -12 -22 0" stroke="#78350F" stroke-width="5" fill="none"/>
      </g>`;
      break;

    case 'staff':
      acc = `<g transform="translate(45, -20)">
        <path d="M0 0 L0 100" stroke="#78350F" stroke-width="5"/>
        <circle cx="0" cy="-5" r="8" fill="#FCD34D"/>
      </g>`;
      break;

    case 'mask':
      acc = `<g transform="translate(0, -50)">
        <path d="M-30 0 L-18 8 L-30 16 Z" fill="#1C1917"/>
        <path d="M30 0 L18 8 L30 16 Z" fill="#1C1917"/>
        <rect x="-22" y="5" width="44" height="6" fill="#1C1917"/>
      </g>`;
      break;

    default:
      break;
  }

  return acc;
}

// Utility functions
function lightenColor(hex, amount) {
  if (!hex || hex === 'hidden') return '#FFFFFF';
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
  const b = Math.min(255, (num & 0x0000FF) + amount);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function darkenColor(hex, amount) {
  if (!hex || hex === 'hidden') return '#000000';
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
  const b = Math.max(0, (num & 0x0000FF) - amount);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Main generation
function generate() {
  const castleDir = path.join(__dirname, 'cards', 'characters', 'castle');
  const villageDir = path.join(__dirname, 'cards', 'characters', 'village');

  [castleDir, villageDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log('Generating quirky Castle Combo style characters...\n');

  castleCharacters.forEach(char => {
    const svg = generateCharacterSVG(char, 'castle');
    fs.writeFileSync(path.join(castleDir, `${char.name}.svg`), svg);
    console.log(`✓ castle/${char.name}.svg (${char.nose} nose, ${char.expression})`);
  });

  villageCharacters.forEach(char => {
    const svg = generateCharacterSVG(char, 'village');
    fs.writeFileSync(path.join(villageDir, `${char.name}.svg`), svg);
    console.log(`✓ village/${char.name}.svg (${char.nose} nose, ${char.expression})`);
  });

  console.log(`\n✅ Generated ${castleCharacters.length + villageCharacters.length} quirky characters!`);
}

generate();
