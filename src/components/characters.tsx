import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Characters</h3>
      {data.characters.results.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Characters;
