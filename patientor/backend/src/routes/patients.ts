import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { patientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    patientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req, res) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);
export default router;