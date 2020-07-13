import express from 'express';
import patientService from '../services/patientService';
import {toPatient, toEntry} from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  const entries = patientService.getPatients()
  const filt = entries.find(f => f.id === req.params.id)
  
  if (filt){
    res.json(filt);
  } else{
    res.sendStatus(404);
  }
  
})

router.post('/', (req, res) => {
    try {
      const newPatient = toPatient(req.body)
      const addPatient = patientService.addPatient(newPatient)
      res.json(addPatient);
    } catch(e){
      res.status(400).send(e.message);
    }
  })

router.post('/:id/entries', (req, res) => {
    try {
      const patient = patientService.findById(req.params.id)
      const newEntry = toEntry(req.body)
      const addEntry = patientService.addEntry(patient, newEntry)
      res.json(addEntry);
    } catch(e){
      res.status(400).send(e.message);
    }
  })
  

export default router;