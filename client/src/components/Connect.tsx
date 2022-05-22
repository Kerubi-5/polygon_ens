import metamask from "../assets/MetaMask_Fox.png";
import Button from "./Button";

const Connect = () => {
  return (
    <div>
      <div className="max-h-[500px] max-w-[500px] mx-auto">
        <img className="object-cover" src={metamask} alt="MetaMask Fox Logo" />
      </div>
      <div className="flex justify-center">
        <Button>CONNECT NOW</Button>
      </div>
    </div>
  );
};

export default Connect;
