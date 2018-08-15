const faker = require('faker')

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

exports.addresses = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  streetName: faker.address.streetName(),
  city: faker.address.city(),
  zip: faker.address.zipCode(),
}))

exports.people = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  addressId: randomIntFromInterval(0, exports.addresses.length - 1),
}))
