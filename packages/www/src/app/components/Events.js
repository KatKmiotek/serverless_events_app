import React, {useRef} from 'react'
import { Container, Flex, Label, Button, Input } from "theme-ui"

export default ()=>{
    const inputRef = useRef();

    return(
        <Container>
            <Button>Add Event</Button>
    
      <Flex sx={{ flexDirection: "column" }}>
        <ul>
            <li>Event 1</li>
            <li>Event 2</li>
        </ul>
      </Flex>
    </Container>
    )
}