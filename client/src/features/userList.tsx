import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, Center, Table } from "@chakra-ui/react";
import { Toaster, toaster } from "../pages/ui/toaster";
import {
  ADD_USER,
  DELETE_USER,
} from "../shared/api/apollo-client/Graphql/mutations/userMutation";
import { GET_USERS } from "../shared/api/apollo-client/Graphql/queries/userQueries";
import Title from "./title";
import RegisterUser from "./registerUser";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleUserSubmit = (newUser: { name: string; email: string }) => {
    // Add User
    addUser({
      variables: newUser,
      update: (cache, { data: { addUser } }) => {
        const { getUsers } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { getUsers: [...getUsers, addUser] },
        });
      },
    });
  };

  // Delete User
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser({
        variables: { id },
        update: (cache, { data }) => {
          if (data && data.deleteUser) {
            const existingUsers = cache.readQuery<{ getUsers: User[] }>({
              query: GET_USERS,
            });
            if (existingUsers) {
              const newUsers = existingUsers.getUsers.filter(
                (user) => user.id !== id
              );
              cache.writeQuery({
                query: GET_USERS,
                data: { getUsers: newUsers },
              });
            }
          }
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <Center bg="tomato" height="100vh">
      <Toaster />
      <Box bg="white" rounded="md">
        <Title />
        <RegisterUser onSubmit={handleUserSubmit} />
        <Table.ScrollArea borderWidth="1px" rounded="md" height="320px">
          <Table.Root stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.getUsers.map((user: User) => (
                <Table.Row key={user.id} color="black">
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        handleDeleteUser(user.id);
                        toaster.create({
                          description: "User Deleted Successfully",
                          type: "success",
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Center>
  );
};

export default UserList;
