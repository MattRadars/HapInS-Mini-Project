import { gql } from "@apollo/client";

export const PersonalData = gql`
  query Query {
    getData {
      name
      email
    }
  }
`;
