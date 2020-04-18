// import React, { FunctionComponent, useState } from 'react';
import * as React from 'react';
import { FunctionComponent, useState } from 'react';

export interface AppProps {
    compiler: string;
    framework: string;
}

const getRounds = async () => {
    return {
        data: 'hello',
    };
};

export const App: FunctionComponent<AppProps> = () => {
    const [resp, setResp] = useState({});

    const callApi = async () => {
        const response = await getRounds();

        setResp(response);
    };

    return (
        <div>
            <div className='ui huge header'>Who's round?</div>
            <button onClick={callApi}>Get Rounds</button>
            <p>{resp ? resp.toString() : ''}</p>
        </div>
    );
};
