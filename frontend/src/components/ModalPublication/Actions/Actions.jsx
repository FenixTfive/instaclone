import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./Actions.scss";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, DELETE_LIKE, IS_LIKE, COUNT_LIKES } from "../../../gql/like";
const Actions = ({ publication }) => {
  const [loadingAction, setLoadingAction] = useState(false);

  const { data, loading } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication._id,
    },
  });

  const { loading: loadingCount, data: dataCount } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: publication._id,
    },
  });

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: async (data) => {
      console.log(data);
      setLoadingAction(false);
    },
    onError: async (err) => {
      console.log(err);
    },
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted: async (data) => {
      console.log(data);
      setLoadingAction(false);
    },
    onError: async (err) => {
      console.log(err);
    },
  });

  const onAddLike = () => {
    setLoadingAction(true);
    addLike({
      variables: {
        idPublication: publication._id,
      },
      refetchQueries: [
        { query: IS_LIKE, variables: { idPublication: publication._id } },
        { query: COUNT_LIKES, variables: { idPublication: publication._id } },
      ],
    });
  };

  const onDeleteLike = () => {
    setLoadingAction(true);
    deleteLike({
      variables: {
        idPublication: publication._id,
      },
      refetchQueries: [
        { query: IS_LIKE, variables: { idPublication: publication._id } },
        { query: COUNT_LIKES, variables: { idPublication: publication._id } },
      ],
    });
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLike) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (loading || loadingCount) return null;

  const { isLike } = data;
  const { countLikes } = dataCount;
  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {countLikes} {countLikes === 1 ? "Like" : "Likes"}
    </div>
  );
};

export default Actions;
