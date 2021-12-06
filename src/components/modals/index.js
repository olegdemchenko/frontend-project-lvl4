import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = {
  adding: Add,
  rename: Rename,
  remove: Remove,
};

export default (type) => modals[type];
