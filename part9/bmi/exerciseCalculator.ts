interface bmiVal {
  periodLength: number,
  trainingDays: number,
  success : boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const parseArray = (args: Array<string>): Array<number> => {
  if (args.length < 3) throw new Error('Not enough arguments');

  return args.slice(2).map(x => Number(x));
};

export const exerciseCalculator = (exercise: Array <number>, targ: number)  : bmiVal  => {
  const exerciseVals = exercise.filter(v => v !== 0);
  const avg = exerciseVals.reduce((a:number,b:number) => a+b)/exercise.length; 

  const bmi: bmiVal = {
    periodLength : exercise.length,
    trainingDays: exerciseVals.length,
    success: avg > targ,
    rating: avg,
    ratingDescription: avg > targ ? "good" : "bad",
    target: targ,
    average : avg
  };

  return bmi;
};

try{
  const val = parseArray(process.argv);
  console.log(exerciseCalculator(val, 2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}