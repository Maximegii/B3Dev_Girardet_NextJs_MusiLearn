import { v4 as uuidv4 } from 'uuid';
import { User, Course, Enrollment, Progress } from './definitions';

export const users: User[] = [
  {
    id: uuidv4(), 
    email: 'lee@robinson.com',
    password: 'password123',
    name: 'Lee Robinson',
    role: 'teacher',
    createdAt: new Date('2022-01-01'),
  },
  {
    id: uuidv4(),
    email: 'michael@novotny.com',
    password: 'password123',
    name: 'Michael Novotny',
    role: 'student',
    createdAt: new Date('2022-02-01'),
  },
];

export const courses: Course[] = [
  {
    id: uuidv4(), 
    title: 'Guitar Basics',
    description: 'Learn the basics of playing guitar.',
    instrument: 'Guitar',
    teacherId: users[0].id, 
    level: 'Beginner',
    schedule: 'Monday 10:00 - 11:00',
    capacity: 10,
  },
  {
    id: uuidv4(),
    title: 'Advanced Piano',
    description: 'Advanced techniques for piano players.',
    instrument: 'Piano',
    teacherId: users[1].id,
    level: 'Advanced',
    schedule: 'Wednesday 14:00 - 15:00',
    capacity: 5,
  },
];

export const enrollments: Enrollment[] = [
  {
    id: uuidv4(),
    studentId: users[1].id,
    courseId: courses[0].id,
    enrollmentDate: new Date('2022-05-01'),
    status: 'active',
  },
];

export const progressRecords: Progress[] = [
  {
    id: uuidv4(),
    studentId: users[1].id,
    courseId: courses[0].id,
    date: new Date('2022-05-15'),
    evaluation: 'Good progress',
    comments: 'Keep practicing the chords.',
  },
];
