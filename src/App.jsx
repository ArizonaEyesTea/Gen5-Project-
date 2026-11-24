import PokemonList from "./components/PokemonList";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  return (
    <div>
      <h1>My Top 20 Unova Pokemon</h1>
      <p>My favorite Pokemon from Generation 5.</p>

      <PokemonSearch />
      <PokemonList />
    </div>
  );
}

export default App;