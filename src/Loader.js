import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

export default function Loader( { backgCol, spinnerCol } ) {
  return (
    <>
    <Button variant={backgCol} disabled className='mb-2'>
        <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            variant={spinnerCol}
        />
        Loading...
    </Button>
</>
  )
}
