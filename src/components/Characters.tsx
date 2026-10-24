import { useRef, useState } from "react";

interface Character {
  name: string;
  epithet: string;
  element: string;
  path: string;
  img: string;
}

const CHARACTERS: Character[] = [
  {
    name: "Kafka",
    epithet: "A wanted member of the Stellaron Hunters, veiled in whispers.",
    element: "Lightning",
    path: "Nihility",
    img: "/assets/img/Kafka.jpeg",
  },
  {
    name: "Blade",
    epithet: "A swordsman who discards his life to master the blade.",
    element: "Wind",
    path: "Destruction",
    img: "/assets/img/Blade.jpeg",
  },
  {
    name: "Dan Heng",
    epithet: "The cold and reserved guard of the Astral Express archives.",
    element: "Wind",
    path: "The Hunt",
    img: "/assets/img/Dan Heng.png",
  },
  {
    name: "Black Swan",
    epithet: "A Memokeeper of the Garden of Recollection, reading memories like silk.",
    element: "Wind",
    path: "Nihility",
    img: "/assets/img/black swan.png",
  },
  {
    name: "Argenti",
    epithet: "A wandering knight devoted to the beauty of the goddess Idrila.",
    element: "Physical",
    path: "Erudition",
    img: "/assets/img/argenti.png",
  },
];

export default function Characters() {
  const [selected, setSelected] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (i: number) => {
    const run = () => setSelected(i);
    // View Transitions API (Baseline 2025): shared-element morph when supported.
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(run);
    } else {
      run();
    }
  };

  const close = () => {
    const card = selected !== null ? cardRefs.current[selected] : null;
    setSelected(null);
    card?.focus();
  };

  const onCardKey = (e: React.KeyboardEvent, i: number) => {
    const last = CHARACTERS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (next !== null) {
      e.preventDefault();
      cardRefs.current[next]?.focus();
      open(next);
    }
  };

  const active = selected !== null ? CHARACTERS[selected] : null;

  return (
    <section className="characters-section" aria-label="Characters">
      <h2 className="characters-title">Board the Astral Express</h2>
      <p className="characters-sub">Meet the trailblazers you will travel the stars with.</p>

      <ul className="character-grid">
        {CHARACTERS.map((c, i) => (
          <li key={c.name}>
            <button
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="character-card"
              onClick={() => (selected === i ? close() : open(i))}
              onKeyDown={(e) => onCardKey(e, i)}
              aria-expanded={selected === i}
              style={
                selected === null || selected !== i
                  ? { viewTransitionName: `character-${i}` }
                  : undefined
              }
            >
              <img src={c.img} alt="" loading="lazy" decoding="async" />
              <span className="character-name">{c.name}</span>
              <span className="character-meta">
                {c.element} · {c.path}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div className="character-detail" role="group" aria-label={`${active.name} dossier`}>
          <button type="button" className="dossier-close" onClick={close} aria-label="Close dossier">
            ✕
          </button>
          <img
            className="dossier-img"
            src={active.img}
            alt={`${active.name} portrait`}
            style={{ viewTransitionName: `character-${selected}` }}
          />
          <div className="dossier-body">
            <h3>{active.name}</h3>
            <p className="dossier-epithet">{active.epithet}</p>
            <dl className="dossier-data">
              <div>
                <dt>Element</dt>
                <dd>{active.element}</dd>
              </div>
              <div>
                <dt>Path</dt>
                <dd>{active.path}</dd>
              </div>
            </dl>
            <a className="dossier-cta" href="https://hsr.hoyoverse.com/en-us/character">
              Full profile ↗
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
