// Real India-focused career data with comprehensive intelligence
export interface CareerIntelligence {
  id: string
  title: string
  category: "tech" | "business" | "creative" | "science" | "healthcare" | "finance"
  description: string
  shortDescription: string
  
  // Match intelligence
  matchScore: {
    analytical: number
    creative: number
    technical: number
    communication: number
    leadership: number
    problemSolving: number
  }
  
  // Market intelligence (India-specific)
  marketData: {
    entrySalary: number // Annual in INR
    midSalary: number
    seniorSalary: number
    demandLevel: "very-high" | "high" | "medium" | "low"
    growthOutlook: "excellent" | "good" | "stable" | "declining"
    remoteOpportunity: "excellent" | "good" | "limited" | "rare"
    automationRisk: "low" | "medium" | "high"
    competitionLevel: "very-high" | "high" | "medium" | "low"
    jobOutlook2025: string
  }
  
  // Why this match explanations
  matchReasons: {
    strength: string[]
    alignment: string[]
    marketFit: string[]
  }
  
  // Potential challenges
  challenges: {
    category: string
    description: string
    severity: "low" | "medium" | "high"
    mitigation: string
  }[]
  
  // Growth roadmap
  roadmap: {
    stage: string
    title: string
    description: string
    timeframe: string
    milestones: string[]
  }[]
  
  // Skills breakdown
  skills: {
    name: string
    category: "technical" | "soft" | "domain"
    importance: "critical" | "important" | "nice-to-have"
    currentLevel?: number // 0-100, populated based on assessment
    requiredLevel: number // 0-100
    gapAnalysis?: string // calculated
  }[]
  
  // Alternative careers
  alternatives: {
    title: string
    similarity: number // 0-100
    transitionDifficulty: "easy" | "moderate" | "hard"
    reason: string
  }[]
  
  // Education pathways
  education: {
    degree: string
    duration: string
    topColleges: string[]
    alternativePaths: string[]
    certifications: string[]
  }
  
  // Reality check
  realityCheck: {
    difficulty: "high" | "medium" | "low"
    timeToCompetency: string
    initialBarrier: string
    workLifeBalance: "excellent" | "good" | "average" | "poor"
    stressLevel: "high" | "medium" | "low"
    industrySaturation: "saturated" | "competitive" | "growing" | "emerging"
  }
  
  // Learning resources
  resources: {
    youtube: string[]
    courses: { name: string; platform: string; url?: string }[]
    certifications: string[]
    communities: string[]
    books: string[]
  }
  
  // Career progression
  progression: {
    level: string
    title: string
    salaryRange: string
    experience: string
    responsibilities: string[]
  }[]
}

