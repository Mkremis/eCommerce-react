import { productRequests } from "../api/clientRequests";

const loaderDetails = async ({ params }) => {
  try {
    return await productRequests().getProductDetail(params.id);
  } catch (err) {
    console.error(`An error ocurred loading product details: ${err}`);
  }
};
export default loaderDetails;
