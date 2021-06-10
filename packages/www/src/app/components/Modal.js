import React from 'react'
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from '@mattjennings/react-modal'
import { Text, Button } from 'theme-ui'

function EventModal(props) {
  return (
    <Modal {...props}
    sx={{
      backgroundColor: 'background',
      border: '1px solid',
      borderRadius: '5px',
      borderColor: 'white',
      boxShadow: '-1px 2px 33px 2px black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '100vh',
      minHeight: '16rem',
      minWidth: '16rem',
      maxWidth: '64rem',
      position: 'absolute',
      top: ['25%', '25%', '10%'],
      zIndex: 'modal',
    }}
    >
      {({ onClose }) => (
        <>
          <ModalTitle>
            <Text
              sx={{
                fontSize: 2,
                fontWeight: 'medium',
              }}
            >
              New event has been added!
            </Text>
          </ModalTitle>
          <ModalContent>
            <Text>Thank you!</Text>
          </ModalContent>
          <ModalFooter>
            <Button variant="pill" onClick={onClose} sx={{
              my: 20
          }}>OK</Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  )
}

export default EventModal;