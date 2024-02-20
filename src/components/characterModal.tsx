import React from "react";
import { useQuery } from "@apollo/client";
import { GetCharacterDocument } from "../gql/graphql";
import { Modal, Badge } from "flowbite-react";

interface CharacterModalProps {
  characterId: string;
  onClose: () => void;
}

const statusColors: { [key: string]: string } = {
  Alive: "green",
  Dead: "red",
  unknown: "gray",
};

const speciesColors: { [key: string]: string } = {
  Human: "blue",
  Alien: "purple",
  unknown: "gray",
};

const genderColors: { [key: string]: string } = {
  Male: "blue",
  Female: "pink",
  unknown: "gray",
};

const CharacterModal: React.FC<CharacterModalProps> = ({
  characterId,
  onClose,
}) => {
  const { data, loading, error } = useQuery(GetCharacterDocument, {
    variables: { id: characterId },
  });

  if (loading || error) return null;

  const character = data?.character;

  const badgeColor = statusColors[character?.status || "unknown"] || "gray";
  const speciesColor = speciesColors[character?.species || "unknown"] || "gray";
  const genderColor = genderColors[character?.gender || "unknown"] || "gray";

  return (
    <Modal show={!!character} onClose={onClose} size="md">
      <Modal.Header>{character?.name}</Modal.Header>
      <Modal.Body>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading character details</p>}
        {character?.name && character?.image ? (
          <>
            <div className="flex flex-col items-center text-center">
              <img
                className="w-full h-auto max-w-xs mx-auto mb-4 rounded"
                src={character.image}
                alt={character.name}
              />
              <div className="flex flex-col items-center gap-1">
                <p className="flex items-center gap-1">
                  <strong>Status:</strong>
                  <Badge color={badgeColor}>{character.status}</Badge>
                </p>
                <p className="flex items-center gap-1">
                  <strong>Species:</strong>
                  <Badge color={speciesColor}>{character.species}</Badge>
                </p>
                <p className="flex items-center gap-1">
                  <strong>Gender:</strong>
                  <Badge color={genderColor}>{character.gender}</Badge>
                </p>
              </div>
              {character.episode && (
                <>
                  <h3 className="text-xl font-bold mb-2">Episodes:</h3>
                  <ul className="list-disc list-inside">
                    {character?.episode.map(
                      (ep, index) =>
                        ep && (
                          <li key={index}>
                            {ep.name} - {ep.episode}
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </div>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default CharacterModal;
