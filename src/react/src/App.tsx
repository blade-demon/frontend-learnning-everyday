import Themes from "./components/themes";
import "./App.css";

function createArrayPair<T, K>(val: T, val2: K): [T, K] {
  return [val, val2];
}

function App() {
  return (
    <>
      <Themes />
    </>
  );
}

export default App;
