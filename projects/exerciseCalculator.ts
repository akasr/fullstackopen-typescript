interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(dailyHours: number[], target: number): Result {
  let average: number = 0,
    trainingDays: number = 0,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    success: boolean;
  for (const hours of dailyHours) {
    average += hours;
    trainingDays += hours !== 0 ? 1 : 0;
  }
  average /= dailyHours.length;
  success = average >= target;
  rating = success ? 3 : average >= 0.75 * target ? 2 : 1;

  switch (rating) {
    case 1:
      ratingDescription = "You need to work harder";
      break;
    case 2:
      ratingDescription = "Not too bad but could be better";
      break;
    case 3:
      ratingDescription = "Great job, you met your target!";
      break;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
}

interface DataExercise {
  dailyHours: number[];
  target: number;
}

function parseArgumentsExercise(args: string[]): DataExercise {
  if (args.length < 4) throw new Error("Not enought arguments");

  return {
    target: +args[2],
    dailyHours: args.slice(3).map((num) => +num),
  };
}

if(require.main == module) {
  try {
    const { dailyHours, target } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}