// Comprehensive career database
export const careersDatabase: CareerIntelligence[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "tech",
    description: "Design, develop, and maintain software applications, systems, and platforms. Work across web, mobile, cloud, and enterprise software.",
    shortDescription: "Build software that powers the digital world",
    
    matchScore: {
      analytical: 90,
      creative: 70,
      technical: 95,
      communication: 65,
      leadership: 60,
      problemSolving: 95
    },
    
    marketData: {
      entrySalary: 800000,
      midSalary: 1800000,
      seniorSalary: 4500000,
      demandLevel: "very-high",
      growthOutlook: "excellent",
      remoteOpportunity: "excellent",
      automationRisk: "low",
      competitionLevel: "high",
      jobOutlook2025: "Massive demand across all sectors. India's IT industry growing at 15% annually."
    },
    
    matchReasons: {
      strength: [
        "Strong analytical thinking detected in your assessment",
        "High technical aptitude and logical reasoning",
        "Good problem-solving pattern recognition"
      ],
      alignment: [
        "Your interest in building things aligns with software development",
        "Preference for structured problem-solving matches engineering mindset",
        "Detail-oriented nature fits debugging and testing requirements"
      ],
      marketFit: [
        "India's tech sector is booming with 4.5M+ developers needed by 2025",
        "Remote work opportunities are abundant",
        "Strong salary growth trajectory in Indian market"
      ]
    },
    
    challenges: [
      {
        category: "Continuous Learning",
        description: "Technology evolves rapidly. You must learn new frameworks and languages constantly.",
        severity: "high",
        mitigation: "Develop a learning habit. Spend 5-10 hours weekly on upskilling."
      },
      {
        category: "Initial Competition",
        description: "Entry-level positions are competitive. Many fresh graduates compete for limited roles.",
        severity: "medium",
        mitigation: "Build strong projects, contribute to open source, get internships early."
      },
      {
        category: "Sedentary Work",
        description: "Long hours at computer can impact physical health.",
        severity: "low",
        mitigation: "Maintain exercise routine, use standing desk, take regular breaks."
      }
    ],
    
    roadmap: [
      {
        stage: "foundation",
        title: "Class 11-12",
        description: "Build strong math and logic foundation",
        timeframe: "2 years",
        milestones: ["Excel in Mathematics", "Learn basic programming", "Develop logical thinking"]
      },
      {
        stage: "education",
        title: "B.Tech/B.E. in CS",
        description: "Formal computer science education",
        timeframe: "4 years",
        milestones: ["Master data structures", "Learn algorithms", "Build projects", "Internships"]
      },
      {
        stage: "skill-building",
        title: "Skill Development",
        description: "Master modern tech stack",
        timeframe: "1-2 years",
        milestones: ["Learn React/Node.js", "Build portfolio", "Contribute to open source"]
      },
      {
        stage: "entry",
        title: "Junior Developer",
        description: "First professional role",
        timeframe: "0-2 years",
        milestones: ["Join startup or MNC", "Learn codebase", "Ship features"]
      },
      {
        stage: "growth",
        title: "Software Engineer",
        description: "Independent contributor",
        timeframe: "2-5 years",
        milestones: ["Own features end-to-end", "Mentor juniors", "System design skills"]
      },
      {
        stage: "senior",
        title: "Senior Engineer",
        description: "Technical leader",
        timeframe: "5-8 years",
        milestones: ["Architecture decisions", "Cross-team collaboration", "Technical leadership"]
      }
    ],
    
    skills: [
      { name: "Programming (Python/JavaScript)", category: "technical", importance: "critical", requiredLevel: 85 },
      { name: "Data Structures & Algorithms", category: "technical", importance: "critical", requiredLevel: 80 },
      { name: "System Design", category: "technical", importance: "important", requiredLevel: 70 },
      { name: "Problem Solving", category: "soft", importance: "critical", requiredLevel: 90 },
      { name: "Debugging", category: "technical", importance: "critical", requiredLevel: 75 },
      { name: "Communication", category: "soft", importance: "important", requiredLevel: 60 },
      { name: "Git & Version Control", category: "technical", importance: "critical", requiredLevel: 80 },
      { name: "Database Management", category: "technical", importance: "important", requiredLevel: 70 },
      { name: "Team Collaboration", category: "soft", importance: "important", requiredLevel: 65 },
      { name: "Continuous Learning", category: "soft", importance: "critical", requiredLevel: 85 }
    ],
    
    alternatives: [
      { title: "Data Scientist", similarity: 75, transitionDifficulty: "moderate", reason: "Uses similar analytical skills, more math-focused" },
      { title: "Product Manager", similarity: 60, transitionDifficulty: "moderate", reason: "Technical background valuable, more business-focused" },
      { title: "DevOps Engineer", similarity: 70, transitionDifficulty: "easy", reason: "Same technical foundation, different focus" },
      { title: "AI Engineer", similarity: 80, transitionDifficulty: "moderate", reason: "Natural progression, requires ML specialization" },
      { title: "Cybersecurity Engineer", similarity: 65, transitionDifficulty: "moderate", reason: "Technical foundation applies, security-focused" }
    ],
    
    education: {
      degree: "B.Tech/B.E. in Computer Science or related",
      duration: "4 years",
      topColleges: ["IITs", "NITs", "BITS Pilani", "IIITs", "Top state engineering colleges"],
      alternativePaths: ["BCA + MCA", "Self-taught + Bootcamps", "B.Sc CS + M.Sc"],
      certifications: ["AWS Certified", "Google Cloud", "Microsoft Azure", "Scrum Master"]
    },
    
    realityCheck: {
      difficulty: "medium",
      timeToCompetency: "2-3 years to become job-ready",
      initialBarrier: "Competitive entry, requires strong DSA skills",
      workLifeBalance: "good",
      stressLevel: "medium",
      industrySaturation: "competitive"
    },
    
    resources: {
      youtube: ["freeCodeCamp", "Traversy Media", "The Net Ninja", "CodeWithHarry", "Apna College"],
      courses: [
        { name: "Full Stack Web Development", platform: "Udemy" },
        { name: "CS50", platform: "Harvard/edX" },
        { name: "Data Structures", platform: "Coursera" }
      ],
      certifications: ["AWS Certified Developer", "Google Associate Cloud Engineer", "Microsoft AZ-900"],
      communities: ["GitHub", "Stack Overflow", "Dev.to", "Indian tech Discord servers"],
      books: ["Clean Code", "Design Patterns", "Introduction to Algorithms"]
    },
    
    progression: [
      {
        level: "entry",
        title: "Junior Developer",
        salaryRange: "₹6L - ₹12L",
        experience: "0-2 years",
        responsibilities: ["Write code under supervision", "Fix bugs", "Learn codebase", "Attend standups"]
      },
      {
        level: "mid",
        title: "Software Engineer",
        salaryRange: "₹12L - ₹25L",
        experience: "2-5 years",
        responsibilities: ["Own features", "Code reviews", "Mentor juniors", "System design"]
      },
      {
        level: "senior",
        title: "Senior Engineer",
        salaryRange: "₹25L - ₹50L",
        experience: "5-8 years",
        responsibilities: ["Architecture decisions", "Cross-team leadership", "Technical strategy"]
      },
      {
        level: "lead",
        title: "Staff/Principal Engineer",
        salaryRange: "₹50L - ₹1Cr+",
        experience: "8+ years",
        responsibilities: ["Company-wide architecture", "Mentor teams", "Strategic decisions"]
      }
    ]
  },
  
  // Add more careers here...
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "tech",
    description: "Analyze complex data to extract insights, build predictive models, and drive data-informed business decisions.",
    shortDescription: "Turn data into actionable intelligence",
    
    matchScore: {
      analytical: 95,
      creative: 75,
      technical: 85,
      communication: 70,
      leadership: 55,
      problemSolving: 90
    },
    
    marketData: {
      entrySalary: 1000000,
      midSalary: 2500000,
      seniorSalary: 6000000,
      demandLevel: "very-high",
      growthOutlook: "excellent",
      remoteOpportunity: "excellent",
      automationRisk: "low",
      competitionLevel: "high",
      jobOutlook2025: "11.5M data science jobs by 2026. India emerging as analytics hub."
    },
    
    matchReasons: {
      strength: [
        "Exceptional mathematical aptitude detected",
        "Strong pattern recognition abilities",
        "Analytical mindset with curiosity for insights"
      ],
      alignment: [
        "Love for numbers and statistics matches data work",
        "Intellectual curiosity fits research nature",
        "Problem-solving approach aligns with hypothesis testing"
      ],
      marketFit: [
        "Data is the new oil - every company needs data scientists",
        "AI/ML boom creating massive demand",
        "High salary potential in Indian market"
      ]
    },
    
    challenges: [
      {
        category: "Mathematics Intensity",
        description: "Requires strong statistics, linear algebra, and calculus knowledge.",
        severity: "high",
        mitigation: "Start with basics, use visual learning, practice with real datasets."
      },
      {
        category: "Continuous Learning",
        description: "ML techniques evolve rapidly. Must stay updated with latest research.",
        severity: "high",
        mitigation: "Follow research papers, join Kaggle, participate in competitions."
      },
      {
        category: "Business Communication",
        description: "Must explain complex findings to non-technical stakeholders.",
        severity: "medium",
        mitigation: "Practice storytelling, learn data visualization, develop presentation skills."
      }
    ],
    
    roadmap: [
      {
        stage: "foundation",
        title: "Class 11-12",
        description: "Master mathematics and statistics",
        timeframe: "2 years",
        milestones: ["Excel in Math & Stats", "Learn Python basics", "Understand probability"]
      },
      {
        stage: "education",
        title: "B.Tech/B.Sc + M.Sc",
        description: "Strong quantitative background",
        timeframe: "4-5 years",
        milestones: ["Statistics major", "Programming skills", "Research projects"]
      },
      {
        stage: "specialization",
        title: "ML & Data Science",
        description: "Master data science tools",
        timeframe: "1-2 years",
        milestones: ["Learn ML algorithms", "Kaggle competitions", "Build portfolio"]
      },
      {
        stage: "entry",
        title: "Data Analyst",
        description: "Entry-level data role",
        timeframe: "0-2 years",
        milestones: ["SQL mastery", "Dashboard creation", "Business insights"]
      },
      {
        stage: "growth",
        title: "Data Scientist",
        description: "Build predictive models",
        timeframe: "2-5 years",
        milestones: ["ML models", "A/B testing", "Production deployment"]
      },
      {
        stage: "senior",
        title: "Senior Data Scientist",
        description: "Lead data initiatives",
        timeframe: "5-8 years",
        milestones: ["Team leadership", "Strategic insights", "Advanced ML"]
      }
    ],
    
    skills: [
      { name: "Python/R Programming", category: "technical", importance: "critical", requiredLevel: 85 },
      { name: "Statistics & Probability", category: "technical", importance: "critical", requiredLevel: 90 },
      { name: "Machine Learning", category: "technical", importance: "critical", requiredLevel: 80 },
      { name: "SQL & Databases", category: "technical", importance: "critical", requiredLevel: 85 },
      { name: "Data Visualization", category: "technical", importance: "important", requiredLevel: 75 },
      { name: "Critical Thinking", category: "soft", importance: "critical", requiredLevel: 90 },
      { name: "Communication", category: "soft", importance: "important", requiredLevel: 70 },
      { name: "Domain Knowledge", category: "domain", importance: "important", requiredLevel: 60 },
      { name: "Big Data Tools", category: "technical", importance: "important", requiredLevel: 65 },
      { name: "Experiment Design", category: "technical", importance: "important", requiredLevel: 70 }
    ],
    
    alternatives: [
      { title: "Machine Learning Engineer", similarity: 85, transitionDifficulty: "easy", reason: "Same foundation, more engineering focus" },
      { title: "Data Engineer", similarity: 70, transitionDifficulty: "easy", reason: "Technical overlap, infrastructure focus" },
      { title: "Business Analyst", similarity: 60, transitionDifficulty: "easy", reason: "Less technical, more business focus" },
      { title: "AI Researcher", similarity: 80, transitionDifficulty: "moderate", reason: "Academic path, deeper specialization" },
      { title: "Product Manager", similarity: 50, transitionDifficulty: "hard", reason: "Leverage data skills for product decisions" }
    ],
    
    education: {
      degree: "B.Tech/B.Sc in CS/Statistics/Math + M.Sc/M.Tech",
      duration: "4-5 years",
      topColleges: ["IITs", "ISI", "CMI", "IISc", "Top universities with stats programs"],
      alternativePaths: ["B.Sc Statistics + M.Sc Data Science", "Engineering + Online certifications"],
      certifications: ["Google Data Analytics", "IBM Data Science", "AWS Machine Learning"]
    },
    
    realityCheck: {
      difficulty: "high",
      timeToCompetency: "3-4 years including strong math foundation",
      initialBarrier: "Requires strong quantitative background",
      workLifeBalance: "good",
      stressLevel: "medium",
      industrySaturation: "growing"
    },
    
    resources: {
      youtube: ["StatQuest", "3Blue1Brown", "Krish Naik", "Codebasics", "Sentdex"],
      courses: [
        { name: "Machine Learning", platform: "Coursera (Andrew Ng)" },
        { name: "Data Science Specialization", platform: "Johns Hopkins" },
        { name: "Python for Data Science", platform: "DataCamp" }
      ],
      certifications: ["Google Professional Data Engineer", "Microsoft DP-100", "AWS ML Specialty"],
      communities: ["Kaggle", "Towards Data Science", "Analytics Vidhya", "Data Science India"],
      books: ["Introduction to Statistical Learning", "Python for Data Analysis", "Hands-On ML"]
    },
    
    progression: [
      {
        level: "entry",
        title: "Data Analyst",
        salaryRange: "₹5L - ₹10L",
        experience: "0-2 years",
        responsibilities: ["Data cleaning", "Dashboard creation", "Basic analysis", "Reporting"]
      },
      {
        level: "mid",
        title: "Data Scientist",
        salaryRange: "₹10L - ₹25L",
        experience: "2-5 years",
        responsibilities: ["Predictive modeling", "Feature engineering", "A/B testing", "ML deployment"]
      },
      {
        level: "senior",
        title: "Senior Data Scientist",
        salaryRange: "₹25L - ₹50L",
        experience: "5-8 years",
        responsibilities: ["Complex models", "Team leadership", "Strategic insights", "Architecture"]
      },
      {
        level: "lead",
        title: "Principal Data Scientist",
        salaryRange: "₹50L - ₹1Cr+",
        experience: "8+ years",
        responsibilities: ["Research leadership", "Company strategy", "Advanced AI", "Mentorship"]
      }
    ]
  }
]

