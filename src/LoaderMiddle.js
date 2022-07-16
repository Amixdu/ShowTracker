import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoaderMiddle( {col }) {
    return (
        <>
            <Spinner animation="grow" variant={col} style={{ margin:'0', position:'absolute', top:'50%', left:'50%', msTransform:'translate(-50%, -50%)', width: "5rem", height: "5rem" }}/>;
        </>
    )
}
