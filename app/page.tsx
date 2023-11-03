import { Button, Card } from '@tremor/react';

import { Submit } from './submit';
import UsersTable from './table';
import { auth } from './auth';
import { sql } from '@vercel/postgres';

// import { useState } from 'react';
// import { useEffect } from 'react';

interface User {
  id: number;
  name: string;
  time: Date;
}


export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const result = await sql`
    SELECT /*+ NOCACHE */ id, name, time
    FROM users 
    WHERE name ILIKE ${'%' + search + '%'};
  `;
  // const result = await sql`
  //   SELECT id, name, time 
  //   FROM users;
  // `;
  let users = result.rows as User[];

  const session = await auth();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
      <div className="flex justify-center my-[5vh]">
          {session?.user &&
            <div>
              <Submit session={session} />
            </div>
          }
        </div>
    </main>
  );
}
