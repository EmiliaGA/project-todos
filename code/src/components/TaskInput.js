/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid'; // installed with npm install uuidv4
import tasks from 'reducer/tasks';
import styled from 'styled-components'
import moment from 'moment'

const TaskInput = () => {
  const [newTask, setNewTask] = useState('');
  const uniqueID = uuid(); // provides a unique ID for every task
  const dispatch = useDispatch();
  const buttonDisabled = newTask.length < 2 || newTask.length > 140

  const OnFormSubmit = (event) => {
    event.preventDefault();
    dispatch(tasks.actions.addTask({
      id: uniqueID, // could do id: Date.now().toString()
      text: newTask,
      isComplete: false,
      timeStamp: moment().format('ll')
    }));
    setNewTask('');
  }
  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value)
  };

  return (
    <section>
      <StyledForm onSubmit={OnFormSubmit}>
        <label>
          <StyledTextarea
            type="text"
            value={newTask}
            placeholder="Add your task here..."
            onChange={handleNewTaskChange} />
        </label>
        <StyledSubmitButton type="submit" disabled={buttonDisabled}>+</StyledSubmitButton>
      </StyledForm>
    </section>
  )
}

export default TaskInput

const StyledForm = styled.form`
display:flex;
margin-top: 2em;
`
const StyledTextarea = styled.input`
background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,0.2329306722689075) 0%, rgba(252,70,107,0.30575980392156865) 61%);
 border-radius: 20px;
 border: 2px solid gray;
 width: 55vw;
 height: 7vh;
 resize: none;
 font-family: "Source Sans Pro";
 color: var(--color-darkGrey);
 padding-left: 1em;
 outline: none;

 ::placeholder {
  color: white;
}

@media (min-width: 667px) and (max-width: 1024px)  {
width: 45vw;
height: 5vh;
}
@media screen and (min-width: 1024px) {
width: 22vw;
height: 5vh;
}
 `
const StyledSubmitButton = styled.button`
border: none;
font-size: 3em;
cursor: pointer;
font-weight: bold;
background: transparent;
color: white;
width: 1em;
justify-content: center;
align-items: center;
`