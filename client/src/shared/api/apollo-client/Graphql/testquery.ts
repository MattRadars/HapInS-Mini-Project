import { gql } from "@apollo/client";

export const PersonalData = gql`
  query Query {
    getdata {
      name
      age
    }
  }
`;
