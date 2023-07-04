import axios from "axios";
import Cookies from "js-cookie";

const useRefreshToken = () => {
    const refresh = async (setAuth, setCart, setLikes) => {
        const options = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
          const refreshToken = Cookies.get("refreshToken");
          const response =  await axios.post('https://mkremis-super-waffle-gvgwrqvrwwp397j7-3500.preview.app.github.dev/refresh',
           JSON.stringify({refreshToken}), options);
           console.log(response.data)
           Cookies.set('accessToken', response?.data?.accessToken)
           Cookies.set('refreshToken', response?.data?.refreshToken)
           const userData = response?.data?.userData?.user;
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
