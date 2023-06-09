import { helpHttp } from "../helpers/helpHttp";
import { options } from "../helpers/api";
import { ErrorResponse } from "@remix-run/router";

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

  root = params.search === " " ? root : "%20";
  options.method = "GET";
  const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
    params.offset
  }&${root}&limit=48&${params.filter !== " " ? params.filter : ""}country=US&${
    params.sortBy !== " " ? params.sortBy : ""
  }&currency=USD&${params.search}&sizeSchema=US&lang=en-US`;
  // https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=48&categoryId=27108&limit=48&country=US&sort=freshness&currency=USD& &sizeSchema=US&lang=en-US
  // https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=48&%20&limit=48&country=US&&currency=USD&q=lingerie&sizeSchema=US&lang=en-US
  try {
    const response = await fetch(url, options);
    const res = await response.json();
    console.log(url, root);
    return { res };
  } catch (error) {
    console.log(
      "Error fetching url:",
      url,
      "with root:",
      root,
      "Error:",
      error
    );
  }
};
export default loaderSort;
