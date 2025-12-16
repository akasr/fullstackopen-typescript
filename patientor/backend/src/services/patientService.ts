import { v4 as uuidv4 } from 'uuid';

import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};