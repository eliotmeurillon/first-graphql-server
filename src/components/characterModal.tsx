import React from "react";
import { useQuery } from "@apollo/client";
import { GetCharacterDocument } from "../gql/graphql";
import { Modal } from "flowbite-react";

interface CharacterModalProps {
  characterId: string;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  characterId,
  onClose,
}) => {
  const { data, loading, error } = useQuery(GetCharacterDocument, {
    variables: { id: characterId },
  });

  if (loading || error) return null;

  const character = data?.character;

  return (
    <Modal show={!!character} onClose={onClose} size="md">
      <Modal.Header>{character?.name}</Modal.Header>
      <Modal.Body>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading character details</p>}
        {character?.name && character?.image ? (
          <>
            <div className="text-center">
              <img
                className="w-full h-auto max-w-xs mx-auto mb-4 rounded"
                src={character.image}
                alt={character.name}
              />
              <p className="mb-2">
                <strong>Status:</strong> {character.status}
              </p>
              <p className="mb-2">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="mb-2">
                <strong>Gender:</strong> {character.gender}
              </p>
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
