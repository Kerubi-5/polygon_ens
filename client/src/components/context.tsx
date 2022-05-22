import { createContext, FC, useContext, useEffect, useState } from "react";

// context props
interface IApiProvider {
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

const ApiContext = createContext<Partial<IContext>>({
  ...initialContext,
});

export const ApiProvider: FC<IApiProvider> = ({ children }) => {
  const [wallet, setWallet] = useState<string>();

  const connectAccount = async () => {
    try {
      const { ethereum } = window;

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
      } else {
        throw new Error("Accounts not found");
      }
    } catch (_e: any) {
      const msg = _e.message ?? "Something went wrong";
      alert(msg);
    }
  };

  useEffect(() => {
    connectAccount();
  }, []);

  const value = {
    wallet,
    connectAccount,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useUI = () => {
  return useContext(ApiContext);
};
