import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID as string,
      clientSecret: process.env.STRAVA_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
});
