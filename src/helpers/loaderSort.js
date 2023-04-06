import { helpHttp } from '../helpers/helpHttp';
import { options } from '../helpers/api';

const loaderSort = async ({ params }) => {
  const categories = {
    women: '27108',
    men: '27110',
    sneakers: '4209',
  };

  let root = params.root.includes('q=')
    ? params.root
    : params.root.includes('categoryId=')
    ? params.root
    : `categoryId=${categories[params.root]}`;

  const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
    params.offset
  }&${root}&limit=48&${params.filter || ''}country=US&${
    params.sortBy
  }&currency=USD&${params.search}&sizeSchema=US&lang=en-US`;
  const res = await helpHttp().get(url, options);
  if (!res)
    throw {
      status: res.status,
      statusText: res.statusText || 'no encontrado',
    };
  return { res };
};
export default loaderSort;
