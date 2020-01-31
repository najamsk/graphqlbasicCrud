const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
      } = require('graphql');


//Hardcode data

//types

// Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args){
                /*
                for(let i=0; i< customers.length; i++){
                    if(customers[i].id === args.id){
                        return customers[i]; 
                    } 
                }
                */

                //
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);
            },
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args){
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data);
            }
        }
    },

});

//mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return axios.post('http://localhost:3000/customers',
                                  {
                                      name: args.name,
                                      email: args.email,
                                      age: args.age
                                  })
                    .then( res => res.data);
            }
        }, //add customers
        deleteCustomer: {
            type: CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return axios.delete('http://localhost:3000/customers/' + args.id)
                    .then( res => res.data);
            }
        }, //delete customers
        updateCustomer: {
            type: CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                    .then( res => res.data);
            }
        }, //update customers
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
