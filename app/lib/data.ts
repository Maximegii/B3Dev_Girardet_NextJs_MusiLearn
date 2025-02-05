import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';
import { User, Course, Enrollment, Progress } from './definitions';

// Connexion à la base PostgreSQL
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const users: User[] = [
  {
    id: uuidv4(),
    email: 'lee@robinson.com',
    password: 'password123',
    name: 'Lee Robinson',
    role: 'teacher',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    email: 'michael@novotny.com',
    password: 'password123',
    name: 'Michael Novotny',
    role: 'student',
    createdAt: new Date(),
  },
];

const courses: Course[] = [
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
    teacherId: users[0].id,
    level: 'Advanced',
    schedule: 'Wednesday 14:00 - 15:00',
    capacity: 5,
  },
];

const enrollments: Enrollment[] = [
  {
    id: uuidv4(),
    studentId: users[1].id,
    courseId: courses[0].id,
    enrollmentDate: new Date(),
    status: 'active',
  },
];

const progressRecords: Progress[] = [
  {
    id: uuidv4(),
    studentId: users[1].id,
    courseId: courses[0].id,
    date: new Date(),
    evaluation: 'Good progress',
    comments: 'Keep practicing the chords.',
  },
];


async function seedDatabase() {
  try {
    console.log('🚀 Seeding database...');


    for (const user of users) {
      await sql`
        INSERT INTO users (id, email, password, name, role, createdAt)
        VALUES (${user.id}, ${user.email}, ${user.password}, ${user.name}, ${user.role}, ${user.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    }


    for (const course of courses) {
      await sql`
        INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
        VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
        ON CONFLICT (id) DO NOTHING;
      `;
    }


    for (const enrollment of enrollments) {
      await sql`
        INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
        VALUES (${enrollment.id}, ${enrollment.studentId}, ${enrollment.courseId}, ${enrollment.enrollmentDate}, ${enrollment.status})
        ON CONFLICT (id) DO NOTHING;
      `;
    }


    for (const progress of progressRecords) {
      await sql`
        INSERT INTO progress (id, studentId, courseId, date, evaluation, comments)
        VALUES (${progress.id}, ${progress.studentId}, ${progress.courseId}, ${progress.date}, ${progress.evaluation}, ${progress.comments})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log('✅ Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw new Error('Failed to seed database.');
  } finally {
    await sql.end(); 
  }
}


if (require.main === module) {
  seedDatabase();
}
