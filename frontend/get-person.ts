import query from './person.graphql'
import { Person, PersonVariables } from './__generated__/Person'
import { print } from 'graphql/language/printer'

export const getPerson = (id: number): Promise<Person> => {
  const graphQlVariables: PersonVariables = {
    id: id,
  }

  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(query),
      variables: graphQlVariables,
    }),
  })
    .then(response => {
      return response.json()
    })
    .then((data: Person) => {
      return data
    })
}
