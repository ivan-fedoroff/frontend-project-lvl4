import Add from './AddChannel';
import Rename from './RenameChannel';
import Remove from './RemoveChannel';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
