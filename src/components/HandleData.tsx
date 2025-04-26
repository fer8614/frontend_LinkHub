import { UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <img src={data.image} alt="" />
      <div>
        
      </div>
    </div>
  );
}