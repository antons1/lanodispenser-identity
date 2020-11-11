import React from 'react';
import { config } from './config';

export function Error({ }) {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const [errorData, setErrorData] = React.useState({});

    React.useEffect(() => {
        if(!error) return;
        fetch(`//${config().host}/self-service/errors?error=${error}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setErrorData(res);
        })
    }, [])

    return (
        <div>
            <h2>An error occurred</h2>
            {errorData && <pre>{JSON.stringify(errorData, null, 2)}</pre>}
        </div>
    )
}