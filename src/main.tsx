import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider, metamaskWallet,  coinbaseWallet,  trustWallet, } from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet(),
      trustWallet()]}
      clientId='a47ddf4076d86c373bd0e765a118d6fd'
      activeChain={activeChain}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
