import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetCharactersDocument, GetCharactersQuery } from "../gql/graphql";

function DisplayCharacters() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useQuery<GetCharactersQuery>(
    GetCharactersDocument,
    {
      variables: { page: currentPage },
    }
  );

  // Function to handle page change
  const goToPage = (page: number) => {
    fetchMore({
      variables: { page },
    });
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Characters</h3>
      {data?.characters?.results?.map((character) =>
        character ? (
          <div key={character.id}>
            <p>{character.name}</p>
            <img
              src={character.image || "default_image_url"}
              alt={character.name || "default_alt"}
            />
          </div>
        ) : null
      )}
      <div>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= (data?.characters?.info?.pages || Infinity)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DisplayCharacters;