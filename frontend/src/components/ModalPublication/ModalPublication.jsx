import React from "react";
import "./ModalPubication.scss";
import { Modal, Grid } from "semantic-ui-react";
import Actions from "./Actions";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const ModalPublication = ({ show, handleClose, publication }) => {
  return (
    <Modal open={show} onClose={handleClose} className="modal-publication">
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url("${publication.file}")` }}
        />
        <Grid.Column className="modal-publication__right" width={6}>
          <Comments idPublication={publication._id} />
          <Actions publication={publication} />
          <CommentForm idPublication={publication._id} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPublication;
