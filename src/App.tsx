import "./App.css";

import DisplayCharacters from "./components/characters";

function App() {
  return (
    <>
      <main className="container flex flex-col mx-auto p-4">
        <DisplayCharacters />
      </main>
    </>
  );
}

export default App;
