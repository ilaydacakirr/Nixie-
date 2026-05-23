var urunler = [
    { ad: "Tişört", fiyat: 150, resim: "img/tisort.jpg", aciklama: "Pamuklu kumaştan üretilmiş, günlük kullanım için ideal." },
    { ad: "Beyaz Tişört", fiyat: 120, resim: "img/beyazTisort.jpg", aciklama: "Sade ve şık beyaz tişört, her kombine uyar." },
    { ad: "Sweatshirt", fiyat: 350, resim: "img/Sweatshirt.jpg", aciklama: "Yumuşak içi, serin havalarda ideal tercih." },
    { ad: "Hoodie", fiyat: 320, resim: "img/Hoodie.jpg", aciklama: "Kapüşonlu, rahat ve şık görünüm sağlar." },
    { ad: "Pantolon", fiyat: 400, resim: "img/pantolon.jpg", aciklama: "Klasik mavi kot, dayanıklı ve uzun ömürlü." },
    { ad: "Hırka", fiyat: 450, resim: "img/hırka.jpg", aciklama: "Klasik hırka, yumuşak dokusu ve konforlu yapısıyla uzun süreli kullanım sunar." },
    { ad: "Mont", fiyat: 1200, resim: "img/mont.jpg", aciklama: "Kış ayları için kalın astarlı, rüzgar geçirmez mont." },
    { ad: "Ceket", fiyat: 800, resim: "img/ceket.jpg", aciklama: "Mevsimlik ince ceket, şık görünüm için ideal." },
    { ad: "Spor Ayakkabı", fiyat: 800, resim: "img/sayakkabi.jpg", aciklama: "Hafif taban, spor ve günlük kullanıma uygun." },
    { ad: "Bot", fiyat: 1000, resim: "img/bot.jpg", aciklama: "Sağlam yapısıyla kış aylarında konfor sağlar." }
];

function resimYolu(yol) {
    if (window.location.pathname.includes("/pages/")) {
        return "../" + yol;
    }
    return yol;
}


var anaAlan = document.getElementById("anasayfaUrunler");
if (anaAlan) {
    for (var i = 0; i < 4; i++) {
        var div = document.createElement("div");
        div.className = "urun";
        div.innerHTML = "<img src='" + resimYolu(urunler[i].resim) + "' alt='" + urunler[i].ad + "'>"
            + "<h3>" + urunler[i].ad + "</h3>"
            + "<p>Fiyat: " + urunler[i].fiyat + " TL</p>"
            + "<button class='sepetBtn' data-index='" + i + "'>Sepete Ekle</button>"
            + "<button class='detayBtn' data-index='" + i + "'>Detay</button>";
        anaAlan.appendChild(div);
    }
}


var urunlerAlani = document.getElementById("urunler");
if (urunlerAlani) {
    for (var i = 0; i < urunler.length; i++) {
        var div = document.createElement("div");
        div.className = "urun";
        div.innerHTML = "<img src='" + resimYolu(urunler[i].resim) + "' alt='" + urunler[i].ad + "'>"
            + "<h3>" + urunler[i].ad + "</h3>"
            + "<p>Fiyat: " + urunler[i].fiyat + " TL</p>"
            + "<button class='sepetBtn' data-index='" + i + "'>Sepete Ekle</button>"
            + "<button class='detayBtn' data-index='" + i + "'>Detay</button>";
        urunlerAlani.appendChild(div);
    }
}


document.addEventListener("click", function(e) {
    if (e.target.className === "sepetBtn") {
        var index = e.target.getAttribute("data-index");
        var sepet = JSON.parse(localStorage.getItem("sepet")) || [];
        sepet.push(urunler[index]);
        localStorage.setItem("sepet", JSON.stringify(sepet));
        alert(urunler[index].ad + " sepete eklendi!");
    }

    if (e.target.className === "detayBtn") {
        var index = e.target.getAttribute("data-index");
        localStorage.setItem("seciliUrun", JSON.stringify(urunler[index]));
        if (window.location.pathname.includes("/pages/")) {
            window.location.href = "detay.html";
        } else {
            window.location.href = "pages/detay.html";
        }
    }
});


