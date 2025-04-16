import React from "react";
import "./DescriptionForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
import { Form, TextArea, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const DescriptionForm = ({ handleCloseModal, description }) => {
  const username = useSelector(
    (state) => state.authReducer.auth.userInfo.username
  );
  const UPDATE_USER = queries.mutation_update_user;
  const GET_USER = queries.query_getUser;
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      handleCloseModal();
      toast.success("Descrición actualizada correctamente ");
    },
    onError: async (err) => {
      console.log(err);
      toast.error("Ocurrió un error al actualizar la descripción");
    },
  });

  const formik = useFormik({
    initialValues: {
      description: description || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(true),
    }),
    onSubmit: async (values) => {
      console.log(values);
      updateUser({
        variables: {
          input: {
            description: values.description,
          },
        },
        refetchQueries: [{ query: GET_USER, variables: { username } }],
      });
    },
  });

  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className={formik.errors.description && "error"}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default DescriptionForm;
