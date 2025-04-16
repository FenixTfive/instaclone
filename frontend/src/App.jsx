import React from "react";
//importacion del provider y client de apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//since version 18.0.1 we must import this like
//https://classic.yarnpkg.com/en/package/apollo-upload-client  -> see logs v18.0.1
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
///fin

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";

function App() {
  const auth = useSelector((state) => state.authReducer.auth);
  // console.log(auth);
  //CLIENT USING LINK CONECTION
  //NOTE: WHEN USING WS im gonna  need to split the link
  /*
  const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink,
);*/
  const httpLink = createUploadLink({
    uri: "http://localhost:3977/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    const token = auth.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <Navigation />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}

export default App;
