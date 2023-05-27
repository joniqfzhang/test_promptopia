'use client';
import { useEffect } from "react";

const Error = ({ error, reset }) => {
    useEffect(() => {
        //log the error to an error reporting service
        console.error(error);
    }, [error]);


    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}> Try again </button>
        </div>
    );
};

export default Error;