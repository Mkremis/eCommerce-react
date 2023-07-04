import { options } from "../api/apiConfig"

export const loaderHome = async () => {
  const urlWM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16661&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
    urlM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16691&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`;
  options.method = "GET";
  let homeData = JSON.parse(sessionStorage.getItem("homeData"));
  if (!homeData) {
    try {
      let response = await Promise.all([
        window.fetch(urlWM, options),
        window.fetch(urlM, options),
      ]);
      let data = await Promise.all(
        response.map(async (res) => await res.json())
      );
      let homeData = data.map((d) => d.products);
      sessionStorage.setItem("homeData", JSON.stringify({ homeData }));
      return { homeData };
    } catch (error) {
      console.log(error);
    }
  } else {
    return homeData;
  }
};
export default loaderHome;
