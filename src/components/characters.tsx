import { useQuery } from "@apollo/client";
import { GetCharactersDocument, GetCharactersQuery } from "../gql/graphql";

function DisplayCharacters() {
  const { loading, error, data } = useQuery<GetCharactersQuery>(
    GetCharactersDocument
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Characters</h3>
      {data?.characters?.results?.map(
        (character) =>
          character && (
            <div key={character.id}>
              <p>{character.name}</p>
              <img
                src={character.image || "default_image_url"}
                alt={character.name || "default_image_alt"}
              />
            </div>
          )
      )}
    </div>
  );
}

export default DisplayCharacters;