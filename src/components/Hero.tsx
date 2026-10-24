import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  // Original CSS shows the muted (off) icon first; the soundtrack only
  // unlocks after the first click, exactly like the vanilla version.
  const [soundOn, setSoundOn] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (localStorage.getItem("muteStatus") === "muted") {
      musicRef.current!.muted = true;
    }
    videoRef.current?.play();
  }, []);

  const toggleVideo = () => {
    const next = !playing;
    setPlaying(next);
    if (next) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    const music = musicRef.current;
    if (next) {
      if (music) music.muted = false;
      localStorage.setItem("muteStatus", "unmuted");
      music?.play();
    } else {
      if (music) music.muted = true;
      localStorage.setItem("muteStatus", "muted");
      music?.pause();
    }
  };

  return (
    <section className="hero-section">
      <video id="heroVideo" ref={videoRef} autoPlay loop muted playsInline>
        <source
          src="/assets/video/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4"
          type="video/mp4"
        />
      </video>
      <audio loop id="backgroundMusic" ref={musicRef} muted>
        <source src="/assets/music/Star Rail (Login Menu BGM) - Honkai_ Star Rail 1.0 OST.mp3" />
      </audio>

      <img className="logo" src="/assets/img/hsr-logo.png" alt="" />
      <img className="qr-code" src="/assets/img/qr-code.png" alt="" />
      <a href="https://www.playstation.com/games/honkai-star-rail">
        <img className="ps5" src="/assets/img/ps5.png" alt="" />
      </a>
      <a href="https://apps.apple.com/us/app/honkai-star-rail/id1599719154">
        <img className="app-store" src="/assets/img/app-store.png" alt="" />
      </a>
      <a href="https://sg-public-api.hoyoverse.com/event/download_porter/trace/hkrpg_global/oswebpc/default?url=https%3A%2F%2Fhsr.hoyoverse.com%2Fen-us%2Fhome">
        <img className="windows" src="/assets/img/windows.png" alt="" />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea">
        <img className="google-play" src="/assets/img/google-play.png" alt="" />
      </a>
      <a href="https://store.epicgames.com/en-US/p/honkai-star-rail">
        <img className="epic-store" src="/assets/img/epic-store.png" alt="" />
      </a>

      <div id="toggleBtn" className="button-ctr">
        <div className="container">
          <label>
            <input
              id="playPauseVideoBtn"
              className="play-btn"
              type="checkbox"
              checked={playing}
              onChange={toggleVideo}
            />
            <div className="play-icon"></div>
            <div className="pause-icon"></div>
          </label>
        </div>
      </div>

      <div className="volume-share">
        <div className="left-pg" onClick={toggleSound}>
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
        </div>
        <div className="right-pg">
          <img src="/assets/img/share.png" alt="" />
        </div>
      </div>
    </section>
  );
}
