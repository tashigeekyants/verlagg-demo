import { Request, Response } from 'express';
import { Mutation_RootSendSmsArgs } from '../../../generated/graphql';
import twilioClient from '../../../utils/twilioClient.js';

export async function sendSMS(req: Request, res: Response) {
  try {
    const params: Mutation_RootSendSmsArgs = req.body.input;
    const result = await twilioClient.sendSMS(params.to);
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
