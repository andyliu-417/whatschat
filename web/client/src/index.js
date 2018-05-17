import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
