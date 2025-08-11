import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser(); //new data uriparser object
  const extName = path.extname(file.originalname).toString();
  //stores extension of file and convert it into string
  return parser.format(extName, file.buffer);
  
}

export default getDataUri;
