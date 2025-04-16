import React from "react";
import "./EmailForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
const EmailForm = ({ handleCloseModal, currentEmail }) => {
  const UPDATE_USER = queries.mutation_update_user;
  const GET_USER = queries.query_getUser;

  const username = useSelector(
    (state) => state.authReducer.auth.userInfo.username
  );
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      handleCloseModal();
      toast.success("Email modificado correctamente");
    },
    onError: async (err) => {
      toast.error("Ocurri+o un error al modificar el email");
      console.log(err);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(true),
    }),
    onSubmit: async (values) => {
      console.log(values);
      updateUser({
        variables: {
          input: {
            email: values.email,
          },
        },
        refetchQueries: [{ query: GET_USER, variables: { username } }],
      });
    },
  });
  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="email"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default EmailForm;
