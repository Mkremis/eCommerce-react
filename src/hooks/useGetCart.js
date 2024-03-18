import { cartRequests } from "../api/clientRequests";

export async function useGetCart(user, setCart) {
  try {
    const result = user && (await cartRequests().getUserCart());
    setCart(result.data);
  } catch (error) {
    console.error(
      "Error getting the user cart form the server:",
      error.message
    );
  }
}
