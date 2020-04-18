import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { App } from './components/App';

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById('app')
);
