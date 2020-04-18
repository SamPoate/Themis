// import React, { FunctionComponent, useState } from 'react';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';

import { getRounds } from '../api/api';

export interface AppProps {
    compiler: string;
    framework: string;
}

export const App: FunctionComponent<AppProps> = () => {
    const [users, setUsers] = useState([]);

    const callApi = async () => {
        const response = await getRounds();

        setUsers(response.data.map((banana: { name: any }) => banana.name));
    };

    return (
        <div>
            <div className="ui huge header">Who's round?</div>
            <button onClick={callApi}>Get Rounds</button>
            {users.map(user => (
                <p key={user}>{user}</p>
            ))}
        </div>
    );
};
