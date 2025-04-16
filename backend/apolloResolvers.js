import { globSync } from "glob"; // para englobar todos los files de un folder  " *.js ""
import _ from "lodash"; //manejador de arrays.. se puede usar .find .findIndex .concat etc
import path from "path";
import { pathToFileURL } from "url"; //para usar el import de los archivos .js
//(1)arreglo inicial
let mainResolverArray = [];
//(2) concatenao de los resolvers a un solo arreglo

const files = globSync("graphql/resolvers/*.js", { posix: true });

//la mejor manera de resolver imports dinamicos es con el pathToFileURL
const imports = await Promise.all(
  files.map(async (file) => {
    const normalizedPath = path.resolve(file);
    const fileURL = pathToFileURL(normalizedPath).href;
    const typeDefModule = await import(fileURL);
    return typeDefModule.default ?? typeDefModule; // asegúrate de que devuelva lo correcto
  })
);

const finalDefs = _.concat(mainResolverArray, ...imports);

export default finalDefs;
