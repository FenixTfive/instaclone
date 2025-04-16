import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import queries from "../../../gql/user";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginForm.scss";
import { useNavigate } from "react-router";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorLogin, setErrorLogin] = useState("");

  const MUTATION_SIGN_IN = queries.mutation_signIn;

  const [signIn] = useMutation(MUTATION_SIGN_IN, {
    onCompleted: async (data) => {
      setErrorLogin("");
      dispatch({
        type: "UPDATE_AUTH",
        payload: {
          token: data.signIn.token,
          userInfo: data.signIn.userInfo,
        },
      });
      navigate(`/${data.signIn.userInfo.username}`);
      // <Navigate to={`/${data.signIn.userInfo.username}`} />;
    },
    onError: async (error) => {
      // console.log(error);
      setErrorLogin(error.message.split('"')[1]);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (formValues) => {
      signIn({
        variables: {
          input: formValues,
        },
      });
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Entra para ver fotos y videos de tus amigos </h2>
      <Form.Input
        type="text"
        name="email"
        placeholder="correo electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" className="btn-submit">
        Iniciar Sesión
      </Button>
      {errorLogin && <p className="submit-error">{errorLogin}</p>}
    </Form>
  );
};
export default LoginForm;
