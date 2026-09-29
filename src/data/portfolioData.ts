export interface PortfolioProfile {
  name: string;
  headline: string;
  supportingText: string;
  positioningStatement: string;
  githubUrl: string;
  githubPlaceholderDisplay: string;
  linkedinUrl: string;
  emailPlaceholder: string;
  semester: string;
  degree: string;
}

export const DEFAULT_PROFILE: PortfolioProfile = {
  name: '[YOUR NAME]',
  headline: 'Aspiring AI Engineer & B.Tech Student',
  supportingText:
    'B.Tech student exploring Python, Web Development, and Generative AI while building projects and learning through hackathons and ideathons.',
  positioningStatement:
    'An aspiring AI Engineer building strong foundations in Python, Web Development, and Generative AI.',
  githubUrl: 'https://github.com/YOUR_USERNAME',
  githubPlaceholderDisplay: '[YOUR GITHUB URL]',
  linkedinUrl: '[YOUR LINKEDIN URL]',
  emailPlaceholder: '[YOUR EMAIL]',
  semester: '1st Semester',
  degree: 'B.Tech (Bachelor of Technology)',
};

export interface SkillItem {
  name: string;
  context: string;
}

export interface SkillCategory {
  id: 'programming' | 'web' | 'ai' | 'other';
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Core language syntax, control flow, and structured problem solving',
    skills: [
      {
        name: 'Python',
        context:
          'Writing clean scripts, conditional logic, loops, functions, and CLI applications.',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Structuring, styling, and adding interactivity to modern web pages',
    skills: [
      {
        name: 'HTML',
        context: 'Semantic document structure, accessible markup, and clean page hierarchy.',
      },
      {
        name: 'CSS',
        context: 'Responsive layouts, Flexbox, CSS Grid, typography, and mobile-first styling.',
      },
      {
        name: 'JavaScript',
        context: 'DOM manipulation, event handling, and interactive client-side logic.',
      },
      {
        name: 'Basic Web Development',
        context: 'Building and structuring clean, standards-compliant static and interactive websites.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Emerging Technologies',
    subtitle: 'Exploring foundational Generative AI concepts and workflow integration',
    skills: [
      {
        name: 'Generative AI',
        context: 'Understanding large language models, text generation workflows, and practical AI use cases.',
      },
      {
        name: 'Prompt Engineering',
        context: 'Structuring clear instructions, few-shot examples, and iterative prompt refinement.',
      },
      {
        name: 'AI Fundamentals',
        context: 'Learning core concepts of artificial intelligence, model behavior, and responsible AI usage.',
      },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    subtitle: 'Analytical thinking and collaborative ideation in student tech events',
    skills: [
      {
        name: 'Problem Solving',
        context: 'Breaking down real-world scenarios into step-by-step algorithmic logic.',
      },
      {
        name: 'Hackathons',
        context: 'Collaborating under time constraints to turn practical ideas into working prototypes.',
      },
      {
        name: 'Ideathons',
        context: 'Brainstorming structured technical solutions, pitching concepts, and iterating on feedback.',
      },
    ],
  },
];

export interface ProjectItem {
  id: 'voter-eligibility' | 'atm-management' | 'student-grade';
  index: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  fileName: string;
  learningFocus: string;
  keyConcepts: string[];
  pythonCode: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'voter-eligibility',
    index: '01',
    title: 'Voter Eligibility Calculator',
    description:
      'A Python-based project that determines voter eligibility based on age and predefined eligibility conditions.',
    technologies: ['Python'],
    githubUrl: 'https://github.com/YOUR_USERNAME',
    fileName: 'voter_eligibility.py',
    learningFocus: 'Conditional branching, input validation, and boolean logic in Python',
    keyConcepts: ['Conditional Statements (if/elif/else)', 'Input Validation', 'Boolean Operators'],
    pythonCode: `# Voter Eligibility Calculator
# Determines voter eligibility based on age and predefined conditions

def check_voter_eligibility(age: int, is_citizen: bool, has_voter_id: bool) -> dict:
    """
    Evaluates whether a person meets all predefined voting criteria.
    Minimum legal voting age: 18 years.
    """
    if age < 0 or age > 120:
        return {
            "eligible": False,
            "status": "Invalid Age Input",
            "reason": "Please enter a valid human age between 0 and 120."
        }

    if not is_citizen:
        return {
            "eligible": False,
            "status": "Not Eligible",
            "reason": "Citizenship is a required condition for voter eligibility."
        }

    if age < 18:
        years_remaining = 18 - age
        return {
            "eligible": False,
            "status": "Underage",
            "reason": f"Minimum age is 18. Eligible in {years_remaining} year(s)."
        }

    if not has_voter_id:
        return {
            "eligible": False,
            "status": "Registration Pending",
            "reason": "Age requirement met (18+), but an active Voter ID is required."
        }

    return {
        "eligible": True,
        "status": "Eligible to Vote",
        "reason": "All age, citizenship, and registration criteria are satisfied."
    }


if __name__ == "__main__":
    print("--- Voter Eligibility Calculator ---")
    user_age = int(input("Enter your age: "))
    citizen_input = input("Are you a registered citizen? (yes/no): ").strip().lower() == "yes"
    id_input = input("Do you hold a valid Voter ID card? (yes/no): ").strip().lower() == "yes"

    result = check_voter_eligibility(user_age, citizen_input, id_input)
    print(f"Status: {result['status']}")
    print(f"Details: {result['reason']}")`,
  },
  {
    id: 'atm-management',
    index: '02',
    title: 'ATM Management System',
    description:
      'A Python-based ATM management project demonstrating basic transaction handling, user interaction, and programming logic.',
    technologies: ['Python'],
    githubUrl: 'https://github.com/YOUR_USERNAME',
    fileName: 'atm_management.py',
    learningFocus: 'State management, loop control, and transaction validation in Python',
    keyConcepts: ['While Loops & Menus', 'Functions & Modularity', 'Balance & Transaction Checks'],
    pythonCode: `# ATM Management System
# Demonstrates transaction handling, user interaction, and programming logic

class ATMSystem:
    def __init__(self, initial_balance: float = 5000.0, pin: str = "1234"):
        self.balance = initial_balance
        self.pin = pin
        self.history = ["Account session initialized with ₹5,000.00"]

    def verify_pin(self, entered_pin: str) -> bool:
        return entered_pin == self.pin

    def check_balance(self) -> float:
        return self.balance

    def deposit(self, amount: float) -> dict:
        if amount <= 0:
            return {"success": False, "message": "Deposit amount must be greater than zero."}
        self.balance += amount
        self.history.append(f"Deposited ₹{amount:,.2f} | Balance: ₹{self.balance:,.2f}")
        return {"success": True, "message": f"Successfully deposited ₹{amount:,.2f}."}

    def withdraw(self, amount: float) -> dict:
        if amount <= 0:
            return {"success": False, "message": "Withdrawal amount must be greater than zero."}
        if amount > self.balance:
            return {"success": False, "message": "Insufficient account balance for this transaction."}
        self.balance -= amount
        self.history.append(f"Withdrew ₹{amount:,.2f} | Balance: ₹{self.balance:,.2f}")
        return {"success": True, "message": f"Successfully withdrew ₹{amount:,.2f}."}


if __name__ == "__main__":
    atm = ATMSystem()
    print("--- Welcome to Python ATM Management System ---")
    print(f"Current Balance: ₹{atm.check_balance():,.2f}")`,
  },
  {
    id: 'student-grade',
    index: '03',
    title: 'Student Grade Calculator',
    description:
      'A simple application that calculates student grades based on marks and predefined grading criteria.',
    technologies: ['Python'],
    githubUrl: 'https://github.com/YOUR_USERNAME',
    fileName: 'student_grade_calculator.py',
    learningFocus: 'List processing, arithmetic aggregation, and grading rubric evaluation',
    keyConcepts: ['Lists & Iteration', 'Arithmetic & Averages', 'Grading Rubric Mapping'],
    pythonCode: `# Student Grade Calculator
# Calculates total marks, average percentage, and letter grade

def calculate_student_grade(marks: list[float]) -> dict:
    """
    Accepts a list of subject marks (out of 100) and computes
    total score, percentage, and corresponding letter grade.
    """
    if not marks or any(m < 0 or m > 100 for m in marks):
        raise ValueError("All subject marks must be between 0 and 100.")

    total_marks = sum(marks)
    max_marks = len(marks) * 100
    percentage = (total_marks / max_marks) * 100

    if percentage >= 90:
        grade, remark = "A+", "Outstanding Performance"
    elif percentage >= 80:
        grade, remark = "A", "Excellent"
    elif percentage >= 70:
        grade, remark = "B", "Good"
    elif percentage >= 60:
        grade, remark = "C", "Satisfactory"
    elif percentage >= 50:
        grade, remark = "D", "Pass"
    else:
        grade, remark = "F", "Needs Improvement"

    return {
        "total": round(total_marks, 1),
        "max_marks": max_marks,
        "percentage": round(percentage, 2),
        "grade": grade,
        "remark": remark
    }


if __name__ == "__main__":
    sample_marks = [88, 92, 79, 85, 90]
    report = calculate_student_grade(sample_marks)
    print(f"Total: {report['total']}/{report['max_marks']} ({report['percentage']}%)")
    print(f"Grade: {report['grade']} — {report['remark']}")`,
  },
];

export interface HackathonEntry {
  id: string;
  eventTitlePlaceholder: string;
  categoryLabel: string;
  datePlaceholder: string;
  rolePlaceholder: string;
  summary: string;
  takeaways: string[];
}

export const INITIAL_HACKATHON_ENTRIES: HackathonEntry[] = [
  {
    id: 'entry-1',
    eventTitlePlaceholder: '[Hackathon Name]',
    categoryLabel: 'Hackathon Participation',
    datePlaceholder: '[Date]',
    rolePlaceholder: '[Achievement / Role]',
    summary:
      'Participated in collaborative problem-solving and prototype development, applying Python and foundational web concepts under event timelines.',
    takeaways: ['Team Collaboration', 'Rapid Prototyping', 'Problem Scoping'],
  },
  {
    id: 'entry-2',
    eventTitlePlaceholder: '[Event Name]',
    categoryLabel: 'Ideathon & Innovation Event',
    datePlaceholder: '[Date]',
    rolePlaceholder: '[Achievement / Role]',
    summary:
      'Explored structured solution design and pitched technology-driven ideas addressing practical student and community challenges.',
    takeaways: ['Idea Structuring', 'Solution Pitching', 'Peer Learning'],
  },
  {
    id: 'entry-3',
    eventTitlePlaceholder: '[Event Name]',
    categoryLabel: 'Technical Workshop / Event',
    datePlaceholder: '[Date]',
    rolePlaceholder: '[Achievement / Role]',
    summary:
      'Engaged in technical sessions focused on emerging software workflows, Generative AI exploration, and developer fundamentals.',
    takeaways: ['Generative AI Concepts', 'Developer Workflows', 'Technical Curiosity'],
  },
];

export interface LearningTrack {
  index: string;
  topic: string;
  stage: string;
  currentFocus: string;
  milestones: string[];
}

export const CURRENTLY_LEARNING: LearningTrack[] = [
  {
    index: '01',
    topic: 'Python',
    stage: 'Building Core Foundations',
    currentFocus:
      'Strengthening control flow, functions, modular scripting, file handling, and object-oriented programming basics.',
    milestones: ['Variables & Logic', 'Functions & CLI Scripts', 'Modular Programs'],
  },
  {
    index: '02',
    topic: 'Web Development',
    stage: 'Practicing Frontend Fundamentals',
    currentFocus:
      'Crafting responsive layouts with semantic HTML, modern CSS, and interactive JavaScript components.',
    milestones: ['Semantic HTML5', 'Responsive CSS Layouts', 'DOM Interactivity'],
  },
  {
    index: '03',
    topic: 'Generative AI',
    stage: 'Exploring Concepts & Workflows',
    currentFocus:
      'Studying how large language models work, experimenting with AI APIs, and understanding practical developer applications.',
    milestones: ['LLM Capabilities', 'Model Context & Inputs', 'Beginner AI Workflows'],
  },
  {
    index: '04',
    topic: 'Prompt Engineering',
    stage: 'Active Experimentation',
    currentFocus:
      'Learning structured prompting patterns, system instructions, context framing, and reliable output formatting.',
    milestones: ['Zero & Few-Shot Prompts', 'Structured Outputs', 'Iterative Refinement'],
  },
  {
    index: '05',
    topic: 'AI Fundamentals',
    stage: 'Conceptual Grounding',
    currentFocus:
      'Building a clear understanding of search, logic, data representation, and introductory machine learning terminology.',
    milestones: ['Core AI Terminology', 'Problem Formulation', 'Responsible AI Principles'],
  },
  {
    index: '06',
    topic: 'Data Structures & Algorithms',
    stage: 'Early-Stage Practice',
    currentFocus:
      'Learning arrays, strings, basic searching and sorting, and analyzing time/space complexity step by step.',
    milestones: ['Arrays & Strings', 'Basic Searching & Sorting', 'Step-by-Step Logic'],
  },
];

export interface FutureGoal {
  index: string;
  title: string;
  description: string;
  horizon: string;
}

export const FUTURE_GOALS: FutureGoal[] = [
  {
    index: '01',
    title: 'Strengthen my Python and programming fundamentals',
    description:
      'Write cleaner, well-structured Python code and deepen my grasp of data structures, object-oriented design, and debugging.',
    horizon: 'Core Foundation',
  },
  {
    index: '02',
    title: 'Learn AI and machine learning',
    description:
      'Build mathematical and conceptual foundations in machine learning, data processing, and neural network basics.',
    horizon: 'Academic & Self-Study',
  },
  {
    index: '03',
    title: 'Build practical AI-powered applications',
    description:
      'Combine Python backends and clean web interfaces with Generative AI APIs to solve everyday student and developer problems.',
    horizon: 'Applied Projects',
  },
  {
    index: '04',
    title: 'Improve my web development skills',
    description:
      'Progress from foundational HTML, CSS, and JavaScript to full-stack web applications that can host interactive AI tools.',
    horizon: 'Web Engineering',
  },
  {
    index: '05',
    title: 'Participate in more hackathons and ideathons',
    description:
      'Collaborate with peers in upcoming collegiate hackathons and ideathons to test ideas, learn from mentors, and build under pressure.',
    horizon: 'Collaborative Growth',
  },
  {
    index: '06',
    title: 'Eventually grow into an AI Engineer',
    description:
      'Consistently compound semester-by-semester learning, projects, and fundamentals toward a career in AI engineering.',
    horizon: 'Long-Term Aspiration',
  },
];
