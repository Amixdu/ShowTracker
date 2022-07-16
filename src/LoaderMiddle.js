import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoaderMiddle( {col }) {
    return (
        <>
            <Spinner animation="grow" variant={col} style={{ position:'absolute', top: "0", left: "0", bottom:"0", right:"0", margin:'auto' }}/>;
        </>
    )
}
