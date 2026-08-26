/*
  SITE CONTENT SOURCE OF TRUTH
  ----------------------------
  Most wording on the website lives here.
  Edit text, choices, reveals, metrics, and testimonials without touching app.js.
*/
window.SITE_CONTENT = {
  landing: {
    eyebrow: "Relationship Opportunities Division",
    title: "Applications are now open.",
    body: "Following a period of strong personal growth and limited organic girlfriend acquisition, Charlie PLC is accepting expressions of interest for one long-term position.",
    facts: [
      ["Location", "Melbourne"],
      ["Position", "Girlfriend"],
      ["Contract", "Ideally ongoing"],
      ["Vacancies", "1"]
    ],
    note: "Before accessing the full prospectus, applicants must complete a brief cultural-fit assessment.",
    button: "Begin assessment",
    footnotes: ["Average completion time: 27 seconds", "No cover letter required"]
  },

  screening: {
    title: "Cultural fit assessment",
    intro: "Four questions. Some answers may be quietly appreciated.",
    questions: [
      {
        question: "A free Saturday has unexpectedly appeared. What are we doing?",
        options: [
          "Wandering somewhere new, finding food and drinks along the way",
          "Something active — beach, tennis, bike ride, whatever",
          "Social plans that somehow become a night out",
          "Staying in, cooking something and switching off"
        ]
      },
      {
        question: "Choose your preferred first-date format.",
        options: [
          "Drinks somewhere nice and accidentally talking for four hours",
          "A really good Japanese restaurant",
          "Activity followed by drinks",
          "Coffee and a walk"
        ]
      },
      {
        question: "Preferred relationship operating model?",
        options: [
          "Best friends who are also very into each other",
          "Constant banter with suspicious amounts of affection underneath",
          "Independent lives, very close relationship",
          "Adventure partners who occasionally remember to relax"
        ]
      },
      {
        question: "Charlie has just queued Don’t Stop Me Now or something from a musical. Your response?",
        options: [
          "Give me the second microphone",
          "I can absolutely be convinced",
          "I’ll provide enthusiastic moral support from the audience",
          "This represents a material threat to the relationship"
        ]
      }
    ],
    result: {
      title: "Initial screening: passed",
      body: "Your responses indicate acceptable levels of fun, conversational capability and tolerance for musical-theatre-related exposure.",
      statLabel: "Compatibility outlook",
      statValue: "Positive",
      button: "Begin due diligence",
      footnote: "This assessment has not been validated by any recognised psychological body, including the one Charlie is currently studying to join."
    }
  },

  dueDiligence: {
    eyebrow: "Due diligence",
    title: "Review the underlying asset.",
    intro: "Tap an answer. The market will reveal what it knows.",
    cards: [
      {
        image: "./assets/images/charlie_suit.jpg",
        imageAlt: "Placeholder for a serious-looking photo of Charlie",
        question: "Based purely on this photograph, what does Charlie study?",
        options: ["Finance", "Commerce", "Law", "Psychology"],
        correct: 3,
        revealTitle: "Psychology.",
        reveal: "Market analysts have historically overestimated Charlie’s exposure to commerce. He is currently completing his Master’s and is consequently dangerously qualified to ask: “Do you want advice, or do you just want me to listen?”"
      },
      {
        image: "./assets/images/charlie-bike.JPG",
        imageAlt: "Placeholder for a confident social photo of Charlie",
        question: "Which piece of infrastructure is currently missing from Charlie’s portfolio?",
        options: ["Emotional intelligence", "Ability to coach tennis", "A driver’s licence", "Karaoke confidence"],
        correct: 2,
        revealTitle: "A driver’s licence.",
        reveal: "This remains the company’s most significant transport-related vulnerability. Risk mitigation: you drive."
      },
      {
        image: "./assets/images/charlie-blush.svg",
        imageAlt: "Placeholder for an embarrassed photo of Charlie",
        question: "Charlie receives a genuine compliment. What happens?",
        options: ["Says thank you normally", "Smoothly returns it", "Pretends not to hear", "Turns red and loses operational capacity"],
        correct: 3,
        revealTitle: "Immediate redness event.",
        reveal: "Charlie is highly reactive to praise. No treatment is currently available.",
        redness: true
      },
      {
        image: "./assets/images/charlie-coke.svg",
        imageAlt: "Placeholder for a night-out photo of Charlie",
        question: "Which stimulant poses the greatest risk to CHRL’s sleep cycle?",
        options: ["Double espresso", "Pre-workout", "Energy drink", "One Coke Zero at an irresponsible hour"],
        correct: 3,
        revealTitle: "The Coke Zero.",
        reveal: "A single late Coke Zero may affect operations for several hours. Investors are advised to restrict caffeine exposure after approximately lunchtime."
      }
    ]
  },

  overview: {
    image: "./assets/images/charlie-hero.svg",
    imageAlt: "Placeholder for Charlie hero photo",
    ticker: "CHRL",
    name: "Charlie",
    subtitle: "Boyfriend candidate · Melbourne",
    status: "Publicly available",
    roles: ["Master’s student in psychology", "Tennis coach", "Also works at a butcher"],
    punchline: "Yes, these are somehow all the same person.",
    body: "Warm, social, chronically relaxed about almost everything and generally responsible for keeping the good vibes alive. He likes tennis, fitness, karaoke, long conversations and escaping to the beach house with his family and dog.",
    facts: [
      ["Investment horizon", "Long term"],
      ["Management style", "Happy-go-lucky"],
      ["Primary objective", "Someone he genuinely loves spending life with"]
    ]
  },

  scenarios: {
    eyebrow: "Scenario modelling",
    title: "Projected relationship performance",
    intro: "Historical data is limited. We constructed two hypothetical scenarios.",
    cards: [
      {
        image: "./assets/images/charlie-beach.svg",
        imageAlt: "Placeholder for Charlie at the beach house",
        question: "You both unexpectedly have a completely free weekend. Charlie’s preferred deployment?",
        options: [
          "Book every hour with activities",
          "City plans, drinks, big night",
          "Beach house, family, dog, good food, relax",
          "Twelve consecutive hours of Netflix"
        ],
        correct: 2,
        revealTitle: "Strong alignment opportunity detected.",
        reveal: "Charlie is happiest with a good social life, things to do, and somewhere comfortable to properly switch off. Ideally you are there too."
      },
      {
        image: "./assets/images/charlie-soft.svg",
        imageAlt: "Placeholder for a softer candid photo of Charlie",
        question: "You’ve had an absolutely terrible week. Charlie’s response?",
        options: [
          "Immediately tells you how to fix it",
          "Distracts you and refuses to discuss it",
          "Sends ‘damn that sucks’",
          "Figures out what you actually need first"
        ],
        correct: 3,
        revealTitle: "Flexible support strategy.",
        reveal: "Talk it through. Advice if you want advice. Listen if you need to vent. Get you out of the house if you need that instead."
      }
    ]
  },

  market: {
    eyebrow: "Market data",
    title: "CHRL performance",
    meta: [
      ["Ticker", "CHRL"],
      ["Sector", "Boyfriend"],
      ["Exchange", "Melbourne"],
      ["Outlook", "Cautiously optimistic"]
    ],
    metrics: [
      ["Emotional support infrastructure", "AAA", 100],
      ["Good-vibes maintenance", "98", 98],
      ["Remembering things you mentioned once", "97", 97],
      ["Conversation quality", "96", 96],
      ["Karaoke confidence", "91", 91],
      ["Ability to do absolutely nothing", "24", 24],
      ["Compliment handling", "12", 12],
      ["Caffeine resilience", "6", 6],
      ["Driver capability", "0", 1]
    ],
    risks: [
      ["Blonde-market exposure", "Elevated"],
      ["Redness volatility", "Extreme"],
      ["‘One more thing’ instead of relaxing", "High"],
      ["Hostile mother-in-law exposure", "Not accepted"]
    ],
    disclaimer: "Past performance does not guarantee future boyfriend performance."
  },

  position: {
    eyebrow: "Current opportunity",
    title: "Girlfriend",
    subtitle: "Melbourne · one position available",
    meta: [
      ["Reports to", "Nobody"],
      ["Employment type", "Hopefully permanent"],
      ["Probation", "That’s essentially what dating is"],
      ["Compensation", "Affection, Japanese food and stolen hoodies"]
    ],
    responsibilities: [
      "Talk absolute nonsense for several hours",
      "Participate in spontaneous tennis, bike rides or other activities",
      "Attend karaoke without judgement",
      "Visit the beach house",
      "Provide occasional reassurance during redness events",
      "Maintain your own friends, interests and life",
      "Give and receive elite-tier banter"
    ],
    requirements: "Charlie is not looking for a checklist. Someone confident, kind, fun to talk to and interested in actually doing life together would be a very good start. Best-friend energy strongly preferred.",
    testimonialsTitle: "What the market is saying",
    testimonials: [
      {
        rating: "BUY",
        quote: "[Replace with a real female-friend testimonial: warm, easy to talk to, emotionally safe, genuinely recommendable.]",
        author: "[Friend name]",
        relationship: "Female friend",
        reviewerKey: "femaleFriend",
        note: "Considerable credibility attached to this assessment."
      },
      {
        rating: "OUTPERFORM",
        quote: "[Replace with a real best-friend testimonial: funny, mildly humiliating, ultimately flattering.]",
        author: "[Best friend name]",
        relationship: "Best friend",
        reviewerKey: "bestFriend"
      },
      {
        rating: "STRONG BUY",
        quote: "Please take him.",
        author: "Charlie’s mum",
        relationship: "Family analyst",
        reviewerKey: "mum",
        note: "Material conflict of interest disclosed."
      },
      {
        rating: "SELL",
        quote: "Likes early mornings.",
        author: "Anonymous reviewer",
        relationship: "Lifestyle desk",
        note: "Management considers this criticism fundamentally unfair."
      }
    ]
  },

  close: {
    eyebrow: "Long-term outlook",
    title: "One normal moment.",
    body: "For all the financial language, Charlie is looking for something extremely normal: someone he can laugh with, talk properly with, do things with, bring home to his family, relax around and eventually build a genuinely loving relationship with.",
    ctaTitle: "Interested in CHRL?",
    ctaBody: "No eighteen-stage recruitment process. No application form. No psychometric testing. We already did that.",
    instagramLabel: "Follow Charlie on Instagram",
    instagramNote: "Conduct additional due diligence.",
    referralTitle: "Not your market?",
    referralBody: "Know someone who might represent a stronger strategic fit?",
    referralLabel: "Refer a friend",
    referralNote: "Referral bonuses consist exclusively of Charlie’s eternal gratitude.",
    faq: [
      ["Is Charlie genuinely looking for a girlfriend?", "Regrettably, yes."],
      ["Is this website serious?", "The underlying vacancy is. The procurement process is not."],
      ["Did Charlie approve all of this?", "Approval procedures remain under investigation."],
      ["Can I short CHRL?", "No."],
      ["Does he seriously not have a licence?", "Correct."],
      ["What happens if the position is filled?", "Trading will be suspended indefinitely."]
    ],
    legal: "CHRL is not a real publicly traded security. Investment may result in dates, karaoke, access to a dog and occasional second-hand embarrassment."
  }
};
