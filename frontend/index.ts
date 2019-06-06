import { getPerson } from './get-person'

console.log('hello world!')

getPerson(1).then(person => {
  console.log('here', person)
})
