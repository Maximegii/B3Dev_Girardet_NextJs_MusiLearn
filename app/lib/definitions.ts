export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
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
  enrollmentDate: Date;
  status: string;
};

export type Progress = {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  evaluation: string;
  comments: string;
};