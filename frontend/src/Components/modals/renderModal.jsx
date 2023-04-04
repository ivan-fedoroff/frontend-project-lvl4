import getModal from './getModal';

const renderModal = (props) => {
  const { modalInfo, hideModal, setCurChannelId } = props;
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return (
    <Component
      id={modalInfo.item}
      onHide={hideModal}
      setItem={setCurChannelId}
    />
  );
};

export default renderModal;
