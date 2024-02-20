import React from "react";
import { useQuery } from "@apollo/client";
import { GetCharacterDocument } from "../gql/graphql";
import { Modal, Badge, Table } from "flowbite-react";

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

interface Episode {
  episode: string;
  name: string;
}

interface CharacterEpisodesTableProps {
  episodes: Episode[];
}

const CharacterEpisodesTable: React.FC<CharacterEpisodesTableProps> = ({
  episodes,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Episode</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {episodes.map((ep, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {ep.episode}
              </Table.Cell>
              <Table.Cell>{ep.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
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
              {character?.episode && (
                <>
                  <h3 className="text-xl font-bold mb-2">Episodes:</h3>
                  <CharacterEpisodesTable episodes={character.episode} />
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
