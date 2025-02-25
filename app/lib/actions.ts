'use server'

import bcrypt from 'bcryptjs';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchemaCourse = z.object({
    id: z.string(),
    title: z.string({ invalid_type_error: 'Merci de choisir un titre' }),
    description: z.string({ invalid_type_error: 'Merci de choisir une decription' }),
    instrument: z.string({ invalid_type_error: 'Merci de choisir un instrument' }),
    teacherId: z.string({ invalid_type_error: 'Merci de choisir un enseignant' }),
    level: z.string({ invalid_type_error: 'Merci de choisir un niveau' }),
    schedule: z.string({ invalid_type_error: 'Merci de choisir un horaire' }),
    capacity: z.number({ invalid_type_error: 'Merci de choisir une capacité' }),

})

const CreateCourse = FormSchemaCourse.omit({ id: true });

export interface StateCourse {
    message: string | null;
    errors: {
        title?: string[];
        description?: string[];
        instrument?: string[];
        teacherId?: string[];
        level?: string[];
        schedule?: string[];
        capacity?: string[];
    };
}


export async function createCourse(prevState: StateCourse, formData: FormData) {

    const validatedFields = CreateCourse.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        instrument: formData.get('instrument'),
        teacherId: formData.get('teacherId'),
        level: formData.get('level'),
        schedule: formData.get('schedule'),
        capacity: formData.get('capacity'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Fields to Create Course.',
        };

    }
    const { title, description, instrument, teacherId, level, schedule, capacity } = validatedFields.data;

    try {
        await sql`
            INSERT INTO courses (title, description, instrument, teacherId, level, schedule, capacity)
            VALUES (${title}, ${description}, ${instrument},${teacherId},${level},${schedule},${capacity})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Courses',
        }
    }
    revalidatePath('/dashboard/cours');
    redirect('/dashboard/cours');
}



const FormSchemaUser = z.object({
    id: z.string(),
    name: z.string({ invalid_type_error: 'Merci de choisir un prénom' }),
    email: z.string({ invalid_type_error: 'Merci de choisir un email' }),
    password: z.string({ invalid_type_error: 'Merci de choisir un mot de passe' }),
    role: z.string({ invalid_type_error: 'Merci de choisir un role' }),

})

const CreateUser = FormSchemaUser.omit({ id: true });


export type StateUser = {
    errors?: {
        id?: string;
        title?: string;
        description?: string;
        instrument?: string;
        teacherId?: string;
        level?: string;
        schedule?: string;
        capacity?: number;
    };
    message?: string | null;
}

export async function createUser(prevState: StateUser, formData: FormData) {

    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Fields to Create Invoice.',
        };

    }
    const { name, email, password, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(`${password}`, 10);

    try {
        await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword},${role})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Users',
        }
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}


// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(id: string, prevState: State, formData: FormData) {
//     const validatedFields = UpdateInvoice.safeParse({
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//     });

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Update Invoice.',
//         };
//     }
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;

//     try {
//         await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//     `;
//     }
//     catch (error) {
//         return { message: 'Database Error: Failed to Update Invoice.' };
//     }
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//     await sql`
//         DELETE FROM invoices
//         WHERE id = ${id}
//     `;
//     revalidatePath('/dashboard/invoices');
// }