import React from 'react'
import { Container, Flex, Button } from "theme-ui"

export default ()=>{

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