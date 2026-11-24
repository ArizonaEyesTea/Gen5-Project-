import { useState, useEffect } from "react";

const favorites = [
  "hydreigon",
  "zekrom",
  "bisharp",
  "chandelure",
  "galvantula",
  "reuniclus",
  "scrafty",
  "krookodile",
  "darmanitan-standard",
  "conkeldurr",
  "excadrill",
  "samurott",
  "serperior",
  "volcarona",
  "zoroark",
  "jellicent",
  "ferrothorn",
  "genesect",
  "vanilluxe",
  "archeops"
];

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      const list = [];

      for (const name of favorites) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );

          if (response.ok) {
            const data = await response.json();
            list.push(data);
          } else {
            console.log("Could not find " + name);
          }
        } catch (error) {
          console.log(error);
        }
      }

      setPokemon(list);
      setLoading(false);
    }

    getPokemon();
  }, []);

  const displayedPokemon = filter
    ? pokemon.filter(p =>
        p.types.some(t => t.type.name === "dark")
      )
    : pokemon;

  return (
    <div>
      <h2>My Favorite Unova Pokemon</h2>

      <button onClick={() => setFilter(!filter)}>
        {filter ? "Show All" : "Show Dark Types"}
      </button>

      {loading && <p>Loading Pokemon...</p>}

      <div className="pokemon-list">
        {displayedPokemon.map(p => (
          <div
            key={p.id}
            className={p.name === "hydreigon"
              ? "pokemon-card featured"
              : "pokemon-card"}
          >
            {p.name === "hydreigon" && (
              <h2>My Favorite Pokemon</h2>
            )}

            <img src={p.sprites.front_default} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Number: {p.id}</p>
            <p>Type: {p.types.map(t => t.type.name).join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;