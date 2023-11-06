import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface User {
    id: number;
    name: string;
    time: Date;
  }

type Body = {
    name: string
}

// export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json() as Body
    const name = body.name
    const result = await sql`
        SELECT id, name, time
        FROM users
        WHERE name = ${name};
    `;
    const rows = result.rows as User[];
    console.log(rows);
    if (rows.length === 0) {
        const res = await sql`
        INSERT INTO users (name, time)
        VALUES (${name}, NOW());
        `;
    } else {
        const res = await sql`
        UPDATE users
        SET time = NOW()
        WHERE name = ${name};
        `;
    }


    // data log table
    // first get id of user
    const result2 = await sql`
        SELECT id
        FROM users
        WHERE name = ${name};
    `;

    const rows2 = result2.rows as User[];
    const id = rows2[0].id;

    // now insert into data log table
    const res2 = await sql`
        INSERT INTO data (user_id, time)
        VALUES (${id}, NOW());
    `;

    return NextResponse.json({ success: result, data: await sql`SELECT * from USERS;` })
}