import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, courses, enrollments, progressRecords } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, role, createdAt)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.createdAt})
      `;
    })
  );

  return insertedUsers;
}

async function seedCourses() {
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      instrument VARCHAR(50) NOT NULL,
      teacherId UUID REFERENCES users(id),
      level VARCHAR(50) NOT NULL,
      schedule VARCHAR(255) NOT NULL,
      capacity INT NOT NULL
    );
  `;

  const insertedCourses = await Promise.all(
    courses.map((course) => {
      return sql`
        INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
        VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
      `;
    })
  );

  return insertedCourses;
}

async function seedEnrollments() {
  await sql`
    CREATE TABLE IF NOT EXISTS enrollments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id),
      courseId UUID REFERENCES courses(id),
      enrollmentDate TIMESTAMP NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;

  const insertedEnrollments = await Promise.all(
    enrollments.map((enrollment) => {
      return sql`
        INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
        VALUES (${enrollment.id}, ${enrollment.studentId}, ${enrollment.courseId}, ${enrollment.enrollmentDate}, ${enrollment.status})
      `;
    })
  );

  return insertedEnrollments;
}

async function seedProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id),
      courseId UUID REFERENCES courses(id),
      date TIMESTAMP NOT NULL,
      evaluation TEXT NOT NULL,
      comments TEXT
    );
  `;

  const insertedProgress = await Promise.all(
    progressRecords.map((record) => {
      return sql`
        INSERT INTO progress (id, studentId, courseId, date, evaluation, comments)
        VALUES (${record.id}, ${record.studentId}, ${record.courseId}, ${record.date}, ${record.evaluation}, ${record.comments})
      `;
    })
  );

  return insertedProgress;
}

async function seedDatabase() {
  await seedUsers();
  await seedCourses();
  await seedEnrollments();
  await seedProgress();
}

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});