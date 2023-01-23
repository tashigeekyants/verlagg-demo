import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const googleClient = new OAuth2Client(CLIENT_ID);

export default googleClient;
