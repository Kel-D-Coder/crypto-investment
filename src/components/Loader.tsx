import { useState, CSSProperties } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export const Loader = () => {
  const [loading] = useState(true);
  const [color] = useState("#ffffff");

  return (

    <PuffLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
  