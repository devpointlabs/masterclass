import React, {useEffect, useState} from 'react'; 
import axios from 'axios'; 
import {Link} from 'react-router-dom';
import {Segment, List, Button, Icon } from 'semantic-ui-react'; 
import Course from '../../Course';
import AddLessons from '../adds/AddLessons'; 
import EditLessonDetails from './EditLessonDetails';
import styled from 'styled-components';


const EditLessonForm = (props) => {
  const [formLessons, setFormLessons] = useState([])
  const [lessons, setLessons] = useState([]); 
  const [loader, setLoader] = useState(true); 
  const {course_id} = props.match.params; 
  const [showEditForm, setShowEditForm] = useState(false); 
  const [showCreateForm, setShowCreateForm] = useState(false); 
  const [showVideos, setShowVideos] = useState(false); 



  
  
  // will toggle the add lessons 
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm); 
  }
 

  // toggle the show existing videos comp 
  const toggleExistingVideos = () => {
    setShowVideos(!showVideos); 
  }
  
  // axios to get lessons from course and will update whenever the toggle goes on and off in order to render the new courses. 
  useEffect(() => {
    axios.get(`/api/courses/${course_id}/lessons`)
    .then(res => {
      setLessons(res.data);
      // setLoader(true)
    })
  }, [showCreateForm, showEditForm])

  useEffect(()=>{
    setFormLessons(lessonWithShowForm)

  },[lessons])
  const lessonWithShowForm = lessons.map(l=>{
    return {
      id: l.id,
      name: l.name,
      description: l.description,
      course_id: l.course_id,
      showForm: false
    }
  })
  const toggleEditForm = (id, showForm) => {
    lessonWithShowForm.filter(l =>{
      if(id == l.id)
      {l.showForm = !showForm
        return l
        } 
    }); 
    setFormLessons(lessonWithShowForm)
 }
 const closeEdit = (id) =>{
   setShowEditForm(!showEditForm)
  lessonWithShowForm.filter(l =>{
    if(id == l.id)
    {l.showForm = false
      return l
      } 
  }); 
  setFormLessons(lessonWithShowForm)
 }

 
  // will render the add form for the lessons and passes in the course id
  const renderAddForm = () => {
    return  <AddLessons course_id={course_id} showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm}/>
  }

  //  will render the edit form for the lessons 
  const renderEditForm = (id, showForm) => {
  return <EditLessonDetails lesson_id={id} showForm = {showForm} closeEdit = {closeEdit}/>
  }

  // remove lessons 
  const removeLesson = (id) => {
    axios.delete(`/api/courses/${course_id }/lessons/${id}`)
      .then(res => {
        setLessons(lessons.filter(l => l.id !== id))
      })

  }


  const renderLessons = () => {
    if (loader === true) {
      return formLessons.map(l => (
         <Segment key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
         <div>
        <Link to = {`/lessons/${l.id}`}> 
         <List.Header as="h3">{l.name}</List.Header>
         <List.Description>
           {l.description}
         </List.Description>
           </Link>
         { l.showForm ? renderEditForm(l.id, l.showForm) : null}
         {/* <h1>
         {/* {l.showForm ? "True": "False"}
         </h1> */}
         <Button size="tiny" color="blue" onClick={() => toggleEditForm(l.id, l.showForm)}>
           <Icon name={l.showForm ? "cancel" :"edit"} />
         </Button>
         <Button size="tiny" color="red" onClick={() => removeLesson(l.id)}>
           <Icon name="trash alternate outline" />
         </Button>
     
        <ClickDiv>
          { showVideos ?
            <VideoClick onClick={() => toggleExistingVideos()}>Hide Videos <Icon name='angle up' /></VideoClick>
            :
            <VideoClick onClick={() => toggleExistingVideos()}>Show Videos <Icon name='angle down' /></VideoClick>
          }
        </ClickDiv>
        <div>
          { showVideos ?
            <h1>hi</h1>
            :
            null
          }
        </div>
      
       </div>
         </Segment>
       
      ))
    }
  }

  return (
    <div>
      <Button onClick={() => toggleCreateForm()}>{ showCreateForm ? "Cancel" : "Create Lesson"}</Button>
      {showCreateForm ? renderAddForm() : renderLessons ()}
      {renderLessons()}
    </div>
  )
}


const ClickDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const VideoClick = styled.p`
  color: blue;
  border-radius: 5px;
  padding-left: 7px;

  &:hover {
    cursor: pointer;
    background: grey ;
    transition: background 0.7s ease;
  } 
`

export default EditLessonForm; 
