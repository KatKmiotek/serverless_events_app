// import React, { useEffect, useRef, useState } from 'react'
// import { Button, Container, Flex, Input, Label } from 'theme-ui'
// import { gql, useMutation, useQuery } from '@apollo/client'

// export default () => {
//   const titleRef = useRef()
//   const dateRef = useRef()
//   const webRef = useRef()

//   const ADD_EVENT = gql`
//   mutation AddEvent($title: String!, $date: String!, $url: String!) {
//     addEvent(title: $title, date: $date, url: $url) {
//       id
//       title
//       date
//       url
//     }
//   }
// `;

//   const DELETE_EVENT = gql`
//   mutation deleteEvent($id: ID!) {
//     deleteEvent(id: $id) 
//   }
// `;

//   const GET_EVENTS = gql`
//   query events {
//     events {
//       id
//       title
//       date
//       url
//     }
//   }
// `;
//   const [addEvent] = useMutation(ADD_EVENT);
//   const [deleteEvent] = useMutation(DELETE_EVENT);
//   const { refetch } = useQuery(GET_EVENTS);
//   return (
//     <Container>
//       <Flex
//         sx={{ flexDirection: "column" }}
//         as="form"
//         onSubmit={async e => {
//           e.preventDefault()
//           await addEvent({
//             variables: {
//               title: titleRef.current.value,
//               date: dateRef.current.value,
//               url: webRef.current.value
//             }
//           })
//           titleRef.current.value = "";
//           dateRef.current.value = "";
//           webRef.current.value = "";
//           await refetch()

//         }}>
//         <Label sx={{ marginLeft: 2 }}>
//           Event title
//                 <Input ref={titleRef} sx={{ marginLeft: 1 }} />
//         </Label>
//         <Label sx={{ marginLeft: 2 }}>
//           Event Date
//                 <Input ref={dateRef} sx={{ marginLeft: 1 }} />
//         </Label>
//         <Label sx={{ marginLeft: 2 }}>
//           Website
//                 <Input ref={webRef} sx={{ marginLeft: 1 }} />
//         </Label>
//         <Button sx={{ marginLeft: 1, alignSelf: "start" }}>Submit</Button>
//       </Flex>
//     </Container>
//   )
// }