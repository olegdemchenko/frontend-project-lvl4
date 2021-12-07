import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import initApp from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const chat = document.querySelector('#chat');
if (!chat) {
  document.body.classList.add('h-100', 'bg-light');
  const firstContainer = document.createElement('div');
  firstContainer.classList.add('h-100');
  document.body.append(firstContainer);
  const newChat = document.createElement('div');
  newChat.setAttribute('id', 'chat');
  newChat.classList.add('h-100');
  firstContainer.append(newChat);
  const chatContainer = document.createElement('div');
  chatContainer.setAttribute('id', 'chat-container');
  chatContainer.classList.add('d-flex', 'flex-column', 'h-100');
  newChat.append(chatContainer);
}

initApp();

export default initApp;
