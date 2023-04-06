import { helpHttp } from "../helpers/helpHttp";
import { options } from "../helpers/api";

const loaderDetails = async ({ params }) => {
  const url = `https://asos2.p.rapidapi.com/products/v3/detail?id=${params.id}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
  const res = await helpHttp().get(url, options);
  if (!res)
    throw { status: res.status, statusText: res.statusText || "no encontrado" };
  return { res };
};
export default loaderDetails;
