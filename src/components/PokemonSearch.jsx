import { useState } from "react";

function PokemonSearch() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [message, setMessage] = useState("");

  async function searchPokemon() {
    setPokemon(null);
    setMessage("");

    if (name.trim() === "") {
      setMessage("Enter a Pokemon name.");
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}`
      );

      if (!response.ok) {
        setMessage("Pokemon not found.");
        return;
      }

      const data = await response.json();

      if (data.id < 494 || data.id > 649) {
        setMessage("This Pokemon is not from Generation 5.");
        return;
      }

      setPokemon(data);
    } catch {
      setMessage("Could not connect to the API.");
    }
  }

  return (
    <div className="search-section">
      <h2>Search Unova Pokemon</h2>

      <input
        type="text"
        placeholder="Enter Pokemon name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={searchPokemon}>Search</button>

      <p>{message}</p>

      {pokemon && (
        <div className="pokemon-card">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <h3>{pokemon.name}</h3>
          <p>Number: {pokemon.id}</p>
          <p>Type: {pokemon.types.map(t => t.type.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;