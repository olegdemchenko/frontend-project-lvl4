import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import '../assets/additionalStyles.css';
import ReactDOM from 'react-dom';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const vdom = await init();
  ReactDOM.render(vdom, document.querySelector('#chat'));
  return vdom;
};

app();

export default app;
