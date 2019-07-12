import React, {useEffect, useState} from 'react'; 
import axios from 'axios'; 
import {Link} from 'react-router-dom';
import {Segment, List, Button} from 'semantic-ui-react'; 
import Course from '../../Course';
import AddLessons from '../adds/AddLessons'; 

const EditLessonForm = (props) => {
  const [lessons, setLessons] = useState([]); 
  const [loader, setLoader] = useState(true)
  const {course_id} = props.match.params; 
  const [toggleForm, setToggleForm] = useState(false); 
  const [showCreateForm, setShowCreateForm] = useState(false); 


  
  
  // will toggle the add lessons 
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm); 
  }
  
  // axios to get lessons from course and will update whenever the toggle goes on and off in order to render the new courses. 
  useEffect(() => {
    axios.get(`/api/courses/${course_id}/lessons`)
    .then(res => {
      setLessons(res.data);
      // setLoader(true)
    })
  }, [showCreateForm])
  // will render the add form for the lessons and passes in the course id
  const renderAddForm = () => {
    return  <AddLessons course_id={course_id} showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm}/>
  }


  const renderLessons = () => {
    if (loader === true) {
      return lessons.map(l => (
         <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
         <div>
           <Link to = {`/lessons/${l.id}`}> 
         <List.Header as="h3">{l.name}</List.Header>
         <List.Description>
           {l.description}
         </List.Description>
           </Link>
         {/* <Button size="tiny" color="red" onClick={() => removeLesson(l.id)}>
           <Icon name="trash alternate outline" />
         </Button> */}
         {/* <Link to={`/edit_lesson/${l.id}`}> <Button size="tiny" color="blue">
           <Icon name="edit" />
         </Button>
         </Link> */}
       </div>
         </Segment>
       
      ))
    }
  }

  return (
    <div>
      <Button onClick={() => toggleCreateForm()}>Create Lesson</Button>
      {showCreateForm ? renderAddForm() : renderLessons ()}
      {renderLessons()}
    </div>
  )
}

export default EditLessonForm; 
