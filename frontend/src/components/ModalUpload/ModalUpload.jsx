import React, { useState, useCallback } from "react";
import "./ModalUpload.scss";
import { useDropzone } from "react-dropzone";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { MUTATION_PUBLISH } from "../../gql/publication";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalUpload = ({ show, handleClose }) => {
  const [fileUpload, setFileUpload] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [publish] = useMutation(MUTATION_PUBLISH, {
    onCompleted: async (data) => {
      // console.log(data);
      setIsLoading(false);
      onClose();
    },
    onError: async (error) => {
      setIsLoading(false);
      onClose();
      toast.warning("Ocurrió un error al publicar la imagen ");
    },
  });

  //obtiene la informacion del aerchivo a subir
  const onDrop = useCallback((acceptedfile) => {
    console.log(acceptedfile);
    const file = acceptedfile[0];
    setFileUpload({
      type: "image",
      file,
      urlPreview: URL.createObjectURL(file),
    });
  }, []);
  //especifica las caracteristicas del archivo a subir
  //ABRE EL VISUALIZADOR DE ARCHIVOS
  const { getRootProps, getInputProps } = useDropzone({
    acccept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop, //esto es igual al onDrop de arriba
  });

  const onClose = () => {
    handleClose();
    setFileUpload(null);
  };
  const onPublish = () => {
    setIsLoading(true);
    publish({
      variables: {
        file: fileUpload.file,
      },
    });
  };

  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <React.Fragment>
            {" "}
            <Icon name="cloud upload" />
            <p>Arrastra la foto que quieras publicar </p>
          </React.Fragment>
        )}

        <input {...getInputProps()} />
      </div>

      {/* la interrogacion sirve para comprobar si una propiedad existe */}
      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.urlPreview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}
      {isLoading === true && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload;
