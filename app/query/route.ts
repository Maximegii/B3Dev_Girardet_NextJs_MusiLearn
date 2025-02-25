import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listCourses() {
  const data = await sql`
    SELECT *
    FROM courses
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listCourses());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}