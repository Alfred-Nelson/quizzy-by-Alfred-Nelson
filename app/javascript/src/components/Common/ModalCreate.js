import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";

const ModalCreate = ({
  showModal,
  setShowModal,
  header,
  footer,
  body,
  size,
}) => {
  return (
    <div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={size}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className="space-x-2">{footer}</Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreate;
