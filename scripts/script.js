// Mobil menü toggle
document.addEventListener('DOMContentLoaded', function() {
    // Arka plan müziği otomatik başlat ve ses seviyesini ayarla
    const backgroundMusic = document.getElementById('backgroundMusic');
    let musicStarted = false;
    
    if (backgroundMusic) {
        backgroundMusic.volume = 0.1; // Ses seviyesini daha da düşür
        
        // Otomatik başlatmayı dene
        backgroundMusic.play().catch(function(error) {
            console.log('Müzik otomatik başlatılamadı, kullanıcı etkileşimi bekleniyor');
            
            // Mobil için: herhangi bir tıklama veya dokunma ile müziği başlat
            const startMusic = function() {
                if (!musicStarted) {
                    backgroundMusic.play().then(function() {
                        musicStarted = true;
                        console.log('Müzik başladı');
                    }).catch(function(err) {
                        console.log('Müzik başlatılamadı:', err);
                    });
                }
            };
            
            // İlk tıklama/dokunma ile müziği başlat
            document.body.addEventListener('click', startMusic, { once: true });
            document.body.addEventListener('touchstart', startMusic, { once: true });
        });
    }
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Sayfa yüklendiğinde scroll animasyonları için
    const cards = document.querySelectorAll('.info-card, .food-card, .place-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Lezzetler sayfası için tarif modal fonksiyonları
function showRecipe(foodName) {
    const modal = document.getElementById('recipeModal');
    const title = document.getElementById('recipeTitle');
    const text = document.getElementById('recipeText');
    
    const recipes = {
        'hamsi': {
            title: 'Hamsi Tava',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>500g hamsi</li><li>1 su bardağı mısır unu</li><li>Tuz</li><li>Sıvı yağ (kızartmak için)</li></ul><p><strong>Yapılışı:</strong></p><p>1. Hamsiler temizlenir ve yıkanır<br>2. Tuzlanıp mısır ununa bulanan hamsiler kızgın yağda kızartılır<br>3. Mısır ekmeği ile servis edilir</p>'
        },
        'misir': {
            title: 'Mısır Ekmeği',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>2 su bardağı mısır unu</li><li>1 su bardağı su</li><li>1 çay kaşığı tuz</li></ul><p><strong>Yapılışı:</strong></p><p>1. Malzemeler karıştırılır<br>2. Hamur yoğrulup yuvarlak şekiller verilir<br>3. Sacda veya tavada pişirilir</p>'
        },
        'lahana': {
            title: 'Karalahana Sarması',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>Karalahana yaprakları</li><li>1 su bardağı pirinç</li><li>1 soğan</li><li>Kıyma (isteğe bağlı)</li><li>Baharatlar</li></ul><p><strong>Yapılışı:</strong></p><p>1. Lahana yaprakları haşlanır<br>2. İç harcı hazırlanır<br>3. Sarılıp pişirilir</p>'
        },
        'corba': {
            title: 'Karalahana Çorbası',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>1 demet karalahana</li><li>1 soğan</li><li>Pirinç</li><li>Et suyu</li><li>Baharatlar</li></ul><p><strong>Yapılışı:</strong></p><p>1. Karalahana ince doğranır<br>2. Soğan kavrulur<br>3. Tüm malzemeler eklenerek pişirilir</p>'
        },
        'findik': {
            title: 'Fındık Ezmesi',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>200g kabuklu fındık</li><li>100g pudra şekeri</li><li>1 yemek kaşığı kakao</li></ul><p><strong>Yapılışı:</strong></p><p>1. Fındıklar kavrulur ve ince öğütülür<br>2. Diğer malzemelerle karıştırılır<br>3. Yoğrulup şekil verilir</p>'
        },
        'muhlama': {
            title: 'Muhlama',
            content: '<p><strong>Malzemeler:</strong></p><ul><li>200g kolot peyniri</li><li>3 yemek kaşığı mısır unu</li><li>2 yemek kaşığı tereyağı</li><li>Su</li></ul><p><strong>Yapılışı:</strong></p><p>1. Tereyağı eritilir<br>2. Mısır unu eklenir<br>3. Peynir ilave edilerek karıştırılır</p>'
        }
    };
    
    if (recipes[foodName]) {
        title.textContent = recipes[foodName].title;
        text.innerHTML = recipes[foodName].content;
        modal.style.display = 'block';
    }
}

function closeRecipe() {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
}

// Modal dışına tıklandığında kapat
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// İletişim formu
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basit validasyon
        if (name && email && subject && message) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.';
            contactForm.reset();
            
            // 5 saniye sonra mesajı gizle
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Lütfen tüm alanları doldurun.';
        }
    });
}
