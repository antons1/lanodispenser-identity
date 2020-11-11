import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import { NewUser } from './NewUser';
import { Error } from './Error';
import { Login } from './Login';
import { Settings } from './Settings';
import { Recovery } from './Recovery';
import { Verify } from './Verify';
import { config } from './config';

export function App({ }) {
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        fetch(`//${config().host}/sessions/whoami`, { credentials: "include" })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res.identity) setUser(res.identity);
            else setUser({})
        })
        .catch((err) => console.log(err)); 
    }, [])
    return (
        <Router>
            <h1>Welcome to user setup{user.traits ? ` ${user.traits.email} (${user.id})` : ""}</h1>
            <nav>
                <ul>
                    <li><a href={`//${config().host}/self-service/registration/browser`}>Register</a></li>
                    <li><a href={`//${config().host}/self-service/login/browser`}>Login</a></li>
                    <li><a href={`//${config().host}/self-service/recovery/browser`}>Account Recovery</a></li>
                    <li><a href={`//${config().host}/self-service/settings/browser`}>Account Settings</a></li>
                    <li><a href={`//${config().host}/self-service/browser/flows/logout`}>Log out</a></li>
                </ul>
            </nav>
            <Switch>

                <Route path="/auth/registration">
                    <NewUser />
                </Route>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/verify">
                    <Verify />
                </Route>
                <Route path="/recovery">
                    <Recovery />
                </Route>
                <Route path="/error">
                    <Error />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
            </Switch>
        </Router>
    )
}