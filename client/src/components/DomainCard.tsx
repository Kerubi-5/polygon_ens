import { FC } from "react";

interface IDomainCard {
  domain: string;
  record: string;
  owner: string;
}
const DomainCard: FC<IDomainCard> = ({ domain, record, owner }) => {
  return <div>DOmain</div>;
};

export default DomainCard;
