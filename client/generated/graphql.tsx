import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
  logout: LoginResponse;
  resetPasswordEmail: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  createGroup: Scalars['Boolean'];
  joinGroup: Scalars['Boolean'];
  getGroupLink: Scalars['String'];
  addReview: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  password2: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  groupName: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  token: Scalars['String'];
};


export type MutationAddReviewArgs = {
  rating: Scalars['Float'];
  reviewText: Scalars['String'];
  imageUrl: Scalars['String'];
  contentName: Scalars['String'];
  contentId: Scalars['Float'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  malSearch: Array<SearchResponse>;
  getReviewsGroup: Array<ReviewResponse>;
  getReiewsUser: Array<ReviewResponse>;
};


export type QueryMalSearchArgs = {
  type: Scalars['String'];
  q: Scalars['String'];
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  contentId: Scalars['Float'];
  contentName: Scalars['String'];
  imageUrl: Scalars['String'];
  rating: Scalars['Float'];
  reviewText: Scalars['String'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  url: Scalars['String'];
  image_url: Scalars['String'];
  title: Scalars['String'];
};

export type AddReviewMutationVariables = Exact<{
  addReviewRating: Scalars['Float'];
  addReviewReviewText: Scalars['String'];
  addReviewImageUrl: Scalars['String'];
  addReviewContentName: Scalars['String'];
  addReviewContentId: Scalars['Float'];
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: boolean };

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = { __typename?: 'Query', bye: string };

export type CreateGroupMutationVariables = Exact<{
  GroupName: Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: boolean };

export type GetGroupLinkMutationVariables = Exact<{ [key: string]: never; }>;


export type GetGroupLinkMutation = { __typename?: 'Mutation', getGroupLink: string };

export type GetReviewsGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsGroupQuery = { __typename?: 'Query', getReviewsGroup: Array<{ __typename?: 'ReviewResponse', reviewText: string, contentId: number, contentName: string, imageUrl: string, rating: number }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type JoinGroupMutationVariables = Exact<{
  joinGroupToken: Scalars['String'];
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', joinGroup: boolean };

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LoginResponse', accessToken: string } };

export type MalSearchQueryVariables = Exact<{
  malSearchType: Scalars['String'];
  malSearchQ: Scalars['String'];
}>;


export type MalSearchQuery = { __typename?: 'Query', malSearch: Array<{ __typename?: 'SearchResponse', url: string, image_url: string, title: string }> };

export type RegisterMutationVariables = Exact<{
  registerName: Scalars['String'];
  registerPassword2: Scalars['String'];
  registerPassword: Scalars['String'];
  registerEmail: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string } };


export const AddReviewDocument = gql`
    mutation addReview($addReviewRating: Float!, $addReviewReviewText: String!, $addReviewImageUrl: String!, $addReviewContentName: String!, $addReviewContentId: Float!) {
  addReview(
    rating: $addReviewRating
    reviewText: $addReviewReviewText
    imageUrl: $addReviewImageUrl
    contentName: $addReviewContentName
    contentId: $addReviewContentId
  )
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      addReviewRating: // value for 'addReviewRating'
 *      addReviewReviewText: // value for 'addReviewReviewText'
 *      addReviewImageUrl: // value for 'addReviewImageUrl'
 *      addReviewContentName: // value for 'addReviewContentName'
 *      addReviewContentId: // value for 'addReviewContentId'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, options);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
export const ByeDocument = gql`
    query bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($GroupName: String!) {
  createGroup(groupName: $GroupName)
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      GroupName: // value for 'GroupName'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const GetGroupLinkDocument = gql`
    mutation getGroupLink {
  getGroupLink
}
    `;
export type GetGroupLinkMutationFn = Apollo.MutationFunction<GetGroupLinkMutation, GetGroupLinkMutationVariables>;

/**
 * __useGetGroupLinkMutation__
 *
 * To run a mutation, you first call `useGetGroupLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetGroupLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getGroupLinkMutation, { data, loading, error }] = useGetGroupLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupLinkMutation(baseOptions?: Apollo.MutationHookOptions<GetGroupLinkMutation, GetGroupLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetGroupLinkMutation, GetGroupLinkMutationVariables>(GetGroupLinkDocument, options);
      }
export type GetGroupLinkMutationHookResult = ReturnType<typeof useGetGroupLinkMutation>;
export type GetGroupLinkMutationResult = Apollo.MutationResult<GetGroupLinkMutation>;
export type GetGroupLinkMutationOptions = Apollo.BaseMutationOptions<GetGroupLinkMutation, GetGroupLinkMutationVariables>;
export const GetReviewsGroupDocument = gql`
    query getReviewsGroup {
  getReviewsGroup {
    reviewText
    contentId
    contentName
    imageUrl
    rating
  }
}
    `;

/**
 * __useGetReviewsGroupQuery__
 *
 * To run a query within a React component, call `useGetReviewsGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsGroupQuery, GetReviewsGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsGroupQuery, GetReviewsGroupQueryVariables>(GetReviewsGroupDocument, options);
      }
export function useGetReviewsGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsGroupQuery, GetReviewsGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsGroupQuery, GetReviewsGroupQueryVariables>(GetReviewsGroupDocument, options);
        }
export type GetReviewsGroupQueryHookResult = ReturnType<typeof useGetReviewsGroupQuery>;
export type GetReviewsGroupLazyQueryHookResult = ReturnType<typeof useGetReviewsGroupLazyQuery>;
export type GetReviewsGroupQueryResult = Apollo.QueryResult<GetReviewsGroupQuery, GetReviewsGroupQueryVariables>;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const JoinGroupDocument = gql`
    mutation JoinGroup($joinGroupToken: String!) {
  joinGroup(token: $joinGroupToken)
}
    `;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      joinGroupToken: // value for 'joinGroupToken'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
  login(password: $loginPassword, email: $loginEmail) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginPassword: // value for 'loginPassword'
 *      loginEmail: // value for 'loginEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    accessToken
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MalSearchDocument = gql`
    query malSearch($malSearchType: String!, $malSearchQ: String!) {
  malSearch(type: $malSearchType, q: $malSearchQ) {
    url
    image_url
    title
  }
}
    `;

/**
 * __useMalSearchQuery__
 *
 * To run a query within a React component, call `useMalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMalSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMalSearchQuery({
 *   variables: {
 *      malSearchType: // value for 'malSearchType'
 *      malSearchQ: // value for 'malSearchQ'
 *   },
 * });
 */
export function useMalSearchQuery(baseOptions: Apollo.QueryHookOptions<MalSearchQuery, MalSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MalSearchQuery, MalSearchQueryVariables>(MalSearchDocument, options);
      }
export function useMalSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MalSearchQuery, MalSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MalSearchQuery, MalSearchQueryVariables>(MalSearchDocument, options);
        }
export type MalSearchQueryHookResult = ReturnType<typeof useMalSearchQuery>;
export type MalSearchLazyQueryHookResult = ReturnType<typeof useMalSearchLazyQuery>;
export type MalSearchQueryResult = Apollo.QueryResult<MalSearchQuery, MalSearchQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerName: String!, $registerPassword2: String!, $registerPassword: String!, $registerEmail: String!) {
  register(
    name: $registerName
    password2: $registerPassword2
    password: $registerPassword
    email: $registerEmail
  ) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerName: // value for 'registerName'
 *      registerPassword2: // value for 'registerPassword2'
 *      registerPassword: // value for 'registerPassword'
 *      registerEmail: // value for 'registerEmail'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;