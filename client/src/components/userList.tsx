import { useQuery, gql } from "@apollo/client";
import "./UserList.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="user-list">
      <h1 className="userTitle">Hoomans</h1>
      <ul>
        {data.getUsers.map((user: User) => (
          <li key={user.id} className="user-item">
            <div className="user-name">
              <strong>{user.name}</strong>
            </div>
            <div className="user-email">
              <span>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
