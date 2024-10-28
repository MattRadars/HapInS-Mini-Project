import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;

export const AddUserDocument = gql`
  mutation AddUser($users: [User_insert_input!]!) {
    insert_User(objects: $users) {
      returning {
        id
        name
        email
      }
    }
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  Types.AddUserMutation,
  Types.AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      users: // value for 'users'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddUserMutation,
    Types.AddUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddUserMutation,
    Types.AddUserMutationVariables
  >(AddUserDocument, options);
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult =
  Apollo.MutationResult<Types.AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  Types.AddUserMutation,
  Types.AddUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: User_bool_exp!) {
    delete_User(where: $id) {
      affected_rows
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  Types.DeleteUserMutation,
  Types.DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteUserMutation,
    Types.DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteUserMutation,
    Types.DeleteUserMutationVariables
  >(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<Types.DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteUserMutation,
  Types.DeleteUserMutationVariables
>;
export const GetUsersDocument = gql`
  query GetUsers {
    User {
      id
      name
      email
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetUsersQuery,
    Types.GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUsersQuery, Types.GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUsersQuery,
    Types.GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUsersQuery, Types.GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        Types.GetUsersQuery,
        Types.GetUsersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    Types.GetUsersQuery,
    Types.GetUsersQueryVariables
  >(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  Types.GetUsersQuery,
  Types.GetUsersQueryVariables
>;
