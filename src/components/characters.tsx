import { useQuery } from "@apollo/client";
import { GetCharactersDocument } from "../gql/graphql";
import CharacterModal from "./characterModal";

import { Button, Card } from "flowbite-react";
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4">
        {data?.characters?.results?.map((character) =>
          character ? (
            <Card
              key={character.id}
              imgAlt={character.name || ""}
              imgSrc={character.image || "default_image_url"}
              className="cursor-pointer max-w-sm"
              onClick={() => handleCharacterClick(character.id || "")}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {character.name}
              </h5>
            </Card>
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
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= (data?.characters?.info?.pages || Infinity)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default DisplayCharacters;
