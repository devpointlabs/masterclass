import React, { useState,} from 'react';
import FormCourseDetails from './FormCourseDetails'; 
import FormLessonDetails from './FormLessonDetails'; 
import FormVideoDetails from './FormVideoDetails'; 
import Success from './Success'; 


const LessonForm = (props) => {
  const [step, setStep] = useState(1)
  // const [name, setName] = useState();
  // const [description, setDescription] = useState();
  const [file, setFile] = useState();

// proceed to the nextStep 
const nextStep = () => {
  setStep(step + 1)
}

// go back to previous step 
const previousStep = () => {
  setStep(step - 1)
}

// RENDER DIFFERENT FORM PAGES 
  switch(step) {
    case 1: 
    return (
      <FormCourseDetails {...props} nextStep={nextStep}/>
    )
    case 2: 
    return (
      <FormLessonDetails {...props} nextStep={nextStep} previousStep={previousStep} />
    )
    case 3: 
    return (
      <FormVideoDetails {...props} nextStep={nextStep} previousStep={previousStep} />
    )
    case 4: 
    return(
      // TODO: CONFIRM FORM COMPONENT
      <Success />
    )
    
  }

}

export default LessonForm; 
