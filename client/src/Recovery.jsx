import React from 'react';
import { config } from './config';

export function Recovery({ }) {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [ctx, setCtx] = React.useState({});
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        setError(null);
        if(!flow) return;
        fetch(`//${config().host}/self-service/recovery/flows?id=${flow}`, {redirect: "manual", credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            setLoading(false);
            console.log(res);
            setCtx(res.methods.link.config);
            if(res.methods.link.config.fields.find((f) => f.name === "identifier").value) setUsername(res.methods.link.config.fields.find((f) => f.name === "identifier").value);
        }).catch((err) => {
            setError(err)
            console.log(err);
        });
    }, []);

    return (
        <div>
            <h2>Account recovery</h2>
            <form action={ctx.action} method="POST">
                {ctx.fields && <input type="hidden" name={ctx.fields.find((f) => f.name === "csrf_token").name} value={ctx.fields.find((f) => f.name === "csrf_token").value} />}
                <label>
                    E-postadresse:<br />
                    <input type="email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                </label>
                <input type="submit" value="Logg inn" disabled={!ctx.fields || loading} />
            </form>
        </div>
    )
}