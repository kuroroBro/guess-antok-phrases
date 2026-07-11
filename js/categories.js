// Built-in phrase categories for Antok Phrases.
// Each category: { id, name, language: 'tagalog'|'english', puzzles }
// Each puzzle: { prompt, answer, difficulty }
//
// The prompt is phonetic gibberish shown to everyone. It should be solved by
// reading it out loud, not by interpreting its written meaning. The answer is
// kept Host-only and must stay plain A-Z + spaces so letter tiles remain simple.
//
// Every prompt below is built from real, plain words (or a short set of
// intuitive filler syllables like "duh"/"uh"/"ee" also used throughout) so a
// Host can read it aloud correctly on the first try — the earlier version of
// this file leaned on invented spellings (e.g. "SEER E US", "FOURSS",
// "CHALK LETS") that don't map cleanly to any sound, plus a handful of
// entries where the prompt and answer didn't actually match in word count or
// sound at all (see plan.md Changelog v2 for the full list of fixes).

export const CATEGORIES = [
  {
    id: 'movie-lines-en',
    name: 'Movie Lines',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'EEL BEE BACK', answer: 'ILL BE BACK', difficulty: 'easy' },
      { prompt: 'WHY SO CEREAL', answer: 'WHY SO SERIOUS', difficulty: 'easy' },
      { prompt: 'YEW TALK KING TWO ME', answer: 'YOU TALKING TO ME', difficulty: 'easy' },
      { prompt: 'MAY THE FOURTH BEE WHIFF YEW', answer: 'MAY THE FORCE BE WITH YOU', difficulty: 'easy' },
      // medium
      { prompt: 'HUE STUN WE HALVE A PROBE LUM', answer: 'HOUSTON WE HAVE A PROBLEM', difficulty: 'medium' },
      { prompt: 'LIFE IS LIKE A BEE OX OF CHOCK LATTES', answer: 'LIFE IS LIKE A BOX OF CHOCOLATES', difficulty: 'medium' },
      { prompt: 'THEIRS NO PLAICE LIKE HOME', answer: 'THERES NO PLACE LIKE HOME', difficulty: 'medium' },
      { prompt: 'EYE SEA DEAD PEA POOL', answer: 'I SEE DEAD PEOPLE', difficulty: 'medium' },
      // hard
      { prompt: 'ELEMENT AIRY MY DEER WATT SUN', answer: 'ELEMENTARY MY DEAR WATSON', difficulty: 'hard' },
      { prompt: 'LUKE EYE AM YOUR FODDER', answer: 'LUKE I AM YOUR FATHER', difficulty: 'hard' },
      { prompt: 'HAIRS LOOK KING AT EWE KID', answer: 'HERES LOOKING AT YOU KID', difficulty: 'hard' },
      { prompt: 'TWO IN FIN UH TEE AND BEE YAWNED', answer: 'TO INFINITY AND BEYOND', difficulty: 'hard' },
    ],
  },
  {
    id: 'sayings-en',
    name: 'Famous Sayings',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'EYE LUFF EWE', answer: 'I LOVE YOU', difficulty: 'easy' },
      { prompt: 'WANTS A PAWN UH THYME', answer: 'ONCE UPON A TIME', difficulty: 'easy' },
      { prompt: 'BRAKE A LEG', answer: 'BREAK A LEG', difficulty: 'easy' },
      { prompt: 'PEAS OF CAKE', answer: 'PIECE OF CAKE', difficulty: 'easy' },
      // medium
      { prompt: 'BYTE DUH BULL IT', answer: 'BITE THE BULLET', difficulty: 'medium' },
      { prompt: 'SPIEL DUH BEANS', answer: 'SPILL THE BEANS', difficulty: 'medium' },
      { prompt: 'HIT DUH SAKS', answer: 'HIT THE SACK', difficulty: 'medium' },
      { prompt: 'UNDER DUH WHETHER', answer: 'UNDER THE WEATHER', difficulty: 'medium' },
      // hard
      { prompt: 'TOO BEE OAR KNOT TOO BEE', answer: 'TO BE OR NOT TO BE', difficulty: 'hard' },
      { prompt: 'DUH PEN IS MITE EE UR DEN DUH SOARED', answer: 'THE PEN IS MIGHTIER THAN THE SWORD', difficulty: 'hard' },
      { prompt: 'ALL THAT GLITTERS IS KNOT GOALED', answer: 'ALL THAT GLITTERS IS NOT GOLD', difficulty: 'hard' },
      { prompt: 'FOR TUNE FAVORS DUH BOWLED', answer: 'FORTUNE FAVORS THE BOLD', difficulty: 'hard' },
    ],
  },
  {
    id: 'music-pop-en',
    name: 'Songs & Pop',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'LIT IT GO', answer: 'LET IT GO', difficulty: 'easy' },
      { prompt: 'BEE OUR GUESSED', answer: 'BE OUR GUEST', difficulty: 'easy' },
      { prompt: 'HELL OH FROM THE OTTER SIGHED', answer: 'HELLO FROM THE OTHER SIDE', difficulty: 'easy' },
      { prompt: 'CALL ME MAY BEE', answer: 'CALL ME MAYBE', difficulty: 'easy' },
      // medium
      { prompt: 'DONT STOP BEE LEAFING', answer: 'DONT STOP BELIEVING', difficulty: 'medium' },
      { prompt: 'SUITE CAROL LINE', answer: 'SWEET CAROLINE', difficulty: 'medium' },
      { prompt: 'KNOW WOE MEN KNOW CRY', answer: 'NO WOMAN NO CRY', difficulty: 'medium' },
      { prompt: 'EYE OF THE TIE GER', answer: 'EYE OF THE TIGER', difficulty: 'medium' },
      // hard
      { prompt: 'WE WILL ROCK CHEW', answer: 'WE WILL ROCK YOU', difficulty: 'hard' },
      { prompt: 'EYE WONT IT DAT WEIGH', answer: 'I WANT IT THAT WAY', difficulty: 'hard' },
      { prompt: 'DAN SING QUEEN', answer: 'DANCING QUEEN', difficulty: 'hard' },
      { prompt: 'HIT ME BAY BEE WON MOOR THYME', answer: 'HIT ME BABY ONE MORE TIME', difficulty: 'hard' },
    ],
  },
  {
    id: 'party-chaos-en',
    name: 'Party Chaos',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'KNOW PEE KING', answer: 'NO PEEKING', difficulty: 'easy' },
      { prompt: 'PASS DUH MY CRO PHONE', answer: 'PASS THE MICROPHONE', difficulty: 'easy' },
      { prompt: 'THYME IZ UP PEN SILLS DOWN', answer: 'TIMES UP PENCILS DOWN', difficulty: 'easy' },
      { prompt: 'RED IT OUT LOUD', answer: 'READ IT OUT LOUD', difficulty: 'easy' },
      // medium
      { prompt: 'HOOZ TERN IS IT ANY WEIGH', answer: 'WHOSE TURN IS IT ANYWAY', difficulty: 'medium' },
      { prompt: 'SAY WUT UH GEN', answer: 'SAY WHAT AGAIN', difficulty: 'medium' },
      { prompt: 'DUH AN SIR IS RITE THERE', answer: 'THE ANSWER IS RIGHT THERE', difficulty: 'medium' },
      { prompt: 'THINK PASSED DONT BLY INK', answer: 'THINK FAST DONT BLINK', difficulty: 'medium' },
      // hard
      { prompt: 'AB SO LOOT NON SENSE', answer: 'ABSOLUTE NONSENSE', difficulty: 'hard' },
      { prompt: 'KAY OSS IS UH LAD HER', answer: 'CHAOS IS A LADDER', difficulty: 'hard' },
      { prompt: 'LIS TEN WHIFF YER AIRS', answer: 'LISTEN WITH YOUR EARS', difficulty: 'hard' },
      { prompt: 'DUH KLOK IS TICK KING', answer: 'THE CLOCK IS TICKING', difficulty: 'hard' },
    ],
  },
  {
    id: 'pinoy-lines',
    name: 'Pinoy Lines',
    language: 'tagalog',
    puzzles: [
      // easy
      { prompt: 'MA HALL KEY TAH', answer: 'MAHAL KITA', difficulty: 'easy' },
      { prompt: 'WAH LANG FOUR EVER', answer: 'WALANG FOREVER', difficulty: 'easy' },
      { prompt: 'BA HAY COO BOW', answer: 'BAHAY KUBO', difficulty: 'easy' },
      { prompt: 'TA BEE TA BEE POH', answer: 'TABI TABI PO', difficulty: 'easy' },
      // medium
      { prompt: 'WAH LANG HE MAH LAH', answer: 'WALANG HIMALA', difficulty: 'medium' },
      { prompt: 'HIN DEE KEY TAH MA REACH', answer: 'HINDI KITA MA REACH', difficulty: 'medium' },
      { prompt: 'UNG BUH HAY EYE WED ER WED ER LAHNG', answer: 'ANG BUHAY AY WEATHER WEATHER LANG', difficulty: 'medium' },
      { prompt: 'BAH KIT MAH LOONG COT UNG BESH EE KOH', answer: 'BAKIT MALUNGKOT ANG BESHY KO', difficulty: 'medium' },
      // hard
      { prompt: 'TIE YO NASA ANTI POLO', answer: 'TAYO NA SA ANTIPOLO', difficulty: 'hard' },
      { prompt: 'NA SUNK AH MA ROO JA', answer: 'NASAAN KA MARUJA', difficulty: 'hard' },
      { prompt: 'A KNOCK', answer: 'ANAK', difficulty: 'hard' },
      { prompt: 'HE TOE UNG GOOS TOH KOH', answer: 'ITO ANG GUSTO KO', difficulty: 'hard' },
    ],
  },
  {
    id: 'pinoy-party',
    name: 'Pinoy Party',
    language: 'tagalog',
    puzzles: [
      // easy
      { prompt: 'PWEH DEH NAH YARN', answer: 'PWEDE NA YAN', difficulty: 'easy' },
      { prompt: 'KAH EEN NAH', answer: 'KAIN NA', difficulty: 'easy' },
      { prompt: 'SAN DALLY LAHNG', answer: 'SANDALI LANG', difficulty: 'easy' },
      { prompt: 'EENG GAT KAH', answer: 'INGAT KA', difficulty: 'easy' },
      // medium
      { prompt: 'AH NOH BAH YARN', answer: 'ANO BA YAN', difficulty: 'medium' },
      { prompt: 'GAYM NAH BAH', answer: 'GAME NA BA', difficulty: 'medium' },
      { prompt: 'KOO HA MOH BAH TOH', answer: 'KUHA MO BA TO', difficulty: 'medium' },
      { prompt: 'LAH GOT KAH KAI HAUST', answer: 'LAGOT KA KAY HOST', difficulty: 'medium' },
      // hard
      { prompt: 'HOO LAAN MOH UNG SA GOT', answer: 'HULAAN MO ANG SAGOT', difficulty: 'hard' },
      { prompt: 'BA SAH HIN MOH NANG MAH LAH KAS', answer: 'BASAHIN MO NANG MALAKAS', difficulty: 'hard' },
      { prompt: 'PA RAW KAHNG AN TALK NAH AN TALK', answer: 'PARA KANG ANTOK NA ANTOK', difficulty: 'hard' },
      { prompt: 'SEE GAW MOH KOONG AH LAM MOH', answer: 'SIGAW MO KUNG ALAM MO', difficulty: 'hard' },
    ],
  },
];
