import { Request, Response } from 'express';
import { Mutation_RootSendEmailArgs } from '../../../generated/graphql.js';
import twilioClient from '../../../utils/twilioClient.js';

export async function sendEmail(req: Request, res: Response) {
  try {
    const params: Mutation_RootSendEmailArgs = req.body.input;
    const result = await twilioClient.sendEmail(params.toEmail);
    if (result.success) {
      res.status(200).json({ message: result.message });
      return;
    }
    throw new Error(result.message);
  } catch (error) {
    res
      .status(400)
      .json({ message: error?.message || 'Internal server error' });
  }
}
