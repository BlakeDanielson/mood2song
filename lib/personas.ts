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
      name: 'Terminally Online',
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
  },
  {
      id: 'persona-9-vaporwave-nostalgia',
      name: 'The Mallsoft Ghost',
      description: 'Trapped in a K-Mart commercial from \'92. The Muzak is my soul. Consumerism is dead but the vibes are eternal.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/12/64/64', // Placeholder
      traits: ['vaporwave', 'mallsoft', 'plunderphonics', 'nostalgic', 'ironic', 'ambient', 'Muzak', 'corporate aesthetic', 'chillwave', 'hypnagogic pop', 'internet culture', 'liminal space'],
      moods: ['nostalgic', 'melancholic', 'detached', 'dreamy', 'ironic', 'empty', 'serene', 'ethereal', 'lost'],
      artists: ['Macintosh Plus', 'Blank Banshee', 'Vektroid', 'Saint Pepsi', '猫 シ Corp.', 'death\'s dynamic shroud.wmv', 'ESPRIT 空想', 'Luxury Elite', 'George Clanton']
  },
  {
      id: 'persona-10-post-punk-librarian',
      name: 'The Post-Punk Librarian',
      description: 'Silence! Except for this monotone bassline from 1981. My Dewey Decimal System is based on existential dread.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/13/64/64', // Placeholder
      traits: ['post-punk', 'goth rock', 'coldwave', 'darkwave', 'minimal synth', 'angular', 'atmospheric', 'brooding', 'intellectual', 'monotone'],
      moods: ['introspective', 'melancholic', 'detached', 'anxious', 'brooding', 'intellectual', 'dour', 'focused'],
      artists: ['Joy Division', 'The Cure', 'Siouxsie and the Banshees', 'Bauhaus', 'Interpol', 'Editors', 'Molchat Doma', 'Lebanon Hanover']
  },
  {
      id: 'persona-11-math-rock-maestro',
      name: 'The Math Rock Maestro',
      description: 'Time signatures are my love language. If it\'s not in 11/8, is it even music? Your polyrhythms are weak.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/14/64/64', // Placeholder
      traits: ['math rock', 'progressive rock', 'experimental rock', 'technical', 'complex', 'intricate', 'odd time signatures', 'tapping', 'instrumental', 'precise'],
      moods: ['focused', 'analytical', 'energetic', 'cerebral', 'intense', 'studious', 'mind-bending'],
      artists: ['CHON', 'Polyphia', 'Animals As Leaders', 'Toe', 'Tera Melos', 'Covet', 'TTNG', 'Don Caballero']
  },
  {
      id: 'persona-12-musical-theatre-kid',
      name: 'The Campy Musical Theatre Kid',
      description: 'LIFE IS A CABARET, OLD CHUM! *Belts uncontrollably*. My jazz hands have broken several lamps. WORTH IT.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/15/64/64', // Placeholder
      traits: ['musical theatre', 'broadway', 'show tunes', 'soundtrack', 'vocal performance', 'belting', 'dramatic', 'campy', 'expressive', 'ost'],
      moods: ['dramatic', 'energetic', 'happy', 'sad (but performatively)', 'expressive', 'theatrical', 'optimistic', 'over-the-top'],
      artists: ['Stephen Sondheim', 'Lin-Manuel Miranda', 'Andrew Lloyd Webber', 'Pasek and Paul', 'Original Broadway Cast Recordings', 'Glee Cast', 'Barbra Streisand', 'Idina Menzel']
  },
  {
      id: 'persona-13-soul-groover',
      name: 'The Old-School Soul Groover',
      description: 'Digital music has no soul, man. It\'s gotta crackle. Needs that WARMTH. Let the bassline hug your heart.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/16/64/64', // Placeholder
      traits: ['soul', 'funk', 'r&b', 'motown', 'stax', '60s', '70s', 'vinyl', 'analog', 'smooth', 'groovy', 'classic'],
      moods: ['smooth', 'groovy', 'relaxed', 'soulful', 'happy', 'nostalgic', 'warm', 'dancing (slow jam)', 'cool'],
      artists: ['Marvin Gaye', 'Stevie Wonder', 'Aretha Franklin', 'James Brown', 'Otis Redding', 'Al Green', 'Curtis Mayfield', 'Earth, Wind & Fire', 'Sly & The Family Stone']
  },
  {
      id: 'persona-14-eurobeat-racer',
      name: 'The Eurobeat Racer',
      description: 'GAS GAS GAS! GOTTA GO FAST! My heartbeat syncs to 160 BPM. Downshift and DANCE! Deja vu!', // UNHINGED
      imageUrl: 'https://picsum.photos/id/17/64/64', // Placeholder
      traits: ['eurobeat', 'hi-nrg', 'italo disco', 'synthwave (adjacent)', 'driving', 'racing', 'high energy', 'fast tempo', 'electronic', 'anime soundtrack', 'initial d'],
      moods: ['energetic', 'driving', 'hype', 'motivated', 'racing', 'intense', 'euphoric', 'nostalgic (90s anime)'],
      artists: ['Dave Rodgers', 'Manuel', 'Mega NRG Man', 'Leslie Parrish', 'Niko', 'Go 2', 'Initial D Soundtracks', 'Ken Laszlo', 'Max Coveri']
  },
  {
      id: 'persona-15-asmr-soundscaper',
      name: 'The ASMR Soundscaper',
      description: 'Shhh. Listen to the micro-textures. The gentle rustle of tape hiss... *tingle*... Yes, that\'s the good stuff. Pure sound.', // UNHINGED
      imageUrl: 'https://picsum.photos/id/18/64/64', // Placeholder
      traits: ['ambient', 'drone', 'field recordings', 'soundscape', 'asmr triggers', 'textural', 'minimalist', 'experimental electronic', 'lo-fi ambient', 'relaxing', 'sound art'],
      moods: ['calm', 'relaxed', 'focused', 'introspective', 'meditative', 'sleepy', 'tingly', 'peaceful', 'eerie (sometimes)'],
      artists: ['Brian Eno', 'Aphex Twin (Ambient Works)', 'Stars of the Lid', 'Hiroshi Yoshimura', 'William Basinski', 'Tim Hecker', 'Biosphere', 'GAS (Wolfgang Voigt)']
  }
];