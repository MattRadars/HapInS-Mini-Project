import { useQuery, gql } from "@apollo/client";

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

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.getUsers.map((user: User) => (
          <li key={user.id}>
            {user.name} : {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
