import { useQuery } from "@apollo/client";
import { GetCharactersDocument } from "../gql/graphql";
import CharacterModal from "./characterModal";

import { Button } from "flowbite-react";
import { useState } from "react";

function DisplayCharacters() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const { loading, error, data, fetchMore } = useQuery(GetCharactersDocument, {
    variables: { page: currentPage },
  });

  const handleCharacterClick = (id: string) => {
    setSelectedCharacterId(id);
  };

  const goToPage = (page: number) => {
    fetchMore({
      variables: { page },
    });
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.characters?.results?.map((character) =>
          character ? (
            <div
              key={character.id}
              className="p-4 border rounded shadow cursor-pointer"
              onClick={() => handleCharacterClick(character.id || "")}
            >
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
      {selectedCharacterId && (
        <CharacterModal
          characterId={selectedCharacterId}
          onClose={() => setSelectedCharacterId(null)}
        />
      )}
      <div className="flex justify-between mt-4">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
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
