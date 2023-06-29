import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useTokenRefresh() {
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://ecommerce-users-api-production.up.railway.app/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken } = response.data;
        Cookies.set("accessToken", accessToken, { sameSite: "strict" });
      } catch (error) {
        console.error(error);
      }
    };

    refreshAccessToken();
  }, []);
}

export default useTokenRefresh;
