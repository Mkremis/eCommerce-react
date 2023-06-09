import { options } from "../helpers/api";
import { helpHttp } from "./helpHttp";

const loaderSort = async ({ params }) => {
  const categories = {
    women: "27108",
    men: "27110",
    sneakers: "4209",
  };

  let root =
    params.category === " "
      ? `categoryId=${categories[params.root]}`
      : `categoryId=${params.category}`;

  root = params.search === " " ? root : "";

  const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
    params.offset
  }&${root && root + "&"}limit=48&${
    params.filter !== " " ? params.filter + "&" : ""
  }country=US&${params.sortBy !== " " ? params.sortBy + "&" : ""}currency=USD&${
    params.search !== " " ? params.search + "&" : ""
  }sizeSchema=US&lang=en-US`;

  try {
    const res = await helpHttp().get(url, options);
    return { res };
  } catch (error) {
    console.log("Error fetching url:", url, "Error:", error);
    return { res: { products: [] } };
  }
};
export default loaderSort;
