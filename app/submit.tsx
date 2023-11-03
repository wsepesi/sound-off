'use client';

import { Button, Card, Text, Title } from '@tremor/react';

import { Session } from "next-auth";

type Props = {
    session: Session,
    // setUsers: Function,
    // getData: Function
}

interface User {
    id: number;
    name: string;
    time: Date;
  }

export const Submit = (props: Props) => {
    const {session} = props
    const handleClick = async () => {
        if (!session?.user) return;
        const response = await fetch('/api/handleSQL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: session.user.name })
        })
        const data = await response.json()
        // await getData()
        // refresh the page
        window.location.reload()
      }
      return (
        // style the button to be a large circle, and occupy the center of the page
        <Button 
            onClick={handleClick}
            className='h-32 w-32 rounded-full bg-blue-500 hover:bg-blue-700 active:bg-blue-900'
        >Sound Off</Button>
        )
    }
