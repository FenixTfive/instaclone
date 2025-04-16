import React, { useState } from "react";
import "./PreviewPublication.scss";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../ModalPublication";
const PreviewPublication = ({ publication }) => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <div className="preview-publication" onClick={handleOpen}>
        <Image className="preview-publication__image" src={publication.file} />
      </div>
      <ModalPublication
        show={show}
        handleClose={handleClose}
        publication={publication}
      />
    </React.Fragment>
  );
};

export default PreviewPublication;
