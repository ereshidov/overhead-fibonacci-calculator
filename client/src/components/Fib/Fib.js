import React from "react";
import axios from "axios";

export const Fib = () => {
  const [indexes, setIndexes] = React.useState([]);
  const [values, setValues] = React.useState();
  const [fibIndex, setFibIndex] = React.useState("");

  React.useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    };
    void fetchValues();
  }, []);

  React.useEffect(() => {
    const fetchIndexes = async () => {
      const seenIndexes = await axios.get("/api/values/all");
      setIndexes(seenIndexes.data);
    };
    void fetchIndexes;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/values", {
        index: fibIndex,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input type="number" value={fibIndex} onChange={setFibIndex} />

        <button type="submit">Submit</button>
      </form>
      <h3>Indicies i have seen:</h3>
      <div>{indexes.join(",")}</div>
      <h3>Values:</h3>
      <div>{values.join(",")}</div>
    </div>
  );
};
