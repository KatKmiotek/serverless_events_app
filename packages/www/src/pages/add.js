import React, { useRef, useState } from 'react'
import { Button, Container, Input, Label, Box, Select, Alert } from 'theme-ui'
import { gql, useMutation, useQuery } from '@apollo/client'
import DatePicker from "react-date-picker";
import Dashboard from '../app/components/Dashboard'
import EventModal from '../app/components/Modal'
import moment from 'moment'

export default () => {
  const titleRef = useRef()
  const webRef = useRef()
  const typeRef = useRef()

  const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $date: String!, $url: String!, $type: String!) {
    addEvent(title: $title, date: $date, url: $url, type: $type) {
      id
      title
      date
      url
      type
    }
  }
`;


  const GET_EVENTS = gql`
  query events {
    events {
      id
      title
      date
      url
      type
    }
  }
`;
  const [addEvent] = useMutation(ADD_EVENT);
  const { refetch } = useQuery(GET_EVENTS);
  const [startDate, setStartDate] = useState(new Date());
  const [ modal, setModal] = useState(false)
  return (
    <Container>
      <Dashboard />
      <Box as="form" onSubmit={async e => {
          e.preventDefault()
          await addEvent({
            variables: {
              title: titleRef.current.value,
              date: moment(startDate).format("DD-MM-YYYY"),
              url: webRef.current.value,
              type: typeRef.current.value
            }
          })
          titleRef.current.value = "";
          await setStartDate(new Date());
          webRef.current.value = "";
          // typeRef.current.value = "";
          await refetch()}}>
        <Label htmlFor="title">Title</Label>
        <Input required type="text" maxlength="2" ref={titleRef} name="title" id="title" mb={3} />
        <Label htmlFor="url">Website</Label>
        <Input required type="url" ref={webRef} name="url" id="url" mb={3} />
        <Label htmlFor="date">Date</Label>
        <DatePicker
        onChange={date => setStartDate(date)}
        value={startDate}
        />
        <Label htmlFor="type">Event Type</Label>
        <Select ref={typeRef} name="type" id="type" mb={3}>
          <option>Meetup</option>
          <option>Confrerence</option>
          <option>Webinar</option>
        </Select>
        <Button
        onClick={() => setModal(true)}
        >Submit</Button>
        {modal? <EventModal open={modal} onClose={()=> setModal(false)}/> : null}
        
      </Box>
    </Container>
  )
}