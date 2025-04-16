import React, { useState, useEffect } from "react";
import "./Search.scss";
import { Search as SearchUI } from "semantic-ui-react";
import queries from "../../../gql/user";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import SearchResults from "./SearchResults";
const Search = () => {
  const SEARCH = queries.query_search;

  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  const { loading, data } = useQuery(SEARCH, {
    variables: { search: search },
  });
  // console.log(data);

  const handleSearch = (e) => {
    // console.log(e.target.value);
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleSelectResult = () => {
    setSearch(null);
    setResults([]);
  };

  //en cada cambio de data en la query , actualizaremos el arreglo de resultdos
  useEffect(() => {
    //si "".search" en data existe
    if (size(data?.search) > 0) {
      //agregamos valor al state de results iterando data
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);
  // console.log(results);
  return (
    <SearchUI
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      onSearchChange={handleSearch}
      loading={loading}
      value={search || ""}
      results={results} //arreglo de resultados custome desde el suseEffect
      resultRenderer={(e) => <SearchResults data={e} />} //Componente que muestra los resultados con styles
      onResultSelect={handleSelectResult} //accion segun se seleccione un resultadoo
    />
  );
};

export default Search;
