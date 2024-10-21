import { useQuery } from "@apollo/client";
import { PersonalData } from "./shared/api/apollo-client/Graphql/testQuery";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const { error, data } = useQuery(PersonalData);

  return (
    <>
      <div className="header">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="content">
        {error && <p className="error-message">Error: {error.message}</p>}
        {data && (
          <div>
            <h1 className="user-title">User:</h1>
            <h2 className="user-label">Name:</h2>
            <p className="user-value">{data.getData.name}</p>
            <h2 className="user-label">Email:</h2>
            <p className="user-value">{data.getData.email}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
