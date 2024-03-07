document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("heroVideo");
    var playPauseVideoBtn = document.getElementById("playPauseVideoBtn");
    var volumeBtn = document.querySelector(".volume-share .left-pg");
    var music = document.getElementById("backgroundMusic");

    music.pause();

    playPauseVideoBtn.addEventListener("change", function () {
        if (playPauseVideoBtn.checked) {
            video.play();
        } else {
            video.pause();
        }
    });

    volumeBtn.addEventListener("click", function () {
        var onImg = volumeBtn.querySelector(".on");
        var offImg = volumeBtn.querySelector(".off");

        if (onImg.style.display === "none") {
            onImg.style.display = "block";
            offImg.style.display = "none";
            music.muted = false;
            localStorage.setItem("muteStatus", "unmuted");
            music.play();
        } else {
            onImg.style.display = "none";
            offImg.style.display = "block";
            music.muted = true;
            localStorage.setItem("muteStatus", "muted");
            music.pause();
        }
    });
});