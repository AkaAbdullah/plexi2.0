import { TailSpin } from "react-loader-spinner";
export const Spinner = () => {
  return (
    <TailSpin
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
