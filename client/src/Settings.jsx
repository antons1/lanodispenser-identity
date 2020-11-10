import React from 'react';

export function Settings({ }) {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [PwdCtx, setPwdCtx] = React.useState({});
    const [PrfCtx, setPrfCtx] = React.useState({});
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        setError(null);
        if (!flow) return;
        fetch(`//local.lanodispenser.no:4433/self-service/settings/flows?id=${flow}`, { redirect: "manual", credentials: "include" })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                console.log(res);
                setPwdCtx(res.methods.password.config);
                setPrfCtx(res.methods.profile.config);
                if (res.methods.profile.config.fields.find((f) => f.name === "traits.email").value) setUsername(res.methods.profile.config.fields.find((f) => f.name === "traits.email").value);
            }).catch((err) => {
                setError(err)
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>User settings</h2>
            <form action={PrfCtx.action} method="POST">
                <h3>Oppdater brukernavn</h3>
                {PrfCtx.fields && <input type="hidden" name={PrfCtx.fields.find((f) => f.name === "csrf_token").name} value={PrfCtx.fields.find((f) => f.name === "csrf_token").value} />}
                <label>
                    Brukernavn (e-post):<br />
                    <input type="email" name="traits.email" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                </label>
                <input type="submit" value="Endre brukernavn" disabled={!PrfCtx.fields || loading} />
            </form>
            <form action={PwdCtx.action} methdo="POST">
                <h3>Oppdater passord</h3>
                <label>
                    Passord:<br />
                    {PwdCtx.fields && <input type="hidden" name={PwdCtx.fields.find((f) => f.name === "csrf_token").name} value={PwdCtx.fields.find((f) => f.name === "csrf_token").value} />}
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                </label>
                <input type="submit" value="Endre passord" disabled={!PwdCtx.fields || loading} />
            </form>
        </div>
    )
}