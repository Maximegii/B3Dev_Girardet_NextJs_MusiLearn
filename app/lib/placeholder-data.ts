import { User, Course, Enrollment, Progress } from './definitions';

export const users: User[] = [
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    email: 'lee@robinson.com',
    password: 'password123',
    name: 'Lee Robinson',
    role: 'teacher',
    createdAt: new Date('2022-01-01'),
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    email: 'michael@novotny.com',
    password: 'password123',
    name: 'Michael Novotny',
    role: 'student',
    createdAt: new Date('2022-02-01'),
  },
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    email: 'amy@burns.com',
    password: 'password123',
    name: 'Amy Burns',
    role: 'student',
    createdAt: new Date('2022-03-01'),
  },
  {
    id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    email: 'balazs@orban.com',
    password: 'password123',
    name: 'Balazs Orban',
    role: 'teacher',
    createdAt: new Date('2022-04-01'),
  },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Guitar Basics',
    description: 'Learn the basics of playing guitar.',
    instrument: 'Guitar',
    teacherId: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    level: 'Beginner',
    schedule: 'Monday 10:00 - 11:00',
    capacity: 10,
  },
  {
    id: '2',
    title: 'Advanced Piano',
    description: 'Advanced techniques for piano players.',
    instrument: 'Piano',
    teacherId: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    level: 'Advanced',
    schedule: 'Wednesday 14:00 - 15:00',
    capacity: 5,
  },
];

export const enrollments: Enrollment[] = [
  {
    id: '1',
    studentId: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    courseId: '1',
    enrollmentDate: new Date('2022-05-01'),
    status: 'active',
  },
  {
    id: '2',
    studentId: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    courseId: '2',
    enrollmentDate: new Date('2022-06-01'),
    status: 'active',
  },
];

export const progressRecords: Progress[] = [
  {
    id: '1',
    studentId: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    courseId: '1',
    date: new Date('2022-05-15'),
    evaluation: 'Good progress',
    comments: 'Keep practicing the chords.',
  },
  {
    id: '2',
    studentId: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    courseId: '2',
    date: new Date('2022-06-15'),
    evaluation: 'Excellent',
    comments: 'Great improvement in technique.',
  },
];