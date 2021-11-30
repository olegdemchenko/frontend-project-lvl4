import Add from './Add.jsx';

const modals = {
  adding: Add,
}

export default (type) => modals[type];