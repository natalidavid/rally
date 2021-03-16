import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';


const TaskCreateForm = ({ org }) => {
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    spots: '',
    image_url: '',
    location: '',
    errors: {}
  })

  const updateDetails = (value, property) => {
    setTaskDetails(prev => {
      return { ...prev, [property]: value}
    })
  }

  const sendData = () => {
    const taskData = {
      name: taskDetails.name,
      description: taskDetails.description,
      start_date: taskDetails.start_date,
      end_date: taskDetails.end_date,
      spots: taskDetails.spots,
      image_url: taskDetails.image_url,
      location: taskDetails.location,
      organization_id: org.id,
      organization: org.name
    }
    console.log("we sending da message")
    Axios.put("/api/tasks", taskData)
    .then(() =>  console.log("We did it babeh"))
    .catch(err => console.error(err));
  }

  //Checks all the inputs on the create task for an passes the needed error props to each input
  const validate = () => {
    setTaskDetails(prev => { return { ...prev, errors: {}} });
    !taskDetails.name && setTaskDetails(prev => { return {...prev, errors: {...prev.errors, name: true}}});
    !taskDetails.description && setTaskDetails(prev=> { return {...prev, errors: {...prev.errors, description: true}}});
    Date.parse(taskDetails.start_date) < Date.now() && setTaskDetails(prev => { return {...prev, errors: {...prev.errors, start_date: true}}});
    Date.parse(taskDetails.end_date) < Date.parse(taskDetails.start_date) && setTaskDetails(prev => { return {...prev, errors: {...prev.errors, end_date: true}}});
    (taskDetails.spots === "0" || taskDetails.spots === "") && setTaskDetails(prev => { return { ...prev, errors: {...prev.errors, spots: true}}});
    !taskDetails.location && setTaskDetails(prev => { return { ...prev, errors: {...prev.errors, location: true }}});

    for (const error in taskDetails.errors) {
      if (!taskDetails.errors[error]) {
        return false
      }
    }

    sendData();
  };

  return (
    <FormGroup>
      <TextField 
        id="task name"
        label="Task Name" 
        value={taskDetails.name} 
        onChange={event => updateDetails(event.target.value, 'name')}
        margin="normal"
        error={taskDetails.errors.name ? true : false }
        helperText={taskDetails.errors.name ? "Name can't be blank" : ''}
      />
       <TextField 
        id="description"
        label="Description"
        multiline
        value={taskDetails.description} 
        onChange={event => updateDetails(event.target.value, 'description')}
        margin="normal"
        error={taskDetails.errors.description ? true : false }
        helperText={taskDetails.errors.description ? "Description can't be blank" : ''}
      />
      <TextField 
        id="location"
        label="Location"
        value={taskDetails.location}
        onChange={event => {
          updateDetails(event.target.value, 'location')
        }}
        margin="normal"
        error={taskDetails.errors.location ? true : false }
        helperText={taskDetails.errors.location ? "Location can't be blank" : ''}
      />
       <TextField 
        id="start_date"
        type="datetime-local"
        label="Start Time"
        InputLabelProps={{shrink: true}}
        onChange={event => {
          updateDetails(event.target.value, 'start_date')
        }}
        margin="normal"
        error={taskDetails.errors.start_date ? true : false }
        helperText={taskDetails.errors.start_date ? "Start date must be in the future" : ''}
      />
      <TextField 
        id="end_date"
        type="datetime-local"
        label="End Time"
        InputLabelProps={{shrink: true}}
        onChange={event => {
          updateDetails(event.target.value, 'end_date')
        }}
        margin="normal"
        error={taskDetails.errors.end_date ? true : false }
        helperText={taskDetails.errors.end_date ? "End date must be after start date" : ''}
      />
      <TextField 
        id="spots"
        type="number"
        label="# of Volunteers Needed"
        value={taskDetails.spots}
        onChange={event => {
          updateDetails(event.target.value, 'spots')
        }}
        margin="normal"
        error={taskDetails.errors.spots ? true : false }
        helperText={taskDetails.errors.spots ? "Minimum 1 volunteer" : ''}
      />
      <TextField 
        id="image_url"
        label="Task Image URL"
        value={taskDetails.image_url}
        onChange={event => {
          updateDetails(event.target.value, 'image_url')
        }}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" onClick={validate}>
        Create Task
      </Button>


    </FormGroup>
  );
}

export default TaskCreateForm;