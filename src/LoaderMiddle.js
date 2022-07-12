import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoaderMiddle() {
    return (
        <>
            <Spinner animation="grow" variant='primary' style={{ position:'fixed', top:'50%', left:'50%', width: "5rem", height: "5rem" }}/>;
        </>
    )
}
