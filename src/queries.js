import { gql } from '@apollo/client';

export const GET_BOARD = gql`
    query Board($id: String!) {
        getBoard(input: $id){
            name,
            id,
            tickets {
                id
                title
                description,
                status,
                assignee,
                estimate
            }
        }
    }`;

export const CREATE_TICKET = gql`
    mutation CreateTicket(
        $boardId: String!,
        $estimate: String,
        $title: String!,
        $description: String,
        $user: String!,
        $status: String!
    ) {
        createTicket(input: {
            title: $title,
            status: $status,
            description: $description,
            estimate: $estimate,
            boardId: $boardId,
            user: $user
        }){
            id,
            title,
            status,
            description,
            estimate,
            user
        }
    }`;

export const UPDATE_TICKET = gql`
    mutation UpdateTicket(
        $id: String!
        $boardId: String!,
        $estimate: String,
        $title: String!,
        $description: String,
        $user: String!,
        $status: String!
    ) {
        updateTicket(input: {
            id: $id
            title: $title,
            status: $status,
            description: $description,
            estimate: $estimate,
            boardId: $boardId,
            user: $user
        }){
            id,
            title,
            status,
            description,
            estimate,
            user
        }
    }`;
