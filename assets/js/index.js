document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("heroVideo");
    var playPauseVideoBtn = document.getElementById("playPauseVideoBtn");
    var volumeBtn = document.querySelector(".volume-share .left-pg");
    var music = document.getElementById("backgroundMusic");

    // Müziği otomatik olarak başlat
    music.play();

    // Ses açma/kapatma düğmesine basıldığında müziği kontrol et
    volumeBtn.addEventListener("click", function () {
        var onImg = volumeBtn.querySelector(".on");
        var offImg = volumeBtn.querySelector(".off");

        if (onImg.style.display === "none") {
            onImg.style.display = "block";
            offImg.style.display = "none";
            music.muted = false; // Müziği aç
        } else {
            onImg.style.display = "none";
            offImg.style.display = "block";
            music.muted = true; // Müziği kapat
        }
    });

    // Sayfa yenilendiğinde müziği tekrar başlat
    window.addEventListener("load", function() {
        music.play();
    });
});