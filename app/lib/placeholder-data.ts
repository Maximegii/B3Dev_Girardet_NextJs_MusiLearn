// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { title } from "process";

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    role: 'ADMIN',
  },
];

const courses = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    title: 'Course',
    description: 'Course Description',
    instrument: 'Piano',
    teacherId: '410544b2-4001-4271-9855-fec4b6a6442a',
    level: 'Beginner',
    schedule: 'Monday 10:00 AM',
    capacity: 10,
  }
];

const enrollments = [
  {
    id: 'd6e15727-9fe1-4961-8c8c-ea44a9bd81aa',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442a',
    courseId: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    enrollmentDate: '2021-10-01',
    status: 'ENROLLED',
  },
];

const progress = [
  {
    id: 'd6e15727-9fe1-4961-5b5b-ea44a9bd81aa',
    studentId: '410544b2-4001-4271-9855-fec4b6a6442a',
    courseId: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    date: '2021-10-01',
    evaluation: 'A',
    comment: 'Good job!',
  },
];

export { users, courses, enrollments, progress };