import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			if (session) {
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
});
