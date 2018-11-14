import {isRequired} from "./argIsRequired";
import 'whatwg-fetch';

export const deleteRows = function (url, sheetName, {searchObj, limit}) {
  isRequired([sheetName, "string"], [searchObj, "object"]);

  limit = !isNaN(limit) && limit ? limit : undefined; // validate limit
  url += `${sheetName}/delete`;

  // data to post
  const data = {
    'condition': searchObj,
    'limit': limit
  };
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return new Promise((resolve, reject) => {
    fetch(url, options).then((apiResponse) => {
      resolve(parseObjectResponse(apiResponse));
    }).catch((err) => {
      reject(err);
    });
  });
};