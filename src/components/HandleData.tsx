import { UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{data.handle}</p>
      {data.image && <img src={data.image} alt="image" className="mx-auto max-w-[250px]" />}
      <p className="text-lg text-center font-bold">{data.description}</p>
    </div>
  );
}