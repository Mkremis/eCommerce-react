import { API_KEY } from "../config";

export const loaderHome = async () => {
  const urlWM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16661&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
    urlM = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=16691&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`;

  try {
    let response = await Promise.all([
      window.fetch(urlWM, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "asos2.p.rapidapi.com",
        },
      }),
      window.fetch(urlM, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "asos2.p.rapidapi.com",
        },
      }),
    ]);
    let data = await Promise.all(response.map(async (res) => await res.json()));
    let homeData = data ? data.map((d) => d.products) : [];
    return { homeData };
  } catch (error) {
    console.log(error);
  }
};
export default loaderHome;
