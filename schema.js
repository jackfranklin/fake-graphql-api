const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql')

const { people, addresses, albums, photos } = require('./db')

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

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'A fake album',
  fields: () => ({
    ...idResolver(),
    ...stringResolver('title'),
    person: {
      type: PersonType,
      resolve: album => {
        return people.find(p => p.id === album.personId)
      },
    },
    photos: {
      type: GraphQLList(PhotoType),
      resolve: album => {
        return photos.filter(p => p.albumId === album.id)
      },
    },
  }),
})

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: 'A fake photo',
  fields: () => ({
    ...idResolver(),
    ...stringResolver('title'),
    ...stringResolver('url'),
    album: {
      type: AlbumType,
      resolve: photo => {
        return albums.find(a => a.id === photo.albumId)
      },
    },
  }),
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
    albums: {
      type: GraphQLList(AlbumType),
      resolve: person => {
        return albums.filter(a => a.personId === person.id)
      },
    },
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
      albums: {
        type: GraphQLList(AlbumType),
        resolve: () => albums,
      },
      addresses: {
        type: GraphQLList(AddressType),
        resolve: () => addresses,
      },
      photos: {
        type: GraphQLList(PhotoType),
        resolve: () => photos,
      },
    }),
  }),
})
