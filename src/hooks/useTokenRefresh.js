import { useEffect } from "react";
import Cookies from "js-cookie";

function useTokenRefresh() {
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshToken = Cookies.get("accessToken");
        if (!refreshToken) {
          // Manejar el caso en que no haya token de actualización
          return;
        } 

        const response = await fetch(
          "https://ecommerce-users-api-production.up.railway.app/refresh-token",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.ok) {
          const { accessToken } = await response.json();

          Cookies.set("accessToken", accessToken, { sameSite: "strict" });
        } else {
          // Manejar la respuesta de error del servidor
        }
      } catch (error) {
        // Manejar el error de refresco del token
        console.error(error);
      }
    };

    refreshAccessToken();
  }, []);
}

export default useTokenRefresh;
