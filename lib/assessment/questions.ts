export type QuestionType = 'multiple_choice' | 'scale' | 'ranking' | 'scenario' | 'yes_no'

export interface Option {
  id: string
  label: string
  value: string | number
  icon?: string
}

export interface Question {
  id: string
  category: AssessmentCategory
  type: QuestionType
  question: string
  description?: string
  options: Option[]
  required?: boolean
  maxSelections?: number
}

export type AssessmentCategory = 
  | 'personality' 
  | 'interests' 
  | 'skills' 
  | 'academic' 
  | 'career_preferences' 
  | 'learning_style' 
  | 'goals' 
  | 'stream_aspirations'

export interface AssessmentStep {
  id: AssessmentCategory
  title: string
  description: string
  icon: string
  questions: Question[]
}

// ============================================
// PERSONALITY QUESTIONS (8 questions)
// ============================================
const personalityQuestions: Question[] = [
  {
    id: 'personality_social_preference',
    category: 'personality',
    type: 'multiple_choice',
    question: 'How do you prefer to work?',
    description: 'Choose the option that best describes your working style',
    options: [
      { id: 'alone', label: 'Alone - I prefer independent work', value: 'alone' },
      { id: 'small_team', label: 'In a small team (2-4 people)', value: 'small_team' },
      { id: 'large_team', label: 'In a large team (5+ people)', value: 'large_team' },
      { id: 'mixed', label: 'A mix of independent and team work', value: 'mixed' },
    ],
    required: true,
  },
  {
    id: 'personality_decision_making',
    category: 'personality',
    type: 'multiple_choice',
    question: 'When making decisions, you typically:',
    options: [
      { id: 'analytical', label: 'Analyze data and facts carefully', value: 'analytical' },
      { id: 'intuitive', label: 'Trust your gut feeling', value: 'intuitive' },
      { id: 'consult', label: 'Consult with others and seek advice', value: 'consult' },
      { id: 'practical', label: 'Consider practical outcomes first', value: 'practical' },
    ],
    required: true,
  },
  {
    id: 'personality_stress_handling',
    category: 'personality',
    type: 'multiple_choice',
    question: 'How do you handle stressful situations?',
    options: [
      { id: 'stay_calm', label: 'Stay calm and methodical', value: 'stay_calm' },
      { id: 'take_charge', label: 'Take charge and act quickly', value: 'take_charge' },
      { id: 'seek_support', label: 'Seek support from others', value: 'seek_support' },
      { id: 'problem_solve', label: 'Focus on solving the problem', value: 'problem_solve' },
    ],
    required: true,
  },
  {
    id: 'personality_routine_preference',
    category: 'personality',
    type: 'scale',
    question: 'I prefer having a structured routine over spontaneous activities',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'personality_leadership',
    category: 'personality',
    type: 'multiple_choice',
    question: 'In group situations, you usually:',
    options: [
      { id: 'leader', label: 'Take the lead and guide others', value: 'leader' },
      { id: 'contributor', label: 'Contribute ideas actively', value: 'contributor' },
      { id: 'supporter', label: 'Support and help execute plans', value: 'supporter' },
      { id: 'observer', label: 'Observe and contribute when needed', value: 'observer' },
    ],
    required: true,
  },
  {
    id: 'personality_detail_orientation',
    category: 'personality',
    type: 'scale',
    question: 'I pay close attention to small details in my work',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'personality_risk_taking',
    category: 'personality',
    type: 'multiple_choice',
    question: 'How do you approach risks and new opportunities?',
    options: [
      { id: 'cautious', label: 'Very cautious - prefer safe options', value: 'cautious' },
      { id: 'calculated', label: 'Calculated risks after analysis', value: 'calculated' },
      { id: 'moderate', label: 'Moderate - depends on the situation', value: 'moderate' },
      { id: 'adventurous', label: 'Adventurous - embrace new challenges', value: 'adventurous' },
    ],
    required: true,
  },
  {
    id: 'personality_creativity',
    category: 'personality',
    type: 'scale',
    question: 'I enjoy coming up with creative and original ideas',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
]

// ============================================
// INTERESTS QUESTIONS (8 questions)
// ============================================
const interestsQuestions: Question[] = [
  {
    id: 'interests_activities',
    category: 'interests',
    type: 'multiple_choice',
    question: 'Which activities do you enjoy most in your free time?',
    description: 'Select up to 3 options',
    options: [
      { id: 'reading', label: 'Reading books/articles', value: 'reading' },
      { id: 'sports', label: 'Playing sports or exercising', value: 'sports' },
      { id: 'coding', label: 'Coding or working with technology', value: 'coding' },
      { id: 'art', label: 'Drawing, painting, or creating art', value: 'art' },
      { id: 'music', label: 'Playing or listening to music', value: 'music' },
      { id: 'socializing', label: 'Socializing with friends', value: 'socializing' },
      { id: 'gaming', label: 'Playing video games', value: 'gaming' },
      { id: 'writing', label: 'Writing stories or journaling', value: 'writing' },
      { id: 'building', label: 'Building or fixing things', value: 'building' },
      { id: 'nature', label: 'Spending time in nature', value: 'nature' },
    ],
    required: true,
    maxSelections: 3,
  },
  {
    id: 'interests_subjects',
    category: 'interests',
    type: 'multiple_choice',
    question: 'Which school subjects interest you the most?',
    description: 'Select up to 3 options',
    options: [
      { id: 'mathematics', label: 'Mathematics', value: 'mathematics' },
      { id: 'physics', label: 'Physics', value: 'physics' },
      { id: 'chemistry', label: 'Chemistry', value: 'chemistry' },
      { id: 'biology', label: 'Biology', value: 'biology' },
      { id: 'computer', label: 'Computer Science', value: 'computer' },
      { id: 'history', label: 'History & Social Studies', value: 'history' },
      { id: 'geography', label: 'Geography', value: 'geography' },
      { id: 'english', label: 'English & Literature', value: 'english' },
      { id: 'economics', label: 'Economics', value: 'economics' },
      { id: 'arts', label: 'Arts & Design', value: 'arts' },
    ],
    required: true,
    maxSelections: 3,
  },
  {
    id: 'interests_career_areas',
    category: 'interests',
    type: 'multiple_choice',
    question: 'Which broad career areas sound interesting to you?',
    description: 'Select up to 3 options',
    options: [
      { id: 'technology', label: 'Technology & Computing', value: 'technology' },
      { id: 'healthcare', label: 'Healthcare & Medicine', value: 'healthcare' },
      { id: 'business', label: 'Business & Finance', value: 'business' },
      { id: 'engineering', label: 'Engineering', value: 'engineering' },
      { id: 'design', label: 'Design & Creative Arts', value: 'design' },
      { id: 'science', label: 'Science & Research', value: 'science' },
      { id: 'government', label: 'Government & Civil Services', value: 'government' },
      { id: 'education', label: 'Education & Teaching', value: 'education' },
      { id: 'media', label: 'Media & Communication', value: 'media' },
      { id: 'law', label: 'Law & Legal Services', value: 'law' },
    ],
    required: true,
    maxSelections: 3,
  },
  {
    id: 'interests_problem_solving',
    category: 'interests',
    type: 'scenario',
    question: 'You have a free weekend. Which project would you most likely choose?',
    options: [
      { id: 'build_app', label: 'Build a simple mobile app or website', value: 'build_app' },
      { id: 'write_research', label: 'Research and write about a historical event', value: 'write_research' },
      { id: 'design_poster', label: 'Design posters for a local event', value: 'design_poster' },
      { id: 'organize_event', label: 'Organize a community gathering', value: 'organize_event' },
      { id: 'science_exp', label: 'Conduct a science experiment at home', value: 'science_exp' },
    ],
    required: true,
  },
  {
    id: 'interests_reading_topics',
    category: 'interests',
    type: 'multiple_choice',
    question: 'What type of content do you enjoy reading or watching?',
    description: 'Select up to 2 options',
    options: [
      { id: 'tech_news', label: 'Tech news and innovations', value: 'tech_news' },
      { id: 'medical', label: 'Medical and health information', value: 'medical' },
      { id: 'business', label: 'Business and entrepreneurship', value: 'business' },
      { id: 'science', label: 'Scientific discoveries', value: 'science' },
      { id: 'politics', label: 'Politics and current affairs', value: 'politics' },
      { id: 'arts_culture', label: 'Arts and culture', value: 'arts_culture' },
      { id: 'sports', label: 'Sports and athletics', value: 'sports' },
    ],
    required: true,
    maxSelections: 2,
  },
  {
    id: 'interests_hands_on',
    category: 'interests',
    type: 'scale',
    question: 'I enjoy hands-on activities and working with physical objects',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'interests_helping_others',
    category: 'interests',
    type: 'scale',
    question: 'I find satisfaction in helping others and making a positive impact',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'interests_research',
    category: 'interests',
    type: 'scale',
    question: 'I enjoy researching and diving deep into topics that interest me',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
]

// ============================================
// SKILLS QUESTIONS (7 questions)
// ============================================
const skillsQuestions: Question[] = [
  {
    id: 'skills_self_assessment',
    category: 'skills',
    type: 'ranking',
    question: 'Rate your proficiency in the following areas:',
    options: [
      { id: 'analytical', label: 'Analytical thinking & problem solving', value: 'analytical' },
      { id: 'communication', label: 'Communication & writing', value: 'communication' },
      { id: 'creativity', label: 'Creativity & innovation', value: 'creativity' },
      { id: 'technical', label: 'Technical/Computer skills', value: 'technical' },
      { id: 'leadership', label: 'Leadership & management', value: 'leadership' },
      { id: 'numerical', label: 'Numerical & mathematical', value: 'numerical' },
      { id: 'interpersonal', label: 'Interpersonal & teamwork', value: 'interpersonal' },
    ],
    required: true,
  },
  {
    id: 'skills_programming',
    category: 'skills',
    type: 'yes_no',
    question: 'Do you have any programming or coding experience?',
    options: [
      { id: 'yes', label: 'Yes', value: 'yes' },
      { id: 'no', label: 'No', value: 'no' },
    ],
    required: true,
  },
  {
    id: 'skills_languages',
    category: 'skills',
    type: 'multiple_choice',
    question: 'Which languages are you comfortable with?',
    description: 'Select all that apply',
    options: [
      { id: 'hindi', label: 'Hindi', value: 'hindi' },
      { id: 'english', label: 'English', value: 'english' },
      { id: 'regional', label: 'Regional language', value: 'regional' },
      { id: 'foreign', label: 'Foreign language (German, French, etc.)', value: 'foreign' },
    ],
    required: true,
  },
  {
    id: 'skills_writing',
    category: 'skills',
    type: 'scale',
    question: 'I can express my thoughts clearly in writing',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'skills_presentation',
    category: 'skills',
    type: 'scale',
    question: 'I am comfortable presenting in front of groups or audiences',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'skills_math_comfort',
    category: 'skills',
    type: 'multiple_choice',
    question: 'How comfortable are you with mathematics?',
    options: [
      { id: 'very', label: 'Very comfortable - I enjoy complex problems', value: 'very' },
      { id: 'somewhat', label: 'Somewhat comfortable - I can manage', value: 'somewhat' },
      { id: 'basic', label: 'Basic level - I prefer simple calculations', value: 'basic' },
      { id: 'avoid', label: 'I try to avoid math when possible', value: 'avoid' },
    ],
    required: true,
  },
  {
    id: 'skills_learning_speed',
    category: 'skills',
    type: 'multiple_choice',
    question: 'How quickly do you typically learn new skills?',
    options: [
      { id: 'very_fast', label: 'Very fast - I pick things up quickly', value: 'very_fast' },
      { id: 'fast', label: 'Fast - With some practice I learn well', value: 'fast' },
      { id: 'average', label: 'Average - I learn at a normal pace', value: 'average' },
      { id: 'slow', label: 'Slow - I need more time to master skills', value: 'slow' },
    ],
    required: true,
  },
]

// ============================================
// ACADEMIC PERFORMANCE QUESTIONS (6 questions)
// ============================================
const academicQuestions: Question[] = [
  {
    id: 'academic_overall_performance',
    category: 'academic',
    type: 'multiple_choice',
    question: 'How would you rate your overall academic performance?',
    options: [
      { id: 'top', label: 'Top 10% of my class', value: 'top' },
      { id: 'above_average', label: 'Above average (Top 25%)', value: 'above_average' },
      { id: 'average', label: 'Average (50-75%)', value: 'average' },
      { id: 'below_average', label: 'Below average', value: 'below_average' },
    ],
    required: true,
  },
  {
    id: 'academic_strong_subjects',
    category: 'academic',
    type: 'multiple_choice',
    question: 'Which subjects do you perform best in?',
    description: 'Select up to 3',
    options: [
      { id: 'mathematics', label: 'Mathematics', value: 'mathematics' },
      { id: 'physics', label: 'Physics', value: 'physics' },
      { id: 'chemistry', label: 'Chemistry', value: 'chemistry' },
      { id: 'biology', label: 'Biology', value: 'biology' },
      { id: 'english', label: 'English', value: 'english' },
      { id: 'social', label: 'Social Sciences', value: 'social' },
      { id: 'computer', label: 'Computer Science', value: 'computer' },
      { id: 'languages', label: 'Languages', value: 'languages' },
    ],
    required: true,
    maxSelections: 3,
  },
  {
    id: 'academic_weak_subjects',
    category: 'academic',
    type: 'multiple_choice',
    question: 'Which subjects do you find challenging?',
    description: 'Select up to 2',
    options: [
      { id: 'mathematics', label: 'Mathematics', value: 'mathematics' },
      { id: 'physics', label: 'Physics', value: 'physics' },
      { id: 'chemistry', label: 'Chemistry', value: 'chemistry' },
      { id: 'biology', label: 'Biology', value: 'biology' },
      { id: 'english', label: 'English', value: 'english' },
      { id: 'social', label: 'Social Sciences', value: 'social' },
      { id: 'computer', label: 'Computer Science', value: 'computer' },
      { id: 'none', label: 'None - I manage all subjects well', value: 'none' },
    ],
    required: true,
    maxSelections: 2,
  },
  {
    id: 'academic_study_hours',
    category: 'academic',
    type: 'multiple_choice',
    question: 'How many hours do you study per day (on average)?',
    options: [
      { id: 'less_2', label: 'Less than 2 hours', value: 'less_2' },
      { id: '2_4', label: '2-4 hours', value: '2_4' },
      { id: '4_6', label: '4-6 hours', value: '4_6' },
      { id: '6_8', label: '6-8 hours', value: '6_8' },
      { id: 'more_8', label: 'More than 8 hours', value: 'more_8' },
    ],
    required: true,
  },
  {
    id: 'academic_preferred_study',
    category: 'academic',
    type: 'multiple_choice',
    question: 'How do you prefer to study?',
    options: [
      { id: 'self', label: 'Self-study with books and notes', value: 'self' },
      { id: 'online', label: 'Online videos and courses', value: 'online' },
      { id: 'coaching', label: 'Coaching classes', value: 'coaching' },
      { id: 'group', label: 'Study groups with friends', value: 'group' },
      { id: 'mixed', label: 'A mix of different methods', value: 'mixed' },
    ],
    required: true,
  },
  {
    id: 'academic_exam_preparation',
    category: 'academic',
    type: 'scale',
    question: 'I perform well under exam pressure',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
]

// ============================================
// CAREER PREFERENCES QUESTIONS (6 questions)
// ============================================
const careerPreferencesQuestions: Question[] = [
  {
    id: 'career_work_environment',
    category: 'career_preferences',
    type: 'multiple_choice',
    question: 'What type of work environment do you prefer?',
    options: [
      { id: 'office', label: 'Corporate office setting', value: 'office' },
      { id: 'remote', label: 'Work from home / Remote', value: 'remote' },
      { id: 'field', label: 'Outdoor/Field work', value: 'field' },
      { id: 'lab', label: 'Laboratory/Research setting', value: 'lab' },
      { id: 'hospital', label: 'Hospital/Clinical setting', value: 'hospital' },
      { id: 'creative', label: 'Creative studio/Workshop', value: 'creative' },
    ],
    required: true,
  },
  {
    id: 'career_travel_willingness',
    category: 'career_preferences',
    type: 'multiple_choice',
    question: 'How much are you willing to travel for work?',
    options: [
      { id: 'none', label: 'Prefer no travel', value: 'none' },
      { id: 'occasional', label: 'Occasional travel (once a month)', value: 'occasional' },
      { id: 'regular', label: 'Regular travel (weekly)', value: 'regular' },
      { id: 'extensive', label: 'Extensive travel is fine', value: 'extensive' },
    ],
    required: true,
  },
  {
    id: 'career_salary_importance',
    category: 'career_preferences',
    type: 'scale',
    question: 'Having a high salary is very important to me',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'career_job_security',
    category: 'career_preferences',
    type: 'scale',
    question: 'Job security and stability are more important than high earnings',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'career_growth_importance',
    category: 'career_preferences',
    type: 'scale',
    question: 'Opportunities for growth and promotion are very important',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
  {
    id: 'career_work_life',
    category: 'career_preferences',
    type: 'multiple_choice',
    question: 'What matters most to you in a career?',
    options: [
      { id: 'impact', label: 'Making a positive impact on society', value: 'impact' },
      { id: 'creativity', label: 'Opportunity to be creative', value: 'creativity' },
      { id: 'recognition', label: 'Recognition and prestige', value: 'recognition' },
      { id: 'independence', label: 'Independence and autonomy', value: 'independence' },
      { id: 'learning', label: 'Continuous learning', value: 'learning' },
      { id: 'work_life', label: 'Good work-life balance', value: 'work_life' },
    ],
    required: true,
  },
]

// ============================================
// LEARNING STYLE QUESTIONS (5 questions)
// ============================================
const learningStyleQuestions: Question[] = [
  {
    id: 'learning_preferred_method',
    category: 'learning_style',
    type: 'multiple_choice',
    question: 'How do you learn best?',
    options: [
      { id: 'visual', label: 'By seeing diagrams, charts, and videos', value: 'visual' },
      { id: 'auditory', label: 'By listening to lectures and discussions', value: 'auditory' },
      { id: 'reading', label: 'By reading textbooks and notes', value: 'reading' },
      { id: 'kinesthetic', label: 'By doing hands-on activities', value: 'kinesthetic' },
    ],
    required: true,
  },
  {
    id: 'learning_information_processing',
    category: 'learning_style',
    type: 'multiple_choice',
    question: 'When learning new information, you prefer to:',
    options: [
      { id: 'overview', label: 'Get the big picture first, then details', value: 'overview' },
      { id: 'step_by_step', label: 'Go step-by-step in a logical order', value: 'step_by_step' },
      { id: 'examples', label: 'Learn through examples and case studies', value: 'examples' },
      { id: 'experiment', label: 'Experiment and figure it out yourself', value: 'experiment' },
    ],
    required: true,
  },
  {
    id: 'learning_pace',
    category: 'learning_style',
    type: 'multiple_choice',
    question: 'At what pace do you prefer to learn new topics?',
    options: [
      { id: 'intensive', label: 'Intensive deep dives over short periods', value: 'intensive' },
      { id: 'steady', label: 'Steady, consistent learning over time', value: 'steady' },
      { id: 'flexible', label: 'Flexible - depends on the topic', value: 'flexible' },
      { id: 'deadline', label: 'Best under deadline pressure', value: 'deadline' },
    ],
    required: true,
  },
  {
    id: 'learning_note_taking',
    category: 'learning_style',
    type: 'multiple_choice',
    question: 'How do you prefer to take notes?',
    options: [
      { id: 'detailed', label: 'Detailed, comprehensive notes', value: 'detailed' },
      { id: 'mind_maps', label: 'Mind maps and diagrams', value: 'mind_maps' },
      { id: 'bullet_points', label: 'Bullet points and summaries', value: 'bullet_points' },
      { id: 'minimal', label: 'Minimal notes - I remember more than I write', value: 'minimal' },
    ],
    required: true,
  },
  {
    id: 'learning_distraction',
    category: 'learning_style',
    type: 'multiple_choice',
    question: 'What environment helps you focus best?',
    options: [
      { id: 'quiet', label: 'Complete silence', value: 'quiet' },
      { id: 'background', label: 'Background music or white noise', value: 'background' },
      { id: 'busy', label: 'Some activity around me', value: 'busy' },
      { id: 'structured', label: 'Structured study environment (library, study room)', value: 'structured' },
    ],
    required: true,
  },
]

// ============================================
// GOALS QUESTIONS (5 questions)
// ============================================
const goalsQuestions: Question[] = [
  {
    id: 'goals_timeline',
    category: 'goals',
    type: 'multiple_choice',
    question: 'What is your primary career goal for the next 5 years?',
    options: [
      { id: 'higher_education', label: 'Complete higher education (Degree/Masters)', value: 'higher_education' },
      { id: 'prestigious_job', label: 'Get a job at a prestigious company', value: 'prestigious_job' },
      { id: 'government_job', label: 'Secure a government position', value: 'government_job' },
      { id: 'start_business', label: 'Start my own business', value: 'start_business' },
      { id: 'research', label: 'Pursue research or teaching', value: 'research' },
      { id: 'exploring', label: 'Still exploring my options', value: 'exploring' },
    ],
    required: true,
  },
  {
    id: 'goals_success_definition',
    category: 'goals',
    type: 'multiple_choice',
    question: 'How do you define career success?',
    options: [
      { id: 'financial', label: 'High income and financial stability', value: 'financial' },
      { id: 'position', label: 'Reaching a senior/leadership position', value: 'position' },
      { id: 'expertise', label: 'Becoming an expert in my field', value: 'expertise' },
      { id: 'impact', label: 'Making a significant positive impact', value: 'impact' },
      { id: 'balance', label: 'Achieving work-life balance', value: 'balance' },
    ],
    required: true,
  },
  {
    id: 'goals_higher_education',
    category: 'goals',
    type: 'yes_no',
    question: 'Do you plan to pursue higher education (Masters/PhD)?',
    options: [
      { id: 'yes', label: 'Yes', value: 'yes' },
      { id: 'no', label: 'No', value: 'no' },
      { id: 'maybe', label: 'Not sure yet', value: 'maybe' },
    ],
    required: true,
  },
  {
    id: 'goals_location',
    category: 'goals',
    type: 'multiple_choice',
    question: 'Where would you prefer to work?',
    options: [
      { id: 'india_metro', label: 'India - Metro cities (Delhi, Mumbai, Bangalore)', value: 'india_metro' },
      { id: 'india_tier2', label: 'India - Tier 2/3 cities', value: 'india_tier2' },
      { id: 'abroad', label: 'Abroad/International', value: 'abroad' },
      { id: 'hometown', label: 'In or near my hometown', value: 'hometown' },
      { id: 'flexible', label: 'No preference - open to anywhere', value: 'flexible' },
    ],
    required: true,
  },
  {
    id: 'goals_entrepreneurship',
    category: 'goals',
    type: 'scale',
    question: 'I aspire to start my own business someday',
    options: [
      { id: '1', label: 'Strongly Disagree', value: 1 },
      { id: '2', label: 'Disagree', value: 2 },
      { id: '3', label: 'Neutral', value: 3 },
      { id: '4', label: 'Agree', value: 4 },
      { id: '5', label: 'Strongly Agree', value: 5 },
    ],
    required: true,
  },
]

// ============================================
// STREAM/EXAM ASPIRATIONS QUESTIONS (7 questions)
// ============================================
const streamAspirationsQuestions: Question[] = [
  {
    id: 'stream_target_exams',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'Which competitive exams are you targeting?',
    description: 'Select all that apply',
    options: [
      { id: 'jee', label: 'JEE (Engineering)', value: 'jee' },
      { id: 'neet', label: 'NEET (Medical)', value: 'neet' },
      { id: 'upsc', label: 'UPSC Civil Services', value: 'upsc' },
      { id: 'cat', label: 'CAT/MAT (MBA)', value: 'cat' },
      { id: 'gate', label: 'GATE (PG Engineering)', value: 'gate' },
      { id: 'banking', label: 'Banking Exams (IBPS, SBI)', value: 'banking' },
      { id: 'ssc', label: 'SSC CGL/CHSL', value: 'ssc' },
      { id: 'nda', label: 'NDA/CDS (Defense)', value: 'nda' },
      { id: 'clat', label: 'CLAT (Law)', value: 'clat' },
      { id: 'nata', label: 'NATA (Architecture)', value: 'nata' },
      { id: 'none', label: 'Not targeting any specific exam', value: 'none' },
    ],
    required: true,
  },
  {
    id: 'stream_preferred_field',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'Which field would you like to pursue?',
    options: [
      { id: 'engineering', label: 'Engineering (B.Tech/BE)', value: 'engineering' },
      { id: 'medical', label: 'Medical (MBBS/BDS)', value: 'medical' },
      { id: 'commerce', label: 'Commerce (B.Com/CA)', value: 'commerce' },
      { id: 'arts', label: 'Arts & Humanities (BA)', value: 'arts' },
      { id: 'science', label: 'Pure Sciences (B.Sc)', value: 'science' },
      { id: 'design', label: 'Design (B.Des)', value: 'design' },
      { id: 'law', label: 'Law (BA LLB)', value: 'law' },
      { id: 'management', label: 'Management (BBA)', value: 'management' },
      { id: 'exploring', label: 'Still exploring options', value: 'exploring' },
    ],
    required: true,
  },
  {
    id: 'stream_dream_careers',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'What are your dream career options?',
    description: 'Select up to 3',
    options: [
      { id: 'software_engineer', label: 'Software Engineer/Developer', value: 'software_engineer' },
      { id: 'doctor', label: 'Doctor/Medical Professional', value: 'doctor' },
      { id: 'ias_officer', label: 'IAS/IPS Officer', value: 'ias_officer' },
      { id: 'entrepreneur', label: 'Entrepreneur/Startup Founder', value: 'entrepreneur' },
      { id: 'scientist', label: 'Scientist/Researcher', value: 'scientist' },
      { id: 'chartered_accountant', label: 'Chartered Accountant', value: 'chartered_accountant' },
      { id: 'architect', label: 'Architect/Designer', value: 'architect' },
      { id: 'lawyer', label: 'Lawyer/Judge', value: 'lawyer' },
      { id: 'data_scientist', label: 'Data Scientist/AI Engineer', value: 'data_scientist' },
      { id: 'civil_engineer', label: 'Civil/Mechanical Engineer', value: 'civil_engineer' },
      { id: 'psychologist', label: 'Psychologist/Counselor', value: 'psychologist' },
      { id: 'journalist', label: 'Journalist/Writer', value: 'journalist' },
    ],
    required: true,
    maxSelections: 3,
  },
  {
    id: 'stream_engineering_branch',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'If you choose Engineering, which branch interests you most?',
    options: [
      { id: 'cse', label: 'Computer Science (CSE)', value: 'cse' },
      { id: 'ece', label: 'Electronics & Communication (ECE)', value: 'ece' },
      { id: 'mechanical', label: 'Mechanical Engineering', value: 'mechanical' },
      { id: 'civil', label: 'Civil Engineering', value: 'civil' },
      { id: 'electrical', label: 'Electrical Engineering', value: 'electrical' },
      { id: 'ai_ml', label: 'AI & Machine Learning', value: 'ai_ml' },
      { id: 'biotech', label: 'Biotechnology', value: 'biotech' },
      { id: 'aerospace', label: 'Aerospace/Aeronautical', value: 'aerospace' },
      { id: 'not_engineering', label: 'Not interested in Engineering', value: 'not_engineering' },
    ],
    required: true,
  },
  {
    id: 'stream_college_preference',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'What type of college do you prefer?',
    options: [
      { id: 'iit_nit', label: 'Premier institutes (IITs, NITs, AIIMS)', value: 'iit_nit' },
      { id: 'top_private', label: 'Top private universities', value: 'top_private' },
      { id: 'government', label: 'Government colleges', value: 'government' },
      { id: 'local', label: 'Good local/regional colleges', value: 'local' },
      { id: 'abroad', label: 'International universities', value: 'abroad' },
    ],
    required: true,
  },
  {
    id: 'stream_budget',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'What is your approximate budget for higher education?',
    options: [
      { id: 'low', label: 'Minimal - prefer low fees/government', value: 'low' },
      { id: 'moderate', label: 'Moderate (5-15 lakhs)', value: 'moderate' },
      { id: 'high', label: 'High (15-30 lakhs)', value: 'high' },
      { id: 'unlimited', label: 'Not a constraint', value: 'unlimited' },
    ],
    required: true,
  },
  {
    id: 'stream_preferred_location',
    category: 'stream_aspirations',
    type: 'multiple_choice',
    question: 'Preferred location for higher education?',
    description: 'Select up to 3',
    options: [
      { id: 'delhi', label: 'Delhi NCR', value: 'delhi' },
      { id: 'mumbai', label: 'Mumbai/Pune', value: 'mumbai' },
      { id: 'bangalore', label: 'Bangalore', value: 'bangalore' },
      { id: 'chennai', label: 'Chennai', value: 'chennai' },
      { id: 'hyderabad', label: 'Hyderabad', value: 'hyderabad' },
      { id: 'kolkata', label: 'Kolkata', value: 'kolkata' },
      { id: 'north', label: 'North India', value: 'north' },
      { id: 'south', label: 'South India', value: 'south' },
      { id: 'hometown', label: 'Near hometown', value: 'hometown' },
      { id: 'abroad', label: 'Abroad', value: 'abroad' },
    ],
    required: true,
    maxSelections: 3,
  },
]

// ============================================
// EXPORT ASSESSMENT STEPS
// ============================================
export const assessmentSteps: AssessmentStep[] = [
  {
    id: 'personality',
    title: 'Personality Assessment',
    description: 'Understanding who you are',
    icon: 'UserCircle',
    questions: personalityQuestions,
  },
  {
    id: 'interests',
    title: 'Your Interests',
    description: 'What excites and motivates you',
    icon: 'Heart',
    questions: interestsQuestions,
  },
  {
    id: 'skills',
    title: 'Skills & Abilities',
    description: 'Your strengths and capabilities',
    icon: 'Zap',
    questions: skillsQuestions,
  },
  {
    id: 'academic',
    title: 'Academic Profile',
    description: 'Your academic journey so far',
    icon: 'BookOpen',
    questions: academicQuestions,
  },
  {
    id: 'learning_style',
    title: 'Learning Style',
    description: 'How you learn best',
    icon: 'Brain',
    questions: learningStyleQuestions,
  },
  {
    id: 'career_preferences',
    title: 'Career Preferences',
    description: 'Your ideal work environment',
    icon: 'Briefcase',
    questions: careerPreferencesQuestions,
  },
  {
    id: 'goals',
    title: 'Goals & Aspirations',
    description: 'Your vision for the future',
    icon: 'Target',
    questions: goalsQuestions,
  },
  {
    id: 'stream_aspirations',
    title: 'Stream & Exams',
    description: 'Your academic path',
    icon: 'GraduationCap',
    questions: streamAspirationsQuestions,
  },
]

export const TOTAL_QUESTIONS = assessmentSteps.reduce(
  (total, step) => total + step.questions.length, 
  0
)

export function getAllQuestions(): Question[] {
  return assessmentSteps.flatMap(step => step.questions)
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id)
}
