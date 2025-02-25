import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, courses, progress, enrollments } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCourses() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      instrument VARCHAR(255) NOT NULL,
      teacherId VARCHAR(255) NOT NULL,
      level VARCHAR(255) NOT NULL,
      schedule VARCHAR(255) NOT NULL,
      capacity INT NOT NULL
    );
  `;

  const insertedCourses = await Promise.all(
    courses.map(
      (course) => sql`
        INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
        VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCourses;
}

async function seedEnrollments() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS enrollments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId VARCHAR(255) NOT NULL,
      courseId VARCHAR(255) NOT NULL,
      enrollmentDate DATE NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedEnrollments = await Promise.all(
    enrollments.map(
      (Enrollment) => sql`
        INSERT INTO enrollments (studentId, courseId, enrollmentDate, status)
        VALUES (${Enrollment.studentId}, ${Enrollment.courseId}, ${Enrollment.enrollmentDate}, ${Enrollment.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedEnrollments;
}

async function seedProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId VARCHAR(255) NOT NULL,
      courseId VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      evaluation VARCHAR(255) NOT NULL,
      comment TEXT NOT NULL
    );
  `;

  const insertedProgress = await Promise.all(
    progress.map(
      (prog) => sql`
        INSERT INTO progress (studentId, courseId, date, evaluation, comment)
        VALUES (${prog.studentId}, ${prog.courseId}, ${prog.date}, ${prog.evaluation}, ${prog.comment})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProgress;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCourses(),
      seedEnrollments(),
      seedProgress(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}