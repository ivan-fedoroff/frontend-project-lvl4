import getModal from './getModal';

const renderModal = ({ modalInfo, hideModal, setItems }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
};

export default renderModal;