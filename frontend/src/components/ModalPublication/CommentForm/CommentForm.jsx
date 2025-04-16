import React from "react";
import "./CommentForm.scss";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { MUTATION_ADD_COMMENT, GET_COMMENTS } from "../../../gql/comment";
const CommentForm = ({ idPublication }) => {
  // console.log(idPublication);
  const [addComment] = useMutation(MUTATION_ADD_COMMENT, {
    onCompleted: async (data) => {
      console.log(data);
    },
    onError: async (err) => {
      console.log("error", err);
    },
  });
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(true),
    }),
    onSubmit: async (value) => {
      console.log(value);
      addComment({
        variables: {
          input: {
            idPublication,
            comment: value.comment,
          },
        },
        refetchQueries: [{ query: GET_COMMENTS, variables: { idPublication } }],
      });
      formik.handleReset();
    },
  });
  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="añade un comentario ..."
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment}
      />

      <Button type="submit">Publicar</Button>
    </Form>
  );
};

export default CommentForm;
