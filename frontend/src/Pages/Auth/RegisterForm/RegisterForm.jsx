import React from "react";
//https://formik.org/docs/tutorial
import { useFormik } from "formik"; //para manejr toda la informacion de un formulario
//manejador de errores
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
import "./RegisterForm.scss";
import { Form, Button } from "semantic-ui-react";

const RegisterForm = ({ setShowLogin }) => {
  //pra la mutation
  const MUTATION_SIGN_UP = queries.mutation_signUp;
  const [signUp] = useMutation(MUTATION_SIGN_UP, {
    onCompleted: async (data) => {
      console.log(data);

      // console.log(data);
      toast.success("UsUario registrado correctamente ");
      formik.handleReset();
      setShowLogin(true);
    },
    onError: (error) => {
      toast.error("Error al registrar el usuario");
      console.log(error.message.split('"')[1]);
      toast.error(error.message.split('"')[1]);
    },
  });
  //end

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }, //es para uso de la libreria de yup para pvalidaciones
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/)
        .required(true),
      email: Yup.string().email().required(true),
      password: Yup.string().required(true),
      // .oneOf([Yup.ref("repeatpassword")]),
      confirmPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (formValues) => {
      console.log(formValues);

      let input = formValues;
      delete input.repeatPassword;
      signUp({
        variables: {
          input: input,
        },
      });
    },
  });

  return (
    <React.Fragment>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y Apellidos"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Form.Input
          type="text"
          placeholder="correo electronico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          type="password"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        <Button className="btn-submit" type="submit">
          Registrarse
        </Button>
      </Form>
    </React.Fragment>
  );
};
export default RegisterForm;
