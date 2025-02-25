import postgres from 'postgres';
import { User, Course, Enrollment, Progress } from './definitions';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCourse() {
  try {
    const data = await sql<Course[]>`SELECT * FROM courses`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses data.');
  }
}

export async function fetchTeacher() {
  try {
    const data = await sql<User[]>`
    SELECT users.name, users.email
    FROM users
    WHERE users.role = 'teacher'
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch teacher data.');
  }
}