import { useQuery } from "@apollo/client";
import { PersonalData } from "./shared/api/apollo-client/Graphql/testquery";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const { error, data } = useQuery(PersonalData);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h1>Name: {data.getdata.name}</h1>
          <h2>Age: {data.getdata.age}</h2>
        </div>
      )}
    </>
  );
}

export default App;
