import React, { useState } from 'react';
import { Button, Flex, Message } from 'theme-ui'
import {Link} from 'gatsby'



export default ({events}) => {
    console.log('all events', events);
    const [sortedEvents, setSortedEvents] = useState([])
      const sorted = events.slice().sort(function(a, b) {
        let c = new Date(a.url);
        let d = new Date(b.url);
        return c-d;
    
    setSortedEvents(sorted)
    })
    console.log('sorted by date', sorted);
    return(
        <>
          <ul sx={{ listStyleType: "none" }}>
            {sorted.map((event) => (
              <Flex
                as="li"
                sx={{ flexDirection: "row" }}
                key={event.id}
              >
                <Message marginTop={4}>
                <span>{event.url}   </span>
                <span>{event.title}  </span>
                <span>({event.type})</span>
                <Button><Link to={event.date}>register</Link></Button>
                </Message>
              </Flex>
            )
            )}
          </ul>
        </>
    )
}