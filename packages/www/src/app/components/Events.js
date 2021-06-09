import React from 'react'
import { Button, Container, Flex, Message, Spinner } from 'theme-ui'
import { gql, useQuery } from '@apollo/client'
import {Link} from 'gatsby'

export default () => {
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
  const { loading, error, data } = useQuery(GET_EVENTS);

  return (
    <Container>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <Spinner/> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data.events.map((event) => (
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
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  )
}
