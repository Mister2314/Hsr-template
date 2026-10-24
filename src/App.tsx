import Hero from "./components/Hero";
import Characters from "./components/Characters";

export default function App() {
  return (
    <main>
      <a className="skip-link" href="#characters">
        Skip to characters
      </a>
      <Hero />
      <Characters />
    </main>
  );
}
