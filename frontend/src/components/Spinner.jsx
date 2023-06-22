import { TailSpin } from "react-loader-spinner";
export const Spinner = ({ styles }) => {
  return (
    <TailSpin
      height={styles.height}
      width={styles.width}
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
