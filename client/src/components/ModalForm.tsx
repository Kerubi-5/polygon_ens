import { Input, Button, useUI } from "components";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, CONTRACT_ADDRESS } from "const";

const ModalForm = () => {
  const [domain, setDomain] = useState<string>();
  const [record, setRecord] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const { isOpen, toggleModal, modalData } = useUI();

  const updateDomain = async () => {
    if (!record || !domain) {
      return;
    }
    setLoading(true);
    console.log("Updating domain", domain, "with record", record);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        let tx = await contract.setRecord(domain, record);
        await tx.wait();
        console.log("Record set https://mumbai.polygonscan.com/tx/" + tx.hash);

        // fetchMints();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (modalData) {
      setDomain(modalData.name);
      setRecord(modalData.record);
    }
  }, [modalData]);

  return (
    <div
      className={`absolute inset-0 m-10 p-20 h-max rounded-xl bg-slate-900 ${
        !isOpen && "hidden"
      }`}
    >
      <span
        className="absolute top-3 right-5 text-zinc-50 cursor-pointer"
        onClick={() => toggleModal()}
      >
        close.
      </span>
      <div className="grid justify-center gap-5">
        <div>
          <span className="text-zinc-50">Your eth name</span>
          <Input
            label=".kk"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <div>
          <span className="text-zinc-50">Description of your eth name</span>
          <Input
            label=""
            value={record}
            onChange={(e) => setRecord(e.target.value)}
          />
        </div>
        <Button
          variant={loading ? "disabled" : "primary"}
          onClick={updateDomain}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ModalForm;
