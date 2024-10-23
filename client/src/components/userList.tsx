import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_USER } from "../shared/api/apollo-client/Graphql/mutations/userMutation";
import { GET_USERS } from "../shared/api/apollo-client/Graphql/queries/userQueries";
import "./UserList.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  // const [deleteUser] = useMutation(DELETE_USER);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      variables: newUser,
      // update cache
      update: (cache, { data: { addUser } }) => {
        const { getUsers } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { getUsers: [...getUsers, addUser] },
        });
      },
    });
    setNewUser({ name: "", email: "" }); // Reset form
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="user-list">
      <h1 className="userTitle">Hoomans</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {data.getUsers.map((user: User) => (
          <li key={user.id} className="user-item">
            <div className="user-name">
              <strong>{user.name}</strong>
            </div>
            <div className="user-email">
              <span>{user.email}</span>
            </div>

            {/* <button onClick={() => handleDelete(user.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
