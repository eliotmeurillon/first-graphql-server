import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        pages
        next
      }
    }
  }
`;

function Characters() {
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const loadMore = () => {
    fetchMore({
      variables: {
        page: data.characters.info.next,
      },
    });
  };

  return (
    <div>
      <h3>Characters</h3>
      {data.characters.results.map(
        ({ id, name, image }: { id: string; name: string; image: string }) => (
          <div key={id}>
            <p>
              {id}: {name}
            </p>
            <img src={image} alt={name} />
          </div>
        )
      )}
      {data.characters.info.next && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}

export default Characters;