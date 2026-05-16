/* ================================
   SMART MOOD-BASED QUOTE GENERATOR
   JavaScript Functionality
   ================================ */

// ============= APPLICATION STATE =============
const appState = {
    currentUser: null,
    currentMood: null,
    selectedMoods: [], // Array to store multiple selected moods
    currentQuote: null,
    darkMode: localStorage.getItem('darkMode') === 'true' || false
};

// ============= QUOTE DATABASE =============
const quotesDatabase = {
    happy: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
        { text: "Be happy for this moment. This moment is your life.", author: "Omar Khayyam" },
        { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
        { text: "A day without laughter is a day wasted.", author: "Charlie Chaplin" },
        { text: "Smile, it is the key that fits the lock of everybody's heart.", author: "Anthony J. D'Angelo" },
        { text: "Happiness is the consequence of personal effort.", author: "Elizabeth Gilbert" }
    ],
    sad: [
        { text: "This too shall pass.", author: "Persian Proverb" },
        { text: "Sadness is but a wall between two gardens.", author: "Gibran Kahlil Gibran" },
        { text: "The walls we build around us to keep sadness out also keeps out the joy.", author: "Jim Rohn" },
        { text: "Tears are the silent language of grief.", author: "Voltaire" },
        { text: "Sometimes you will never know the value of a moment until it becomes a memory.", author: "Dr. Seuss" },
        { text: "Sorrow is how we learn to love.", author: "David Whyte" },
        { text: "It's okay to be sad about losing something, or someone.", author: "Jesmyn Ward" },
        { text: "The only cure for grief is to grieve.", author: "C.S. Lewis" },
        { text: "You are not alone in your darkness.", author: "Unknown" },
        { text: "Every storm runs out of rain.", author: "Maya St. John" }
    ],
    angry: [
        { text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.", author: "Mark Twain" },
        { text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.", author: "Buddha" },
        { text: "The greatest remedy for anger is delay.", author: "Seneca" },
        { text: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Marston" },
        { text: "Anger makes you smaller, while forgiveness forces you to grow.", author: "Chada Nabali" },
        { text: "Do not let the behavior of others destroy your inner peace.", author: "Dalai Lama" },
        { text: "The man who is angry at the right things and with the right people, and in the right way and at the right time and for the right length of time, is commended.", author: "Aristotle" },
        { text: "Anger is never without a reason, but seldom with a good one.", author: "Benjamin Franklin" },
        { text: "Keep your cool and change the world.", author: "Barack Obama" },
        { text: "You will not be punished for your anger, you will be punished by your anger.", author: "Buddha" }
    ],
    stressed: [
        { text: "Stress is just a word for something we haven't figured out how to enjoy yet.", author: "Tony Schwartz" },
        { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
        { text: "Take a deep breath. It's just a bad day, not a bad life.", author: "Unknown" },
        { text: "Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from the overflow.", author: "Eleanor Brown" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
        { text: "Stress is an ignorant state. It believes that everything is an emergency.", author: "Natalie Goldberg" },
        { text: "When you have a million things to do, you still have to stay calm.", author: "Mehmet Oz" },
        { text: "Accept the stress, but refuse to panic.", author: "Joshua Marine" },
        { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
    ],
    motivated: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Everything you want is on the other side of fear.", author: "Jack Canfield" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "Great things never come from comfort zones.", author: "Unknown" },
        { text: "Dream it. Believe it. Build it.", author: "Unknown" }
    ],
    relaxed: [
        { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "Let it be and let it go.", author: "Unknown" },
        { text: "In the chaos, there is peace.", author: "Rumi" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Breathe. You're going to be okay.", author: "Unknown" },
        { text: "Sometimes the most powerful thing you can do is just breathe.", author: "Unknown" },
        { text: "Calm is a superpower.", author: "Unknown" },
        { text: "Your calm is contagious.", author: "Unknown" },
        { text: "Serenity is not freedom from the storm, but peace amid the storm.", author: "Unknown" }
    ],
    confident: [
        { text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett" },
        { text: "Self-confidence is the first requisite to great undertakings.", author: "Samuel Johnson" },
        { text: "With confidence, you have won before you have started.", author: "Marcus Garvey" },
        { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
        { text: "Trust yourself. You know more than you think you do.", author: "Benjamin Spock" },
        { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
        { text: "You are capable of amazing things.", author: "Steve Maraboli" },
        { text: "Confidence is silent. Insecurity is loud.", author: "Unknown" },
        { text: "Invest in yourself first. You are your best investment.", author: "Unknown" },
        { text: "The most beautiful thing you can wear is confidence.", author: "Blake Lively" }
    ],
    grateful: [
        { text: "Gratitude is not only the greatest of virtues, but the parent of all others.", author: "Marcus Tullius Cicero" },
        { text: "When you are grateful, fear disappears and abundance appears.", author: "Tony Robbins" },
        { text: "Gratitude can transform common days into thanksgivings.", author: "William Arthur Ward" },
        { text: "The gratitude mindset attracts more to be grateful for.", author: "Unknown" },
        { text: "Thankfulness is the beginning of gratitude. Gratitude is the completion of thankfulness.", author: "Henri Frederic Amiel" },
        { text: "Appreciating what you have is the fastest way to receive more.", author: "Unknown" },
        { text: "Gratitude opens the door to... the power, the wisdom, the creativity of the universe.", author: "Deepak Chopra" },
        { text: "Count your blessings, not your problems.", author: "Unknown" },
        { text: "A grateful heart is a magnet for miracles.", author: "Unknown" },
        { text: "Gratitude is the best attitude.", author: "Unknown" }
    ],
    hopeful: [
        { text: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu" },
        { text: "Once you choose hope, anything's possible.", author: "Christopher Reeve" },
        { text: "Everything that is done in this world is done by hope.", author: "Martin Luther" },
        { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
        { text: "You cannot swim for new horizons until you have courage to lose sight of the shore.", author: "William Faulkner" },
        { text: "Hope is the heartbeat of the soul.", author: "Michelle Horst" },
        { text: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" },
        { text: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
        { text: "You are stronger than you think and closer than you feel.", author: "Unknown" },
        { text: "The best is yet to come.", author: "Frank Sinatra" }
    ],
    focused: [
        { text: "Starve your distractions, feed your focus.", author: "Unknown" },
        { text: "Concentrate all your thoughts upon the work in hand.", author: "Alexander Graham Bell" },
        { text: "Where focus goes, energy flows.", author: "Tony Robbins" },
        { text: "The successful warrior is the average person with laser-like focus.", author: "Bruce Lee" },
        { text: "Simplicity boils down to two steps: Identify the essential. Eliminate the rest.", author: "Leo Babauta" },
        { text: "You will never reach your destination if you stop and throw stones at every dog that barks.", author: "Winston Churchill" },
        { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
        { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
        { text: "Small steps every day build big results.", author: "Unknown" },
        { text: "One thing at a time is how mountains are moved.", author: "Unknown" }
    ],
    anxious: [
        { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
        { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
        { text: "Feelings are just visitors, let them come and go.", author: "Mooji" },
        { text: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.", author: "Charles Spurgeon" },
        { text: "You are not your thoughts.", author: "Unknown" },
        { text: "Breathe in peace, breathe out worry.", author: "Unknown" },
        { text: "It's okay to pause. Resting is not quitting.", author: "Unknown" },
        { text: "Slow down. You are doing better than you think.", author: "Unknown" },
        { text: "One calm breath can reset your whole moment.", author: "Unknown" },
        { text: "Courage is anxiety turned toward action.", author: "Unknown" }
    ],
    lonely: [
        { text: "The eternal quest of the human being is to shatter his loneliness.", author: "Norman Cousins" },
        { text: "Sometimes, you need to be alone. Not to be lonely, but to enjoy your free time being yourself.", author: "Unknown" },
        { text: "Loneliness expresses the pain of being alone and solitude expresses the glory of being alone.", author: "Paul Tillich" },
        { text: "You are never alone when you are connected to your purpose.", author: "Unknown" },
        { text: "In the middle of winter, I found there was, within me, an invincible summer.", author: "Albert Camus" },
        { text: "The best way out is always through.", author: "Robert Frost" },
        { text: "Your story is still being written.", author: "Unknown" },
        { text: "Reach out. Connection begins with one brave hello.", author: "Unknown" },
        { text: "Even in silence, your value does not shrink.", author: "Unknown" },
        { text: "You matter more than this moment feels.", author: "Unknown" }
    ],
    disgust: [
        { text: "Fear cuts deeper than swords.", author: "Arya Stark, A Game of Thrones" },
        { text: "Laughter is poison to fear.", author: "Catelyn Stark, A Game of Thrones" },
        { text: "The hardest thing is not to stop feeling, but to stop letting it define you.", author: "Unknown" },
        { text: "Choose to rise above the thorns.", author: "Unknown" },
        { text: "You are bigger than the moment that tries to make you bitter.", author: "Unknown" },
        { text: "Let go of what no longer serves your highest good.", author: "Unknown" },
        { text: "Stay true to your values even when it's hard.", author: "Unknown" },
        { text: "Compassion is the antidote to disgust.", author: "Unknown" }
    ],
    peace: [
        { text: "A lion doesn't concern himself with the opinions of the sheep.", author: "Unknown" },
        { text: "Peace begins with a smile.", author: "Mother Teresa" },
        { text: "You cannot shake hands with a clenched fist.", author: "Indira Gandhi" },
        { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" },
        { text: "Peace is the result of retraining your mind to process life as it is.", author: "Wayne Dyer" },
        { text: "When the power of love overcomes the love of power, the world will know peace.", author: "Jimi Hendrix" },
        { text: "Let go of what you think you have to be; remain who you are.", author: "Thomas Merton" },
        { text: "Stillness is where creativity and peace begin.", author: "Eckhart Tolle" }
    ],
    acceptance: [
        { text: "Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness.", author: "Tyrion Lannister, A Game of Thrones" },
        { text: "Let the boy die and let the man live.", author: "Unknown" },
        { text: "Acceptance is the road to all change.", author: "Bryant McGill" },
        { text: "The first step toward getting somewhere is to decide you're not going to stay where you are.", author: "J.P. Morgan" },
        { text: "Accept what is, let go of what was, and have faith in what will be.", author: "Sonia Ricotti" },
        { text: "Sometimes the best way to solve a problem is to stop participating in the problem.", author: "Unknown" },
        { text: "Be gentle with yourself; you're doing the best you can.", author: "Unknown" },
        { text: "Growth is to let go of what you were for what you can become.", author: "Unknown" }
    ],
    affection: [
        { text: "Affection grows when you give kindness without expecting anything in return.", author: "Unknown" },
        { text: "Affection is responsible for nine-tenths of whatever solid and durable happiness there is in our lives.", author: "C.S. Lewis" },
        { text: "The best proof of love is trust.", author: "Joyce Brothers" },
        { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
        { text: "Love and kindness are never wasted.", author: "Barbara De Angelis" },
        { text: "To give affection and love we can never be poor.", author: "Anne Morrow Lindbergh" },
        { text: "A warm smile is the universal language of kindness.", author: "William Arthur Ward" },
        { text: "Affection is a silent language understood by the heart.", author: "Unknown" }
    ],
    compassion: [
        { text: "Compassion is the courage to understand someone else's struggle without judgment.", author: "Unknown" },
        { text: "Compassion and tolerance are not a sign of weakness, but a sign of strength.", author: "Dalai Lama" },
        { text: "If you want others to be happy, practice compassion.", author: "Dalai Lama" },
        { text: "Compassion is the radicalism of our time.", author: "Dalai Lama" },
        { text: "Be kind, for everyone you meet is fighting a harder battle.", author: "Plato" },
        { text: "Compassion is the basis of morality.", author: "Arthur Schopenhauer" },
        { text: "A kind gesture can reach a wound that only compassion can heal.", author: "Steve Maraboli" },
        { text: "Great compassion makes one soft, not weak.", author: "Rumi" }
    ],
    awe: [
        { text: "Awe is the moment when something larger than yourself makes your heart expand.", author: "Unknown" },
        { text: "The more I learn, the more I realize how much I don't know.", author: "Albert Einstein" },
        { text: "Awe is what moves us beyond ourselves.", author: "Brene Brown" },
        { text: "The world is full of magic things, patiently waiting for our senses to grow sharper.", author: "W.B. Yeats" },
        { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
        { text: "A sense of wonder is the mark of a healthy mind.", author: "Unknown" },
        { text: "Awe is a whisper from the universe reminding us we are part of something bigger.", author: "Unknown" },
        { text: "Wonder is the beginning of wisdom.", author: "Socrates" }
    ],
    nostalgia: [
        { text: "Some old wounds never truly heal, and bleed again at the slightest word.", author: "A Game of Thrones" },
        { text: "Nostalgia is a file that removes the rough edges from the good old days.", author: "Doug Larson" },
        { text: "The magic thing about home is that it feels good to leave, and it feels even better to come back.", author: "Wendy Wunder" },
        { text: "Sometimes you will never know the value of a moment until it becomes a memory.", author: "Dr. Seuss" },
        { text: "Memories warm you up from the inside.", author: "Unknown" },
        { text: "Old friends, old times, old memories. There is a special kind of peace in them.", author: "Unknown" },
        { text: "History is not a burden on the memory but an illumination of the soul.", author: "Lord Acton" },
        { text: "The best memories are the ones that make you smile.", author: "Unknown" }
    ],
    emptiness: [
        { text: "Let the boy die and let the man live.", author: "Unknown" },
        { text: "The cure for emptiness is not to fill it, but to learn to live with it.", author: "Unknown" },
        { text: "Sometimes the greatest gift is simply a little place to let go.", author: "Unknown" },
        { text: "Emptiness is the space where new things can appear.", author: "Unknown" },
        { text: "The silence inside you is the source of true wisdom.", author: "Amma" },
        { text: "When one door closes, another opens.", author: "Alexander Graham Bell" },
        { text: "You are never nothing; you are becoming.", author: "Unknown" },
        { text: "Emptiness is the beginning of creation.", author: "Bruce Lee" }
    ],
    distress: [
        { text: "When you play the game of thrones, you win or you die. There is no middle ground.", author: "Cersei Lannister, A Game of Thrones" },
        { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt" },
        { text: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
        { text: "Every adversity carries with it the seed of an equal or greater benefit.", author: "Napoleon Hill" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "Out of difficulties grow miracles.", author: "Jean de La BruyÃ¨re" },
        { text: "The darkest hour has only sixty minutes.", author: "Morris Mandel" },
        { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" }
    ]
};

const universalQuotes = [
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Small progress is still progress.", author: "Unknown" },
    { text: "Your future is created by what you do today.", author: "Robert Kiyosaki" },
    { text: "One day or day one. You decide.", author: "Unknown" },
    { text: "Every day is a fresh start.", author: "Unknown" },
    { text: "You can do hard things.", author: "Glennon Doyle" },
    { text: "A little kindness to yourself goes a long way.", author: "Unknown" },
    { text: "Keep going. You're getting there.", author: "Unknown" },
    { text: "Growth is often uncomfortable because you've never been here before.", author: "Unknown" },
    { text: "Your pace is valid.", author: "Unknown" }
];

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        showDashboardLinks();
    } else {
        hideDashboardLinks();
    }

    // Apply dark mode if previously set
    if (appState.darkMode) {
        document.body.classList.add('dark-mode');
        updateThemeToggle();
    }

    // replaceMoodEmojisWithImages(); // Commented out to keep emojis instead of small letter images
}

function hideQuotePopup() {
    const quoteResultSection = document.getElementById('quoteResultSection');
    if (quoteResultSection) {
        quoteResultSection.style.display = 'none';
    }
}

const moodIconConfig = {
    happy: { label: 'H', bg: '#FFC107' },
    sad: { label: 'S', bg: '#64B5F6' },
    angry: { label: 'A', bg: '#EF5350' },
    stressed: { label: 'S', bg: '#AB47BC' },
    motivated: { label: 'M', bg: '#66BB6A' },
    relaxed: { label: 'R', bg: '#4DB6AC' },
    confident: { label: 'C', bg: '#EC407A' },
    grateful: { label: 'G', bg: '#FF8A65' },
    hopeful: { label: 'H', bg: '#4FC3F7' },
    focused: { label: 'F', bg: '#FFA726' },
    anxious: { label: 'A', bg: '#90A4AE' },
    lonely: { label: 'L', bg: '#9575CD' },
    disgust: { label: 'D', bg: '#8D6E63' },
    peace: { label: 'P', bg: '#AED581' },
    acceptance: { label: 'A', bg: '#FFD54F' },
    affection: { label: 'A', bg: '#F48FB1' },
    compassion: { label: 'C', bg: '#FF8A65' },
    awe: { label: 'A', bg: '#4FC3F7' },
    nostalgia: { label: 'N', bg: '#B39DDB' },
    emptiness: { label: 'E', bg: '#B0BEC5' },
    distress: { label: 'D', bg: '#E57373' }
};

function createMoodIconUrl(mood) {
    const config = moodIconConfig[mood] || { label: mood.charAt(0).toUpperCase(), bg: '#607D8B' };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="16" fill="${config.bg}"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="#ffffff">${config.label}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function replaceMoodEmojisWithImages() {
    document.querySelectorAll('.mood-card').forEach(card => {
        const moodNameElement = card.querySelector('.mood-name');
        const moodName = moodNameElement ? moodNameElement.textContent.trim().toLowerCase() : '';
        const emojiContainer = card.querySelector('.mood-emoji');
        if (!moodName || !emojiContainer) return;

        const iconUrl = createMoodIconUrl(moodName);
        const img = document.createElement('img');
        img.className = 'mood-icon';
        img.src = iconUrl;
        img.alt = `${capitalizeFirstLetter(moodName)} icon`;

        emojiContainer.textContent = '';
        emojiContainer.appendChild(img);
    });
}

const moods = ['happy', 'sad', 'angry', 'stressed', 'motivated', 'relaxed', 'confident', 'grateful', 'hopeful', 'focused', 'anxious', 'lonely', 'disgust', 'peace', 'acceptance', 'affection', 'compassion', 'awe', 'nostalgia', 'emptiness', 'distress'];

// ============= NAVIGATION SYSTEM =============
/**
 * Navigate between pages with smooth transitions
 * @param {string} pageId - The ID of the page to navigate to
 */
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Check if user is authenticated for protected pages (only favorites and history require login)
    const protectedPages = ['favorites', 'history'];

    if (protectedPages.includes(pageId) && !appState.currentUser) {
        showNotification('Please login to access this feature', 'error');
        navigateTo('login');
        return;
    }

    // Show the requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ============= AUTHENTICATION FUNCTIONS =============
/**
 * Handle user login
 * @param {Event} event - Form submission event
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Clear previous errors
    clearErrors(['loginEmailError', 'loginPasswordError']);

    // Validation
    if (!validateEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email');
        return;
    }

    if (password.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showError('loginPasswordError', 'Invalid email or password');
        return;
    }

    // Login successful
    appState.currentUser = { name: user.name, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
    showNotification('Login successful!', 'success');
    showDashboardLinks();

    // Reset form
    document.querySelector('.auth-form form').reset();

    // Navigate to home
    setTimeout(() => navigateTo('home'), 500);
}

/**
 * Handle user signup
 * @param {Event} event - Form submission event
 */
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Clear previous errors
    clearErrors(['signupNameError', 'signupEmailError', 'signupPasswordError', 'signupConfirmPasswordError']);

    // Validation
    if (name.trim().length < 3) {
        showError('signupNameError', 'Name must be at least 3 characters');
        return;
    }

    if (!validateEmail(email)) {
        showError('signupEmailError', 'Please enter a valid email');
        return;
    }

    if (password.length < 6) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        showError('signupConfirmPasswordError', 'Passwords do not match');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showError('signupEmailError', 'Email already registered');
        return;
    }

    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login
    appState.currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));

    showNotification('Account created successfully!', 'success');
    showDashboardLinks();

    // Reset form
    document.querySelector('.auth-form form').reset();

    // Navigate to home
    setTimeout(() => navigateTo('home'), 500);
}

/**
 * Logout the current user
 */
function logout() {
    appState.currentUser = null;
    localStorage.removeItem('currentUser');
    hideDashboardLinks();
    showNotification('Logged out successfully', 'success');
    navigateTo('home');
}

// ============= QUOTE GENERATION =============
/**
 * Generate a random quote for the specified mood
 * @param {string} mood - The mood category
 */
function generateQuote(mood) {
    const moodQuotes = quotesDatabase[mood] || [];
    const quotes = [...moodQuotes, ...universalQuotes];
    if (!quotes || quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    appState.currentQuote = {...quote, mood };

    const quoteTextId = `quoteText${capitalizeFirstLetter(mood)}`;
    const quoteAuthorId = `quoteAuthor${capitalizeFirstLetter(mood)}`;

    const quoteTextElement = document.getElementById(quoteTextId);
    const quoteAuthorElement = document.getElementById(quoteAuthorId);
    const emoji = getCombinedMoodEmojis([mood]);
    const imageUrl = getQuoteImageUrl([mood]);

    updateQuoteTextVisual(quoteTextElement, quote.text, emoji, imageUrl);
    if (quoteAuthorElement) quoteAuthorElement.textContent = `- ${quote.author}`;

    addToHistory(quote, mood);
}

/**
 * Toggle mood selection (multiple selection)
 * @param {string} mood - The mood to toggle
 */
function toggleMoodMultiple(mood, moodCard) {
    const index = appState.selectedMoods.indexOf(mood);
    const checkbox = document.getElementById(`checkbox-${mood}`);
    const cardElement = moodCard || document.querySelector(`[onclick*="'${mood}'"]`);

    if (index > -1) {
        // Remove mood if already selected
        appState.selectedMoods.splice(index, 1);
        if (cardElement) cardElement.classList.remove('selected');
        if (checkbox) checkbox.textContent = '☐';
    } else {
        // Add mood to selection
        appState.selectedMoods.push(mood);
        if (cardElement) cardElement.classList.add('selected');
        if (checkbox) checkbox.textContent = '☑';
    }
}

/**
 * Generate a quote from one or multiple selected moods
 */
function generateMultipleMoodQuotes() {
    // Validate that at least one mood is selected
    if (appState.selectedMoods.length === 0) {
        showNotification('Please select at least one mood!', 'warning');
        return;
    }

    // Select a random mood from the selected moods
    const randomMood = appState.selectedMoods[Math.floor(Math.random() * appState.selectedMoods.length)];
    const selectedMoodLabel = appState.selectedMoods
        .map(mood => capitalizeFirstLetter(mood))
        .join(', ');

    // Generate quote from the selected mood
    generateQuoteForMood(randomMood, appState.selectedMoods);

    // Show both selected moods and the mood that produced the current quote
    const quoteMoodElement = document.getElementById('homeQuoteMood');
    if (quoteMoodElement) {
        quoteMoodElement.textContent = `Picked: ${getMoodEmoji(randomMood)} ${capitalizeFirstLetter(randomMood)} | Selected: ${selectedMoodLabel}`;
    }

    // Show the quote result section
    const quoteResultSection = document.getElementById('quoteResultSection');
    if (quoteResultSection) {
        quoteResultSection.style.display = 'flex';
    }
}

/**
 * Refresh the currently displayed quote by generating a new one
 * Uses the current selection or the last generated mood to preserve context
 */
function refreshCurrentQuote() {
    // If multiple moods are selected, regenerate from the same group
    if (Array.isArray(appState.selectedMoods) && appState.selectedMoods.length > 0) {
        const randomMood = appState.selectedMoods[Math.floor(Math.random() * appState.selectedMoods.length)];
        generateQuoteForMood(randomMood, appState.selectedMoods);
        return;
    }

    // If a single mood was selected previously (or we're on a mood page), regenerate for that mood
    if (appState.currentMood) {
        generateQuoteForMood(appState.currentMood, [appState.currentMood]);
        return;
    }

    // Fallback: generate from mixed moods (keeps previous behavior)
    generateMultipleMoodQuotes();
}

/**
 * Generate a quote for a specific mood
 * @param {string} mood - The mood category
 */
function getQuotesForMoodGroup(moodGroup = []) {
    const selectedQuotes = moodGroup.reduce((acc, moodKey) => {
        const moodQuotes = quotesDatabase[moodKey] || [];
        return acc.concat(moodQuotes);
    }, []);

    return [...selectedQuotes, ...universalQuotes];
}

function generateQuoteForMood(mood, moodGroup = [mood]) {
    const quotes = getQuotesForMoodGroup(moodGroup);
    if (!quotes || quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const moodLabel = moodGroup.length > 1 ?
        moodGroup.map(capitalizeFirstLetter).join(', ') :
        capitalizeFirstLetter(mood);

    appState.currentQuote = {...quote, mood: moodLabel };
    appState.currentMood = mood;

    const quoteTextElement = document.getElementById('homeQuoteText');
    const quoteAuthorElement = document.getElementById('homeQuoteAuthor');
    const quoteMoodElement = document.getElementById('homeQuoteMood');
    const emoji = getCombinedMoodEmojis(moodGroup);
    const imageUrl = getQuoteImageUrl(moodGroup);

    updateQuoteTextVisual(quoteTextElement, quote.text, emoji, imageUrl);
    if (quoteAuthorElement) quoteAuthorElement.textContent = `- ${quote.author}`;
    if (quoteMoodElement) quoteMoodElement.textContent = `Mood: ${emoji} ${moodLabel}`;

    addToHistory(quote, moodLabel);
}

/**
 * Add current home page quote to favorites
 */
function addCurrentQuoteToFavorites() {
    if (!appState.currentUser) {
        showNotification('Please login to save favorites', 'error');
        navigateTo('login');
        return;
    }

    if (!appState.currentQuote) {
        showNotification('No quote to save', 'warning');
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Check if quote already exists
    const exists = favorites.some(fav => fav.text === appState.currentQuote.text);
    if (exists) {
        showNotification('This quote is already in your favorites!', 'warning');
        return;
    }

    favorites.push(appState.currentQuote);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification('Quote added to favorites! â­', 'success');
}

/**
 * Copy current home page quote to clipboard
 */
function copyCurrentQuote() {
    if (!appState.currentQuote) {
        showNotification('No quote to copy', 'warning');
        return;
    }

    const fullQuote = `"${appState.currentQuote.text}" - ${appState.currentQuote.author}`;
    copyToClipboard(fullQuote);
}

/**
 * Share current home page quote
 */
function shareCurrentQuote() {
    if (!appState.currentQuote) {
        showNotification('No quote to share', 'warning');
        return;
    }

    const fullQuote = `"${appState.currentQuote.text}" - ${appState.currentQuote.author}`;

    if (navigator.share) {
        navigator.share({
            title: 'Smart Mood-Based Quote Generator',
            text: fullQuote,
            url: window.location.href
        }).catch(err => console.log('Share cancelled'));
    } else {
        copyToClipboard(fullQuote);
    }
}

/**
 * Select a mood and navigate to its page
 * @param {string} mood - The selected mood
 */
function selectMood(mood) {
    appState.currentMood = mood;
    generateQuote(mood);
    navigateTo(`moodPage-${mood}`);
}

// ============= FAVORITES MANAGEMENT =============
/**
 * Add current quote to favorites
 * @param {string} mood - The mood of the quote (optional)
 */
function addToFavorites(mood = appState.currentMood) {
    if (!appState.currentUser) {
        showNotification('Please login to add favorites', 'error');
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Check if quote already exists
    const exists = favorites.some(fav => fav.text === appState.currentQuote.text);
    if (exists) {
        showNotification('This quote is already in your favorites!', 'warning');
        return;
    }

    favorites.push(appState.currentQuote);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification('Quote added to favorites! â­', 'success');
}

/**
 * Remove a quote from favorites
 * @param {number} index - The index of the quote to remove
 */
function removeFromFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    showNotification('Quote removed from favorites', 'success');
}

/**
 * Display all favorite quotes
 */
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favoritesList');

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-state"><p>No favorite quotes yet. Start adding your favorites!</p></div>';
        return;
    }

    favoritesList.innerHTML = favorites.map((quote, index) => `
        <div class="quote-item">
            <p>"${quote.text}"</p>
            <p>- ${quote.author}</p>
            <div class="quote-item-actions">
                <button class="btn btn-icon" onclick='copyQuoteText(${JSON.stringify(quote.text)})'>ðŸ“‹ Copy</button>
                <button class="btn btn-icon" onclick="removeFromFavorites(${index})">ðŸ—‘ï¸ Delete</button>
            </div>
        </div>
    `).join('');
}

// ============= HISTORY MANAGEMENT =============
/**
 * Add quote to history
 * @param {Object} quote - The quote object
 * @param {string} mood - The mood category
 */
function addToHistory(quote, mood) {
    let history = JSON.parse(localStorage.getItem('history') || '[]');

    // Avoid duplicates
    const isDuplicate = history.some(h => h.text === quote.text && h.timestamp > Date.now() - 60000);
    if (isDuplicate) return;

    history.unshift({
        ...quote,
        mood,
        timestamp: Date.now()
    });

    // Keep only last 50 items
    if (history.length > 50) {
        history = history.slice(0, 50);
    }

    localStorage.setItem('history', JSON.stringify(history));
}

/**
 * Display quote history
 */
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const historyList = document.getElementById('historyList');

    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-state"><p>No history yet. Generate some quotes to see them here!</p></div>';
        return;
    }

    historyList.innerHTML = history.map((quote, index) => `
        <div class="quote-item">
            <p>"${quote.text}"</p>
            <p>- ${quote.author}</p>
            <p style="font-size: 0.8rem; color: #999; margin-top: 10px;">Mood: ${quote.mood} | ${formatTime(quote.timestamp)}</p>
            <div class="quote-item-actions">
                <button class="btn btn-icon" onclick='copyQuoteText(${JSON.stringify(quote.text)})'>ðŸ“‹ Copy</button>
                <button class="btn btn-icon" onclick='favoritizeQuote(${JSON.stringify(quote.text)}, ${JSON.stringify(quote.author)}, ${JSON.stringify(quote.mood)})'>â­ Favorite</button>
            </div>
        </div>
    `).join('');
}

/**
 * Clear all history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('history');
        displayHistory();
        showNotification('History cleared', 'success');
    }
}

/**
 * Add a quote from history to favorites
 */
function favoritizeQuote(text, author, mood) {
    appState.currentQuote = { text, author, mood };
    addToFavorites(mood);
}

// ============= THEME MANAGEMENT =============
/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    appState.darkMode = !appState.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', appState.darkMode);
    updateThemeToggle();
}

/**
 * Update the theme toggle button icon
 */
function updateThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = appState.darkMode ? 'â˜€ï¸' : 'ðŸŒ™';
    }
}

/**
 * Update theme settings
 */
function updateThemeSettings() {
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect.value === 'auto') {
        // Auto theme based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        appState.darkMode = prefersDark;
    } else {
        appState.darkMode = themeSelect.value === 'dark';
    }
    document.body.classList.toggle('dark-mode', appState.darkMode);
    localStorage.setItem('darkMode', appState.darkMode);
    updateThemeToggle();
}

// ============= COPY & SHARE FUNCTIONS =============
/**
 * Copy quote to clipboard
 * @param {string} mood - The mood (optional, uses current mood if not provided)
 */
function copyQuote(mood = appState.currentMood) {
    const quoteTextId = `quoteText${capitalizeFirstLetter(mood)}`;
    const quoteAuthorId = `quoteAuthor${capitalizeFirstLetter(mood)}`;

    const quoteText = document.getElementById(quoteTextId) && document.getElementById(quoteTextId).textContent || '';
    const quoteAuthor = document.getElementById(quoteAuthorId) && document.getElementById(quoteAuthorId).textContent || '';

    const fullQuote = `${quoteText} ${quoteAuthor}`;

    copyToClipboard(fullQuote);
}

/**
 * Copy custom text to clipboard
 * @param {string} text - The text to copy
 */
function copyQuoteText(text) {
    copyToClipboard(`"${text}"`);
}

/**
 * Generic function to copy text to clipboard
 * @param {string} text - The text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Quote copied to clipboard! ðŸ“‹', 'success');
    }).catch(err => {
        showNotification('Failed to copy quote', 'error');
    });
}

/**
 * Share quote (using Web Share API or fallback)
 * @param {string} mood - The mood (optional)
 */
function shareQuote(mood = appState.currentMood) {
    const quoteTextId = `quoteText${capitalizeFirstLetter(mood)}`;
    const quoteAuthorId = `quoteAuthor${capitalizeFirstLetter(mood)}`;

    const quoteText = document.getElementById(quoteTextId) && document.getElementById(quoteTextId).textContent || '';
    const quoteAuthor = document.getElementById(quoteAuthorId) && document.getElementById(quoteAuthorId).textContent || '';

    const fullQuote = `${quoteText} ${quoteAuthor}`;

    if (navigator.share) {
        navigator.share({
            title: 'Smart Mood-Based Quote Generator',
            text: fullQuote,
            url: window.location.href
        }).catch(err => console.log('Share cancelled'));
    } else {
        copyToClipboard(fullQuote);
    }
}

// ============= CONTACT FORM =============
/**
 * Handle contact form submission
 * @param {Event} event - Form submission event
 */
function handleContact(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    // Clear previous errors
    clearErrors(['contactNameError', 'contactEmailError', 'contactSubjectError', 'contactMessageError']);

    // Validation
    if (name.trim().length < 3) {
        showError('contactNameError', 'Name must be at least 3 characters');
        return;
    }

    if (!validateEmail(email)) {
        showError('contactEmailError', 'Please enter a valid email');
        return;
    }

    if (subject.trim().length < 5) {
        showError('contactSubjectError', 'Subject must be at least 5 characters');
        return;
    }

    if (message.trim().length < 10) {
        showError('contactMessageError', 'Message must be at least 10 characters');
        return;
    }

    // Store message (in real app, this would be sent to a server)
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({ name, email, subject, message, timestamp: new Date().toLocaleString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    showNotification('Message sent successfully! We will get back to you soon. ðŸ“§', 'success');
    document.querySelector('.contact-form form').reset();
}

// ============= DATA MANAGEMENT =============
/**
 * Export user data
 */
function exportData() {
    const userData = {
        user: appState.currentUser,
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        history: JSON.parse(localStorage.getItem('history') || '[]'),
        exportDate: new Date().toLocaleString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mood-quotes-export-${Date.now()}.json`;
    link.click();

    showNotification('Data exported successfully! ðŸ“¥', 'success');
}

/**
 * Clear all local data
 */
function clearAllData() {
    if (confirm('Are you sure? This will delete all your data (favorites, history, preferences).')) {
        localStorage.removeItem('favorites');
        localStorage.removeItem('history');
        showNotification('All data cleared', 'success');
        displayFavorites();
        displayHistory();
    }
}

// ============= UI HELPER FUNCTIONS =============
/**
 * Display user name in dashboard
 */
function showDashboardLinks() {
    const loginNavLink = document.getElementById('loginNavLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInQuickLinks = document.getElementById('loggedInQuickLinks');

    if (loginNavLink) loginNavLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (loggedInQuickLinks) loggedInQuickLinks.style.display = 'block';
}

/**
 * Hide dashboard links
 */
function hideDashboardLinks() {
    const loginNavLink = document.getElementById('loginNavLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInQuickLinks = document.getElementById('loggedInQuickLinks');

    if (loginNavLink) loginNavLink.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (loggedInQuickLinks) loggedInQuickLinks.style.display = 'none';
}

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - Type of notification: 'success', 'error', 'warning'
 */
function showNotification(message, type = 'success') {
    const container = document.createElement('div');
    container.className = `${type}-message`;
    container.textContent = message;
    container.style.position = 'fixed';
    container.style.top = '80px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.maxWidth = '400px';

    document.body.appendChild(container);

    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.3s';
        setTimeout(() => container.remove(), 300);
    }, 3000);
}

/**
 * Show error message below form field
 * @param {string} elementId - The ID of the error element
 * @param {string} message - The error message
 */
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

/**
 * Clear error messages
 * @param {Array} errorIds - Array of error element IDs
 */
function clearErrors(errorIds) {
    errorIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '';
    });
}

// ============= VALIDATION FUNCTIONS =============
/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============= UTILITY FUNCTIONS =============
/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Return mood emoji by mood key
 * @param {string} mood - Mood key
 * @returns {string} Emoji representing the mood
 */
function getMoodEmoji(mood) {
    const moodEmojis = {
        happy: '😊',
        sad: '😢',
        angry: '😠',
        stressed: '😰',
        motivated: '💪',
        relaxed: '😌',
        confident: '✨',
        grateful: '🙏',
        hopeful: '🌈',
        focused: '🎯',
        anxious: '😟',
        lonely: '🌙',
        disgust: '🤢',
        peace: '☮️',
        acceptance: '🤝',
        affection: '💕',
        compassion: '❤️',
        awe: '🌠',
        nostalgia: '🕰️',
        emptiness: '🕳️',
        distress: '⚠️'
    };

    return moodEmojis[mood] || 'ðŸ’¬';
}

/**
 * Build combined emoji string for one or multiple moods
 * @param {Array<string>} moodGroup - Mood keys to combine
 * @returns {string} Combined emoji string
 */
function getCombinedMoodEmojis(moodGroup = []) {
    const moodList = Array.isArray(moodGroup) && moodGroup.length > 0 ? moodGroup : ['confident'];
    const uniqueMoods = [...new Set(moodList)].slice(0, 4);
    return uniqueMoods.map(getMoodEmoji).join('');
}

function getQuoteImageUrl(moodGroup = []) {
    const moodImageKeywords = {
        happy: ['joy', 'sunshine', 'smile'],
        sad: ['rain', 'solitude', 'reflection'],
        angry: ['fire', 'storm', 'strength'],
        stressed: ['calm', 'relaxation', 'nature'],
        motivated: ['goal', 'action', 'success'],
        relaxed: ['spa', 'beach', 'peaceful'],
        confident: ['victory', 'bold', 'light'],
        grateful: ['thankful', 'blessing', 'warmth'],
        hopeful: ['sunrise', 'rainbow', 'future'],
        focused: ['study', 'clarity', 'concentration'],
        anxious: ['pause', 'breath', 'stillness'],
        lonely: ['moon', 'starry', 'solitude'],
        disgust: ['renewal', 'clean', 'fresh'],
        peace: ['meditation', 'quiet', 'tranquility'],
        acceptance: ['balance', 'growth', 'letting go'],
        affection: ['hug', 'warmth', 'love'],
        compassion: ['kindness', 'help', 'heart'],
        awe: ['mountain', 'sky', 'wonder'],
        nostalgia: ['memories', 'vintage', 'nostalgic'],
        emptiness: ['space', 'light', 'canvas'],
        distress: ['hope', 'support', 'resilience']
    };

    const keywords = moodGroup.flatMap(mood => moodImageKeywords[mood] || [mood]);
    const searchTerm = keywords.length > 0 ?
        keywords[Math.floor(Math.random() * keywords.length)] :
        'inspiration';
    const seed = Math.floor(Math.random() * 10000);

    return `https://source.unsplash.com/featured/220x220/?${encodeURIComponent(searchTerm)}&sig=${seed}`;
}

function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateQuoteTextVisual(element, quoteText, emoji, imageUrl) {
    if (!element) return;

    element.innerHTML = `
        <span class="quote-visual-wrapper">
            <span class="quote-emoji">${emoji}</span>
            <span class="quote-main">"${sanitizeText(quoteText)}"</span>
            
        </span>
    `;
}

/**
 * Build a quote-side emoji mashup from one or many moods
 * @param {Array<string>} moodGroup - Mood keys to combine
 * @returns {{left: string, right: string}} Emoji mashup for both sides
 */
function getEmojiMashup(moodGroup = []) {
    const core = getCombinedMoodEmojis(moodGroup);
    const joiners = ['✨', '⚡', '🌟', '💫'];
    const flair = joiners[Math.floor(Math.random() * joiners.length)];

    // Mirror-like mashup: right side uses reversed core for visual balance.
    const reversedCore = [...core].reverse().join('');

    return {
        left: `${flair}${core}`,
        right: `${reversedCore}${flair}`
    };
}

/**
 * Format timestamp to readable format
 * @param {number} timestamp - The timestamp in milliseconds
 * @returns {string} Formatted time string
 */
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
}

// ============= PAGE TRANSITION HANDLERS =============
/**
 * Show page based on navigation
 */
document.addEventListener('click', function(e) {
    if (e.target.matches('.page-link')) {
        navigateTo(e.target.dataset.page);
    }
});

// ============= FAVORITES PAGE OBSERVER =============
const observerFavorites = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            const favoriteSection = document.getElementById('favorites');
            if (favoriteSection && favoriteSection.classList.contains('active')) {
                displayFavorites();
            }
        }
    });
});

// ============= EVENT LISTENERS FOR PAGE VISIBILITY =============
const pageObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            const page = mutation.target;
            if (page.classList.contains('active')) {
                if (page.id === 'favorites') {
                    displayFavorites();
                } else if (page.id === 'history') {
                    displayHistory();
                }
            }
        }
    });
});

// Observe all pages for class changes
document.querySelectorAll('.page').forEach(page => {
    pageObserver.observe(page, { attributes: true, attributeFilter: ['class'] });
});

// ============= WINDOW EVENTS =============
/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page is now visible, refresh data if needed
    }
});

/**
 * Handle window resize for responsive adjustments
 */
window.addEventListener('resize', function() {
    // Any responsive adjustments needed
});

// ============= INITIALIZATION CHECK =============
// Set up dashboard links on page load
if (appState.currentUser) {
    showDashboardLinks();
}

console.log('Smart Mood-Based Quote Generator loaded successfully! ðŸš€');