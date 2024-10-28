import { Box, Button, Center, Table } from "@chakra-ui/react";
import { Toaster, toaster } from "../pages/ui/toaster";
import Title from "./title";
import RegisterUser from "./registerUser";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../shared/api/apollo-client/generated/hooks";

const UserList = () => {
  const { loading, error, data } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleUserSubmit = (newUser: { name: string; email: string }) => {
    // Add User
    addUser({
      variables: { users: newUser },
      refetchQueries: ["GetUsers"],
    });
  };

  // Delete User
  const handleDeleteUser = async (id: number) => {
    await deleteUser({
      variables: { id: { id: { _eq: id } } },
      refetchQueries: ["GetUsers"],
    });
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    console.log(data);
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
              {data?.User.map((user) => (
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
