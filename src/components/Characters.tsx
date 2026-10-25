import { useCallback, useRef, useState } from "react";

interface Character {
  name: string;
  epithet: string;
  element: string;
  path: string;
  /** Opaque focal-point crop used for the roster thumbnail. */
  thumb: string;
  /** Transparent cutout used on the stable stage. */
  stage: string;
}

const ELEMENT_COLORS: Record<string, string> = {
  Lightning: "#e8c15a",
  Wind: "#7fd4b2",
  Physical: "#e8e3d8",
};

const CHARACTERS: Character[] = [
  {
    name: "Kafka",
    epithet: "A wanted member of the Stellaron Hunters, veiled in whispers.",
    element: "Lightning",
    path: "Nihility",
    thumb: "/assets/img/characters/kafka-card.webp",
    stage: "/assets/img/characters/kafka-stage.webp",
  },
  {
    name: "Blade",
    epithet: "A swordsman who discards his life to master the blade.",
    element: "Wind",
    path: "Destruction",
    thumb: "/assets/img/characters/blade-card.webp",
    stage: "/assets/img/characters/blade-stage.webp",
  },
  {
    name: "Dan Heng",
    epithet: "The cold and reserved guard of the Astral Express archives.",
    element: "Wind",
    path: "The Hunt",
    thumb: "/assets/img/characters/dan-heng-card.webp",
    stage: "/assets/img/characters/dan-heng-stage.webp",
  },
  {
    name: "Black Swan",
    epithet: "A Memokeeper of the Garden of Recollection, reading memories like silk.",
    element: "Wind",
    path: "Nihility",
    thumb: "/assets/img/characters/black-swan-card.webp",
    stage: "/assets/img/characters/black-swan-stage.webp",
  },
  {
    name: "Argenti",
    epithet: "A wandering knight devoted to the beauty of the goddess Idrila.",
    element: "Physical",
    path: "Erudition",
    thumb: "/assets/img/characters/argenti-card.webp",
    stage: "/assets/img/characters/argenti-stage.webp",
  },
];

function Badge({ label, color }: { label: string; color?: string }) {
  return (
    <span className="badge">
      {color && <span className="badge-dot" style={{ backgroundColor: color }} aria-hidden="true" />}
      {label}
    </span>
  );
}

export default function Characters() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLLIElement | null)[]>([]);

  const select = useCallback(
    (i: number, focus = false) => {
      setActive(i);
      if (focus) btnRefs.current[i]?.focus();
    },
    [],
  );

  const onRosterKey = (e: React.KeyboardEvent, i: number) => {
    const last = CHARACTERS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  };

  const c = CHARACTERS[active];

  return (
    <section className="characters-section" id="characters" aria-labelledby="characters-title">
      <div className="characters-head">
        <h2 className="characters-title" id="characters-title">
          Board the Astral Express
        </h2>
        <p className="characters-sub">Choose a name from the roster — the stage follows.</p>
      </div>

      {/* Stable stage: always mounted, fixed aspect — selection never shifts layout. */}
      <div className="char-stage" role="group" aria-live="polite" aria-label={`${c.name} dossier`}>
        <div className="char-stage-plate" aria-hidden="true" />
        <img
          key={c.name}
          className="char-stage-img"
          src={c.stage}
          alt={`${c.name} portrait`}
          decoding="async"
          fetchPriority="high"
        />
        <div className="char-stage-info">
          <p className="char-stage-kicker">{c.element} · Path of {c.path}</p>
          <h3 className="char-stage-name">{c.name}</h3>
          <p className="char-stage-epithet">{c.epithet}</p>
          <div className="char-stage-badges">
            <Badge label={c.element} color={ELEMENT_COLORS[c.element]} />
            <Badge label={c.path} />
          </div>
        </div>
      </div>

      <ul className="char-roster" role="listbox" aria-label="Character roster">
        {CHARACTERS.map((ch, i) => (
          <li
            key={ch.name}
            role="option"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            ref={(el) => {
              btnRefs.current[i] = el as HTMLLIElement | null;
            }}
            onKeyDown={(e) => onRosterKey(e, i)}
            onClick={() => select(i)}
            className="char-option"
          >
            <img src={ch.thumb} alt="" loading="lazy" decoding="async" width={120} height={160} />
            <span className="char-option-name">{ch.name}</span>
            <span className="char-option-role" aria-hidden="true">
              {ch.element} · {ch.path}
            </span>
            <span className="visually-hidden">{`, ${ch.element}, path of ${ch.path}`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
