import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoaderMiddle( {col }) {
    return (
        <div style={{ display:"flex", justifyContent:'center', alignItems:'center'}}>
            <Spinner animation="grow" variant={col} style={{ width: "5rem", height: "5rem" }}/>;
        </div>
    )
}
