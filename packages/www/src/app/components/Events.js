import React, { useEffect, useState } from 'react'
import { Container, Flex, Spinner } from 'theme-ui'
import { gql, useQuery } from '@apollo/client'
import {Link} from 'gatsby'
import List from './List'

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
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);
  // refetch();
  return (
    <Container>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <Spinner/> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <List events={data.events}/>
        )}
      </Flex>
    </Container>
  )
}
