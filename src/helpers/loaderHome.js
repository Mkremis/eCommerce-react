import { helpHttp } from "../helpers/helpHttp";
import { options } from "../helpers/api";

export const loaderHome = async () => {
  const urlWM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16661&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
    urlM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16691&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`;

  let res = await Promise.all([
    helpHttp().get(urlWM, options),
    helpHttp().get(urlM, options)
  ]);
  if (!res)
    throw { status: res.status, statusText: res.statusText || "no encontrado" };
    let homeData;
  if (res) homeData = res.map((r) => r.products);
  return { homeData };
};
export default loaderHome;
