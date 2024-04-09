import { Wallet } from "@mercadopago/sdk-react";

export default function MercadoPago({ preferenceId }) {
  return (
    <Wallet
      initialization={{ preferenceId }}
      customization={{ texts: { valueProp: "smart_option" } }}
    />
  );
}
