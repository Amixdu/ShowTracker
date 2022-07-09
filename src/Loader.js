import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

export default function Loader() {
  return (
    <>
    <Button variant="light" disabled className='mb-2'>
        <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            variant='primary'
        />
        Loading...
    </Button>
</>
  )
}
