import React, {useState, useMemo} from 'react';
import api from '../../Services/api';
import {Alert, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import "./index.css";
export default function Events(){
    const [errorMessage, setErrorMessage] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [date, setDate] = useState('')
    const [sport, setSport] = useState('')
    const preview = useMemo (()=>{
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    }, [thumbnail])
    const handleSubmit= async (evt)=> {
        const user_id=localStorage.getItem('user');
        const eventData = new FormData();
        eventData.append("thumbnail",thumbnail)
        eventData.append("sport",sport)
        eventData.append("title",title)
        eventData.append("description",description)
        eventData.append("price",price)
        eventData.append("date",date)

        
            try {
                if( title !== "" 
         && description !== "" 
         && price !== "" 
         && sport !== "" 
         && date !== "" 
         && thumbnail !== null)
        {
                await api.post("/event", eventData, {headers: {user_id}})        
        } 
        else {
            setErrorMessage(true);
            setTimeout(()=>{
                setErrorMessage(false)
            }, 5000)
            console.log("missing required data")
        }
            } catch (error) {
               console.log(error.message) 
            }
        

        evt.preventDefault()
        return ""
    }
    return(
        <Container>
            <h1>Create your event.</h1>
            <Form onSubmit={handleSubmit}> 

            <FormGroup>
                <Label>Upload Image</Label>
                <Label id="thumbnail" style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}> 
                <Input type="file" onChange={(evt) => setThumbnail(evt.target.files[0])}/>
                <img src={cameraIcon} style={{maxWidth: "50px"}} alt="upload icon img"/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>Type of activity : </Label>
                <Input id="sport" value={sport} type="text" placeholder={'Activity Type ..'} onChange={(evt) => setSport(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Title : </Label>
                <Input id="title" value={title} type="text" placeholder={'Title ..'} onChange={(evt) => setTitle(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Description : </Label>
                <Input id="description" value={description} type="text" placeholder={'Description ..'} onChange={(evt) => setDescription(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Price : </Label>
                <Input id="price" value={price} type="text" placeholder={'Price .. £0.00'} onChange={(evt) => setPrice(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Date : </Label>
                <Input id="date" value={date} type="date" placeholder={'Date .. MM/DD/YYYY'} onChange={(evt) => setDate(evt.target.value)}/>
            </FormGroup>
            <Button type="submit">
                Create Event
            </Button>



            </Form>
            {errorMessage ? (
                
                   <Alert className="event-validation" color="danger">
        Missing Field(s)
      </Alert>
                
            ) : ""}
        </Container>
    )
}