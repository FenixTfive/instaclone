import React from "react";
import "./SearchResults.scss";
import { Link } from "react-router";
import ImgNotFound from "../../../../assets/avatar.png";
import { Image } from "semantic-ui-react";
const SearchResults = ({ data }) => {
  //   console.log(data);
  return (
    <Link className="search-results" to={`/${data.username}`}>
      <Image src={data.avatar || ImgNotFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
};

export default SearchResults;
