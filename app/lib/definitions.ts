// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  teacherId: string;
  level: string;
  schedule: string;
  capacity: number;
};

export type Enrollment = {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: string;
};

export type Progress = {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  evaluation: string;
  comment: string;
};