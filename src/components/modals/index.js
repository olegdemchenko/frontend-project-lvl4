import Add from './Add.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  rename: Rename,
}

export default (type) => modals[type];