export function calculateBmi(height: number, weight: number): string {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}

interface DataBmi {
  height: number;
  weight: number;
}

function parseArgumentsBmi(args: string[]): DataBmi {
  if (args.length > 4) throw new Error("Too many arguments");
  if (args.length < 4) throw new Error("Not enought arguments");

  return {
    height: Number(args[3]),
    weight: Number(args[4]),
  };
}

if (require.main == module) {
  try {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}
