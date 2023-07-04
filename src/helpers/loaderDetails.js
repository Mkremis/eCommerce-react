import { options } from "../helpers/api";
import axios from "axios";

const loaderDetails = async ({ params }) => {
  try{
    const URL = `https://asos2.p.rapidapi.com/products/v3/detail?id=${params.id}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
    const response = await axios.get(URL, options);
    const {data} = response;
  return { data };
  }catch(err){
    console.error(`An error ocurred loading product details: ${err}`)
  }
  
};
export default loaderDetails;
