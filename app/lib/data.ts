import postgres from 'postgres';
import { User, Course, Enrollment, Progress } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUsers(query: string): Promise<User[]> {
  try {
    const data = await sql<User[]>`
      SELECT
        users.id,
        users.email,
        users.name,
        users.role,
        COUNT(courses.id) AS total_courses,
        COUNT(enrollments.id) AS total_enrollments
      FROM users
      LEFT JOIN courses ON users.id = courses.teacherId
      LEFT JOIN enrollments ON users.id = enrollments.studentId
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
      GROUP BY users.id, users.email, users.name, users.role
      ORDER BY users.name ASC
    `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchCourses(query: string): Promise<Course[]> {
  try {
    const data = await sql<Course[]>`
      SELECT
        courses.id,
        courses.title,
        courses.description,
        courses.instrument,
        courses.level,
        courses.schedule,
        courses.capacity,
        users.name AS teacher_name
      FROM courses
      LEFT JOIN users ON courses.teacherId = users.id
      WHERE
        courses.title ILIKE ${`%${query}%`} OR
        courses.description ILIKE ${`%${query}%`}
      ORDER BY courses.title ASC
    `;

    const courses = data.map((course) => ({
      ...course,
      capacity: Number(course.capacity),
    }));

    return courses;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchEnrollments(query: string): Promise<Enrollment[]> {
  try {
    const data = await sql<Enrollment[]>`
      SELECT
        enrollments.id,
        enrollments.enrollmentDate,
        enrollments.status,
        users.name AS student_name,
        courses.title AS course_title
      FROM enrollments
      LEFT JOIN users ON enrollments.studentId = users.id
      LEFT JOIN courses ON enrollments.courseId = courses.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        courses.title ILIKE ${`%${query}%`}
      ORDER BY enrollments.enrollmentDate DESC
    `;

    const enrollments = data.map((enrollment) => ({
      ...enrollment,
      enrollmentDate: new Date(enrollment.enrollmentDate),
    }));

    return enrollments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch enrollments.');
  }
}

export async function fetchProgress(query: string): Promise<Progress[]> {
  try {
    const data = await sql<Progress[]>`
      SELECT
        progress.id,
        progress.date,
        progress.evaluation,
        progress.comments,
        users.name AS student_name,
        courses.title AS course_title
      FROM progress
      LEFT JOIN users ON progress.studentId = users.id
      LEFT JOIN courses ON progress.courseId = courses.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        courses.title ILIKE ${`%${query}%`}
      ORDER BY progress.date DESC
    `;

    const progressRecords = data.map((record) => ({
      ...record,
      date: new Date(record.date),
    }));

    return progressRecords;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch progress records.');
  }
}