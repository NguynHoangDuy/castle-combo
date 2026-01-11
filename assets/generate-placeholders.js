/**
 * Castle Combo - Unique Character Placeholder Generator
 * Each character has unique gender, clothing, and position-appropriate features
 * Run with: node generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// Detailed character definitions with gender, unique clothing, and accessories
const castleCharacters = [
  // Royalty
  { name: 'king', gender: 'male', skinTone: '#FDBF6F', hairColor: '#4A3728', hairStyle: 'short_crown',
    outfit: { type: 'royal_robe', primary: '#1E40AF', secondary: '#FDE047', trim: '#B45309' },
    accessory: 'golden_crown', expression: 'regal', features: ['beard', 'strong_jaw'], age: 'adult' },

  { name: 'queen', gender: 'female', skinTone: '#FDE7C7', hairColor: '#1C1917', hairStyle: 'elegant_updo',
    outfit: { type: 'royal_gown', primary: '#7C3AED', secondary: '#FDE047', trim: '#B45309' },
    accessory: 'queen_crown', expression: 'graceful', features: ['makeup', 'jewelry'], age: 'adult' },

  { name: 'prince', gender: 'male', skinTone: '#FDBF6F', hairColor: '#4A3728', hairStyle: 'short_neat',
    outfit: { type: 'noble_tunic', primary: '#2563EB', secondary: '#FDE047', trim: '#1E40AF' },
    accessory: 'small_crown', expression: 'confident', features: ['young_face'], age: 'young' },

  { name: 'princess', gender: 'female', skinTone: '#FDE7C7', hairColor: '#FDE047', hairStyle: 'long_flowing',
    outfit: { type: 'princess_gown', primary: '#EC4899', secondary: '#FDE7C7', trim: '#BE185D' },
    accessory: 'tiara', expression: 'sweet', features: ['rosy_cheeks', 'big_eyes'], age: 'young' },

  // High Nobility
  { name: 'duke', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'slicked_back',
    outfit: { type: 'noble_coat', primary: '#1E3A8A', secondary: '#9CA3AF', trim: '#FDE047' },
    accessory: 'monocle', expression: 'stern', features: ['mustache', 'wrinkles'], age: 'elder' },

  { name: 'duchess', gender: 'female', skinTone: '#FDE7C7', hairColor: '#92400E', hairStyle: 'elaborate_curls',
    outfit: { type: 'noble_gown', primary: '#7C3AED', secondary: '#C4B5FD', trim: '#5B21B6' },
    accessory: 'feathered_hat', expression: 'haughty', features: ['makeup', 'pearl_necklace'], age: 'adult' },

  { name: 'baron', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_sides',
    outfit: { type: 'noble_vest', primary: '#1E3A8A', secondary: '#374151', trim: '#FDE047' },
    accessory: 'medallion', expression: 'serious', features: ['goatee'], age: 'adult' },

  // Military
  { name: 'general', gender: 'male', skinTone: '#D4A574', hairColor: '#6B7280', hairStyle: 'military_cut',
    outfit: { type: 'military_armor', primary: '#6B7280', secondary: '#991B1B', trim: '#FDE047' },
    accessory: 'plumed_helmet', expression: 'commanding', features: ['scar', 'strong_jaw'], age: 'elder' },

  { name: 'captain', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'short_messy',
    outfit: { type: 'officer_uniform', primary: '#991B1B', secondary: '#6B7280', trim: '#FDE047' },
    accessory: 'officer_cap', expression: 'determined', features: ['stubble'], age: 'adult' },

  { name: 'knight', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'hidden',
    outfit: { type: 'full_plate_armor', primary: '#9CA3AF', secondary: '#6B7280', trim: '#FDE047' },
    accessory: 'knight_helmet', expression: 'brave', features: ['hidden_face'], age: 'adult' },

  { name: 'guard', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_military',
    outfit: { type: 'guard_armor', primary: '#7F1D1D', secondary: '#6B7280', trim: '#1C1917' },
    accessory: 'guard_helmet', expression: 'alert', features: ['stern_brow'], age: 'adult' },

  { name: 'archer', gender: 'female', skinTone: '#FDBF6F', hairColor: '#92400E', hairStyle: 'ponytail',
    outfit: { type: 'ranger_leather', primary: '#166534', secondary: '#78350F', trim: '#15803D' },
    accessory: 'hood_down', expression: 'focused', features: ['freckles'], age: 'young' },

  { name: 'soldier', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'buzz_cut',
    outfit: { type: 'soldier_armor', primary: '#991B1B', secondary: '#6B7280', trim: '#7F1D1D' },
    accessory: 'simple_helmet', expression: 'ready', features: ['young_face'], age: 'young' },

  { name: 'squire', gender: 'male', skinTone: '#FDE7C7', hairColor: '#FDE047', hairStyle: 'bowl_cut',
    outfit: { type: 'squire_tunic', primary: '#B91C1C', secondary: '#E5E7EB', trim: '#7F1D1D' },
    accessory: 'none', expression: 'eager', features: ['freckles', 'big_eyes'], age: 'child' },

  // Religious
  { name: 'archbishop', gender: 'male', skinTone: '#FDBF6F', hairColor: '#E5E7EB', hairStyle: 'bald_sides',
    outfit: { type: 'archbishop_robes', primary: '#FDE047', secondary: '#FFFFFF', trim: '#B45309' },
    accessory: 'mitre', expression: 'wise', features: ['long_beard', 'wrinkles'], age: 'elder' },

  { name: 'bishop', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'tonsure',
    outfit: { type: 'bishop_robes', primary: '#7C3AED', secondary: '#FFFFFF', trim: '#5B21B6' },
    accessory: 'bishop_mitre', expression: 'serene', features: ['kind_eyes'], age: 'elder' },

  { name: 'priest', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_neat',
    outfit: { type: 'priest_cassock', primary: '#1C1917', secondary: '#FFFFFF', trim: '#374151' },
    accessory: 'cross_necklace', expression: 'kind', features: ['gentle_smile'], age: 'adult' },

  { name: 'monk', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'tonsure',
    outfit: { type: 'monk_robes', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'hood_up', expression: 'peaceful', features: ['round_face'], age: 'adult' },

  { name: 'nun', gender: 'female', skinTone: '#FDE7C7', hairColor: 'hidden', hairStyle: 'hidden',
    outfit: { type: 'nun_habit', primary: '#1C1917', secondary: '#FFFFFF', trim: '#374151' },
    accessory: 'wimple', expression: 'gentle', features: ['soft_features', 'kind_eyes'], age: 'adult' },

  // Nobility
  { name: 'count', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'slicked_back',
    outfit: { type: 'count_attire', primary: '#5B21B6', secondary: '#1C1917', trim: '#FDE047' },
    accessory: 'cape', expression: 'wealthy', features: ['pointed_beard', 'sharp_eyes'], age: 'adult' },

  { name: 'countess', gender: 'female', skinTone: '#FDE7C7', hairColor: '#78350F', hairStyle: 'braided_crown',
    outfit: { type: 'countess_gown', primary: '#7C3AED', secondary: '#A855F7', trim: '#FDE047' },
    accessory: 'jeweled_headpiece', expression: 'elegant', features: ['makeup', 'beauty_mark'], age: 'adult' },

  { name: 'lord', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'distinguished',
    outfit: { type: 'lord_doublet', primary: '#4C1D95', secondary: '#374151', trim: '#FDE047' },
    accessory: 'signet_ring', expression: 'noble', features: ['gray_beard'], age: 'elder' },

  { name: 'lady', gender: 'female', skinTone: '#FDE7C7', hairColor: '#1C1917', hairStyle: 'long_elegant',
    outfit: { type: 'lady_gown', primary: '#A855F7', secondary: '#E9D5FF', trim: '#7C3AED' },
    accessory: 'hand_fan', expression: 'graceful', features: ['elegant_neck', 'makeup'], age: 'adult' },

  { name: 'nobleman', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'medium_wavy',
    outfit: { type: 'noble_tunic', primary: '#6D28D9', secondary: '#4C1D95', trim: '#FDE047' },
    accessory: 'feathered_cap', expression: 'proud', features: ['thin_mustache'], age: 'adult' },

  { name: 'noblewoman', gender: 'female', skinTone: '#FDE7C7', hairColor: '#92400E', hairStyle: 'curly_long',
    outfit: { type: 'noble_dress', primary: '#C084FC', secondary: '#E9D5FF', trim: '#A855F7' },
    accessory: 'pearl_necklace', expression: 'refined', features: ['rosy_cheeks', 'curled_lashes'], age: 'adult' },

  // Castle Staff
  { name: 'steward', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'receding',
    outfit: { type: 'steward_uniform', primary: '#1C1917', secondary: '#374151', trim: '#6B7280' },
    accessory: 'key_ring', expression: 'attentive', features: ['thin_lips', 'sharp_nose'], age: 'elder' },

  { name: 'butler', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'parted_neat',
    outfit: { type: 'butler_tuxedo', primary: '#1C1917', secondary: '#FFFFFF', trim: '#374151' },
    accessory: 'serving_tray', expression: 'formal', features: ['thin_mustache', 'serious_brow'], age: 'adult' },

  { name: 'maid', gender: 'female', skinTone: '#FDE7C7', hairColor: '#78350F', hairStyle: 'bun_neat',
    outfit: { type: 'maid_uniform', primary: '#1C1917', secondary: '#FFFFFF', trim: '#3B82F6' },
    accessory: 'maid_cap', expression: 'cheerful', features: ['rosy_cheeks', 'bright_eyes'], age: 'young' },

  { name: 'cook', gender: 'male', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'hidden',
    outfit: { type: 'chef_uniform', primary: '#FFFFFF', secondary: '#E5E7EB', trim: '#374151' },
    accessory: 'chef_hat', expression: 'jolly', features: ['round_face', 'rosy_nose', 'mustache'], age: 'adult' },

  { name: 'herald', gender: 'male', skinTone: '#FDBF6F', hairColor: '#FDE047', hairStyle: 'pageboy',
    outfit: { type: 'herald_tabard', primary: '#7C3AED', secondary: '#FDE047', trim: '#5B21B6' },
    accessory: 'trumpet', expression: 'proud', features: ['clean_shaven'], age: 'young' },

  // Special Characters
  { name: 'wizard', gender: 'male', skinTone: '#FDBF6F', hairColor: '#E5E7EB', hairStyle: 'long_wild',
    outfit: { type: 'wizard_robes', primary: '#1E3A8A', secondary: '#3B82F6', trim: '#FDE047' },
    accessory: 'wizard_hat', expression: 'mysterious', features: ['long_beard', 'bushy_brows'], age: 'elder' },

  { name: 'jester', gender: 'male', skinTone: '#FDE7C7', hairColor: '#EF4444', hairStyle: 'wild_spiky',
    outfit: { type: 'jester_costume', primary: '#FACC15', secondary: '#EF4444', trim: '#22C55E' },
    accessory: 'jester_hat', expression: 'silly', features: ['face_paint', 'big_grin'], age: 'adult' },

  { name: 'advisor', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'bald_top',
    outfit: { type: 'advisor_robes', primary: '#1E40AF', secondary: '#374151', trim: '#FDE047' },
    accessory: 'scroll', expression: 'thoughtful', features: ['glasses', 'thin_beard'], age: 'elder' },

  { name: 'alchemist', gender: 'female', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'messy_bun',
    outfit: { type: 'alchemist_robes', primary: '#4C1D95', secondary: '#166534', trim: '#FDE047' },
    accessory: 'goggles', expression: 'curious', features: ['soot_marks', 'wild_eyes'], age: 'adult' },

  { name: 'scribe', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'monk_cut',
    outfit: { type: 'scribe_robes', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'quill_inkwell', expression: 'focused', features: ['ink_stains', 'squinting_eyes'], age: 'adult' },

  { name: 'treasurer', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'balding',
    outfit: { type: 'treasurer_coat', primary: '#166534', secondary: '#1C1917', trim: '#FDE047' },
    accessory: 'coin_purse', expression: 'calculating', features: ['glasses', 'thin_lips'], age: 'elder' },

  { name: 'chamberlain', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'neat_gray',
    outfit: { type: 'chamberlain_robes', primary: '#1C1917', secondary: '#4B5563', trim: '#FDE047' },
    accessory: 'staff_keys', expression: 'proper', features: ['pointed_nose', 'thin_mustache'], age: 'elder' },

  { name: 'executioner', gender: 'male', skinTone: '#D4A574', hairColor: 'hidden', hairStyle: 'hidden',
    outfit: { type: 'executioner_garb', primary: '#1C1917', secondary: '#7F1D1D', trim: '#1C1917' },
    accessory: 'hood_mask', expression: 'hidden', features: ['muscular', 'intimidating'], age: 'adult' },

  { name: 'master_builder', gender: 'male', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'short_practical',
    outfit: { type: 'builder_apron', primary: '#78350F', secondary: '#A16207', trim: '#451A03' },
    accessory: 'blueprint_tools', expression: 'sturdy', features: ['broad_shoulders', 'callused_hands'], age: 'adult' },
];

const villageCharacters = [
  // Farmers & Agricultural
  { name: 'farmer', gender: 'male', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'messy_practical',
    outfit: { type: 'farmer_clothes', primary: '#78350F', secondary: '#A16207', trim: '#451A03' },
    accessory: 'straw_hat', expression: 'friendly', features: ['suntan', 'weathered_face'], age: 'adult' },

  { name: 'shepherd', gender: 'female', skinTone: '#FDBF6F', hairColor: '#92400E', hairStyle: 'braided_simple',
    outfit: { type: 'shepherd_dress', primary: '#6B7280', secondary: '#9CA3AF', trim: '#4B5563' },
    accessory: 'crook', expression: 'calm', features: ['gentle_eyes', 'freckles'], age: 'young' },

  { name: 'miller', gender: 'male', skinTone: '#FDBF6F', hairColor: '#E5E7EB', hairStyle: 'dusty_messy',
    outfit: { type: 'miller_apron', primary: '#F5F5DC', secondary: '#D4D4D4', trim: '#A3A3A3' },
    accessory: 'flour_sack', expression: 'content', features: ['flour_dusted', 'round_face'], age: 'adult' },

  { name: 'fisherman', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'windswept',
    outfit: { type: 'fisherman_gear', primary: '#3B82F6', secondary: '#1E40AF', trim: '#78350F' },
    accessory: 'fishing_net', expression: 'weathered', features: ['beard', 'sea_worn'], age: 'adult' },

  { name: 'beekeeper', gender: 'female', skinTone: '#FDBF6F', hairColor: 'hidden', hairStyle: 'hidden',
    outfit: { type: 'beekeeper_suit', primary: '#FDE047', secondary: '#FFFFFF', trim: '#B45309' },
    accessory: 'bee_veil', expression: 'careful', features: ['hidden_face'], age: 'adult' },

  { name: 'gardener', gender: 'female', skinTone: '#FDE7C7', hairColor: '#92400E', hairStyle: 'kerchief_covered',
    outfit: { type: 'gardener_dress', primary: '#166534', secondary: '#22C55E', trim: '#15803D' },
    accessory: 'flower_basket', expression: 'gentle', features: ['dirt_smudges', 'warm_smile'], age: 'adult' },

  { name: 'vineyard_owner', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'distinguished',
    outfit: { type: 'vintner_clothes', primary: '#7C3AED', secondary: '#5B21B6', trim: '#FDE047' },
    accessory: 'grape_bunch', expression: 'content', features: ['mustache', 'tan'], age: 'elder' },

  { name: 'herbalist', gender: 'female', skinTone: '#FDE7C7', hairColor: '#166534', hairStyle: 'wild_natural',
    outfit: { type: 'herbalist_robes', primary: '#166534', secondary: '#22C55E', trim: '#15803D' },
    accessory: 'herb_pouch', expression: 'wise', features: ['knowing_eyes', 'wild_appearance'], age: 'elder' },

  // Craftsmen
  { name: 'blacksmith', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_practical',
    outfit: { type: 'smith_apron', primary: '#78350F', secondary: '#1C1917', trim: '#6B7280' },
    accessory: 'hammer', expression: 'strong', features: ['muscular', 'soot_marks', 'beard'], age: 'adult' },

  { name: 'carpenter', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'practical_short',
    outfit: { type: 'carpenter_clothes', primary: '#78350F', secondary: '#A16207', trim: '#451A03' },
    accessory: 'saw_plane', expression: 'skilled', features: ['sawdust', 'measuring_look'], age: 'adult' },

  { name: 'woodcutter', gender: 'male', skinTone: '#D4A574', hairColor: '#92400E', hairStyle: 'rugged_long',
    outfit: { type: 'woodcutter_clothes', primary: '#166534', secondary: '#78350F', trim: '#15803D' },
    accessory: 'axe', expression: 'rugged', features: ['full_beard', 'muscular', 'weathered'], age: 'adult' },

  { name: 'mason', gender: 'male', skinTone: '#D4A574', hairColor: '#6B7280', hairStyle: 'short_dusty',
    outfit: { type: 'mason_clothes', primary: '#6B7280', secondary: '#9CA3AF', trim: '#4B5563' },
    accessory: 'chisel_mallet', expression: 'steady', features: ['stone_dust', 'strong_hands'], age: 'adult' },

  { name: 'potter', gender: 'female', skinTone: '#FDE7C7', hairColor: '#78350F', hairStyle: 'tied_back',
    outfit: { type: 'potter_apron', primary: '#B45309', secondary: '#D97706', trim: '#92400E' },
    accessory: 'clay_pot', expression: 'creative', features: ['clay_stains', 'artistic_hands'], age: 'adult' },

  { name: 'weaver', gender: 'female', skinTone: '#FDE7C7', hairColor: '#1C1917', hairStyle: 'neat_bun',
    outfit: { type: 'weaver_dress', primary: '#7C3AED', secondary: '#A855F7', trim: '#5B21B6' },
    accessory: 'thread_spindle', expression: 'patient', features: ['nimble_fingers', 'focused_eyes'], age: 'adult' },

  { name: 'tanner', gender: 'male', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'tied_back',
    outfit: { type: 'tanner_apron', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'leather_hide', expression: 'hardworking', features: ['stained_hands', 'rugged'], age: 'adult' },

  { name: 'cobbler', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'balding_sides',
    outfit: { type: 'cobbler_apron', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'shoe_last', expression: 'meticulous', features: ['glasses', 'detailed_focus'], age: 'elder' },

  // Merchants & Traders
  { name: 'merchant', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'oiled_back',
    outfit: { type: 'merchant_coat', primary: '#166534', secondary: '#15803D', trim: '#FDE047' },
    accessory: 'coin_bag', expression: 'shrewd', features: ['calculating_eyes', 'rings'], age: 'adult' },

  { name: 'trader', gender: 'female', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'practical_braids',
    outfit: { type: 'trader_clothes', primary: '#B45309', secondary: '#D97706', trim: '#92400E' },
    accessory: 'trade_goods', expression: 'busy', features: ['travel_worn', 'alert_eyes'], age: 'adult' },

  { name: 'innkeeper', gender: 'male', skinTone: '#D4A574', hairColor: '#92400E', hairStyle: 'balding',
    outfit: { type: 'innkeeper_vest', primary: '#78350F', secondary: '#A16207', trim: '#451A03' },
    accessory: 'beer_mug', expression: 'jolly', features: ['round_belly', 'rosy_cheeks', 'beard'], age: 'adult' },

  { name: 'jeweler', gender: 'female', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'elegant_pins',
    outfit: { type: 'jeweler_dress', primary: '#5B21B6', secondary: '#7C3AED', trim: '#FDE047' },
    accessory: 'loupe_gem', expression: 'discerning', features: ['precise_eyes', 'elegant_hands'], age: 'adult' },

  { name: 'baker', gender: 'female', skinTone: '#FDE7C7', hairColor: '#FDE047', hairStyle: 'covered_bun',
    outfit: { type: 'baker_apron', primary: '#FFFFFF', secondary: '#F5F5DC', trim: '#D4D4D4' },
    accessory: 'bread_basket', expression: 'warm', features: ['flour_cheeks', 'warm_smile'], age: 'adult' },

  { name: 'butcher', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_practical',
    outfit: { type: 'butcher_apron', primary: '#FFFFFF', secondary: '#EF4444', trim: '#DC2626' },
    accessory: 'cleaver', expression: 'burly', features: ['thick_arms', 'stern_face'], age: 'adult' },

  { name: 'tailor', gender: 'male', skinTone: '#FDBF6F', hairColor: '#6B7280', hairStyle: 'neat_parted',
    outfit: { type: 'tailor_vest', primary: '#7C3AED', secondary: '#A855F7', trim: '#5B21B6' },
    accessory: 'measuring_tape', expression: 'precise', features: ['thin_fingers', 'spectacles'], age: 'adult' },

  { name: 'banker', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'slicked_back',
    outfit: { type: 'banker_suit', primary: '#1C1917', secondary: '#374151', trim: '#FDE047' },
    accessory: 'ledger_coins', expression: 'cunning', features: ['sharp_eyes', 'thin_lips'], age: 'adult' },

  // Warriors & Fighters
  { name: 'barbarian', gender: 'male', skinTone: '#D4A574', hairColor: '#92400E', hairStyle: 'wild_long',
    outfit: { type: 'barbarian_furs', primary: '#78350F', secondary: '#451A03', trim: '#92400E' },
    accessory: 'horned_helmet', expression: 'fierce', features: ['battle_scars', 'war_paint', 'muscular'], age: 'adult' },

  { name: 'mercenary', gender: 'female', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'short_practical',
    outfit: { type: 'mercenary_armor', primary: '#6B7280', secondary: '#4B5563', trim: '#374151' },
    accessory: 'sword_shield', expression: 'tough', features: ['scar', 'steely_eyes'], age: 'adult' },

  { name: 'hunter', gender: 'male', skinTone: '#FDBF6F', hairColor: '#166534', hairStyle: 'practical_short',
    outfit: { type: 'hunter_leather', primary: '#166534', secondary: '#15803D', trim: '#14532D' },
    accessory: 'bow_quiver', expression: 'alert', features: ['keen_eyes', 'weathered'], age: 'adult' },

  { name: 'bandit', gender: 'male', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'unkempt',
    outfit: { type: 'bandit_clothes', primary: '#1C1917', secondary: '#374151', trim: '#7F1D1D' },
    accessory: 'mask_dagger', expression: 'sneaky', features: ['scar', 'shifty_eyes', 'stubble'], age: 'adult' },

  { name: 'militia', gender: 'male', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'common_short',
    outfit: { type: 'militia_clothes', primary: '#78350F', secondary: '#92400E', trim: '#6B7280' },
    accessory: 'pitchfork_shield', expression: 'determined', features: ['common_face', 'brave_eyes'], age: 'adult' },

  { name: 'veteran', gender: 'male', skinTone: '#D4A574', hairColor: '#E5E7EB', hairStyle: 'grizzled_short',
    outfit: { type: 'veteran_armor', primary: '#6B7280', secondary: '#4B5563', trim: '#374151' },
    accessory: 'eyepatch', expression: 'grizzled', features: ['old_scars', 'missing_eye', 'weathered'], age: 'elder' },

  { name: 'scout', gender: 'female', skinTone: '#FDBF6F', hairColor: '#78350F', hairStyle: 'short_practical',
    outfit: { type: 'scout_leather', primary: '#166534', secondary: '#15803D', trim: '#14532D' },
    accessory: 'hooded_cloak', expression: 'wary', features: ['alert_eyes', 'lithe'], age: 'young' },

  // Common Folk
  { name: 'beggar', gender: 'male', skinTone: '#D4A574', hairColor: '#6B7280', hairStyle: 'unkempt_wild',
    outfit: { type: 'beggar_rags', primary: '#78350F', secondary: '#6B7280', trim: '#4B5563' },
    accessory: 'begging_bowl', expression: 'hopeful', features: ['thin_face', 'sad_eyes', 'dirty'], age: 'elder' },

  { name: 'peasant', gender: 'male', skinTone: '#D4A574', hairColor: '#78350F', hairStyle: 'simple_messy',
    outfit: { type: 'peasant_tunic', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'none', expression: 'simple', features: ['weathered_face', 'humble'], age: 'adult' },

  { name: 'servant', gender: 'female', skinTone: '#FDE7C7', hairColor: '#78350F', hairStyle: 'simple_bun',
    outfit: { type: 'servant_dress', primary: '#6B7280', secondary: '#9CA3AF', trim: '#4B5563' },
    accessory: 'cleaning_cloth', expression: 'humble', features: ['downcast_eyes', 'work_worn'], age: 'young' },

  { name: 'child', gender: 'female', skinTone: '#FDE7C7', hairColor: '#FDE047', hairStyle: 'pigtails',
    outfit: { type: 'child_dress', primary: '#3B82F6', secondary: '#60A5FA', trim: '#2563EB' },
    accessory: 'rag_doll', expression: 'playful', features: ['big_eyes', 'rosy_cheeks', 'gap_teeth'], age: 'child' },

  { name: 'elder', gender: 'male', skinTone: '#FDBF6F', hairColor: '#E5E7EB', hairStyle: 'thin_wispy',
    outfit: { type: 'elder_robes', primary: '#78350F', secondary: '#92400E', trim: '#451A03' },
    accessory: 'walking_cane', expression: 'wise', features: ['deep_wrinkles', 'kind_eyes', 'long_beard'], age: 'elder' },

  // Entertainers & Special
  { name: 'musician', gender: 'male', skinTone: '#FDBF6F', hairColor: '#1C1917', hairStyle: 'romantic_waves',
    outfit: { type: 'musician_clothes', primary: '#EF4444', secondary: '#F97316', trim: '#FDE047' },
    accessory: 'lute', expression: 'merry', features: ['bright_eyes', 'handsome'], age: 'young' },

  { name: 'storyteller', gender: 'female', skinTone: '#FDBF6F', hairColor: '#E5E7EB', hairStyle: 'wild_gray',
    outfit: { type: 'storyteller_shawl', primary: '#7C3AED', secondary: '#A855F7', trim: '#5B21B6' },
    accessory: 'story_book', expression: 'animated', features: ['expressive_face', 'wild_eyes'], age: 'elder' },

  { name: 'fortune_teller', gender: 'female', skinTone: '#D4A574', hairColor: '#1C1917', hairStyle: 'covered_scarves',
    outfit: { type: 'fortune_robes', primary: '#7C3AED', secondary: '#1C1917', trim: '#FDE047' },
    accessory: 'crystal_ball', expression: 'mysterious', features: ['dark_eyes', 'jewelry', 'mysterious'], age: 'adult' },
];

// SVG Generator Functions
function generateCharacterSVG(char, type) {
  const displayName = char.name.replace(/_/g, ' ').toUpperCase();
  const bgColor = type === 'castle' ? '#6B7280' : '#78350F';
  const bgLight = type === 'castle' ? '#9CA3AF' : '#92400E';
  const cardBg = getCardBackground(char);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 300" width="250" height="300">
  <defs>
    <linearGradient id="bg_${char.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${cardBg.light}"/>
      <stop offset="100%" style="stop-color:${cardBg.dark}"/>
    </linearGradient>
    <linearGradient id="skin_${char.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${lightenColor(char.skinTone, 15)}"/>
      <stop offset="100%" style="stop-color:${char.skinTone}"/>
    </linearGradient>
    <filter id="shadow_${char.name}">
      <feDropShadow dx="2" dy="3" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
    <clipPath id="card_${char.name}">
      <rect x="0" y="0" width="250" height="300" rx="15"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="250" height="300" rx="15" fill="url(#bg_${char.name})"/>

  <!-- Decorative pattern -->
  <g opacity="0.08" clip-path="url(#card_${char.name})">
    ${generateBackgroundPattern(char)}
  </g>

  <!-- Character body -->
  <g transform="translate(125, 165)" filter="url(#shadow_${char.name})">
    ${generateBody(char)}
  </g>

  <!-- Character head -->
  <g transform="translate(125, 100)">
    ${generateHead(char)}
    ${generateHair(char)}
    ${generateFace(char)}
    ${generateAccessory(char)}
  </g>

  <!-- Type banner -->
  <rect x="0" y="0" width="250" height="32" fill="${bgColor}" opacity="0.95"/>
  <text x="125" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="13"
        fill="white" font-weight="bold" letter-spacing="1">${type.toUpperCase()}</text>

  <!-- Name banner -->
  <rect x="0" y="260" width="250" height="40" fill="${bgColor}"/>
  <rect x="15" y="262" width="220" height="1.5" fill="${bgLight}" opacity="0.4"/>
  <text x="125" y="285" text-anchor="middle" font-family="Georgia, serif" font-size="14"
        fill="white" font-weight="bold">${displayName}</text>
</svg>`;
}

function getCardBackground(char) {
  const colorMap = {
    'royal_robe': { light: '#60A5FA', dark: '#1E40AF' },
    'royal_gown': { light: '#A78BFA', dark: '#5B21B6' },
    'princess_gown': { light: '#F9A8D4', dark: '#BE185D' },
    'noble_tunic': { light: '#60A5FA', dark: '#1E40AF' },
    'military_armor': { light: '#9CA3AF', dark: '#4B5563' },
    'full_plate_armor': { light: '#D1D5DB', dark: '#6B7280' },
    'guard_armor': { light: '#FCA5A5', dark: '#991B1B' },
    'priest_cassock': { light: '#6B7280', dark: '#1C1917' },
    'monk_robes': { light: '#A16207', dark: '#451A03' },
    'wizard_robes': { light: '#60A5FA', dark: '#1E3A8A' },
    'jester_costume': { light: '#FDE047', dark: '#CA8A04' },
    'farmer_clothes': { light: '#86EFAC', dark: '#166534' },
    'smith_apron': { light: '#FDBA74', dark: '#C2410C' },
    'barbarian_furs': { light: '#A16207', dark: '#451A03' },
    'fortune_robes': { light: '#C4B5FD', dark: '#5B21B6' },
  };
  return colorMap[char.outfit.type] || { light: lightenColor(char.outfit.primary, 60), dark: char.outfit.primary };
}

function generateBackgroundPattern(char) {
  const patterns = {
    'king': `<polygon points="40,50 50,30 60,50" fill="white"/><polygon points="190,70 200,50 210,70" fill="white"/>`,
    'queen': `<circle cx="40" cy="50" r="15" fill="white"/><circle cx="210" cy="80" r="12" fill="white"/>`,
    'knight': `<rect x="30" y="40" width="30" height="40" fill="white"/><rect x="190" y="60" width="25" height="35" fill="white"/>`,
    'wizard': `<polygon points="40,80 55,30 70,80" fill="white"/><circle cx="200" cy="60" r="20" fill="white"/>`,
    'jester': `<circle cx="30" cy="40" r="20" fill="white"/><circle cx="60" cy="70" r="15" fill="white"/><circle cx="200" cy="50" r="18" fill="white"/>`,
  };
  return patterns[char.name] || `<circle cx="35" cy="45" r="30" fill="white"/><circle cx="215" cy="75" r="25" fill="white"/><circle cx="40" cy="220" r="35" fill="white"/>`;
}

function generateHead(char) {
  const headWidth = char.gender === 'female' ? 42 : 45;
  const headHeight = char.age === 'child' ? 48 : 50;
  const jawWidth = char.gender === 'female' ? 38 : (char.features?.includes('strong_jaw') ? 44 : 42);

  let head = `<ellipse cx="0" cy="0" rx="${headWidth}" ry="${headHeight}" fill="url(#skin_${char.name})"/>`;

  // Ears
  if (!char.features?.includes('hidden_face')) {
    head += `<ellipse cx="-40" cy="0" rx="7" ry="11" fill="${char.skinTone}"/>
             <ellipse cx="40" cy="0" rx="7" ry="11" fill="${char.skinTone}"/>`;
  }

  // Jaw definition for males
  if (char.gender === 'male' && char.features?.includes('strong_jaw')) {
    head += `<path d="M-35 20 Q-30 40 0 45 Q30 40 35 20" fill="${darkenColor(char.skinTone, 5)}" opacity="0.3"/>`;
  }

  return head;
}

function generateHair(char) {
  if (char.hairStyle === 'hidden' || char.hairColor === 'hidden') return '';

  const color = char.hairColor;
  const dark = darkenColor(color, 25);
  let hair = '';

  switch(char.hairStyle) {
    // Male styles
    case 'short_crown':
    case 'short_neat':
    case 'military_cut':
    case 'short_military':
    case 'short_sides':
    case 'buzz_cut':
    case 'short_practical':
    case 'practical_short':
    case 'common_short':
    case 'grizzled_short':
      hair = `<ellipse cx="0" cy="-35" rx="40" ry="22" fill="${color}"/>
              <ellipse cx="-15" cy="-38" rx="15" ry="10" fill="${dark}"/>`;
      break;

    case 'slicked_back':
    case 'oiled_back':
      hair = `<ellipse cx="0" cy="-32" rx="42" ry="25" fill="${color}"/>
              <path d="M-38 -20 Q-40 -40 0 -50 Q40 -40 38 -20" fill="${dark}" opacity="0.5"/>`;
      break;

    case 'long_wild':
    case 'wild_long':
    case 'rugged_long':
      hair = `<ellipse cx="0" cy="-25" rx="48" ry="32" fill="${color}"/>
              <ellipse cx="-38" cy="15" rx="14" ry="35" fill="${color}"/>
              <ellipse cx="38" cy="15" rx="14" ry="35" fill="${color}"/>
              <ellipse cx="-25" cy="-40" rx="15" ry="12" fill="${dark}"/>
              <ellipse cx="20" cy="-42" rx="12" ry="10" fill="${dark}"/>`;
      break;

    case 'bald_top':
    case 'balding':
    case 'bald_sides':
    case 'balding_sides':
    case 'receding':
      hair = `<ellipse cx="-35" cy="-5" rx="12" ry="20" fill="${color}"/>
              <ellipse cx="35" cy="-5" rx="12" ry="20" fill="${color}"/>
              <ellipse cx="0" cy="-45" rx="15" ry="8" fill="${char.skinTone}"/>`;
      break;

    case 'tonsure':
    case 'monk_cut':
      hair = `<ellipse cx="0" cy="-42" rx="25" ry="12" fill="${char.skinTone}"/>
              <path d="M-40 -20 A40 40 0 0 1 40 -20" fill="${color}" stroke="none"/>
              <ellipse cx="-35" cy="0" rx="10" ry="18" fill="${color}"/>
              <ellipse cx="35" cy="0" rx="10" ry="18" fill="${color}"/>`;
      break;

    case 'wild_spiky':
      hair = `<ellipse cx="0" cy="-30" rx="42" ry="28" fill="${color}"/>
              <polygon points="-30,-50 -25,-65 -20,-48" fill="${color}"/>
              <polygon points="0,-55 5,-72 10,-52" fill="${color}"/>
              <polygon points="25,-50 30,-68 35,-48" fill="${color}"/>
              <polygon points="-15,-52 -10,-65 -5,-50" fill="${dark}"/>
              <polygon points="10,-53 15,-67 20,-50" fill="${dark}"/>`;
      break;

    case 'pageboy':
    case 'bowl_cut':
      hair = `<ellipse cx="0" cy="-30" rx="44" ry="28" fill="${color}"/>
              <rect x="-42" y="-25" width="84" height="15" fill="${color}"/>
              <ellipse cx="-38" cy="-5" rx="8" ry="15" fill="${color}"/>
              <ellipse cx="38" cy="-5" rx="8" ry="15" fill="${color}"/>`;
      break;

    case 'medium_wavy':
    case 'romantic_waves':
    case 'distinguished':
    case 'neat_gray':
    case 'parted_neat':
    case 'neat_parted':
      hair = `<ellipse cx="0" cy="-32" rx="44" ry="26" fill="${color}"/>
              <ellipse cx="-30" cy="-10" rx="10" ry="18" fill="${color}"/>
              <ellipse cx="30" cy="-10" rx="10" ry="18" fill="${color}"/>
              <path d="M-20 -45 Q0 -55 20 -45" fill="${dark}" opacity="0.4"/>`;
      break;

    case 'messy_practical':
    case 'simple_messy':
    case 'dusty_messy':
    case 'unkempt':
    case 'unkempt_wild':
    case 'messy_bun':
    case 'windswept':
      hair = `<ellipse cx="0" cy="-30" rx="44" ry="28" fill="${color}"/>
              <ellipse cx="-20" cy="-45" rx="12" ry="10" fill="${dark}"/>
              <ellipse cx="15" cy="-48" rx="10" ry="8" fill="${dark}"/>
              <ellipse cx="30" cy="-38" rx="8" ry="7" fill="${dark}"/>`;
      break;

    // Female styles
    case 'elegant_updo':
      hair = `<ellipse cx="0" cy="-40" rx="35" ry="25" fill="${color}"/>
              <ellipse cx="0" cy="-55" rx="20" ry="15" fill="${color}"/>
              <circle cx="5" cy="-62" r="8" fill="${dark}"/>
              <ellipse cx="-38" cy="-10" rx="6" ry="12" fill="${color}"/>
              <ellipse cx="38" cy="-10" rx="6" ry="12" fill="${color}"/>`;
      break;

    case 'long_flowing':
    case 'long_elegant':
    case 'curly_long':
      hair = `<ellipse cx="0" cy="-28" rx="46" ry="30" fill="${color}"/>
              <ellipse cx="-40" cy="20" rx="12" ry="40" fill="${color}"/>
              <ellipse cx="40" cy="20" rx="12" ry="40" fill="${color}"/>
              <ellipse cx="-30" cy="35" rx="10" ry="25" fill="${dark}"/>
              <ellipse cx="30" cy="35" rx="10" ry="25" fill="${dark}"/>`;
      break;

    case 'braided_crown':
    case 'braided_simple':
    case 'practical_braids':
      hair = `<ellipse cx="0" cy="-32" rx="44" ry="26" fill="${color}"/>
              <path d="M-40 -15 Q-45 20 -35 50" stroke="${color}" stroke-width="12" fill="none"/>
              <path d="M40 -15 Q45 20 35 50" stroke="${color}" stroke-width="12" fill="none"/>
              <path d="M-40 -15 Q-45 20 -35 50" stroke="${dark}" stroke-width="4" fill="none" stroke-dasharray="8,6"/>
              <path d="M40 -15 Q45 20 35 50" stroke="${dark}" stroke-width="4" fill="none" stroke-dasharray="8,6"/>`;
      break;

    case 'ponytail':
    case 'tied_back':
      hair = `<ellipse cx="0" cy="-32" rx="42" ry="25" fill="${color}"/>
              <ellipse cx="0" cy="-50" rx="8" ry="6" fill="${dark}"/>
              <path d="M0 -45 Q15 -30 10 30" stroke="${color}" stroke-width="14" fill="none"/>
              <path d="M0 -45 Q15 -30 10 30" stroke="${dark}" stroke-width="4" fill="none"/>`;
      break;

    case 'bun_neat':
    case 'simple_bun':
    case 'neat_bun':
    case 'covered_bun':
      hair = `<ellipse cx="0" cy="-35" rx="42" ry="24" fill="${color}"/>
              <circle cx="0" cy="-52" r="14" fill="${color}"/>
              <circle cx="0" cy="-52" r="10" fill="${dark}"/>`;
      break;

    case 'pigtails':
      hair = `<ellipse cx="0" cy="-32" rx="40" ry="24" fill="${color}"/>
              <ellipse cx="-35" cy="-20" rx="10" ry="8" fill="${dark}"/>
              <ellipse cx="35" cy="-20" rx="10" ry="8" fill="${dark}"/>
              <ellipse cx="-42" cy="10" rx="8" ry="20" fill="${color}"/>
              <ellipse cx="42" cy="10" rx="8" ry="20" fill="${color}"/>`;
      break;

    case 'kerchief_covered':
    case 'covered_scarves':
      hair = `<path d="M-42 -20 Q0 -55 42 -20 L38 10 Q0 5 -38 10 Z" fill="${char.outfit.secondary}"/>
              <ellipse cx="0" cy="-40" rx="35" ry="18" fill="${char.outfit.secondary}"/>`;
      break;

    case 'wild_natural':
    case 'wild_gray':
      hair = `<ellipse cx="0" cy="-25" rx="50" ry="35" fill="${color}"/>
              <ellipse cx="-42" cy="10" rx="15" ry="30" fill="${color}"/>
              <ellipse cx="42" cy="10" rx="15" ry="30" fill="${color}"/>
              <circle cx="-30" cy="-45" r="12" fill="${dark}"/>
              <circle cx="25" cy="-48" r="10" fill="${dark}"/>
              <circle cx="0" cy="-50" r="14" fill="${dark}"/>`;
      break;

    case 'elaborate_curls':
      hair = `<ellipse cx="0" cy="-30" rx="46" ry="28" fill="${color}"/>
              <circle cx="-35" cy="-35" r="12" fill="${dark}"/>
              <circle cx="35" cy="-35" r="12" fill="${dark}"/>
              <circle cx="-20" cy="-45" r="10" fill="${dark}"/>
              <circle cx="20" cy="-45" r="10" fill="${dark}"/>
              <ellipse cx="-42" cy="15" rx="10" ry="25" fill="${color}"/>
              <ellipse cx="42" cy="15" rx="10" ry="25" fill="${color}"/>`;
      break;

    case 'elegant_pins':
      hair = `<ellipse cx="0" cy="-35" rx="42" ry="25" fill="${color}"/>
              <ellipse cx="0" cy="-50" rx="25" ry="15" fill="${color}"/>
              <circle cx="-15" cy="-55" r="4" fill="#FDE047"/>
              <circle cx="10" cy="-58" r="4" fill="#FDE047"/>
              <circle cx="20" cy="-50" r="3" fill="#FDE047"/>`;
      break;

    case 'thin_wispy':
      hair = `<ellipse cx="-20" cy="-40" rx="15" ry="10" fill="${color}"/>
              <ellipse cx="20" cy="-38" rx="12" ry="8" fill="${color}"/>
              <ellipse cx="-35" cy="-15" rx="8" ry="15" fill="${color}"/>
              <ellipse cx="35" cy="-15" rx="8" ry="15" fill="${color}"/>`;
      break;

    default:
      hair = `<ellipse cx="0" cy="-32" rx="42" ry="26" fill="${color}"/>
              <ellipse cx="-15" cy="-42" rx="12" ry="10" fill="${dark}"/>`;
  }

  return hair;
}

function generateFace(char) {
  let face = '';
  const isFemale = char.gender === 'female';
  const isChild = char.age === 'child';
  const isElder = char.age === 'elder';

  // Eye size and position based on age/gender
  const eyeY = isChild ? -5 : -8;
  const eyeWidth = isChild ? 10 : (isFemale ? 9 : 8);
  const eyeHeight = isChild ? 9 : (isFemale ? 8 : 7);

  // Generate eyes based on expression and features
  if (!char.features?.includes('hidden_face')) {
    // Base eyes
    face += `<ellipse cx="-14" cy="${eyeY}" rx="${eyeWidth}" ry="${eyeHeight}" fill="white"/>
             <ellipse cx="14" cy="${eyeY}" rx="${eyeWidth}" ry="${eyeHeight}" fill="white"/>`;

    // Pupils
    const pupilSize = isChild ? 5 : 4;
    let pupilOffsetX = 0;
    let pupilOffsetY = 0;

    if (char.expression === 'sneaky' || char.expression === 'cunning') {
      pupilOffsetX = 2;
    } else if (char.expression === 'alert' || char.expression === 'wary') {
      pupilOffsetY = -1;
    }

    face += `<circle cx="${-14 + pupilOffsetX}" cy="${eyeY + pupilOffsetY}" r="${pupilSize}" fill="#1C1917"/>
             <circle cx="${14 + pupilOffsetX}" cy="${eyeY + pupilOffsetY}" r="${pupilSize}" fill="#1C1917"/>
             <circle cx="${-13 + pupilOffsetX}" cy="${eyeY - 1 + pupilOffsetY}" r="1.5" fill="white"/>
             <circle cx="${15 + pupilOffsetX}" cy="${eyeY - 1 + pupilOffsetY}" r="1.5" fill="white"/>`;

    // Female eyelashes
    if (isFemale && !isChild) {
      face += `<path d="M${-14-eyeWidth} ${eyeY-2} Q${-14} ${eyeY-eyeHeight-3} ${-14+eyeWidth} ${eyeY-2}" fill="none" stroke="#1C1917" stroke-width="2"/>
               <path d="M${14-eyeWidth} ${eyeY-2} Q${14} ${eyeY-eyeHeight-3} ${14+eyeWidth} ${eyeY-2}" fill="none" stroke="#1C1917" stroke-width="2"/>`;
    }

    // Eyebrows based on expression
    const browY = eyeY - eyeHeight - 3;
    if (char.expression === 'fierce' || char.expression === 'stern' || char.expression === 'commanding') {
      face += `<line x1="-22" y1="${browY}" x2="-6" y2="${browY+4}" stroke="#78350F" stroke-width="3"/>
               <line x1="22" y1="${browY}" x2="6" y2="${browY+4}" stroke="#78350F" stroke-width="3"/>`;
    } else if (char.expression === 'wise' || char.expression === 'kind') {
      face += `<path d="M-22 ${browY+2} Q-14 ${browY-2} -6 ${browY+2}" fill="none" stroke="#78350F" stroke-width="2"/>
               <path d="M22 ${browY+2} Q14 ${browY-2} 6 ${browY+2}" fill="none" stroke="#78350F" stroke-width="2"/>`;
    } else if (char.expression === 'surprised' || char.expression === 'curious') {
      face += `<path d="M-22 ${browY-2} Q-14 ${browY-6} -6 ${browY-2}" fill="none" stroke="#78350F" stroke-width="2"/>
               <path d="M22 ${browY-2} Q14 ${browY-6} 6 ${browY-2}" fill="none" stroke="#78350F" stroke-width="2"/>`;
    }
  }

  // Nose
  const noseSize = isFemale ? 5 : 7;
  face += `<ellipse cx="0" cy="8" rx="${noseSize}" ry="${noseSize + 2}" fill="${darkenColor(char.skinTone, 12)}"/>`;

  // Mouth based on expression
  const mouthY = 22;
  if (char.expression === 'jolly' || char.expression === 'merry' || char.expression === 'cheerful' || char.expression === 'playful') {
    face += `<path d="M-14 ${mouthY} Q0 ${mouthY+14} 14 ${mouthY}" fill="#991B1B"/>
             <path d="M-10 ${mouthY+8} Q0 ${mouthY+12} 10 ${mouthY+8}" fill="#EC4899"/>`;
  } else if (char.expression === 'silly') {
    face += `<ellipse cx="0" cy="${mouthY+5}" rx="14" ry="10" fill="#991B1B"/>
             <ellipse cx="0" cy="${mouthY+10}" rx="8" ry="5" fill="#EC4899"/>`;
  } else if (char.expression === 'stern' || char.expression === 'serious' || char.expression === 'tough') {
    face += `<path d="M-12 ${mouthY} L12 ${mouthY}" stroke="#78350F" stroke-width="3"/>`;
  } else if (char.expression === 'sweet' || char.expression === 'gentle' || char.expression === 'graceful') {
    face += `<path d="M-10 ${mouthY} Q0 ${mouthY+8} 10 ${mouthY}" fill="none" stroke="#C9544E" stroke-width="2.5"/>`;
    if (isFemale) {
      face += `<ellipse cx="0" cy="${mouthY+2}" rx="6" ry="3" fill="#F9A8D4" opacity="0.5"/>`;
    }
  } else if (char.expression === 'mysterious' || char.expression === 'cunning' || char.expression === 'sneaky') {
    face += `<path d="M-8 ${mouthY} Q0 ${mouthY+4} 8 ${mouthY-2}" fill="none" stroke="#78350F" stroke-width="2"/>`;
  } else {
    face += `<path d="M-10 ${mouthY} Q0 ${mouthY+6} 10 ${mouthY}" fill="none" stroke="#78350F" stroke-width="2"/>`;
  }

  // Cheek blush
  if (char.features?.includes('rosy_cheeks') || isFemale || isChild) {
    face += `<ellipse cx="-22" cy="12" rx="8" ry="5" fill="#F87171" opacity="0.3"/>
             <ellipse cx="22" cy="12" rx="8" ry="5" fill="#F87171" opacity="0.3"/>`;
  }

  // Facial hair for males
  if (char.gender === 'male') {
    if (char.features?.includes('beard') || char.features?.includes('full_beard')) {
      face += `<ellipse cx="0" cy="30" rx="28" ry="22" fill="${char.hairColor}"/>
               <ellipse cx="0" cy="35" rx="24" ry="18" fill="${darkenColor(char.hairColor, 15)}"/>`;
    } else if (char.features?.includes('goatee') || char.features?.includes('pointed_beard')) {
      face += `<path d="M-10 25 Q0 50 10 25" fill="${char.hairColor}"/>`;
    } else if (char.features?.includes('long_beard')) {
      face += `<ellipse cx="0" cy="35" rx="30" ry="30" fill="${char.hairColor}"/>
               <ellipse cx="0" cy="45" rx="20" ry="25" fill="${darkenColor(char.hairColor, 15)}"/>`;
    } else if (char.features?.includes('gray_beard')) {
      face += `<ellipse cx="0" cy="32" rx="26" ry="20" fill="#9CA3AF"/>
               <ellipse cx="0" cy="38" rx="20" ry="16" fill="#6B7280"/>`;
    } else if (char.features?.includes('mustache') || char.features?.includes('thin_mustache')) {
      const mustacheWidth = char.features?.includes('thin_mustache') ? 18 : 22;
      face += `<path d="M-${mustacheWidth} 16 Q0 22 ${mustacheWidth} 16" fill="${char.hairColor}" stroke="${darkenColor(char.hairColor, 20)}" stroke-width="1"/>`;
    } else if (char.features?.includes('stubble')) {
      face += `<ellipse cx="0" cy="28" rx="25" ry="18" fill="${char.hairColor}" opacity="0.2"/>`;
    }
  }

  // Wrinkles for elders
  if (isElder || char.features?.includes('wrinkles') || char.features?.includes('deep_wrinkles')) {
    face += `<path d="M-28 -15 Q-22 -12 -18 -15" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.5"/>
             <path d="M28 -15 Q22 -12 18 -15" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.5"/>
             <path d="M-25 5 Q-22 8 -20 5" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.4"/>
             <path d="M25 5 Q22 8 20 5" fill="none" stroke="${darkenColor(char.skinTone, 20)}" stroke-width="1" opacity="0.4"/>`;
  }

  // Scars
  if (char.features?.includes('scar') || char.features?.includes('battle_scars') || char.features?.includes('old_scars')) {
    face += `<path d="M-25 -5 L-18 10" stroke="#D4A574" stroke-width="2" opacity="0.6"/>`;
  }

  // Freckles
  if (char.features?.includes('freckles')) {
    face += `<circle cx="-18" cy="5" r="1.5" fill="#92400E" opacity="0.4"/>
             <circle cx="-12" cy="8" r="1" fill="#92400E" opacity="0.4"/>
             <circle cx="-22" cy="10" r="1.5" fill="#92400E" opacity="0.4"/>
             <circle cx="18" cy="5" r="1.5" fill="#92400E" opacity="0.4"/>
             <circle cx="12" cy="8" r="1" fill="#92400E" opacity="0.4"/>
             <circle cx="22" cy="10" r="1.5" fill="#92400E" opacity="0.4"/>`;
  }

  // Makeup for females
  if (char.features?.includes('makeup')) {
    face += `<ellipse cx="-14" cy="-12" rx="4" ry="2" fill="#A855F7" opacity="0.3"/>
             <ellipse cx="14" cy="-12" rx="4" ry="2" fill="#A855F7" opacity="0.3"/>`;
  }

  // Beauty mark
  if (char.features?.includes('beauty_mark')) {
    face += `<circle cx="15" cy="15" r="2" fill="#1C1917"/>`;
  }

  // Glasses/spectacles
  if (char.features?.includes('glasses') || char.features?.includes('spectacles')) {
    face += `<circle cx="-14" cy="${eyeY}" r="12" fill="none" stroke="#374151" stroke-width="2"/>
             <circle cx="14" cy="${eyeY}" r="12" fill="none" stroke="#374151" stroke-width="2"/>
             <line x1="-2" y1="${eyeY}" x2="2" y2="${eyeY}" stroke="#374151" stroke-width="2"/>`;
  }

  return face;
}

function generateBody(char) {
  const outfit = char.outfit;
  const primary = outfit.primary;
  const secondary = outfit.secondary;
  const trim = outfit.trim;
  const darkPrimary = darkenColor(primary, 25);

  let body = '';

  switch(outfit.type) {
    case 'royal_robe':
      body = `<ellipse cx="0" cy="55" rx="55" ry="60" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="48" ry="50" fill="${darkPrimary}"/>
              <path d="M-35 10 L-55 70 L55 70 L35 10" fill="${secondary}" opacity="0.3"/>
              <rect x="-8" y="0" width="16" height="60" fill="${secondary}"/>
              <circle cx="0" cy="15" r="6" fill="${trim}"/>
              <circle cx="0" cy="35" r="5" fill="${trim}"/>
              <circle cx="0" cy="52" r="4" fill="${trim}"/>
              <path d="M-55 40 Q-65 30 -60 60" fill="${primary}" stroke="${trim}" stroke-width="2"/>
              <path d="M55 40 Q65 30 60 60" fill="${primary}" stroke="${trim}" stroke-width="2"/>
              <circle cx="-60" cy="65" r="10" fill="${char.skinTone}"/>
              <circle cx="60" cy="65" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'royal_gown':
    case 'princess_gown':
    case 'noble_gown':
    case 'lady_gown':
    case 'countess_gown':
    case 'noble_dress':
      body = `<ellipse cx="0" cy="55" rx="58" ry="62" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="52" ry="55" fill="${darkPrimary}"/>
              <path d="M-30 -5 Q0 5 30 -5 L40 30 Q0 40 -40 30 Z" fill="${secondary}"/>
              <ellipse cx="0" cy="0" rx="25" ry="12" fill="${secondary}" opacity="0.5"/>
              <path d="M-48 35 Q-55 50 -50 70" fill="${primary}" stroke="${trim}" stroke-width="2"/>
              <path d="M48 35 Q55 50 50 70" fill="${primary}" stroke="${trim}" stroke-width="2"/>
              <circle cx="-50" cy="72" r="9" fill="${char.skinTone}"/>
              <circle cx="50" cy="72" r="9" fill="${char.skinTone}"/>
              <ellipse cx="0" cy="10" rx="4" ry="3" fill="${trim}"/>`;
      break;

    case 'full_plate_armor':
    case 'knight_helmet':
      body = `<ellipse cx="0" cy="50" rx="52" ry="55" fill="#9CA3AF"/>
              <ellipse cx="0" cy="55" rx="46" ry="48" fill="#6B7280"/>
              <rect x="-30" y="5" width="60" height="45" fill="#9CA3AF" rx="5"/>
              <line x1="-25" y1="15" x2="25" y2="15" stroke="#4B5563" stroke-width="3"/>
              <line x1="-25" y1="30" x2="25" y2="30" stroke="#4B5563" stroke-width="3"/>
              <line x1="-25" y1="45" x2="25" y2="45" stroke="#4B5563" stroke-width="3"/>
              <ellipse cx="-50" cy="40" rx="18" ry="25" fill="#9CA3AF"/>
              <ellipse cx="50" cy="40" rx="18" ry="25" fill="#9CA3AF"/>
              <circle cx="-55" cy="65" r="12" fill="#6B7280"/>
              <circle cx="55" cy="65" r="12" fill="#6B7280"/>`;
      break;

    case 'military_armor':
    case 'guard_armor':
    case 'soldier_armor':
    case 'veteran_armor':
      body = `<ellipse cx="0" cy="52" rx="50" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="57" rx="44" ry="48" fill="${darkPrimary}"/>
              <rect x="-28" y="5" width="56" height="40" fill="${secondary}" rx="3"/>
              <path d="M-20 5 L0 -5 L20 5" fill="${secondary}" stroke="${trim}" stroke-width="2"/>
              <ellipse cx="-48" cy="38" rx="15" ry="22" fill="${primary}"/>
              <ellipse cx="48" cy="38" rx="15" ry="22" fill="${primary}"/>
              <circle cx="-52" cy="62" r="10" fill="${char.skinTone}"/>
              <circle cx="52" cy="62" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'ranger_leather':
    case 'hunter_leather':
    case 'scout_leather':
      body = `<ellipse cx="0" cy="55" rx="45" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="40" ry="48" fill="${darkPrimary}"/>
              <path d="M-25 0 Q0 10 25 0 L30 40 Q0 50 -30 40 Z" fill="${secondary}"/>
              <rect x="-5" y="5" width="10" height="35" fill="${trim}"/>
              <ellipse cx="-45" cy="35" rx="12" ry="20" fill="${primary}"/>
              <ellipse cx="45" cy="35" rx="12" ry="20" fill="${primary}"/>
              <circle cx="-48" cy="58" r="10" fill="${char.skinTone}"/>
              <circle cx="48" cy="58" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'wizard_robes':
    case 'alchemist_robes':
      body = `<ellipse cx="0" cy="55" rx="52" ry="58" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="46" ry="50" fill="${darkPrimary}"/>
              <path d="M-40 10 L-50 70" stroke="${secondary}" stroke-width="8"/>
              <path d="M40 10 L50 70" stroke="${secondary}" stroke-width="8"/>
              <circle cx="0" cy="15" r="8" fill="${trim}"/>
              <path d="M-48 40 Q-58 35 -55 60" fill="${primary}"/>
              <path d="M48 40 Q58 35 55 60" fill="${primary}"/>
              <circle cx="-55" cy="65" r="10" fill="${char.skinTone}"/>
              <circle cx="55" cy="65" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'jester_costume':
      body = `<ellipse cx="0" cy="55" rx="48" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="42" ry="48" fill="${secondary}"/>
              <path d="M-25 0 L0 70" fill="none" stroke="${primary}" stroke-width="20"/>
              <path d="M25 0 L0 70" fill="none" stroke="${secondary}" stroke-width="20"/>
              <circle cx="-5" cy="15" r="5" fill="${trim}"/>
              <circle cx="5" cy="30" r="5" fill="${trim}"/>
              <circle cx="-5" cy="45" r="5" fill="${trim}"/>
              <ellipse cx="-48" cy="35" rx="15" ry="22" fill="${primary}"/>
              <ellipse cx="48" cy="35" rx="15" ry="22" fill="${secondary}"/>
              <circle cx="-52" cy="60" r="10" fill="${char.skinTone}"/>
              <circle cx="52" cy="60" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'priest_cassock':
    case 'monk_robes':
    case 'nun_habit':
      body = `<ellipse cx="0" cy="55" rx="48" ry="58" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="42" ry="50" fill="${darkPrimary}"/>
              <rect x="-6" y="0" width="12" height="50" fill="${secondary}" opacity="0.8"/>
              <ellipse cx="0" cy="5" rx="18" ry="10" fill="${secondary}"/>
              <ellipse cx="-45" cy="38" rx="14" ry="22" fill="${primary}"/>
              <ellipse cx="45" cy="38" rx="14" ry="22" fill="${primary}"/>
              <circle cx="-48" cy="62" r="10" fill="${char.skinTone}"/>
              <circle cx="48" cy="62" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'archbishop_robes':
    case 'bishop_robes':
      body = `<ellipse cx="0" cy="55" rx="52" ry="60" fill="${primary}"/>
              <ellipse cx="0" cy="60" rx="46" ry="52" fill="${darkPrimary}"/>
              <rect x="-10" y="-5" width="20" height="60" fill="${secondary}"/>
              <rect x="-25" y="15" width="50" height="15" fill="${secondary}"/>
              <circle cx="0" cy="22" r="8" fill="${trim}"/>
              <ellipse cx="-50" cy="40" rx="15" ry="24" fill="${primary}"/>
              <ellipse cx="50" cy="40" rx="15" ry="24" fill="${primary}"/>
              <circle cx="-54" cy="66" r="10" fill="${char.skinTone}"/>
              <circle cx="54" cy="66" r="10" fill="${char.skinTone}"/>`;
      break;

    case 'farmer_clothes':
    case 'peasant_tunic':
    case 'woodcutter_clothes':
      body = `<ellipse cx="0" cy="55" rx="45" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="40" ry="48" fill="${darkPrimary}"/>
              <path d="M-20 -5 Q0 5 20 -5 L25 25 Q0 35 -25 25 Z" fill="${secondary}"/>
              <ellipse cx="-45" cy="35" rx="14" ry="22" fill="${primary}"/>
              <ellipse cx="45" cy="35" rx="14" ry="22" fill="${primary}"/>
              <circle cx="-48" cy="60" r="11" fill="${char.skinTone}"/>
              <circle cx="48" cy="60" r="11" fill="${char.skinTone}"/>`;
      break;

    case 'smith_apron':
    case 'butcher_apron':
    case 'tanner_apron':
    case 'cobbler_apron':
    case 'potter_apron':
    case 'builder_apron':
      body = `<ellipse cx="0" cy="55" rx="48" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="42" ry="48" fill="${darkPrimary}"/>
              <path d="M-25 10 L-25 70 L25 70 L25 10 Q0 0 -25 10" fill="${secondary}"/>
              <ellipse cx="-50" cy="38" rx="16" ry="24" fill="${primary}"/>
              <ellipse cx="50" cy="38" rx="16" ry="24" fill="${primary}"/>
              <circle cx="-54" cy="65" r="12" fill="${char.skinTone}"/>
              <circle cx="54" cy="65" r="12" fill="${char.skinTone}"/>`;
      break;

    case 'chef_uniform':
    case 'baker_apron':
      body = `<ellipse cx="0" cy="55" rx="48" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="42" ry="48" fill="${darkPrimary}"/>
              <path d="M-25 5 L-25 70 L25 70 L25 5 Q0 -5 -25 5" fill="${secondary}"/>
              <circle cx="-8" cy="20" r="4" fill="${trim}"/>
              <circle cx="8" cy="20" r="4" fill="${trim}"/>
              <circle cx="-8" cy="35" r="4" fill="${trim}"/>
              <circle cx="8" cy="35" r="4" fill="${trim}"/>
              <ellipse cx="-48" cy="38" rx="14" ry="22" fill="${primary}"/>
              <ellipse cx="48" cy="38" rx="14" ry="22" fill="${primary}"/>
              <circle cx="-52" cy="62" r="11" fill="${char.skinTone}"/>
              <circle cx="52" cy="62" r="11" fill="${char.skinTone}"/>`;
      break;

    case 'barbarian_furs':
      body = `<ellipse cx="0" cy="55" rx="52" ry="58" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="46" ry="50" fill="${darkPrimary}"/>
              <path d="M-30 0 L-20 -10 L0 0 L20 -10 L30 0 L30 30 L-30 30 Z" fill="${secondary}"/>
              <ellipse cx="-52" cy="35" rx="18" ry="26" fill="${primary}"/>
              <ellipse cx="52" cy="35" rx="18" ry="26" fill="${primary}"/>
              <circle cx="-56" cy="65" r="13" fill="${char.skinTone}"/>
              <circle cx="56" cy="65" r="13" fill="${char.skinTone}"/>`;
      break;

    case 'mercenary_armor':
      body = `<ellipse cx="0" cy="52" rx="48" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="56" rx="42" ry="48" fill="${darkPrimary}"/>
              <rect x="-25" y="5" width="50" height="35" fill="${secondary}" rx="2"/>
              <ellipse cx="-48" cy="36" rx="15" ry="22" fill="${primary}"/>
              <ellipse cx="48" cy="36" rx="15" ry="22" fill="${primary}"/>
              <circle cx="-52" cy="60" r="11" fill="${char.skinTone}"/>
              <circle cx="52" cy="60" r="11" fill="${char.skinTone}"/>`;
      break;

    case 'beggar_rags':
      body = `<ellipse cx="0" cy="55" rx="42" ry="52" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="38" ry="45" fill="${darkPrimary}"/>
              <path d="M-20 40 L-25 70" stroke="${secondary}" stroke-width="5"/>
              <path d="M20 45 L18 70" stroke="${secondary}" stroke-width="4"/>
              <ellipse cx="-42" cy="35" rx="12" ry="20" fill="${primary}"/>
              <ellipse cx="42" cy="35" rx="12" ry="20" fill="${primary}"/>
              <circle cx="-45" cy="58" r="10" fill="${char.skinTone}"/>
              <circle cx="45" cy="58" r="10" fill="${char.skinTone}"/>`;
      break;

    default:
      body = `<ellipse cx="0" cy="55" rx="48" ry="55" fill="${primary}"/>
              <ellipse cx="0" cy="58" rx="42" ry="48" fill="${darkPrimary}"/>
              <path d="M-22 -5 Q0 5 22 -5 L28 30 Q0 40 -28 30 Z" fill="${secondary}"/>
              <ellipse cx="-48" cy="38" rx="14" ry="22" fill="${primary}"/>
              <ellipse cx="48" cy="38" rx="14" ry="22" fill="${primary}"/>
              <circle cx="-52" cy="62" r="10" fill="${char.skinTone}"/>
              <circle cx="52" cy="62" r="10" fill="${char.skinTone}"/>`;
  }

  return body;
}

function generateAccessory(char) {
  let acc = '';

  switch(char.accessory) {
    case 'golden_crown':
      acc = `<g transform="translate(0, -58)">
        <path d="M-28 12 L-28 -5 L-18 5 L-8 -8 L0 0 L8 -8 L18 5 L28 -5 L28 12 Z" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <circle cx="-18" cy="2" r="4" fill="#EF4444"/>
        <circle cx="0" cy="-3" r="5" fill="#3B82F6"/>
        <circle cx="18" cy="2" r="4" fill="#22C55E"/>
        <rect x="-28" y="10" width="56" height="8" fill="#FDE047" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'queen_crown':
      acc = `<g transform="translate(0, -55)">
        <path d="M-25 8 L-25 -8 L-15 0 L0 -15 L15 0 L25 -8 L25 8 Z" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <circle cx="0" cy="-10" r="6" fill="#A855F7"/>
        <circle cx="-15" cy="-2" r="3" fill="#EC4899"/>
        <circle cx="15" cy="-2" r="3" fill="#EC4899"/>
        <rect x="-25" y="6" width="50" height="6" fill="#FDE047" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'small_crown':
      acc = `<g transform="translate(0, -52)">
        <path d="M-20 8 L-20 0 L-10 5 L0 -5 L10 5 L20 0 L20 8 Z" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <circle cx="0" cy="-2" r="3" fill="#3B82F6"/>
      </g>`;
      break;

    case 'tiara':
      acc = `<g transform="translate(0, -52)">
        <path d="M-30 5 Q-15 -8 0 -12 Q15 -8 30 5" fill="none" stroke="#FDE047" stroke-width="4"/>
        <circle cx="0" cy="-12" r="5" fill="#FDE047"/>
        <circle cx="0" cy="-12" r="3" fill="#EC4899"/>
        <circle cx="-12" cy="-6" r="2" fill="#FDE047"/>
        <circle cx="12" cy="-6" r="2" fill="#FDE047"/>
      </g>`;
      break;

    case 'wizard_hat':
      acc = `<g transform="translate(0, -55)">
        <path d="M-38 18 L0 -55 L38 18 Z" fill="#1E3A8A" stroke="#FDE047" stroke-width="2"/>
        <ellipse cx="0" cy="18" rx="42" ry="12" fill="#1E3A8A" stroke="#FDE047" stroke-width="2"/>
        <circle cx="10" cy="-25" r="4" fill="#FDE047"/>
        <circle cx="-5" cy="-10" r="3" fill="#FDE047"/>
        <circle cx="15" cy="0" r="3" fill="#FDE047"/>
      </g>`;
      break;

    case 'jester_hat':
      acc = `<g transform="translate(0, -50)">
        <path d="M-30 12 Q-45 -15 -25 -35" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
        <path d="M0 12 Q0 -25 0 -45" fill="#FACC15" stroke="#B45309" stroke-width="2"/>
        <path d="M30 12 Q45 -15 25 -35" fill="#22C55E" stroke="#166534" stroke-width="2"/>
        <circle cx="-25" cy="-35" r="8" fill="#FDE047"/>
        <circle cx="0" cy="-45" r="8" fill="#FDE047"/>
        <circle cx="25" cy="-35" r="8" fill="#FDE047"/>
      </g>`;
      break;

    case 'knight_helmet':
    case 'plumed_helmet':
      acc = `<g transform="translate(0, -15)">
        <ellipse cx="0" cy="-30" rx="48" ry="42" fill="#9CA3AF"/>
        <rect x="-22" y="-25" width="44" height="25" fill="#1C1917"/>
        <line x1="-20" y1="-12" x2="20" y2="-12" stroke="#9CA3AF" stroke-width="2"/>
        <path d="M0 -72 L0 -55" stroke="#6B7280" stroke-width="4"/>
        <ellipse cx="0" cy="-72" rx="10" ry="6" fill="#EF4444"/>
      </g>`;
      break;

    case 'guard_helmet':
    case 'simple_helmet':
      acc = `<g transform="translate(0, -35)">
        <ellipse cx="0" cy="0" rx="45" ry="35" fill="#6B7280"/>
        <path d="M-35 10 L-35 -5 L35 -5 L35 10" fill="#6B7280" stroke="#4B5563" stroke-width="2"/>
        <rect x="-3" y="-5" width="6" height="30" fill="#6B7280"/>
      </g>`;
      break;

    case 'officer_cap':
    case 'feathered_cap':
      acc = `<g transform="translate(0, -48)">
        <ellipse cx="0" cy="8" rx="40" ry="10" fill="${char.outfit.primary}"/>
        <ellipse cx="0" cy="0" rx="35" ry="15" fill="${char.outfit.primary}"/>
        <rect x="-35" y="5" width="70" height="5" fill="#FDE047"/>
        ${char.accessory === 'feathered_cap' ? '<path d="M20 -5 Q35 -25 25 -35" fill="#EF4444" stroke="#B91C1C" stroke-width="1"/>' : ''}
      </g>`;
      break;

    case 'hood_up':
      acc = `<g transform="translate(0, -30)">
        <path d="M-42 35 Q-52 0 0 -40 Q52 0 42 35" fill="${char.outfit.primary}" stroke="${darkenColor(char.outfit.primary, 30)}" stroke-width="2"/>
      </g>`;
      break;

    case 'hood_down':
    case 'hooded_cloak':
      acc = `<g transform="translate(0, 25)">
        <ellipse cx="0" cy="30" rx="55" ry="25" fill="${char.outfit.primary}" opacity="0.8"/>
      </g>`;
      break;

    case 'chef_hat':
      acc = `<g transform="translate(0, -62)">
        <ellipse cx="0" cy="22" rx="38" ry="10" fill="white" stroke="#E5E7EB" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="32" ry="28" fill="white" stroke="#E5E7EB" stroke-width="2"/>
      </g>`;
      break;

    case 'straw_hat':
      acc = `<g transform="translate(0, -52)">
        <ellipse cx="0" cy="12" rx="52" ry="14" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="32" ry="20" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <path d="M-30 5 L30 5" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'horned_helmet':
      acc = `<g transform="translate(0, -35)">
        <ellipse cx="0" cy="0" rx="48" ry="35" fill="#6B7280"/>
        <path d="M-40 -10 Q-55 -45 -35 -55" fill="#78350F" stroke="#451A03" stroke-width="2"/>
        <path d="M40 -10 Q55 -45 35 -55" fill="#78350F" stroke="#451A03" stroke-width="2"/>
      </g>`;
      break;

    case 'mitre':
    case 'bishop_mitre':
      acc = `<g transform="translate(0, -58)">
        <path d="M-28 18 L-28 -5 L0 -40 L28 -5 L28 18 Z" fill="#FDE047" stroke="#B45309" stroke-width="2"/>
        <line x1="0" y1="-35" x2="0" y2="15" stroke="#B45309" stroke-width="3"/>
        <line x1="-22" y1="0" x2="22" y2="0" stroke="#B45309" stroke-width="3"/>
      </g>`;
      break;

    case 'wimple':
      acc = `<g transform="translate(0, -25)">
        <ellipse cx="0" cy="-15" rx="48" ry="38" fill="white"/>
        <path d="M-45 10 Q-50 40 -40 60" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <path d="M45 10 Q50 40 40 60" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <ellipse cx="0" cy="-40" rx="42" ry="18" fill="#1C1917"/>
      </g>`;
      break;

    case 'bee_veil':
      acc = `<g transform="translate(0, -35)">
        <ellipse cx="0" cy="-5" rx="50" ry="40" fill="#FDE047" opacity="0.3" stroke="#B45309" stroke-width="2"/>
        <ellipse cx="0" cy="-20" rx="40" ry="18" fill="#FDE047"/>
      </g>`;
      break;

    case 'monocle':
      acc = `<g transform="translate(20, -8)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#B45309" stroke-width="2"/>
        <circle cx="0" cy="0" r="8" fill="white" opacity="0.3"/>
        <path d="M8 5 Q20 15 15 35" stroke="#B45309" stroke-width="1" fill="none"/>
      </g>`;
      break;

    case 'eyepatch':
      acc = `<g transform="translate(0, -8)">
        <ellipse cx="-14" cy="0" rx="12" ry="10" fill="#1C1917"/>
        <path d="M-26 0 Q-40 -15 -35 -30" stroke="#1C1917" stroke-width="2" fill="none"/>
        <path d="M-2 0 Q15 -20 35 -25" stroke="#1C1917" stroke-width="2" fill="none"/>
      </g>`;
      break;

    case 'goggles':
      acc = `<g transform="translate(0, -8)">
        <ellipse cx="-14" cy="0" rx="14" ry="12" fill="none" stroke="#78350F" stroke-width="3"/>
        <ellipse cx="14" cy="0" rx="14" ry="12" fill="none" stroke="#78350F" stroke-width="3"/>
        <ellipse cx="-14" cy="0" rx="10" ry="8" fill="#A855F7" opacity="0.4"/>
        <ellipse cx="14" cy="0" rx="10" ry="8" fill="#A855F7" opacity="0.4"/>
        <rect x="-2" y="-3" width="4" height="6" fill="#78350F"/>
      </g>`;
      break;

    case 'mask_dagger':
      acc = `<g transform="translate(0, -5)">
        <path d="M-35 -5 L-20 0 L-35 5 Z" fill="#1C1917"/>
        <path d="M35 -5 L20 0 L35 5 Z" fill="#1C1917"/>
        <rect x="-25" y="-3" width="50" height="6" fill="#1C1917"/>
      </g>`;
      break;

    case 'hood_mask':
      acc = `<g transform="translate(0, -20)">
        <ellipse cx="0" cy="-15" rx="48" ry="42" fill="#1C1917"/>
        <ellipse cx="-15" cy="-10" rx="10" ry="8" fill="#374151"/>
        <ellipse cx="15" cy="-10" rx="10" ry="8" fill="#374151"/>
      </g>`;
      break;

    case 'maid_cap':
      acc = `<g transform="translate(0, -50)">
        <ellipse cx="0" cy="5" rx="35" ry="12" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <path d="M-25 0 Q0 -15 25 0" fill="white" stroke="#E5E7EB" stroke-width="1"/>
        <path d="M-20 8 Q-30 15 -25 25" fill="white"/>
        <path d="M20 8 Q30 15 25 25" fill="white"/>
      </g>`;
      break;

    case 'jeweled_headpiece':
      acc = `<g transform="translate(0, -50)">
        <path d="M-35 8 Q0 -5 35 8" fill="none" stroke="#FDE047" stroke-width="3"/>
        <circle cx="0" cy="-2" r="5" fill="#A855F7"/>
        <circle cx="-18" cy="3" r="3" fill="#3B82F6"/>
        <circle cx="18" cy="3" r="3" fill="#22C55E"/>
      </g>`;
      break;

    case 'feathered_hat':
      acc = `<g transform="translate(0, -52)">
        <ellipse cx="0" cy="8" rx="42" ry="12" fill="${char.outfit.primary}"/>
        <ellipse cx="0" cy="-2" rx="35" ry="18" fill="${char.outfit.primary}"/>
        <path d="M25 -5 Q45 -30 30 -45" fill="#EF4444" stroke="#B91C1C" stroke-width="1"/>
        <path d="M28 -8 Q50 -35 35 -50" fill="#22C55E" stroke="#166534" stroke-width="1"/>
      </g>`;
      break;

    case 'crystal_ball':
      acc = `<g transform="translate(35, 50)">
        <circle cx="0" cy="0" r="18" fill="#A855F7" opacity="0.6"/>
        <circle cx="0" cy="0" r="15" fill="#C4B5FD" opacity="0.4"/>
        <circle cx="-5" cy="-5" r="5" fill="white" opacity="0.6"/>
      </g>`;
      break;

    case 'lute':
      acc = `<g transform="translate(-40, 45)">
        <ellipse cx="0" cy="0" rx="15" ry="20" fill="#92400E"/>
        <rect x="-3" y="-35" width="6" height="35" fill="#78350F"/>
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#1C1917"/>
        <line x1="-2" y1="-30" x2="-2" y2="15" stroke="#FDE047" stroke-width="0.5"/>
        <line x1="2" y1="-30" x2="2" y2="15" stroke="#FDE047" stroke-width="0.5"/>
      </g>`;
      break;

    case 'trumpet':
      acc = `<g transform="translate(40, 35)">
        <rect x="-25" y="-3" width="25" height="6" fill="#FDE047"/>
        <ellipse cx="5" cy="0" rx="12" ry="15" fill="#FDE047" stroke="#B45309" stroke-width="1"/>
      </g>`;
      break;

    case 'walking_cane':
    case 'crook':
      acc = `<g transform="translate(45, 30)">
        <path d="M0 0 L0 50" stroke="#78350F" stroke-width="5"/>
        <path d="M0 0 Q-15 -10 -20 0" stroke="#78350F" stroke-width="5" fill="none"/>
      </g>`;
      break;

    case 'pearl_necklace':
      acc = `<g transform="translate(0, 35)">
        <path d="M-25 0 Q0 15 25 0" fill="none" stroke="#E5E7EB" stroke-width="3"/>
        <circle cx="-20" cy="3" r="3" fill="white"/>
        <circle cx="-10" cy="8" r="3" fill="white"/>
        <circle cx="0" cy="10" r="4" fill="white"/>
        <circle cx="10" cy="8" r="3" fill="white"/>
        <circle cx="20" cy="3" r="3" fill="white"/>
      </g>`;
      break;

    case 'rag_doll':
      acc = `<g transform="translate(-40, 55)">
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#FDE7C7"/>
        <ellipse cx="0" cy="12" rx="6" ry="10" fill="#EC4899"/>
        <circle cx="-3" cy="-2" r="2" fill="#1C1917"/>
        <circle cx="3" cy="-2" r="2" fill="#1C1917"/>
      </g>`;
      break;

    default:
      acc = '';
  }

  return acc;
}

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

  console.log('Generating unique character placeholders...\n');

  castleCharacters.forEach(char => {
    const svg = generateCharacterSVG(char, 'castle');
    fs.writeFileSync(path.join(castleDir, `${char.name}.svg`), svg);
    console.log(`✓ castle/${char.name}.svg (${char.gender}, ${char.age || 'adult'})`);
  });

  villageCharacters.forEach(char => {
    const svg = generateCharacterSVG(char, 'village');
    fs.writeFileSync(path.join(villageDir, `${char.name}.svg`), svg);
    console.log(`✓ village/${char.name}.svg (${char.gender}, ${char.age || 'adult'})`);
  });

  console.log(`\n✅ Generated ${castleCharacters.length + villageCharacters.length} unique character placeholders!`);
}

generate();
