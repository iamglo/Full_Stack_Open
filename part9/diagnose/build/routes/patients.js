"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const entries = patientService_1.default.getPatients();
    const filt = entries.find(f => f.id === req.params.id);
    if (filt) {
        res.json(filt);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.toPatient(req.body);
        const addPatient = patientService_1.default.addPatient(newPatient);
        res.json(addPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService_1.default.findById(req.params.id);
        console.log(patient);
        const newEntry = utils_1.toEntry(req.body);
        console.log(newEntry);
        const addEntry = patientService_1.default.addEntry(patient, newEntry);
        console.log(addEntry);
        res.json(addEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
