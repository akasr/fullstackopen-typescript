import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.string(),
  occupation: z.string()
});

export const entrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
});