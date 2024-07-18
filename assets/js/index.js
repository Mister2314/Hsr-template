document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("heroVideo");
    var playPauseVideoBtn = document.getElementById("playPauseVideoBtn");
    var volumeBtn = document.querySelector(".volume-share .left-pg");
    var music = document.getElementById("backgroundMusic");

    // Sayfa yüklendiğinde yerel depolamadan kontrol et ve başlangıçta sesi açık yap
    var muteStatus = localStorage.getItem("muteStatus");
    if (muteStatus === "muted") {
        var onImg = volumeBtn.querySelector(".on");
        var offImg = volumeBtn.querySelector(".off");
        onImg.style.display = "none";
        offImg.style.display = "block";
        music.muted = true;
    } else {
        var onImg = volumeBtn.querySelector(".on");
        var offImg = volumeBtn.querySelector(".off");
        onImg.style.display = "block";
        offImg.style.display = "none";
        music.muted = false;
        music.play();
    }

    // Video ve müzik durumunu kontrol et
    if (playPauseVideoBtn.checked) {
        video.play();
    } else {
        video.pause();
    }

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
