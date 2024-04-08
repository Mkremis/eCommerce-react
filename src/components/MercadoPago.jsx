import { ordersRequests } from "../api/clientRequests";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MP_KEY } from "../config";
import { useEffect, useState } from "react";

export default function MercadoPago({ cart }) {
  const [preferenceId, setPreferenceId] = useState(null);
  console.log(cart);
  useEffect(() => {
    const mercadopago = async () => {
      try {
        const response = await ordersRequests().createOrder(cart);
        if (response.data) {
          initMercadoPago(MP_KEY, { locale: "en-US" });
          setPreferenceId(response.data.payData);
        } else {
          setPreferenceId(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (cart.length) {
      mercadopago();
    } else {
      setPreferenceId(null);
    }
  }, [cart]);

  return (
    preferenceId && (
      <Wallet
        initialization={{ preferenceId }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    )
  );
}
