import { useState, useEffect } from 'react';
import { options } from '../helpers/api';
import { helpHttp } from '../helpers/helpHttp';

export const useCategories = (root) => {
  const [response, setResponse] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    helpHttp()
      .get(
        'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US',
        options
      )
      .then((res) => setResponse(res));
  }, []);

  useEffect(() => {
    let dataPath;
    if (response && !response.err) {
      dataPath = {
        men: {
          url: response.navigation[0].children[4].children[3].children[1]
            .children,
        },
        women: {
          url: response.navigation[1].children[4].children[3].children[1]
            .children,
        },
      };
      dataPath[root] ? setCategories(dataPath[root].url) : setCategories(null);
    }
  }, [root]);

  return categories;
};
