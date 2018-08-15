const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql')

const { people, addresses } = require('./db')

const stringResolver = key => ({
  [key]: {
    type: GraphQLString,
    resolve: x => x[key],
  },
})

const idResolver = () => ({
  id: {
    type: GraphQLID,
    resolve: x => x.id,
  },
})

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'A fake address',

  fields: () => ({
    ...idResolver(),
    ...stringResolver('streetName'),
    ...stringResolver('city'),
    ...stringResolver('zip'),
  }),
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A fake person',

  fields: () => ({
    ...idResolver(),
    ...stringResolver('name'),
    ...stringResolver('email'),
    ...stringResolver('avatar'),
    address: {
      type: AddressType,
      resolve: person => {
        return addresses.find(a => a.id === person.addressId)
      },
    },
  }),
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args) => people.find(p => p.id === args.id),
      },
      people: {
        type: GraphQLList(PersonType),
        resolve: () => people,
      },
      addresses: {
        type: GraphQLList(AddressType),
        resolve: () => addresses,
      },
    }),
  }),
})
