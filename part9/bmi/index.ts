// const express = require('express');
import {exerciseCalculator} from "./exerciseCalculator"
import {calculateBmi} from "./bmiCalculator"
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try{
  let height = req.query.height
  let weight = req.query.weight
  let obj = {
    "height": height,
    "weight": weight,
    "bmi": calculateBmi(Number(height), Number(weight))
  }
  res.send(obj);
  } catch (e){
    res.send({
      error: "malformatted parameters"
    })
  }
});

app.post('/exercises', (req, res) => {
  try{
    let exercise = req.body.daily_exercises
    let targ = req.body.target
    res.send(exerciseCalculator(exercise, targ))
  } catch (e){
    res.send({
      error: "malformatted parameters"
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

