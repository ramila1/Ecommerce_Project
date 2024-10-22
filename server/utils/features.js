import DataURIParser from 'datauri/parser.js';

import path from 'path';

export const getDataUri = (file)=>{
    const parser = new DataURIParser()
    const extName = path.extName(file.originalName).toString();
    return parser.format(extName,file.buffer);

};

