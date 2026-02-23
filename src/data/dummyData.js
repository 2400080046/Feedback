export const STUDENTS = [
  { id: 'S1', name: 'Aarav Sharma', email: 'aarav@inst.edu', major: 'CSE', semester: 6, avatar: 'AS' },
  { id: 'S2', name: 'Ananya Iyer', email: 'ananya@inst.edu', major: 'A&DS', semester: 4, avatar: 'AI' },
  { id: 'S3', name: 'Vihaan Gupta', email: 'vihaan@inst.edu', major: 'CS&IT', semester: 2, avatar: 'VG' },
];

export const INSTRUCTORS = [
  { id: 'I1', name: 'Dr. Rajesh Kumar', email: 'rajesh@inst.edu', dept: 'CSE', courses: 5 },
  { id: 'I2', name: 'Prof. Sunita Rao', email: 'sunita@inst.edu', dept: 'A&DS', courses: 4 },
  { id: 'I3', name: 'Dr. Amit Shah', email: 'amit@inst.edu', dept: 'A&DS', courses: 3 },
  { id: 'I4', name: 'Prof. Meera Deshmukh', email: 'meera@inst.edu', dept: 'CS&IT', courses: 4 },
  { id: 'I5', name: 'Dr. Vikram Malhotra', email: 'vikram@inst.edu', dept: 'ECE', courses: 2 },
];

export const COURSES = [
  { id: 'C1', code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. Rajesh Kumar', credit: 3 },
  { id: 'C2', code: 'DS201', name: 'Data Structures & Algorithms', instructor: 'Prof. Sunita Rao', credit: 4 },
  { id: 'C3', code: 'AI301', name: 'Artificial Intelligence', instructor: 'Dr. Amit Shah', credit: 3 },
  { id: 'C4', code: 'DB401', name: 'Database Management System', instructor: 'Dr. Rajesh Kumar', credit: 4 },
  { id: 'C5', code: 'ML501', name: 'Machine Learning', instructor: 'Dr. Amit Shah', credit: 4 },
  { id: 'C6', code: 'FS601', name: 'Full Stack Development and Frameworks', instructor: 'Prof. Meera Deshmukh', credit: 4 },
  { id: 'C7', code: 'DV701', name: 'Frontend Data Science and Visualization', instructor: 'Prof. Sunita Rao', credit: 3 },
  { id: 'C8', code: 'JP801', name: 'Java Programming', instructor: 'Dr. Rajesh Kumar', credit: 3 },
  { id: 'C9', code: 'CL901', name: 'Cloud Infrastructures', instructor: 'Dr. Vikram Malhotra', credit: 4 },
  { id: 'C10', code: 'OS102', name: 'Operating Systems', instructor: 'Prof. Meera Deshmukh', credit: 4 },
  { id: 'C11', code: 'DL111', name: 'Deep Learning', instructor: 'Dr. Amit Shah', credit: 4 },
];

export const FEEDBACK_QUESTIONS = [
  { id: 'Q1', text: 'How would you rate the instructor\'s knowledge of the subject?', type: 'scale' },
  { id: 'Q2', text: 'The instructor encouraged student participation and questions.', type: 'scale' },
  { id: 'Q3', text: 'The course material was easy to understand and well-organized.', type: 'scale' },
  { id: 'Q4', text: 'The pace of the lectures was appropriate for the subject matter.', type: 'scale' },
  { id: 'Q5', text: 'The assignments and projects were relevant to the course objectives.', type: 'scale' },
  { id: 'Q6', text: 'The grading criteria were clear and applied fairly.', type: 'scale' },
  { id: 'Q7', text: 'Any additional comments or suggestions for improvement?', type: 'text' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'deadline', message: 'Feedback for CS101 ends in 2 days!', date: '2026-03-20', status: 'unread' },
  { id: 2, type: 'success', message: 'Your feedback for DS201 was submitted.', date: '2026-03-18', status: 'read' },
  { id: 3, type: 'system', message: 'New feedback form available for AI301.', date: '2026-03-15', status: 'read' },
];

export const PENDING_FEEDBACK = [
  { id: 'PF1', courseId: 'C4', courseName: 'Database Management System', deadline: '2026-03-25', instructor: 'Dr. Rajesh Kumar' },
  { id: 'PF2', courseId: 'C5', courseName: 'Machine Learning', deadline: '2026-03-26', instructor: 'Dr. Amit Shah' },
  { id: 'PF3', courseId: 'C10', courseName: 'Operating Systems', deadline: '2026-03-28', instructor: 'Prof. Meera Deshmukh' },
];

export const FEEDBACK_HISTORY = [
  { id: 'H1', courseName: 'Data Structures & Algorithms', instructor: 'Prof. Sunita Rao', date: '2026-03-10', rating: 4.5 },
  { id: 'H2', courseName: 'Introduction to Programming', instructor: 'Dr. Rajesh Kumar', date: '2025-12-15', rating: 5.0 },
];

export const DASHBOARD_STATS = {
  admin: {
    totalStudents: 1250,
    totalFeedback: 840,
    averageRating: 4.2,
    pendingReports: 12,
    totalInstructors: 45,
    activeForms: 8
  },
  student: {
    coursesEnrolled: 8,
    feedbackSubmitted: 2,
    pendingFeedback: 6,
    attendance: '92%'
  },
  instructor: {
    avgRating: 4.7,
    totalStudents: 310,
    participation: '88%',
    activeCourses: 3
  }
};

export const ANALYTICS_DATA = [
  { month: 'Jan', rating: 4.0 },
  { month: 'Feb', rating: 4.2 },
  { month: 'Mar', rating: 3.8 },
  { month: 'Apr', rating: 4.5 },
  { month: 'May', rating: 4.3 },
  { month: 'Jun', rating: 4.6 },
];

export const SENTIMENT_ANALYSIS = [
  { text: "The lectures were very clear and easy to follow.", sentiment: "Positive", score: 0.92, course: "CS101", instructor: "Dr. Rajesh Kumar" },
  { text: "Too much homework, but valid content.", sentiment: "Neutral", score: 0.51, course: "DS201", instructor: "Prof. Sunita Rao" },
  { text: "The instructor was often late to classes.", sentiment: "Negative", score: 0.15, course: "AI301", instructor: "Dr. Amit Shah" },
];
