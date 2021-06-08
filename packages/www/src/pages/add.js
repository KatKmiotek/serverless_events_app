import React, { useRef, useState } from 'react'
import { Button, Container, Flex, Input, Label, Box, Select, Checkbox, Radio, Slider, Textarea } from 'theme-ui'
import { gql, useMutation, useQuery } from '@apollo/client'
import DatePicker from "react-date-picker";
import Dashboard from '../app/components/Dashboard'

export default () => {
  const titleRef = useRef()
  const webRef = useRef()
  const typeRef = useRef()

  const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $date: Date!, $url: String!, $type: String!) {
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

  return (
    <Container>
      <Dashboard />
      {/* <Dashboard/>
      <Flex
        sx={{ flexDirection: "column" }}
        as="form"
        onSubmit={async e => {
          e.preventDefault()
          await addEvent({
            variables: {
              title: titleRef.current.value,
              date: startDate,
              url: webRef.current.value
            }
          })
          titleRef.current.value = "";
          await setStartDate(new Date());
          webRef.current.value = "";
          await refetch()

        }}>
        <Label sx={{ marginLeft: 2 }}>
          Event title
                <Input ref={titleRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Label sx={{ marginLeft: 2 }}>
          Event Date
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Label>
        <Label sx={{ marginLeft: 2, marginTop: 20 }}>
          Website
                <Input ref={webRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1, alignSelf: "start" }}>Submit</Button>
      </Flex> */}
      <Box as="form" onSubmit={async e => {
          e.preventDefault()
          await addEvent({
            variables: {
              title: titleRef.current.value,
              date: startDate,
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
        <Input ref={titleRef} name="title" id="title" mb={3} />
        <Label htmlFor="url">Website</Label>
        <Input ref={webRef} name="url" id="url" mb={3} />
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
        <Button>Submit</Button>
      </Box>
    </Container>
  )
}