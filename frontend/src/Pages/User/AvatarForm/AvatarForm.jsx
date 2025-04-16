import React, { useCallback } from "react";
import { Button } from "semantic-ui-react";
import "./AvatarForm.scss";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
import { toast } from "react-toastify";
const AvatarForm = ({ handleCloseModal, username }) => {
  const UPDATE_AVATAR = queries.mutation_update_avatar;
  const GET_USER = queries.query_getUser;
  const DELETE_AVATAR = queries.mutation_delete_avatar;

  const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR, {
    onCompleted: async (data) => {
      // console.log(data);
      toast.success("Imagen de perfil actualizado correctamente");
      handleCloseModal();
    },
    onError: async (error) => {
      console.log(error);
      toast.error("Error al actualizar la imagen de perfil");
    },
    update(cache, { data: updateAvatar }) {
      // console.log(updateAvatar);
      //obtenemos el contenido de la cache hciendo un call al query
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username },
      });
      // console.log(getUser);
      //actuallizamos la cache con los nuevos datos
      cache.writeQuery({
        query: GET_USER,
        variables: { username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    onCompleted: async (data) => {
      // console.log(data);
      handleCloseModal();
      toast.success("Imagen de perfil eliminada correctamente");
    },
    onError: async (error) => {
      console.log(error);
      toast.error("Error al eliminar la imagen de perfil");
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    //something to do with files
    console.log(acceptedFiles[0]);
    updateAvatar({
      variables: { file: acceptedFiles[0] },
    });
  }, []);
  //-----------------------------------
  //(1)rootProps-> es una funcion que se pasa por spread {...getRootProps()} para abir el explorador de archivos o aceptar el drag de imagenes
  //(2)getInputProps debe ir en un input, y este, guarda la info o ruta del archivo ("actual como la ventana del expplorador")
  //(3)isDragActive se incluye solo si permitiremos la opcion de arrastrar la imagen --- consultar https://react-dropzone.js.org/
  const { getRootProps, getInputProps } = useDropzone({
    //someSettings
    accept: "image/jpeg,image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  //-----------------------------------------

  const handleDeleteAvatar = () => {
    deleteAvatar({
      refetchQueries: [
        {
          query: GET_USER,
          variables: {
            username,
          },
        },
      ],
    });
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Subir foto
      </Button>
      <Button onClick={handleDeleteAvatar}>Eliminar foto actual</Button>
      <Button onClick={handleCloseModal}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};
export default AvatarForm;