// Helper function to get career by ID
export function getCareerById(id: string): CareerIntelligence | undefined {
  return careersDatabase.find(career => career.id === id)
}

// Helper function to get all careers
export function getAllCareers(): CareerIntelligence[] {
  return careersDatabase
}

// Calculate match score based on user profile
export function calculateMatchScore(
  career: CareerIntelligence,
  userProfile: {
    analytical: number
    creative: number
    technical: number
    communication: number
    leadership: number
    problemSolving: number
  }
): {
  overall: number
  breakdown: Record<string, number>
  insights: string[]
} {
  const weights = {
    analytical: 0.25,
    creative: 0.15,
    technical: 0.25,
    communication: 0.15,
    leadership: 0.10,
    problemSolving: 0.10
  }
  
  const breakdown: Record<string, number> = {}
  let weightedScore = 0
  
  Object.entries(career.matchScore).forEach(([trait, required]) => {
    const user = userProfile[trait as keyof typeof userProfile] || 50
    const match = Math.min((user / required) * 100, 100)
    breakdown[trait] = Math.round(match)
    weightedScore += match * weights[trait as keyof typeof weights]
  })
  
  const overall = Math.round(weightedScore)
  
  // Generate insights
  const insights: string[] = []
  const sortedTraits = Object.entries(breakdown).sort((a, b) => b[1] - a[1])
  
  if (sortedTraits[0][1] >= 85) {
    insights.push(`Exceptional ${sortedTraits[0][0]} fit - top percentile`)
  }
  if (sortedTraits[sortedTraits.length - 1][1] < 60) {
    insights.push(`Develop ${sortedTraits[sortedTraits.length - 1][0]} for better alignment`)
  }
  if (overall >= 80) {
    insights.push("Strong overall career fit - excellent choice")
  }
  
  return { overall, breakdown, insights }
}

// Get personalized recommendations
export function getPersonalizedRecommendations(
  userProfile: {
    analytical: number
    creative: number
    technical: number
    communication: number
    leadership: number
    problemSolving: number
  },
  limit: number = 4
): { career: CareerIntelligence; score: number; insights: string[] }[] {
  const scored = careersDatabase.map(career => {
    const { overall, insights } = calculateMatchScore(career, userProfile)
    return { career, score: overall, insights }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
