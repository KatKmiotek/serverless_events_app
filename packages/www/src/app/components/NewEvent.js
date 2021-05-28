import React, { useRef, useState } from 'react'
import { Button, Container, Flex, Input, Label } from 'theme-ui'

export default () => {
    const titleRef = useRef()
    const dateRef = useRef()
    const webRef = useRef()
    const [events, setEvents] = useState([])

    const eventsReducer = (state, action) => {
        switch (action.type) {
          case "addEvent":
            return [{ done: false, value: action.payload }];
        //   case "addToFav":
        //     const newState = [...state];
        //     newState[action.payload] = {
        //       done: !state[action.payload].done,
        //       value: state[action.payload].value,
        //     };
            // return newState;
        }
      };
    return (
        <Container>
            <Flex
                sx={{ flexDirection: "column" }}
                as="form"
                onSubmit={e => {
                    e.preventDefault()
                    let newEvent = {
                        title: titleRef.current.value,
                        date: dateRef.current.value,
                        url: webRef.current.value
                    }
                    setEvents([newEvent, ...events])
                    titleRef.current.value= "";
                    dateRef.current.value= "";
                    webRef.current.value= "";
                    console.log('new event', newEvent);
                    console.log('events: ', events);
                }}>
                <Label sx={{ marginLeft: 2 }}>
                    Event title
                <Input ref={titleRef} sx={{ marginLeft: 1 }} />
                </Label>
                <Label sx={{ marginLeft: 2 }}>
                    Event Date
                <Input ref={dateRef} sx={{ marginLeft: 1 }} />
                </Label>
                <Label sx={{ marginLeft: 2 }}>
                    Website
                <Input ref={webRef} sx={{ marginLeft: 1 }} />
                </Label>
                <Button sx={{ marginLeft: 1, alignSelf: "start" }}>Submit</Button>
            </Flex>
        </Container>
    )
}