import React, { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { Field } from "../pages/ui/field";
import { Toaster, toaster } from "../pages/ui/toaster";
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
      <Toaster />
      <VStack margin="10px">
        <Field label="Name" required>
          <Input
            type="text"
            placeholder="John Doe"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </Field>
        <Field label="Email" required>
          <Input
            type="email"
            placeholder="doe@gmail.com"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </Field>
        <Button
          colorScheme="teal"
          type="submit"
          width="100%"
          onClick={() =>
            toaster.create({
              description: "User Added Successfully",
              type: "success",
            })
          }
        >
          Add User <RiArrowRightLine />
        </Button>
      </VStack>
    </form>
  );
}
