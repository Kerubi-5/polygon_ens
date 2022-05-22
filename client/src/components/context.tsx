import { MetaMaskInpageProvider } from "@metamask/providers";
import { createContext, FC, useContext, useState } from "react";

// context props
interface IApiProvider {
  ethereum?: MetaMaskInpageProvider;
  children: React.ReactNode;
}

interface IContext {
  wallet: string;
  connectAccount: () => void;
}

const initialContext: IContext = {
  wallet: "",
  connectAccount: () => {},
};

const ApiContext = createContext<IContext>({
  ...initialContext,
});

export const ApiProvider: FC<IApiProvider> = ({ children, ethereum }) => {
  const [wallet, setWallet] = useState("");
  const connectAccount = async () => {
    try {
      if (!ethereum) {
        throw new Error("Ethereum not found");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && Array.isArray(accounts)) {
        if (accounts.length !== 0) {
          const account = accounts[0];
          setWallet(account);
        }
      }
    } catch (_e: any) {
      const msg = _e.message ?? "Something went wrong";
      alert(msg);
    }
  };

  const value = {
    wallet,
    connectAccount,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useUI = () => {
  return useContext(ApiContext);
};
