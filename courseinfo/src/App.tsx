/* --- Types --- */

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
 	);
}

/* --- Components --- */

const Header = (props: {name: string}) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: {courses: CoursePart[]}) => {
  return (
    <div>
      {
        props.courses.map((c: CoursePart) => (
          <><Part course={c} /><hr /></>
        ))
      }
    </div>
  );
};

const Part = (props: {course: CoursePart}) => {
  switch(props.course.kind) {
    case 'basic':
      return (
        <section>
          <h2>{props.course.name} {props.course.exerciseCount}</h2>
          <p><i>{props.course.description}</i></p>
        </section>
      )
    case 'background':
      return (
        <section>
          <h2>{props.course.name} {props.course.exerciseCount}</h2>
          <p><i>{props.course.description}</i></p>
          <p>submit to <a href={props.course.backgroundMaterial}>{props.course.backgroundMaterial}</a></p>
        </section>
      )
    case 'group':
      return (
        <section>
          <h2>{props.course.name} {props.course.exerciseCount}</h2>
          <p>project exercises {props.course.groupProjectCount}</p>
        </section>
      )
    case 'special':
      return (
        <section>
          <h2>{props.course.name} {props.course.exerciseCount}</h2>
          <p><i>{props.course.description}</i></p>
          <p>required skills: {props.course.requirements.toString()}</p>
        </section>
      )
    default:
      return assertNever(props.course);
  }
}

const Total = (props: {total: number}) => {
  return(
    <p>
      Number of exercises {props.total}
    </p>
  );
};

/* --- App --- */

function App(){
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content courses={courseParts} />
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;