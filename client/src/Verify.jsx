import React from 'react';
import { config } from './config';

export function Verify({ }) {
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
        fetch(`//${config().host}/self-service/verification/flows?id=${flow}`, {redirect: "manual", credentials: "include"})
        .then((res) => res.json())
        .then((res) => {
            setLoading(false);
            console.log(res);
            setCtx(res.methods.password.config);
        }).catch((err) => {
            setError(err)
            console.log(err);
        });
    }, []);

    return (
        <div>
            <h2>Verify user account</h2>
            <form action={ctx.action} method="POST">
                {ctx.fields && <input type="hidden" name={ctx.fields.find((f) => f.name === "csrf_token").name} value={ctx.fields.find((f) => f.name === "csrf_token").value} />}
                <label>
                    Brukernavn (e-post):<br />
                    <input type="email" name="identifier" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                </label>
                <label>
                    Passord:<br />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                </label>
                <input type="submit" value="Logg inn" disabled={!ctx.fields || loading} />
            </form>
        </div>
    )
}