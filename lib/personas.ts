export interface Persona {
    id: string;
    name: string;
    description: string; // Max 100 chars, UNHINGED persona's voice
    imageUrl: string; // Added image URL
    traits: string[];
    moods: string[];
    artists: string[]; // 5-10 key artists
}

export const personas: Persona[] = [
  {
      id: 'persona-1-alt-experimental',
      name: 'The Terminally Online Alt/Experimentalist',
      description: 'Your Spotify Wrapped is basic trash. I liked Death Grips before Fantano.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/1/64/64', // Placeholder
      traits: ['experimental', 'noise', 'industrial', 'hyperpop', 'glitchcore', 'avant-garde', 'underground', 'anti-pop', 'challenging', 'dissonant', 'online', 'niche', 'DIY'],
      moods: ['rebellious', 'chaotic', 'intense', 'curious', 'alienated', 'analytical', 'nihilistic'], // Added nihilistic
      artists: ['Death Grips', '100 gecs', 'JPEGMAFIA', 'Arca', 'Black Midi', 'Yves Tumor', 'Injury Reserve', 'Swans']
  },
  {
      id: 'persona-2-modern-country',
      name: 'The Modern Country Loyalist',
      description: 'My truck\'s tears rust faster than my liver fails. Play the sad twangy song \'bout beer again.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/2/64/64', // Placeholder
      traits: ['country', 'contemporary country', 'nashville sound', 'country pop', 'americana', 'storytelling', 'radio country', 'relatable', 'heartfelt', 'patriotic', 'beer-soaked'], // Added beer-soaked
      moods: ['nostalgic', 'heartbroken', 'proud', 'relaxed', 'social', 'sentimental', 'self-pitying'], // Added self-pitying
      artists: ['Zach Bryan', 'Morgan Wallen', 'Lainey Wilson', 'Chris Stapleton', 'Tyler Childers', 'Cody Johnson', 'HARDY', 'Kacey Musgraves']
  },
  {
    id: 'persona-3a-rock-purist',
    name: 'The Rock Purist Boomer-in-Training',
    description: 'Modern music\'s a joke. Give me riffs stolen straight from the 70s and a solo that melts my face off.',
    imageUrl: 'https://picsum.photos/id/3/64/64', // Placeholder
    traits: ['classic rock revival', 'arena rock', 'guitar worship', 'boomer-core', 'throwback energy', 'analog over digital'],
    moods: ['nostalgic', 'defiant', 'proud', 'righteous', 'air-guitaring in the driveway'],
    artists: ['Greta Van Fleet', 'Dirty Honey', 'Rival Sons', 'The Struts', 'Wolfmother', 'The Black Keys', 'Royal Blood']
  },
  {
    id: 'persona-3b-nu-metal-freak',
    name: 'The Nu-Metal Relapse Kid',
    description: 'Still pissed off and wearing JNCOs. Limp Bizkit lives rent free in my skull. Everything is nü again.',
    imageUrl: 'https://picsum.photos/id/4/64/64', // Placeholder
    traits: ['nu-metal', 'aggro rap-rock', 'angst overload', 'chains and wallet-core', 'mosh pit nostalgia', 'break stuff energy'],
    moods: ['angsty', 'pissed', 'hyped', 'ready-to-fight', 'chaotic'],
    artists: ['Korn', 'Slipknot', 'Linkin Park', 'Limp Bizkit', 'Deftones', 'P.O.D.', 'Drowning Pool', 'System of a Down']
  },
  {
    id: 'persona-3c-hardcore-mosher',
    name: 'The Hardcore Pit Demon',
    description: 'Two-step, spin-kick, stage-dive, repeat. If you\'re not bleeding, you\'re doing it wrong.',
    imageUrl: 'https://picsum.photos/id/5/64/64', // Placeholder
    traits: ['hardcore', 'metalcore', 'post-hardcore', 'beatdown', 'mosh fuel', 'breakdowns galore'],
    moods: ['violent', 'furious', 'adrenaline high', 'unstoppable', 'raging', 'brotherhood mode'],
    artists: ['Turnstile', 'Knocked Loose', 'Jesus Piece', 'Harm\'s Way', 'Code Orange', 'Drain', 'Terror', 'Gulch']
  },
  {
      id: 'persona-4-indie-flower', // Shortened ID
      name: 'The Sundress & Flower Crown Indie',
      description: 'Yeah I like flowers. And staring blankly at walls listening to sad whispers. It\'s called AESTHETIC.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/6/64/64', // Placeholder
      traits: ['indie', 'chill', 'atmospheric', 'mellow', 'lo-fi', 'bedroom pop', 'dream pop', 'vibes', 'alternative', 'melancholic', 'introspective', 'aesthetic', 'whimsical', 'twee'], // Added twee
      moods: ['relaxed', 'introspective', 'calm', 'dreamy', 'melancholy', 'cozy', 'whimsical', 'romantic', 'gentle', 'dissociative'], // Added dissociative
      artists: ['Tame Impala', 'Phoebe Bridgers', 'Bon Iver', 'Mac DeMarco', 'Clairo', 'Men I Trust', 'Khruangbin', 'Still Woozy', 'Faye Webster']
  },
  {
      id: 'persona-5a-conscious-rap', // Shortened ID
      name: 'The Conscious & Lyrical Listener',
      description: 'My brain requires bars that dissect society, not just mumble about lean. Feed me TRUTH, damn it!', // UNHINGED
      imageUrl: 'https://picsum.photos/id/7/64/64', // Placeholder
      traits: ['hip hop', 'rap', 'lyrical', 'conscious', 'boom bap', 'storytelling', 'wordplay', 'jazz rap', 'east coast', 'complex', 'substance', 'woke (unironically)'], // Added woke
      moods: ['analytical', 'thoughtful', 'inspired', 'focused', 'nostalgic (90s)', 'confident', 'righteous'], // Added righteous
      artists: ['Kendrick Lamar', 'J. Cole', 'Little Simz', 'Freddie Gibbs', 'Joey Bada$$', 'Run The Jewels', 'Denzel Curry', 'Vince Staples']
  },
  {
      id: 'persona-5b-drill-trap', // Shortened ID
      name: 'Drillers & Trappers',
      description: 'Need 808s that rearrange my organs. Drill beats that make pigeons explode. Raw energy ONLY.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/8/64/64', // Placeholder
      traits: ['hip hop', 'rap', 'trap', 'melodic rap', 'drill', '808s', 'energy', 'bass-heavy', 'hype', 'regional rap', 'raw', 'menacing'], // Added menacing
      moods: ['energetic', 'hype', 'confident', 'rebellious', 'driving', 'gritty', 'intimidating', 'menacing'], // Added menacing again for mood
      artists: ['Travis Scott', 'Playboi Carti', 'Future', 'Lil Baby', 'Yeat', 'Central Cee', 'Fivio Foreign', 'Pop Smoke']
  },
  {
      id: 'persona-6-pop-girlie', // Shortened ID
      name: 'The Pop Girlie',
      description: 'Inject Taylor & Ari directly into my veins! My personality is pure pop sugar & stan twitter rage.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/9/64/64', // Placeholder
      traits: ['pop', 'top 40', 'mainstream', 'catchy', 'upbeat', 'dance pop', 'radio hit', 'viral', 'feel-good', 'polished', 'stan culture', 'fangirl', 'terminally online'], // Added terminally online
      moods: ['happy', 'energetic', 'romantic', 'carefree', 'dancing', 'social', 'obsessed', 'giddy', 'manic'], // Added manic
      artists: ['Taylor Swift', 'Dua Lipa', 'SZA', 'Olivia Rodrigo', 'The Weeknd', 'Sabrina Carpenter', 'Chappell Roan', 'Doja Cat', 'Harry Styles']
  },
  {
      id: 'persona-7-global-rhythms',
      name: 'The Global Rhythms Explorer',
      description: 'Earth\'s playlist is HUGE. Why stick to one boring corner? Gimme K-Pop idols & Afrobeats gods NOW.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/10/64/64', // Placeholder
      traits: ['global', 'world music', 'k-pop', 'afrobeats', 'latin pop', 'reggaeton', 'international', 'rhythmic', 'diverse', 'cultural', 'polylingual'], // Added polylingual
      moods: ['energetic', 'dancing', 'curious', 'happy', 'exotic', 'celebratory', 'adventurous'], // Added adventurous
      artists: ['BTS', 'Bad Bunny', 'Burna Boy', 'BLACKPINK', 'Karol G', 'Rema', 'NewJeans', 'Rosalía']
  },
  {
      id: 'persona-8-bass-head', // Shortened ID
      name: 'The Bass Headbanger',
      description: 'Baptize me in bass heavier than a black hole. I wanna headbang \'til my neck becomes spaghetti.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/11/64/64', // Placeholder
      traits: ['EDM', 'electronic', 'bass music', 'dubstep', 'riddim', 'headbanging', 'rail breaker', 'filthy', 'heavy', 'intense', 'bass cannon', 'brain-melting'], // Added brain-melting
      moods: ['aggressive', 'intense', 'energetic', 'cathartic', 'headbanging', 'mosh pit', 'hype', 'destructive'], // Added destructive
      artists: ['Subtronics', 'Excision', 'SVDDEN DEATH', 'Marauda', 'Liquid Stranger', 'Ganja White Night', 'Wooli', 'Kai Wachi', 'Space Laces']
  }
];