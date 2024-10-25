import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, Center, Table } from "@chakra-ui/react";
import { ADD_USER } from "../shared/api/apollo-client/Graphql/mutations/userMutation";
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

  const handleUserSubmit = (newUser: { name: string; email: string }) => {
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

  if (loading) return <div className="loader">Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <Center bg="tomato" height="100vh">
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
                    <Button>Delete</Button>
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
