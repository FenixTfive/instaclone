import React from "react";
import "./PasswordForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
import { toast } from "react-toastify";
const PasswordForm = ({ handleLogOut }) => {
  const UPDATE_USER = queries.mutation_update_user;

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: async (data) => {
      console.log("user infor updated: ", data);
      handleLogOut();
    },
    onError: async (error) => {
      console.log("user Info updated: ", error);
      toast.error("Error al actualizar la contraseña");
    },
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(true),
      newPassword: Yup.string().required(true),
      repeatNewPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("newPassword")], "las contraseñas no coinciden"),
    }),
    onSubmit: async (values) => {
      // console.log("submit");
      // console.log(values);
      updateUser({
        variables: {
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      });
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Contraseña actual"
        name="currentPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.currentPassword}
        error={formik.errors.currentPassword}
      />
      <Form.Input
        placeholder="Nueva contraseña"
        name="newPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword}
      />
      <Form.Input
        placeholder="Confirmar contraseña"
        name="repeatNewPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.repeatNewPassword}
        error={formik.errors.repeatNewPassword}
      />{" "}
      <Button type="submit" className="btn-submit">
        Actuallizar
      </Button>
    </Form>
  );
};

export default PasswordForm;
