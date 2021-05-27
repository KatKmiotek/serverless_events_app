import React from 'react'
import { Button, Container, Flex, Heading } from 'theme-ui'

export default props => {
    return(
    <Container>
        <Flex sx={{ flexDirection: "column", padding: 3}}>
        <Heading as="h1">Get stuff done</Heading>
        <Button 
        sx={{marginTop: 2}}
        onClick={()=> {
            alert("clicked")
        }}
        >Log In</Button>
        </Flex>
    </Container>)
}