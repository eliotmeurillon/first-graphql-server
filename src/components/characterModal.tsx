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

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <p>Error loading character details</p>
      </div>
    );

  const character = data?.character;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            className="overflow-auto"
            style={{ maxHeight: "calc(100vh - 2rem)" }}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition ease-in-out duration-150"
                aria-label="Close"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            {character && (
              <>
                <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
                <img
                  className="w-full h-auto mb-4 rounded"
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
                      {character.episode.map((ep, index) => (
                        <li key={index}>
                          {ep.name} - {ep.episode}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
