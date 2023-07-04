import axios from "axios";
import { options } from "../helpers/api";

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

  const URL = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
    params.offset
  }&${root && root + "&"}limit=48&${
    params.filter !== " " ? params.filter + "&" : ""
  }country=US&${params.sortBy !== " " ? params.sortBy + "&" : ""}currency=USD&${
    params.search !== " " ? params.search + "&" : ""
  }sizeSchema=US&lang=en-US`;

  try {
    const response = await axios.get(URL, options);
    const { data } = response;
    return data
  } catch (err) {
    console.error(err)
    return { data: { products: [] } };
  }
};
export default loaderSort;
