import twilioClient from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const verifySid = process.env.TWILIO_VERIFY_SID || '';

const client = twilioClient(accountSid, authToken);

export function sendSMS(to: string) {
  client.verify.v2
    .services(verifySid)
    .verifications.create({ to, channel: 'sms' });
}

export async function verifySMS(to: string, code: string) {
  const verify = await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to, code });
  if (verify.status === 'approved') {
    return true;
  }
  return false;
}
function test() {
  client.verify.v2
    .services(verifySid)
    .verifications.create({ to: '+916266613435', channel: 'sms' })
    .then((verification) => console.log({ ass: verification.status }))
    .then(() => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: '+916266613435', code: '115981' })
        .then((verification_check) =>
          console.log({ as: verification_check.status }),
        );
    });
}
