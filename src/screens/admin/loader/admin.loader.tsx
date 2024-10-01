import { BiLoaderAlt } from "react-icons/bi";

export const AdminLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col text-2xl">
      <BiLoaderAlt className="animate-spin" />
      <h1 className="select-none">Chargment</h1>
    </div>
  );
};
