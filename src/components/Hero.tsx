import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PLATFORMS = [
  {
    name: "PlayStation 5",
    img: "/assets/img/ps5.png",
    href: "https://www.playstation.com/games/honkai-star-rail",
    className: "ps5",
  },
  {
    name: "App Store",
    img: "/assets/img/app-store.png",
    href: "https://apps.apple.com/us/app/honkai-star-rail/id1599719154",
    className: "app-store",
  },
  {
    name: "Windows",
    img: "/assets/img/windows.png",
    href: "https://sg-public-api.hoyoverse.com/event/download_porter/trace/hkrpg_global/oswebpc/default?url=https%3A%2F%2Fhsr.hoyoverse.com%2Fen-us%2Fhome",
    className: "windows",
  },
  {
    name: "Google Play",
    img: "/assets/img/google-play.png",
    href: "https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea",
    className: "google-play",
  },
  {
    name: "Epic Games Store",
    img: "/assets/img/epic-store.png",
    href: "https://store.epicgames.com/en-US/p/honkai-star-rail",
    className: "epic-store",
  },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const [soundOn, setSoundOn] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (localStorage.getItem("muteStatus") === "muted") {
      if (musicRef.current) musicRef.current.muted = true;
    }
    const video = videoRef.current;
    // Poster-first: only autonomous motion on desktop-class viewports,
    // with animation allowed. Mobile keeps the composed poster still.
    const mayAutoplay =
      window.matchMedia("(min-width: 768px)").matches && !prefersReducedMotion();
    if (mayAutoplay) {
      video?.play().catch(() => setPlaying(false));
    } else {
      setPlaying(false);
      playingRef.current = false;
    }
    // Intersection-aware playback: pause whenever the hero scrolls offscreen,
    // resume on return if the user had it playing.
    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (!entry.isIntersecting) {
          if (!video.paused) video.pause();
        } else if (playingRef.current && video.paused) {
          video.play().catch(() => setPlaying(false));
        }
      },
      { threshold: 0.5 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = () => {
    const next = !playing;
    setPlaying(next);
    playingRef.current = next;
    const video = videoRef.current;
    if (!video) return;
    if (next) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    const music = musicRef.current;
    if (!music) return;
    if (next) {
      music.muted = false;
      void music.play();
      localStorage.setItem("muteStatus", "unmuted");
    } else {
      music.muted = true;
      music.pause();
      localStorage.setItem("muteStatus", "muted");
    }
  };

  return (
    <section className="hero-section" ref={sectionRef} aria-label="Honkai: Star Rail">
      <video
        id="heroVideo"
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/img/hero-poster.jpg"
      >
        <source
          src="/assets/video/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4"
          type="video/mp4"
        />
      </video>
      <audio loop id="backgroundMusic" ref={musicRef} muted>
        <source src="/assets/music/Star Rail (Login Menu BGM) - Honkai_ Star Rail 1.0 OST.mp3" />
      </audio>

      <img className="logo" src="/assets/img/hsr-logo.png" alt="Honkai: Star Rail" />
      <img
        className="qr-code"
        src="/assets/img/qr-code.png"
        alt="QR code linking to the game download page"
      />

      <div className="platform-ctas">
        {PLATFORMS.map((p) => (
          <a key={p.name} href={p.href} className={`platform-cta ${p.className}`}>
            <img src={p.img} alt={`Download Honkai: Star Rail on ${p.name}`} />
          </a>
        ))}
      </div>

      <div id="toggleBtn" className="button-ctr">
        <div className="container">
          <label>
            <input
              id="playPauseVideoBtn"
              className="play-btn"
              type="checkbox"
              checked={playing}
              onChange={toggleVideo}
              aria-label={playing ? "Pause hero video" : "Play hero video"}
            />
            <div className="play-icon"></div>
            <div className="pause-icon"></div>
          </label>
        </div>
      </div>

      <div className="volume-share">
        <button
          type="button"
          className="left-pg"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute soundtrack" : "Play soundtrack"}
        >
          <img
            className="on"
            src="/assets/img/volume-on.png"
            alt=""
            style={{ display: soundOn ? "block" : "none" }}
          />
          <img
            className="off"
            src="/assets/img/volume-off.png"
            alt=""
            style={{ display: soundOn ? "none" : "block" }}
          />
        </button>
        <button
          type="button"
          className="right-pg"
          onClick={() => {
            void navigator.clipboard?.writeText(window.location.href).catch(() => {});
          }}
          aria-label="Copy page link to share"
        >
          <img src="/assets/img/share.png" alt="" />
        </button>
      </div>
    </section>
  );
}
