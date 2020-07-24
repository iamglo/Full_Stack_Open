import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) =>{
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Part = (props) => {
  return (
    <>
    <p>
    {props.part} {props.exercise}
    </p>
    </>
  )
}

const Content = (props) =>{
  return(  
  <div>   
  <Part part = {props.part1} exercise = {props.exercises1}></Part>
  <Part part = {props.part2} exercise = {props.exercises2}></Part>
  <Part part = {props.part3} exercise = {props.exercises3}></Part>
  </div>
  )
}

const Total = (props) =>{
  return(<div>
     <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </div>)
}


const App = () => {
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const course = 'Half Stack application development'

  return (
    <div>
      <Header course = {course}> </Header>
      <Content part1 = {parts[0].name}
      part2 = {parts[1].name}
      part3 = {parts[2].name}
      exercises1 = {parts[0].exercises}
      exercises2 = {parts[1].exercises}
      exercises3 = {parts[2].exercises}
      ></Content>
      <Total 
        exercises1 = {parts[0].exercises}
        exercises2 = {parts[1].exercises}
        exercises3 = {parts[2].exercises}
      ></Total>
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))