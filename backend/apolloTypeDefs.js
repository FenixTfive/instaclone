import { globSync } from "glob";
import _ from "lodash";
import path from "path";
import { pathToFileURL } from "url"; //para usar el import de los archivos .js

const typeDefinitions = `#graphql
  type Subscription {
    hi: String
  }
  type Query {
    hello: String
  }
  type Mutation {
    _empty: String
  }
`;

let mainDefArray = [typeDefinitions];

const files = globSync("graphql/typeDefs/*.js", { posix: true });

//la mejor manera de resolver imports dinamicos es con el pathToFileURL
const imports = await Promise.all(
  files.map(async (file) => {
    const normalizedPath = path.resolve(file);
    const fileURL = pathToFileURL(normalizedPath).href;
    const typeDefModule = await import(fileURL);
    return typeDefModule.default ?? typeDefModule; // asegúrate de que devuelva lo correcto
  })
);

const finalDefs = _.concat(mainDefArray, ...imports);

export default finalDefs;
