import React, { useEffect } from "react";
import "./Comments.scss";
import { Image } from "semantic-ui-react";
import { GET_COMMENTS } from "../../../gql/comment";
import { useQuery } from "@apollo/client";
import { Link } from "react-router";
import ImageNotFound from "../../../assets/avatar.png";
const Comments = ({ idPublication }) => {
  // console.log(idPublication);
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_COMMENTS,
    {
      variables: {
        idPublication,
      },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return null;
  if (error) return console.log(error);
  console.log(data);

  return (
    <div className="comments">
      <h3>Comentarios</h3>
      {data.getComments.map((comment, index) => (
        <Link
          key={index}
          to={`/${comment.idUser.username}`}
          className="comment"
        >
          <Image src={comment.idUser.avatar || ImageNotFound} avatar></Image>
          <div>
            {" "}
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
