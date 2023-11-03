import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text
} from '@tremor/react';

interface User {
  id: number;
  name: string;
  time: Date;
}

const calcTimeDiff = (time: Date) => {
  const now = new Date();
  // update time to local time
  const offsetTime = new Date(time.getTime() - now.getTimezoneOffset() * 60 * 1000);

  // display # of days of difference if > 1 day, otherwise do HH:MM:SS
  const diff = Math.abs(now.getTime() - offsetTime.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  if (diffDays > 0) return `${diffDays} days ago`;
  else {
    const diffHours = Math.floor(diff / (1000 * 3600));
    if (diffHours > 0) return `${diffHours} hours ago`;
    else {
      const diffMinutes = Math.floor(diff / (1000 * 60));
      if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
      else {
        const diffSeconds = Math.floor(diff / 1000);
        return `${diffSeconds} seconds ago`;
      }
    }
  }
}

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Time Since</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{calcTimeDiff(user.time)}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
