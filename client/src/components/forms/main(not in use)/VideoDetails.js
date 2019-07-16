import React, {Fragment, useState, useEffect, useCallback,}from 'react'; 
import {Form, Button, Card, Image} from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import ImageUploader from "react-images-upload";
import {AuthContext } from '../../../providers/AuthProvider'; 

const VideoDetails = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false)
  const [video, setVideo] = useState("null")

  

}

export default VideoDetails