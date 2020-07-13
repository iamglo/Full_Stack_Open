interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


export const calculateBmi = (weight: number, height: number) : string => {
  const bmi = 703 * weight/(height*height);

  if (bmi < 18.5){
    return ('too low');
  }
  else if (bmi < 23.5){
    return ('Normal (healthy weight)');
  }
  else {
    return ('too high');
  }
};

try{
  const {value1, value2} = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}