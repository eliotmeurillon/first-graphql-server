import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetCharactersDocument } from "../gql/graphql";

function DisplayCharacters() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useQuery(GetCharactersDocument, {
    variables: { page: currentPage },
  });

  const goToPage = (page: number) => {
    fetchMore({
      variables: { page },
    });
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.characters?.results?.map((character) =>
          character ? (
            <div key={character.id} className="p-4 border rounded shadow">
              <p className="font-bold">{character.name}</p>
              <img
                className="w-full h-auto"
                src={character.image || "default_image_url"}
                alt={character.name || "default_alt"}
              />
            </div>
          ) : null
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= (data?.characters?.info?.pages || Infinity)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default DisplayCharacters;
