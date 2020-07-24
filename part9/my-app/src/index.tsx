import React from "react";
import ReactDOM from "react-dom";


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}
interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: "Extra";
  exercise: string;
}

type CoursePart = | CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: Array<CoursePart >;
}

interface TotalProps {
  courseParts: Array<CoursePart>;
  // carry: number;
}


const Header: React.FC<HeaderProps> = (props) => {
  return (
    <h1>
      {props.name}
    </h1>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part: React.FC<{ part: CoursePart }> = (props) => {
    switch (props.part.name){
      case "Fundamentals":
        return (<div>
          {props.part.exerciseCount} {props.part.description}
        </div>)
      case "Using props to pass data":
        return (<div>
          {props.part.exerciseCount} {props.part.groupProjectCount}
        </div>)
      case "Deeper type usage":
        return (<div>
          {props.part.exerciseCount} {props.part.description} {props.part.exerciseSubmissionLink}
        </div>)
      case "Extra":
        return (<div>
         {props.part.description} {props.part.exercise}
        </div>)
      default:
        return assertNever(props.part);
  }  
}

const Content: React.FC<ContentProps> = ({courseParts}) => {
  return (
    <h1>
      {courseParts.map(p => <Part key={p.name} part={p}></Part>)}
    </h1>
  )
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const courseName = "Half Stack application development";
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

const App: React.FC = () => {

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
