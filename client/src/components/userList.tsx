import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_USER } from "../shared/api/apollo-client/Graphql/mutations/userMutation";
import { GET_USERS } from "../shared/api/apollo-client/Graphql/queries/userQueries";
import { Box, Button } from "@chakra-ui/react";
import { Field } from "../pages/ui/field";
import "./Userlist.css";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
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
    <Box bgGradient="to-r" gradientFrom="black" gradientTo="blue.200">
      <div className="user-list">
        <h1 className="userTitle">Hoomans</h1>
        {/* Add User Form */}
        <form onSubmit={handleSubmit}>
          <Field alignItems="center" label="Name" color="black" required>
            <input
              type="text"
              placeholder=" Sam Benwick"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </Field>
          <Field alignItems="center" label="Email" color="black" required>
            <input
              type="email"
              placeholder="sample@gmail.com"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </Field>
          <Button marginTop="10px" marginBottom="20px" size="xs" type="submit">
            Add User
          </Button>
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
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default UserList;
