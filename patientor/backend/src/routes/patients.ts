import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { patientSchema, entrySchema } from '../utils';
import { z } from 'zod';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);

  if(patient) {
    res.send(patient);
  } else {
    res.status(404).end();
  }
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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    entrySchema.parse(req.body);
    next();
  } catch (error:unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req, res) => {
  const data: Patient | undefined = patientService.addEntryForPatient(req.body, req.params['id'] as string);
  res.json(data);
});

router.use(errorMiddleware);
export default router;