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
      { prompt: 'EEL BEE BAKK', answer: 'ILL BE BACK', difficulty: 'easy' },
      { prompt: 'WHAI SEW CEREAL', answer: 'WHY SO SERIOUS', difficulty: 'easy' },
      { prompt: 'YEW TALK KING TWO MEE', answer: 'YOU TALKING TO ME', difficulty: 'easy' },
      { prompt: 'MAI DUH FOURTH BEE WHIFF YEW', answer: 'MAY THE FORCE BE WITH YOU', difficulty: 'easy' },
      // medium
      { prompt: 'HUE STUN WEE HALVE UH PROBE LUM', answer: 'HOUSTON WE HAVE A PROBLEM', difficulty: 'medium' },
      { prompt: 'LYFE IZ LYKE UH BEE OX UV CHOCK LATTES', answer: 'LIFE IS LIKE A BOX OF CHOCOLATES', difficulty: 'medium' },
      { prompt: 'THEIRS KNOW PLAICE LYKE HOAM', answer: 'THERES NO PLACE LIKE HOME', difficulty: 'medium' },
      { prompt: 'EYE SEA DEDD PEA POOL', answer: 'I SEE DEAD PEOPLE', difficulty: 'medium' },
      // hard
      { prompt: 'LEWK EYE AHM YER FODDER', answer: 'LUKE I AM YOUR FATHER', difficulty: 'hard' },
      { prompt: 'TWO IN FIN UH TEE N BEE YAWNED', answer: 'TO INFINITY AND BEYOND', difficulty: 'hard' },
    ],
  },
  {
    id: 'sayings-en',
    name: 'Famous Sayings',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'EYE LUFF EWE', answer: 'I LOVE YOU', difficulty: 'easy' },
      { prompt: 'WANTS UH PAWN UH THYME', answer: 'ONCE UPON A TIME', difficulty: 'easy' },
      { prompt: 'BRAKE UH LEGG', answer: 'BREAK A LEG', difficulty: 'easy' },
      { prompt: 'PEAS UV KAYK', answer: 'PIECE OF CAKE', difficulty: 'easy' },
      // medium
      { prompt: 'SPIEL DUH BEENZ', answer: 'SPILL THE BEANS', difficulty: 'medium' },
      { prompt: 'UHN DER DUH WHETHER', answer: 'UNDER THE WEATHER', difficulty: 'medium' },
      // hard
      { prompt: 'TOO BEE OAR KNOT TOO BEE', answer: 'TO BE OR NOT TO BE', difficulty: 'hard' },
      { prompt: 'DUH PENN IZ MITE EE UR DEN DUH SOARED', answer: 'THE PEN IS MIGHTIER THAN THE SWORD', difficulty: 'hard' },
      { prompt: 'AWL DAT GLIT TERZ IZ KNOT GOALED', answer: 'ALL THAT GLITTERS IS NOT GOLD', difficulty: 'hard' },
      { prompt: 'FOR TUNE FAY VORS DUH BOWLED', answer: 'FORTUNE FAVORS THE BOLD', difficulty: 'hard' },
    ],
  },
  {
    id: 'music-pop-en',
    name: 'Songs & Pop',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'LIT ITT GOH', answer: 'LET IT GO', difficulty: 'easy' },
      { prompt: 'BEE OWER GUESSED', answer: 'BE OUR GUEST', difficulty: 'easy' },
      { prompt: 'HELL OH FRUM DUH OTTER SIGHED', answer: 'HELLO FROM THE OTHER SIDE', difficulty: 'easy' },
      { prompt: 'KAWL MEE MAY BEE', answer: 'CALL ME MAYBE', difficulty: 'easy' },
      // medium
      { prompt: 'DOHNT STAHP BEE LEAFING', answer: 'DONT STOP BELIEVING', difficulty: 'medium' },
      { prompt: 'SUITE CAROL LINE', answer: 'SWEET CAROLINE', difficulty: 'medium' },
      { prompt: 'KNOW WOE MEN KNOW KRY', answer: 'NO WOMAN NO CRY', difficulty: 'medium' },
      { prompt: 'AYE UV DUH TIE GER', answer: 'EYE OF THE TIGER', difficulty: 'medium' },
      // hard
      { prompt: 'WEE WIHL RAHK CHEW', answer: 'WE WILL ROCK YOU', difficulty: 'hard' },
      { prompt: 'EYE WONT ITT DAT WEIGH', answer: 'I WANT IT THAT WAY', difficulty: 'hard' },
      { prompt: 'DAN SING KWEEN', answer: 'DANCING QUEEN', difficulty: 'hard' },
      { prompt: 'HITT MEE BAY BEE WON MOOR THYME', answer: 'HIT ME BABY ONE MORE TIME', difficulty: 'hard' },
    ],
  },
  {
    id: 'party-chaos-en',
    name: 'Party Chaos',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'KNOW PEE KING', answer: 'NO PEEKING', difficulty: 'easy' },
      { prompt: 'PUSH DONT MY CHIFFON', answer: 'PASS THE MICROPHONE', difficulty: 'easy' },
      { prompt: 'THYME IZ UHP PEN SILLS DOWNE', answer: 'TIMES UP PENCILS DOWN', difficulty: 'easy' },
      { prompt: 'READY AWE LAW', answer: 'READ IT OUT LOUD', difficulty: 'easy' },
      // medium
      { prompt: 'HOOZ TERN IZ ITT ANY WEIGH', answer: 'WHOSE TURN IS IT ANYWAY', difficulty: 'medium' },
      { prompt: 'SEY WUT UH GEN', answer: 'SAY WHAT AGAIN', difficulty: 'medium' },
      { prompt: 'DUH AN SIR IZ RITE THAIR', answer: 'THE ANSWER IS RIGHT THERE', difficulty: 'medium' },
      { prompt: 'THINGK PASSED DOHNT BLY INK', answer: 'THINK FAST DONT BLINK', difficulty: 'medium' },
      // hard
      { prompt: 'AB SO LOOT NON SENSE', answer: 'ABSOLUTE NONSENSE', difficulty: 'hard' },
      { prompt: 'KAY OSS IZ UH LAD HER', answer: 'CHAOS IS A LADDER', difficulty: 'hard' },
      { prompt: 'LIS TEN WHIFF YER AIRS', answer: 'LISTEN WITH YOUR EARS', difficulty: 'hard' },
      { prompt: 'DUH KLOK IZ TICK KING', answer: 'THE CLOCK IS TICKING', difficulty: 'hard' },
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
      { prompt: 'HIN DEE KEY TAH MAH REETSH', answer: 'HINDI KITA MA REACH', difficulty: 'medium' },
      { prompt: 'UNG BUH HAY EYE WED ER WED ER LAHNG', answer: 'ANG BUHAY AY WEATHER WEATHER LANG', difficulty: 'medium' },
      { prompt: 'BAH KIT MAH LOONG COT UNG BESH EE KOH', answer: 'BAKIT MALUNGKOT ANG BESHY KO', difficulty: 'medium' },
      // hard
      { prompt: 'TIE YO NASA ANTI POLO', answer: 'TAYO NA SA ANTIPOLO', difficulty: 'hard' },
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
      // hard
      { prompt: 'HOO LAAN MOH UNG SA GOT', answer: 'HULAAN MO ANG SAGOT', difficulty: 'hard' },
      { prompt: 'BA SAH HIN MOH NAHNG MAH LAH KAS', answer: 'BASAHIN MO NANG MALAKAS', difficulty: 'hard' },
      { prompt: 'PA RAW KAHNG AN TALK NAH AN TALK', answer: 'PARA KANG ANTOK NA ANTOK', difficulty: 'hard' },
      { prompt: 'SEE GAW MOH KOONG AH LAM MOH', answer: 'SIGAW MO KUNG ALAM MO', difficulty: 'hard' },
    ],
  },
  {
    id: 'pop-culture-en',
    name: 'Pop Culture Mashup',
    language: 'english',
    puzzles: [
      // easy
      { prompt: 'CROUP MISS ITCH', answer: 'GROUP MESSAGE', difficulty: 'easy' },
      { prompt: 'HIGHS CREEK KOHN', answer: 'ICE CREAM CONE', difficulty: 'easy' },
      { prompt: 'PAROAH SIGHT IT', answer: 'PARASITE', difficulty: 'easy' },
      { prompt: 'PHASE FOLK', answer: 'FACEBOOK', difficulty: 'easy' },
      { prompt: 'MARRY OAK HEART', answer: 'MARIO KART', difficulty: 'easy' },
      { prompt: 'CHI SAND WHY IM', answer: 'CHEESE AND WINE', difficulty: 'easy' },
      { prompt: 'CORE WAR AUNTY IN', answer: 'QUARANTINE', difficulty: 'easy' },
      // medium
      { prompt: 'FAYE STEW PHASE', answer: 'FACE TO FACE', difficulty: 'medium' },
      { prompt: 'SHE IS BURG HER', answer: 'CHEESE BURGER', difficulty: 'medium' },
      { prompt: 'DRAIN TUBE OCEAN', answer: 'TRAIN TO BUSAN', difficulty: 'medium' },
      { prompt: 'MERE ORES ELF FREE', answer: 'MIRROR SELFIE', difficulty: 'medium' },
      { prompt: 'BULL LAG FRIED HAY', answer: 'BLACK FRIDAY', difficulty: 'medium' },
      { prompt: 'HINTS TOE CRAM STARRY', answer: 'INSTAGRAM STORY', difficulty: 'medium' },
      { prompt: 'DOOR HER TEXT PULL HORROR', answer: 'DORA THE EXPLORER', difficulty: 'medium' },
      { prompt: 'KNIT FLICK SAND CHILLE', answer: 'NETFLIX AND CHILL', difficulty: 'medium' },
      // hard
      { prompt: 'HERO DEATH DORY', answer: 'HEREDITARY', difficulty: 'hard' },
      { prompt: 'EWE KNIGHT TED KING DUMB', answer: 'UNITED KINGDOM', difficulty: 'hard' },
      { prompt: 'BEP HER OWN KNEE PEAS UH', answer: 'PEPPERONI PIZZA', difficulty: 'hard' },
      { prompt: 'HIGH WHEEL HALL WEIGHTS LOAF VIEW', answer: 'I WILL ALWAYS LOVE YOU', difficulty: 'hard' },
      { prompt: 'IS BUNCH POPS QUEER PANS', answer: 'SPONGEBOB SQUARE PANTS', difficulty: 'hard' },
      { prompt: 'EYE KEY ARE MELTABLE', answer: 'IKEA MEATBALL', difficulty: 'hard' },
      { prompt: 'KEY PINK CUP WITHER CART ASHY ANTS', answer: 'KEEPING UP WITH THE KARDASHIANS', difficulty: 'hard' },
    ],
  },
];
