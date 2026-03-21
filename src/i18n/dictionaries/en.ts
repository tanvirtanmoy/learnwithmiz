import { Dictionary } from './ja';

export const en: Dictionary = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About Miz',
    learnDutch: 'Dutch Learning Guide',
    lessons: 'Lessons',
    faq: 'FAQ',
    contact: 'Contact',
  },

  // Common
  common: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    joinWaitlist: 'Join Waitlist',
    contactUs: 'Contact Us',
    viewLessons: 'View Lessons',
    viewGuide: 'View Dutch Learning Guide',
    comingSoon: 'Coming Soon',
    submit: 'Submit',
    sending: 'Sending...',
    required: 'Required',
    optional: 'Optional',
    close: 'Close',
    backToHome: 'Back to Home',
  },

  // Footer
  footer: {
    tagline: 'Friendly Dutch lessons for Japanese learners',
    quickLinks: 'Quick Links',
    connect: 'Connect',
    copyright: '© 2026 Learn with Miz. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  // Home Page
  home: {
    hero: {
      title: 'Make life in the Netherlands truly yours',
      subtitle: 'Friendly Dutch lessons for Japanese learners',
      description: 'A platform designed for Japanese people living in the Netherlands to learn practical Dutch in an easy-to-understand way.',
      cta1: 'View Lessons',
      cta2: 'View Dutch Learning Guide',
    },
    whyDutch: {
      title: 'Why Learn Dutch?',
      subtitle: 'You can get by with English. But knowing Dutch changes everything.',
      reasons: [
        {
          title: 'Smoother Daily Life',
          description: 'Shopping, doctor visits, chatting with neighbors. A little Dutch makes everyday life so much easier.',
          icon: 'daily',
        },
        {
          title: 'Confidence with Official Matters',
          description: 'Municipality procedures, school communications. Knowing Dutch gives you peace of mind.',
          icon: 'official',
        },
        {
          title: 'More Career Opportunities',
          description: 'Dutch opens doors to local companies and helps you build stronger relationships with colleagues.',
          icon: 'work',
        },
        {
          title: 'A True Sense of Belonging',
          description: "Being able to greet, to participate in conversations. Even a little Dutch helps you feel like you belong here.",
          icon: 'belonging',
        },
      ],
    },
    whyDifferent: {
      title: 'Why Learn with Miz?',
      subtitle: 'Lessons designed specifically for Japanese learners',
      points: [
        {
          title: 'Explanations in Japanese',
          description: 'Grammar and pronunciation explained in Japanese. Teaching that understands where Japanese learners struggle.',
        },
        {
          title: 'Practical Content You Can Use',
          description: 'Not textbook examples, but phrases you\'ll actually use in real life in the Netherlands.',
        },
        {
          title: 'Kind and Supportive Teaching',
          description: "It's okay to make mistakes. Progress at your own pace with supportive guidance.",
        },
        {
          title: 'Step-by-Step Progress',
          description: 'A clear learning path to guide you from beginner to confident speaker.',
        },
      ],
    },
    learningPath: {
      title: 'Your Learning Journey',
      subtitle: 'Progress at your own pace, one step at a time',
      steps: [
        {
          title: 'First Steps in Dutch',
          description: "Let's start with greetings, numbers, and basic expressions.",
          level: 'Beginner',
        },
        {
          title: 'Basic Conversations',
          description: 'Learn to shop and introduce yourself.',
          level: 'Elementary',
        },
        {
          title: 'Dutch for Daily Life',
          description: 'Dutch for the doctor, school, work, and more.',
          level: 'Pre-Intermediate',
        },
        {
          title: 'Speak with Confidence',
          description: 'Smoother, more natural conversations.',
          level: 'Intermediate',
        },
      ],
    },
    instructor: {
      title: 'Meet Your Instructor',
      name: 'Mizuki',
      role: 'Dutch Language Instructor',
      bio: 'Based in the Netherlands. I understand the challenges and anxieties Japanese people face when learning Dutch, and I prioritize kind, thorough instruction. My goal is to help you enjoy life in the Netherlands even more.',
      cta: 'Learn more about Miz',
    },
    futureOfferings: {
      title: 'Coming Soon',
      subtitle: 'More learning options in development',
      items: [
        {
          title: 'Recorded Lessons',
          description: 'Clear video lessons you can study at your own pace.',
          status: 'In Development',
        },
        {
          title: 'Live Lessons',
          description: 'Interactive online lessons where you can ask questions in real-time.',
          status: 'In Development',
        },
        {
          title: 'Structured Courses',
          description: 'Step-by-step learning courses organized by level.',
          status: 'In Development',
        },
        {
          title: 'Study Materials',
          description: 'Downloadable review materials and worksheets.',
          status: 'In Development',
        },
      ],
    },
    newsletter: {
      title: 'Stay Updated',
      subtitle: "Get notified about new lessons and course launches",
      placeholder: 'Your email address',
      cta: 'Subscribe',
      privacy: 'We respect your privacy. No spam.',
      success: 'Thank you for subscribing!',
    },
  },

  // About Page
  about: {
    hero: {
      title: 'About Miz',
      subtitle: 'Supporting your Dutch learning journey',
    },
    intro: {
      title: "Hello, I'm Mizuki",
      paragraphs: [
        'I live in the Netherlands and teach Dutch to Japanese people.',
        "I've experienced firsthand how challenging it is to learn a new language abroad. Dutch, in particular, has features quite different from both Japanese and English, and it can feel overwhelming at first.",
        'That\'s why I focus on explaining Dutch from a Japanese perspective and teaching expressions you can actually use in daily life. Let\'s learn "Dutch for living in the Netherlands," not just "textbook Dutch."',
      ],
    },
    philosophy: {
      title: 'Teaching Philosophy',
      subtitle: 'What I value',
      points: [
        {
          title: 'Kind and Thorough',
          description: "There's no need to fear mistakes. I create a safe space for questions and explain things carefully.",
        },
        {
          title: 'Practical',
          description: 'Content based on real-life situations, so you can use what you learn right away.',
        },
        {
          title: 'At Your Pace',
          description: "No rush. I support sustainable learning that fits your lifestyle and goals.",
        },
        {
          title: 'Steady Progress',
          description: 'One step at a time, but surely. Building confidence through small victories.',
        },
      ],
    },
    forWhom: {
      title: "Who It's For",
      items: [
        'Japanese people living in the Netherlands',
        'Complete beginners to Dutch',
        'Those who find English-only resources difficult',
        'Those who want to use Dutch in daily life',
        'Those who want to learn at their own pace',
        'Those who want more confidence in life in the Netherlands',
      ],
    },
    cta: {
      title: 'Ready to Start Learning?',
      description: "Feel free to reach out. Let's design a learning plan that fits your goals and pace.",
      button: 'Contact',
    },
  },

  // Learn Dutch Page
  learnDutch: {
    hero: {
      title: 'How Should You Learn Dutch?',
      subtitle: 'A clear guide for Japanese learners',
    },
    needDutch: {
      title: 'Do You Need Dutch in the Netherlands?',
      paragraphs: [
        'The short answer: no, you can survive without Dutch. The Netherlands is a very English-friendly country, and you can get through many situations with English alone.',
        'But knowing Dutch changes a lot of things.',
      ],
      benefits: [
        'Chat casually with your neighbors',
        "Communicate smoothly with your children's teachers",
        'Feel confident at the doctor or municipality',
        'Build closer relationships with Dutch colleagues',
        'Feel like a member of this society, not just a foreigner',
      ],
      conclusion: "You don't need to aim for perfection. Even a little Dutch makes a big difference.",
    },
    learningPath: {
      title: 'Recommended Learning Path',
      subtitle: 'Progress step by step toward your goals',
      stages: [
        {
          level: 'A1 - Beginner',
          title: 'First Steps',
          goal: 'Basic greetings and simple phrases',
          focus: [
            'Greetings (Hallo, Dag, Dank je wel)',
            'Numbers (1-100)',
            'Self-introduction',
            'Simple questions and answers',
          ],
          studyStyle: '10-15 minutes daily, lots of repetition. Focus on listening and imitating.',
          mindset: "It doesn't have to be perfect. Start by getting used to the sounds.",
        },
        {
          level: 'A2 - Elementary',
          title: 'Basic Conversations',
          goal: 'Handle simple daily conversations',
          focus: [
            'Shopping conversations',
            'Asking and giving directions',
            'Making reservations',
            'Expressing simple preferences and opinions',
          ],
          studyStyle: 'Practice while imagining real situations. Use shadowing for pronunciation.',
          mindset: 'Learning with context in mind helps things stick.',
        },
        {
          level: 'B1+ - Intermediate',
          title: 'Practical Fluency',
          goal: 'Handle more complex conversations and discussions',
          focus: [
            'Explaining symptoms to a doctor',
            'School and work communication',
            'Understanding news',
            'Expressing opinions and emotions',
          ],
          studyStyle: "Add Dutch reading and podcasts. Find more opportunities to speak.",
          mindset: "At this stage, you're learning through using the language.",
        },
      ],
    },
    difficulties: {
      title: 'Challenges for Japanese Learners',
      subtitle: 'Common struggles and tips to overcome them',
      items: [
        {
          title: 'Pronunciation',
          description: "Sounds like G (guttural) and R don't exist in Japanese. It feels difficult at first, but you will improve with practice.",
          tip: 'Listening and imitating native speakers is the most effective approach.',
        },
        {
          title: 'Grammar Structure',
          description: "Word order differs from both Japanese and English. Getting used to verb placement takes some time.",
          tip: 'Start with short sentences and learn the patterns by feel.',
        },
        {
          title: 'Listening',
          description: "Dutch people speak fast! It's totally normal not to understand at first.",
          tip: 'Start with slower materials and gradually get used to normal speed.',
        },
        {
          title: 'Speaking Confidence',
          description: '"What if I make a mistake?" - this feeling often holds people back.',
          tip: "Dutch people appreciate when foreigners try to speak Dutch. Don't worry about mistakes — just keep trying!",
        },
      ],
    },
    tips: {
      title: 'Effective Study Tips',
      items: [
        {
          title: 'A Little Every Day',
          description: '15 minutes daily is more effective than 2 hours once a week. Consistency is key.',
        },
        {
          title: 'Shadowing',
          description: 'Listen and immediately repeat. This trains both pronunciation and listening at once.',
        },
        {
          title: 'Use It in Life',
          description: 'Practice with real situations: greetings at the supermarket, simple orders. Start small.',
        },
        {
          title: 'Learn in Context',
          description: "Learn phrases and contexts, not just vocabulary. It's easier to recall in real conversations.",
        },
      ],
    },
    examples: {
      title: 'Dutch You Can Use Today',
      subtitle: 'Basic phrases to get you started',
      phrases: [
        {
          dutch: 'Hallo / Dag',
          japanese: 'Hello / Goodbye',
          context: 'Basic greetings',
        },
        {
          dutch: 'Dank je wel / Dank u wel',
          japanese: 'Thank you',
          context: 'Casual / Formal',
        },
        {
          dutch: 'Mag ik dit, alstublieft?',
          japanese: 'Can I have this, please?',
          context: 'Ordering at a shop',
        },
        {
          dutch: 'Ik kom uit Japan',
          japanese: 'I come from Japan',
          context: 'Self-introduction',
        },
        {
          dutch: 'Spreekt u Engels?',
          japanese: 'Do you speak English?',
          context: "When you're stuck",
        },
        {
          dutch: 'Ik leer Nederlands',
          japanese: "I'm learning Dutch",
          context: 'Conversation starter',
        },
      ],
    },
    cta: {
      title: 'Ready to Learn Properly?',
      description: 'Learn with Miz teaches Dutch in an easy-to-understand way for Japanese learners. Let\'s make your life in the Netherlands richer together.',
      button1: 'About Lessons',
      button2: 'Contact',
    },
  },

  // Lessons Page
  lessons: {
    hero: {
      title: 'Lessons',
      subtitle: 'Dutch lessons designed for Japanese learners',
    },
    concept: {
      title: 'Lesson Concept',
      description: 'Learn with Miz lessons are designed for Japanese people living in the Netherlands. With clear explanations in Japanese and practical content you can use right away, you\'ll steadily improve your Dutch.',
      features: [
        'Grammar explained clearly in Japanese',
        'Focus on areas where Japanese learners struggle',
        'Phrases and expressions for real-life use',
        'Flexible lessons that match your pace',
      ],
    },
    types: {
      title: 'Lesson Types',
      subtitle: 'Choose what fits your learning style',
      items: [
        {
          title: 'Beginner Lessons',
          description: 'For complete beginners. Starting with basic pronunciation, greetings, and numbers.',
          level: 'A1',
          status: 'Available',
        },
        {
          title: 'Daily Conversation Lessons',
          description: 'Learn Dutch for shopping, restaurants, and neighborhood interactions.',
          level: 'A1-A2',
          status: 'Available',
        },
        {
          title: 'Pronunciation Focus',
          description: 'Intensive practice on sounds difficult for Japanese speakers. Build speaking confidence.',
          level: 'All Levels',
          status: 'Coming Soon',
        },
        {
          title: 'Practical Life Dutch',
          description: 'Practice conversations for specific situations: doctor, municipality, school, work.',
          level: 'A2-B1',
          status: 'Coming Soon',
        },
        {
          title: 'Private Lessons',
          description: 'One-on-one lessons fully customized to your goals and pace.',
          level: 'All Levels',
          status: 'Available',
        },
        {
          title: 'Small Group Lessons',
          description: 'Learn with others at your level. An affordable group option.',
          level: 'All Levels',
          status: 'Coming Soon',
        },
      ],
    },
    future: {
      title: 'Future Offerings',
      description: "We're developing more ways to help you learn Dutch:",
      items: [
        'Online video courses (self-paced recorded lessons)',
        'Structured learning programs (level-based curriculum)',
        'Downloadable study materials',
        'Community features (connect with other learners)',
      ],
      note: "We'll notify you when these become available. Join the waitlist to stay updated.",
    },
    cta: {
      title: 'Questions About Lessons?',
      description: "Let's find the right lesson plan for you. Feel free to reach out.",
      button1: 'Contact',
      button2: 'Join Waitlist',
    },
  },

  // FAQ Page
  faq: {
    hero: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions about learning Dutch and lessons',
    },
    items: [
      {
        question: 'Can I live in the Netherlands with just English?',
        answer: "Yes, especially in big cities like Amsterdam, you can manage with English alone. Many Dutch people speak excellent English. However, knowing Dutch makes daily life smoother and helps you integrate into local communities and build deeper relationships.",
      },
      {
        question: 'Should I learn Dutch?',
        answer: "While not essential for survival, the benefits are many: daily conversations, official procedures, career relationships, and a sense of belonging. You don't need to aim for perfection — even a little Dutch opens up a lot.",
      },
      {
        question: 'Is Dutch difficult for Japanese speakers?',
        answer: "There are differences in pronunciation and grammar, but it's definitely learnable. The guttural G, R sounds, and word order might feel strange at first, but with practice, you will improve. At Learn with Miz, we focus on areas where Japanese learners commonly struggle.",
      },
      {
        question: 'Is it okay if I\'m a complete beginner?',
        answer: "Absolutely! Learn with Miz welcomes complete beginners. We start from the very basics — greetings, numbers, and simple phrases.",
      },
      {
        question: 'Are lessons conducted in Japanese?',
        answer: "Yes, lessons are conducted in Japanese. All grammar explanations, answers to questions, and detailed nuances are explained in Japanese, so you can learn with confidence.",
      },
      {
        question: 'Will there be online courses in the future?',
        answer: "Yes, we're working on it. We're currently developing self-paced recorded courses and structured curricula. If you join the waitlist, you'll be among the first to know when they launch.",
      },
      {
        question: 'Can I learn while raising children or working?',
        answer: "Of course. Lesson times and frequency are flexible. We'll design a learning plan that fits your lifestyle. Even a little bit of studying each day leads to steady progress.",
      },
      {
        question: 'How do I take lessons?',
        answer: "Currently, we primarily offer online private lessons via video call, so you can join from anywhere. Please use the contact form to reach out. We'll listen to your preferences, level, and goals, then suggest the best plan.",
      },
    ],
    cta: {
      title: 'Still Have Questions?',
      description: 'Feel free to reach out.',
      button: 'Contact',
    },
  },

  // Contact Page
  contact: {
    hero: {
      title: 'Contact',
      subtitle: 'Questions or lesson inquiries? Feel free to reach out.',
    },
    intro: {
      title: 'Contact / Waitlist Registration',
      description: 'For questions about lessons, learning consultations, or to receive updates about future courses, please use the form below.',
      fromMiz: "I respond to every message with care. Please feel free to ask about anything, no matter how small — whether it's about life in the Netherlands or learning Dutch. — Miz",
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      interest: 'What interests you?',
      interestPlaceholder: 'Please select',
      interestOptions: [
        { value: 'beginner', label: 'Beginner Lessons' },
        { value: 'private', label: 'Private Lessons' },
        { value: 'group', label: 'Group Lessons' },
        { value: 'course', label: 'Future Online Courses' },
        { value: 'updates', label: 'Just Updates' },
        { value: 'other', label: 'Other' },
      ],
      message: 'Message',
      messagePlaceholder: 'Share your questions or what you\'re looking for (optional)',
      submit: 'Submit',
      submitting: 'Sending...',
    },
    success: {
      title: 'Thank you for reaching out!',
      description: "We've received your message and will get back to you as soon as possible.",
      note: 'If you registered for the waitlist, you\'ll receive priority updates about new lessons and courses.',
      back: 'Back to Home',
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Get updates about new lessons, study tips, and course launches.',
      placeholder: 'Email address',
      button: 'Subscribe',
      success: 'Thank you for subscribing!',
    },
  },

  // SEO
  seo: {
    home: {
      title: 'Learn with Miz | Dutch Lessons for Japanese Learners',
      description: 'Dutch lessons for Japanese people in the Netherlands. Learn practical Dutch with clear Japanese explanations.',
    },
    about: {
      title: 'About Miz | Learn with Miz',
      description: 'Meet Mizuki, Dutch language instructor. A unique approach to teaching Dutch for Japanese learners.',
    },
    learnDutch: {
      title: 'Dutch Learning Guide | Learn with Miz',
      description: 'A guide to learning Dutch for Japanese speakers. Learning steps, common challenges, and effective study methods.',
    },
    lessons: {
      title: 'Lessons | Learn with Miz',
      description: 'Dutch lessons for Japanese learners. Private lessons, group lessons, and online courses.',
    },
    faq: {
      title: 'FAQ | Learn with Miz',
      description: 'Frequently asked questions about learning Dutch and lessons. Helping beginners feel confident.',
    },
    contact: {
      title: 'Contact | Learn with Miz',
      description: 'Inquiries about Dutch lessons, waitlist registration. Feel free to reach out.',
    },
  },
};
