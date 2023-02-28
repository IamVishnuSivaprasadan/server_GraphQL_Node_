const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const app = express()

const seedData =[
    {id:1, language: 'python', used : true },
    {id:2, language: 'javascript', used : true },
    {id:3, language: 'java', used : true },
    {id:4, language: 'ruby', used : true },
    {id:5, language: 'cpp', used : true }
]

const LanguageType = new GraphQLObjectType({
    name: 'language',
    description : 'programming language',
    fields:{
        id:{
            type: GraphQLInt
        },
        language:{
            type: GraphQLString
        },
        used:{
            type: GraphQLBoolean
        }

    }
})

const rootQuery= new GraphQLObjectType({
    name: 'Query',
    description : 'rootQuery point',
    fields: () => ({
        languages:{
            type: GraphQLList(LanguageType),
            description:'languages',
            resolve : () => seedData 
        }
    })
})


const schema = new GraphQLSchema({ query : rootQuery })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(5000., () => console.log("running"))