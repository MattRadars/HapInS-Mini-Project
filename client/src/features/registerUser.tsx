import React, { useState } from "react";
import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { Field } from "../pages/ui/field";

interface RegisterUserProps {
  onSubmit: (user: { name: string; email: string }) => void;
}

export default function RegisterUser({ onSubmit }: RegisterUserProps) {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newUser);
    setNewUser({ name: "", email: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex alignItems="flex-end" gap={4} padding="10px">
        <VStack align="stretch" flex={1}>
          <Field label="Name" color="orange" required>
            <Input
              type="text"
              placeholder="John Doe"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </Field>
        </VStack>
        <VStack align="stretch" flex={1}>
          <Field label="Email" color="orange" required>
            <Input
              type="email"
              placeholder="doe@gmail.com"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </Field>
        </VStack>
        <Button colorScheme="teal" type="submit">
          Add User <RiArrowRightLine />
        </Button>
      </Flex>
    </form>
  );
}
