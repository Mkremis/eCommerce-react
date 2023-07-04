import Cookies from "js-cookie";
import client from "../api/axiosClient";

const useRefreshToken = () => {
    const refresh = async (setAuth, setCart, setLikes) => {
        const options = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
          const URL = `api/users/refresh`
          const refreshToken = Cookies.get("refreshToken");
          const response =  await client.post(URL,
           JSON.stringify({refreshToken}), options);
           Cookies.set('accessToken', response?.data?.accessToken)
           const userData = response?.data?.userData;
           let data = {};
           for (const key in userData) {
             if (key !== "user_cart") {
               let keys = key.split("_");
               let val = { [keys[1]]: userData[key] };
               data[keys[0]] = { ...data[keys[0]], ...val };
             }
           }
           const userCart = userData.user_cart;
           const userLikes = userData.user_likes;
           setAuth(data);
           setCart(userCart);
           setLikes(userLikes);
    }
    return refresh;
};

export default useRefreshToken;
