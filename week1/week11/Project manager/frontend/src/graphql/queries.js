import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation AddClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String
    $status: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      status
    }
  }
`;
