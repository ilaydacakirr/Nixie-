let urunler = [
    { ad: "Tişört", fiyat: 150 },
    { ad: "Beyaz Tişört", fiyat: 120 },
    { ad: "Sweatshirt", fiyat: 350 },
    { ad: "Hoodie", fiyat: 320 },
    { ad: "Pantolon", fiyat: 400 },
    { ad: "Kot Pantolon", fiyat: 450 },
    { ad: "Mont", fiyat: 1200 },
    { ad: "Ceket", fiyat: 800 },
    { ad: "Spor Ayakkabı", fiyat: 800 },
    { ad: "Bot", fiyat: 1000 }
];


// ✅ ÜRÜNLER SAYFASI (TÜM ÜRÜNLER)
let urunlerAlani = document.getElementById("urunler");

if (urunlerAlani) {
    for (let i = 0; i < urunler.length; i++) {
        urunlerAlani.innerHTML += `
        <div class="urun">
            <h3>${urunler[i].ad}</h3>
            <p>Fiyat: ${urunler[i].fiyat} TL</p>
            <button onclick="sepeteEkle(${i})">Sepete Ekle</button>
            <button onclick="detayaGit(${i})">Detay</button>
        </div>
        `;
    }
}


// ✅ ANA SAYFA (SADECE 4 ÜRÜN)
// DÜZELTİLDİ: id "anasayfaUrunler" (büyük U) — index.html ile eşleşmeli
let anaAlan = document.getElementById("anasayfaUrunler");

if (anaAlan) {
    let secilen = urunler.slice(0, 4);

    for (let i = 0; i < secilen.length; i++) {
        anaAlan.innerHTML += `
        <div class="urun">
            <h3>${secilen[i].ad}</h3>
            <p>Fiyat: ${secilen[i].fiyat} TL</p>
            <button onclick="sepeteEkle(${i})">Sepete Ekle</button>
            <button onclick="detayaGit(${i})">Detay</button>
        </div>
        `;
    }
}


// ✅ SEPETE EKLE
function sepeteEkle(index) {
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    sepet.push(urunler[index]);
    localStorage.setItem("sepet", JSON.stringify(sepet));
    alert(urunler[index].ad + " sepete eklendi!");
}


// ✅ SEPETİ GÖSTER
function sepetiGetir() {
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    let alan = document.getElementById("sepet");
    let toplam = 0;

    if (alan) {
        alan.innerHTML = "";

        if (sepet.length === 0) {
            alan.innerHTML = "<p style='color:#888; text-align:center;'>Sepetiniz boş.</p>";
        }

        for (let i = 0; i < sepet.length; i++) {
            alan.innerHTML += `<p>${sepet[i].ad} <span>${sepet[i].fiyat} TL</span></p>`;
            toplam += sepet[i].fiyat;
        }

        document.getElementById("toplam").innerHTML =
            "Toplam: " + toplam + " TL";
    }
}


// ✅ DETAY SAYFASINA GÖNDER
// DÜZELTİLDİ: pages/ klasöründen çağrıldığında doğru path
function detayaGit(index) {
    localStorage.setItem("seciliUrun", JSON.stringify(urunler[index]));

    // Hangi sayfadan çağrıldığını anla
    if (window.location.pathname.includes("/pages/")) {
        window.location.href = "detay.html";
    } else {
        window.location.href = "pages/detay.html";
    }
}


// ✅ DETAY GÖSTER
function detayiGoster() {
    let urun = JSON.parse(localStorage.getItem("seciliUrun"));
    let alan = document.getElementById("detay");

    if (urun && alan) {
        alan.innerHTML = `
            <h2>${urun.ad}</h2>
            <p>Fiyat: ${urun.fiyat} TL</p>
            <button onclick="sepeteEkleDetay()">Sepete Ekle</button>
        `;
    }
}


// ✅ DETAYDAN SEPETE EKLE
function sepeteEkleDetay() {
    let urun = JSON.parse(localStorage.getItem("seciliUrun"));
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    sepet.push(urun);
    localStorage.setItem("sepet", JSON.stringify(sepet));
    alert(urun.ad + " sepete eklendi!");
}


// ✅ İLETİŞİM FORMU KONTROL
function iletisimKontrol() {
    let ad = document.getElementById("ad").value.trim();
    let email = document.getElementById("email").value.trim();
    let mesaj = document.getElementById("mesaj").value.trim();

    if (ad === "" || email === "" || mesaj === "") {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
    }

    alert("Mesajınız başarıyla gönderildi! Teşekkürler, " + ad + ".");
    document.getElementById("ad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mesaj").value = "";
}
