import { useQuery } from "@apollo/client";
import { GetCharacterDocument } from "../gql/graphql";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading character details</p>;

  const character = data?.character;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-auto max-w-lg w-full p-4">
        <button
          onClick={onClose}
          className="float-right px-2 py-1 text-lg font-bold text-gray-700 hover:text-gray-900"
        >
          X
        </button>
        {character && (
          <>
            <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
            <img
              className="w-full h-auto mb-4"
              src={character.image || "default_image_url"}
              alt={character.name || "default_image_alt"}
            />
            <p className="mb-2">
              <span className="font-bold">Status:</span> {character.status}
            </p>
            <p className="mb-2">
              <span className="font-bold">Species:</span> {character.species}
            </p>
            <p className="mb-2">
              <span className="font-bold">Gender:</span> {character.gender}
            </p>
            {character.episode && (
              <>
                <h3 className="text-xl font-bold mb-2">Episodes:</h3>
                <ul className="list-disc list-inside">
                  {character.episode.map((ep, index) => (
                    <li key={index} className="mb-1">
                      {ep?.name || null} - {ep?.episode || null}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default CharacterModal;
