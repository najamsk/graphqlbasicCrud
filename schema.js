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
const customers = [
    {id:'1', name:'najam awan', age:36, email:'najamsk@gmail.com'},
    {id:'2', name:'habib satti', age:37, email:'mhabib@gmail.com'},
    {id:'3', name:'waqas ashraf', age:38, email:'ashraf@gmail.com'},
    {id:'4', name:'naeem awan', age:39, email:'naeem@gmail.com'},
];

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
                for(let i=0; i< customers.length; i++){
                    if(customers[i].id === args.id){
                        return customers[i]; 
                    } 
                }
            },
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args){
                return customers;
            }
        }
    },

});

module.exports = new GraphQLSchema({
    query: RootQuery, 
});
