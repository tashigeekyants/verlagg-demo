import twilioClient from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';
const verifySid: string = process.env.TWILIO_VERIFY_SID || '';

const client = twilioClient(accountSid, authToken);

async function sendSMS(to: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await client.verify.v2.services(verifySid).verifications.create({
      to,
      channel: 'sms',
    });
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    return {
      success: false,
      message: error?.message || 'Internal server error',
    };
  }
}

async function verifySMS(
  to: string,
  code: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const verify = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to, code });
    if (verify.valid) {
      return { success: true, message: 'OTP verified successfully' };
    }
    return { success: false, message: 'Invalid OTP' };
  } catch (error) {
    return { success: false, message: 'OTP expired. Please resend the OTP' };
  }
}

async function sendEmail(to: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await client.verify.v2.services(verifySid).verifications.create({
      to,
      channel: 'email',
    });
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    return {
      success: false,
      message: error?.message || 'Internal server error',
    };
  }
}
async function verifyEmail(
  to: string,
  code: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const verify = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to, code });
    if (verify.valid) {
      return { success: true, message: 'OTP verified successfully' };
    }
    return { success: false, message: 'Invalid OTP' };
  } catch (error) {
    return { success: false, message: 'OTP expired. Please resend the OTP' };
  }
}

export default { sendSMS, verifySMS, sendEmail, verifyEmail };
