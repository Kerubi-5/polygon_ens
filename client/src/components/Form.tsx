import Button from "./Button";
import Input from "./Input";

const Form = () => {
  return (
    <div className="grid justify-center gap-5">
      <div>
        <span className="text-zinc-50">Your eth name</span>
        <Input label=".kk" />
      </div>
      <div>
        <span className="text-zinc-50">Description of your eth name</span>
        <Input label="" />
      </div>
      <Button>Submit</Button>
    </div>
  );
};

export default Form;
