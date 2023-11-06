import { Card } from '@tremor/react';
import { Submit } from './submit';
import UsersTable from './table';
import { auth } from './auth';
import { db } from '@vercel/postgres';

interface User {
  id: number;
  name: string;
  time: Date;
}

const getData = async () => {
  const client = await db.connect()
  const _sql = `SELECT * FROM users;`
  const res = await client.query(_sql)
  client.release()
  return res
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const result = await getData()
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
