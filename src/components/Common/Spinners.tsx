import { CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  return (
    <div className="sweet-loading">
      <PropagateLoader
        color={"#000000"}
        loading={true}
        cssOverride={override}
        // size={25}
      />
    </div>
  );
}

export default App;
