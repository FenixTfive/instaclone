import React from "react";
import { Modal } from "semantic-ui-react";
import "./Modal.scss";
const ModalBasic = ({ show, handleCloseModal, title, children }) => {
  return (
    <Modal
      size="mini"
      open={show}
      onClose={handleCloseModal}
      className="modal-basic"
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
};
export default ModalBasic;
