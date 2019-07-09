import React, { useState,} from 'react';
import FormCourseDetails from './FormCourseDetails'; 
import FormLessonDetails from './FormLessonDetails'; 
import FormVideoDetails from './FormVideoDetails'; 
import Success from './Success'; 



const LessonForm = (props) => {
  const [step, setStep] = useState(1); 
  const [file, setFile] = useState();
  const [courseId, setCourseId] = useState(); 
  const [lessonId, setLessonId] = useState(); 


  

// proceed to the nextStep 
const nextStep = () => {
  setStep(step + 1)
}

// go back to previous step 
const previousStep = () => {
  setStep(step - 1)
}

const getCourseId = (id) => {
  setCourseId(id); 
}

const getLessonId = (id) => {
  setLessonId(id)
}
// RENDER DIFFERENT FORM PAGES 
  switch(step) {
    case 1: 
    return (
      <FormCourseDetails {...props} nextStep={nextStep} getCourseId={getCourseId}/>
    )
    case 2: 
    return (
      <FormLessonDetails {...props} nextStep={nextStep} previousStep={previousStep} courseId={courseId} getLessonId={getLessonId}/>
    )
    case 3: 
    return (
      <FormVideoDetails {...props} nextStep={nextStep} previousStep={previousStep} lessonId={lessonId} />
    )
    case 4: 
    return(
      <Success />
    )
    
  }

}

export default LessonForm; 
