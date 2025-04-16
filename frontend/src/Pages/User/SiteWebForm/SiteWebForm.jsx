import React from "react";
import "./SiteWebForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import queries from "../../../gql/user";
const SiteWebForm = ({ handleCloseModal, siteWeb }) => {
  const GET_USER = queries.query_getUser;
  const UPDATE_USER = queries.mutation_update_user;
  const username = useSelector(
    (state) => state.authReducer.auth.userInfo.username
  );
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      handleCloseModal();
      toast.success("Sitio Web actualizado correctamente");
    },
    onError: async (err) => {
      console.log(err);
      toast.error("Ocurrió un error al actualizar el sitio web");
    },
  });

  const formik = useFormik({
    initialValues: {
      siteweb: siteWeb || "",
    },
    validationSchema: Yup.object({
      siteweb: Yup.string().required(true),
    }),
    onSubmit: async (values) => {
      updateUser({
        variables: {
          input: {
            siteWeb: values.siteweb,
          },
        },
        refetchQueries: [{ query: GET_USER, variables: { username } }],
      });
    },
  });

  return (
    <Form className="siteWeb-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="siteweb"
        value={formik.values.siteweb}
        onChange={formik.handleChange}
        error={formik.errors.siteweb}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default SiteWebForm;
