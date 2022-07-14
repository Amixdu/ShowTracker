import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoaderMiddle( {col }) {
    return (
        <>
            <Spinner animation="grow" variant={col} style={{ position:'fixed', top:'50%', left:'50%', width: "5rem", height: "5rem" }}/>;
        </>
    )
}
