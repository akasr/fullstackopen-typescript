import { v4 as uuidv4 } from 'uuid';

import patientData from '../../data/patients';
import { Patient, NewPatient, EntryWithoutId, Diagnoses } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnoses["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnoses["code"]>;
};
const addEntryForPatient = (entry: EntryWithoutId, id: string) => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
    diagnosisCodes: parseDiagnosisCodes(entry)
  };

  const patient = patients.find(p => p.id === id);
  patient?.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryForPatient
};