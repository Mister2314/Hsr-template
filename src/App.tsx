import Hero from "./components/Hero";
import Characters from "./components/Characters";

export default function App() {
  return (
    <>
      <main>
        <a className="skip-link" href="#characters">
          Skip to characters
        </a>
        <Hero />
        <Characters />
      </main>
      <footer className="site-footer">
        <p>
          Unofficial fan project — not affiliated with, endorsed by, or sponsored by HoYoverse or
          Cognosphere. Honkai: Star Rail © HoYoverse/Cognosphere. All game imagery belongs to its
          rightful owners and is used here non-commercially under the{" "}
          <a href="https://hsr.hoyoverse.com/en-us/news/111203">
            Honkai: Star Rail Fan Creations Guide
          </a>
          . Processing of the imagery (crops, cut-outs) was done for presentation only.
        </p>
      </footer>
    </>
  );
}
