import { ordersRequests } from "../api/clientRequests";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { MERCADOPAGO_KEY } from "../config";
import { useEffect, useState } from "react";
import MercadoPago from "./MercadoPago";

export default function MercadoPagoWrapper({ cart }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferenceId = async () => {
      try {
        setLoading(true);
        const response = await ordersRequests().createOrder(cart);
        if (response.data) {
          initMercadoPago(MERCADOPAGO_KEY, { locale: "en-US" });
          setPreferenceId(response.data.payData);
        } else {
          setPreferenceId(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length) {
      fetchPreferenceId();
    } else {
      setPreferenceId(null);
      setLoading(false);
    }
  }, [cart]);

  if (loading) {
    // Muestra un loader mientras se carga la información
    return <div style={{ marginTop: "3rem" }}>Cargando MercadoPago...</div>;
  }

  // Solo renderiza MercadoPago si preferenceId está presente
  return preferenceId ? <MercadoPago preferenceId={preferenceId} /> : null;
}