var sepetAlani = document.getElementById("sepet");
if (sepetAlani) {
    var sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    var toplam = 0;

    if (sepet.length === 0) {
        sepetAlani.innerHTML = "<p>Sepetiniz boş.</p>";
    } else {
        for (var i = 0; i < sepet.length; i++) {
            var p = document.createElement("p");
            p.innerHTML = sepet[i].ad + " - " + sepet[i].fiyat + " TL"
                + " <button class='silBtn' data-index='" + i + "'>Sil</button>";
            sepetAlani.appendChild(p);
            toplam += sepet[i].fiyat;
        }
    }
    
var onaylaBtn = document.getElementById("onaylaBtn");
if (onaylaBtn) {
    onaylaBtn.addEventListener("click", function() {
        localStorage.removeItem("sepet");
        sepetAlani.innerHTML = "<p>✅ Siparişiniz alındı, teşekkürler!</p>";
        document.getElementById("toplam").innerHTML = "";
        onaylaBtn.style.display = "none";
    });
}
    
    document.getElementById("toplam").innerHTML = "Toplam: " + toplam + " TL";

    document.addEventListener("click", function(e) {
        if (e.target.className === "silBtn") {
            var index = e.target.getAttribute("data-index");
            var sepet = JSON.parse(localStorage.getItem("sepet")) || [];
            sepet.splice(index, 1);
            localStorage.setItem("sepet", JSON.stringify(sepet));
            window.location.reload();
        }
    });
}

var detayAlani = document.getElementById("detay");
if (detayAlani) {
    var urun = JSON.parse(localStorage.getItem("seciliUrun"));
    if (urun) {
        detayAlani.innerHTML = "<img src='" + resimYolu(urun.resim) + "' alt='" + urun.ad + "'>"
            + "<h2>" + urun.ad + "</h2>"
            + "<p>Fiyat: " + urun.fiyat + " TL</p>"
            + "<p>" + urun.aciklama + "</p>"
            + "<button id='detaySepetBtn'>Sepete Ekle</button>";

        document.getElementById("detaySepetBtn").addEventListener("click", function() {
            var sepet = JSON.parse(localStorage.getItem("sepet")) || [];
            sepet.push(urun);
            localStorage.setItem("sepet", JSON.stringify(sepet));
            alert(urun.ad + " sepete eklendi!");
        });
    }
}

var gonderBtn = document.getElementById("gonderBtn");
if (gonderBtn) {
    gonderBtn.addEventListener("click", function() {
        var ad = document.getElementById("ad").value;
        var email = document.getElementById("email").value;
        var mesaj = document.getElementById("mesaj").value;

        if (ad === "" || email === "" || mesaj === "") {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        alert("Mesajınız gönderildi! Teşekkürler, " + ad + ".");
        document.getElementById("ad").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mesaj").value = "";
    });
}

/*oyun*/
var sorular = [
    { soru: "Hangi renk her kıyafetle uyum sağlar?", secenekler: ["Sarı", "Siyah", "Turuncu", "Mor"], dogru: 1 },
    { soru: "Kot pantolon hangi mevsimde daha çok tercih edilir?", secenekler: ["Yaz", "Kış", "İlkbahar", "Her mevsim"], dogru: 3 },
    { soru: "Hoodie ile en çok hangi alt giysi kombinlenir?", secenekler: ["Etek", "Pantolon", "Şort", "Hepsi"], dogru: 3 },
    { soru: "Spor ayakkabı hangi tarz kıyafetle uyumludur?", secenekler: ["Casual", "Spor", "Günlük", "Hepsi"], dogru: 3 },
    { soru: "Mont hangi mevsimde kullanılır?", secenekler: ["Yaz", "İlkbahar", "Kış", "Sonbahar"], dogru: 2 }
];

var mevcutSoru = 0;
var puan = 0;

var soruAlani = document.getElementById("soru");
if (soruAlani) {
    soruGoster();

    document.getElementById("ileriBtn").addEventListener("click", function() {
        mevcutSoru++;
        if (mevcutSoru < sorular.length) {
            soruGoster();
        } else {
            document.getElementById("soru").innerHTML = "Quiz bitti!";
            document.getElementById("secenekler").innerHTML = "";
            document.getElementById("sonuc").innerHTML = "Puanın: " + puan + " / " + sorular.length;
            document.getElementById("ileriBtn").style.display = "none";
        }
    });
}

function soruGoster() {
    var s = sorular[mevcutSoru];
    document.getElementById("soru").innerHTML = (mevcutSoru + 1) + ". " + s.soru;
    document.getElementById("secenekler").innerHTML = "";
    document.getElementById("sonuc").innerHTML = "";

    for (var i = 0; i < s.secenekler.length; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = s.secenekler[i];
        btn.className = "secenekBtn";
        btn.setAttribute("data-index", i);
        document.getElementById("secenekler").appendChild(btn);
    }

    document.getElementById("secenekler").addEventListener("click", function(e) {
        if (e.target.className === "secenekBtn") {
            var secilen = parseInt(e.target.getAttribute("data-index"));
            if (secilen === sorular[mevcutSoru].dogru) {
                document.getElementById("sonuc").innerHTML = "Doğru!";
                puan++;
            } else {
                document.getElementById("sonuc").innerHTML = "Yanlış!";
            }
        }
    });
}
