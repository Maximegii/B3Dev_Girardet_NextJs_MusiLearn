import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';
import { users, courses, enrollments, progressRecords } from '@/app/lib/placeholder-data';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST() {
  try {
    console.log('🚀 Starting database seeding...');

    
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    
    console.log('🔹 Creating tables...');
    
    await sql`CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    
    await sql`CREATE TABLE IF NOT EXISTS courses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      instrument TEXT NOT NULL,
      teacherId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      level TEXT NOT NULL,
      schedule TEXT NOT NULL,
      capacity INT NOT NULL
    );`;
    
    await sql`CREATE TABLE IF NOT EXISTS enrollments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      studentId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT NOT NULL
    );`;
    
    await sql`CREATE TABLE IF NOT EXISTS progress (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      studentId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      evaluation TEXT NOT NULL,
      comments TEXT NOT NULL
    );`;

    console.log('Tables created successfully.');

    
    for (const user of users) {
      console.log(`🔹 Seeding user: ${user.email}`);

      const hashedPassword = await bcrypt.hash(user.password, 10);

      await sql`
        INSERT INTO users (id, name, email, password, role, createdAt)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('Users seeded successfully.');

    
    for (const course of courses) {
      console.log(`🔹 Seeding course: ${course.title}`);

      const [teacherExists] = await sql`SELECT id FROM users WHERE id = ${course.teacherId} LIMIT 1`;

      if (!teacherExists) {
        console.warn(`Skipping course "${course.title}" because teacher with ID "${course.teacherId}" does not exist.`);
        continue;
      }

      await sql`
        INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
        VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('Courses seeded successfully.');

    
    for (const enrollment of enrollments) {
      console.log(`🔹 Seeding enrollment: ${enrollment.studentId} -> ${enrollment.courseId}`);

      await sql`
        INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
        VALUES (${uuidv4()}, ${enrollment.studentId}, ${enrollment.courseId}, ${enrollment.enrollmentDate}, ${enrollment.status})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log('Enrollments seeded successfully.');

    
    for (const progress of progressRecords) {
      console.log(`🔹 Seeding progress for student: ${progress.studentId}`);

      await sql`
        INSERT INTO progress (id, studentId, courseId, date, evaluation, comments)
        VALUES (${uuidv4()}, ${progress.studentId}, ${progress.courseId}, ${progress.date}, ${progress.evaluation}, ${progress.comments})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
   

    console.log('Database seeding completed successfully.');
    return NextResponse.json({ message: 'Database seeded successfully' });

  } catch (error: unknown) {
    console.error('Error seeding database:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }

    return NextResponse.json({ error: 'Unknown error', stack: null }, { status: 500 });
  } finally {
    await sql.end();
  }
}
