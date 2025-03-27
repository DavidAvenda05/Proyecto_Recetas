document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots-container');
    
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let translateX = 0;
    const visibleSlides = 3;
    
    // Crear puntos de navegación
    for (let i = 0; i <= slides.length - visibleSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Actualizar carrusel
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 15; // Incluye el gap
        translateX = -currentIndex * slideWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar puntos activos
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Ocultar/mostrar botones según posición
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex >= slides.length - visibleSlides ? 'none' : 'flex';
    }
    
    // Ir a slide específico
    function goToSlide(index) {
        if (index < 0 || index > slides.length - visibleSlides) return;
        currentIndex = index;
        updateCarousel();
    }
    
    // Eventos de botones
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Eventos de arrastre para móvil/tablet
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', startDrag, { passive: false });
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag, { passive: false });
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        carousel.style.transition = 'none';
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = x - startX;
        carousel.style.transform = `translateX(${translateX + diff}px)`;
        e.preventDefault();
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = x - startX;
        const slideWidth = slides[0].offsetWidth;
        const threshold = slideWidth / 3;
        
        carousel.style.transition = 'transform 0.3s ease';
        
        if (diff > threshold && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if (diff < -threshold && currentIndex < slides.length - visibleSlides) {
            goToSlide(currentIndex + 1);
        } else {
            updateCarousel(); // Vuelve a la posición actual
        }
    }
    
    // Ajustar al cambiar tamaño de pantalla
    window.addEventListener('resize', updateCarousel);
    
    // Inicializar
    updateCarousel();
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let contacto = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value
    };
    
    document.getElementById("respuesta").innerHTML = `<p>Gracias, ${contacto.nombre}. Hemos recibido tu mensaje.</p>`;
    console.log(JSON.stringify(contacto));
});