import { gql } from "@apollo/client";

export const PersonalData = gql`
  query Query {
    getUsers {
      id
      name
      email
    }
  }
`;
