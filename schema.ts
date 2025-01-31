export const schema =`#graphql   
    type Restaurant{
        id: ID!
        name: String!
        address: String!
        phone: String!
        temperature: String!
        time: String!
    }
    type Query{
        getRestaurant (id: ID!): Restaurant
        getRestaurants: [Restaurant!]!
    }
    type Mutation{
        addRestaurant (name: String!, street: String!, city: String!, phone: String!): Restaurant!
        deleteRestaurant (id: ID!): Boolean!
    }
`