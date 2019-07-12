import React, {useEffect, useState} from 'react'; 
import axios from 'axios'; 
import {Link} from 'react-router-dom';
import {Segment, List} from 'semantic-ui-react'; 
import Course from '../../Course'; 

const EditLessonForm = (props) => {
  const [lessons, setLessons] = useState([]); 
  const [loader, setLoader] = useState(true)
  const {course_id} = props.match.params; 


  // axios to get lessons from course
  useEffect(() => {
    axios.get(`/api/courses/${course_id}/lessons`)
    .then(res => {
      setLessons(res.data);
      // setLoader(true)
      
    })
  }, [])

  const renderLessons = () => {
    debugger 
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
      {renderLessons()}
    </div>
  )
}

export default EditLessonForm; 
