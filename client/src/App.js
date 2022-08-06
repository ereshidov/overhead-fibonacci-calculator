import { Fib, Home } from "./components";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={Fib} />
      <Route path="/otherPage" element={Home} />
    </Routes>
  );
}

export default App;
