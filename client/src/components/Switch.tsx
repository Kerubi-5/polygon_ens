import { isRpcError } from "types";
import { useUI } from "components";

const Switch = () => {
  const { network } = useUI();

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        if (isRpcError(error) && error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };
  return (
    <button
      className="fixed flex flex-col bottom-5 right-5 bg-gradient-to-r from-purple-800 to-purple-500 p-5 rounded-lg cursor-pointer hover:from-purple-500 hover:to-purple-300"
      onClick={switchNetwork}
    >
      <span className="font-bold text-purple-50">Switch to Polygon</span>
      <small className="text-xs text-purple-200">Current: {network}</small>
    </button>
  );
};

export default Switch;
