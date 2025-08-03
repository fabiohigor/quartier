// Quartier Santa Inês Landing Page JavaScript

// Global variables
let leadModal;
let photoModal;
let plantaModal;
let countdownInterval;
let currentPhotoIndex = 0;

// Photo gallery data
const galleryPhotos = [
    {
        src: "img/PORTARIA-SOCIAL.webp",
        alt: "Portaria principal",
        title: "Portaria Principal",
    },
    {
        src: "img/PORTARIA_SERVICO.webp",
        alt: "Portaria de Serviços",
        title: "Portaria de Serviços",
    },
    {
        src: "img/QUADRA_AREIA.webp",
        alt: "Quadras de areia",
        title: "Quadras de areia",
    },
    {
        src: "img/QUADRA-POLIESPORTIVA.webp",
        alt: "Quadra poliesportiva",
        title: "Quadra poliesportiva",
    },
    {
        src: "img/QUADRA-PADEL.webp",
        alt: "Quadra de Padel",
        title: "Quadra de Padel",
    },
    {
        src: "img/ESPACO-FITNESS.webp",
        alt: "Espaço Fitness",
        title: "Espaço Fitness",
    },
    {
        src: "img/BRINQUEDOTECA.webp",
        alt: "Brinquedoteca",
        title: "Brinquedoteca",
    },
    {
        src: "img/PLAYGROUND.webp",
        alt: "Playground",
        title: "Playground",
    },
    {
        src: "img/PLAYGROUND2.webp",
        alt: "Playground",
        title: "Playground",
    },
    {
        src: "img/ESPACO-GOURMET.webp",
        alt: "Espaços gourmet",
        title: "Espaços gourmet",
    },
    {
        src: "img/CHURRASQUEIRA.webp",
        alt: "Churrasqueira",
        title: "Churrasqueira",
    },
    {
        src: "img/PET-PLACE.webp",
        alt: "Pet Place",
        title: "Pet Place",
    },
    {
        src: "img/PISCINA-BIRIBOL.webp",
        alt: "Piscina de Biribol",
        title: "Piscina de Biribol",
    },
    {
        src: "img/PRAINHA.webp",
        alt: "Prainha",
        title: "Prainha",
    },
    {
        src: "img/POMAR-PICNIC.webp",
        alt: "Espaço Picnic",
        title: "Espaço Picnic",
    },
    {
        src: "img/PISTA-CAMINHADA.webp",
        alt: "Pista de caminhada",
        title: "Pista de caminhada",
    },
];

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initializePage();
    startCountdown();
    setupScrollAnimations();
    setupFloatingLogo();
});

// Initialize page functionality
function initializePage() {
    leadModal = document.getElementById("leadModal");
    photoModal = document.getElementById("photoModal");
    plantaModal = document.getElementById("plantaModal");

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === leadModal) {
            closeLeadModal();
        }
        if (event.target === photoModal) {
            closePhotoModal();
        }
        if (event.target === plantaModal) {
            closePlantaModal();
        }
    });

    // Handle escape key for modals
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (leadModal && leadModal.style.display === "block") {
                closeLeadModal();
            }
            if (photoModal && photoModal.style.display === "block") {
                closePhotoModal();
            }
            if (plantaModal && plantaModal.style.display === "block") {
                closePlantaModal();
            }
        }

        // Handle arrow keys for photo navigation
        if (photoModal && photoModal.style.display === "block") {
            if (event.key === "ArrowLeft") {
                previousPhoto();
            }
            if (event.key === "ArrowRight") {
                nextPhoto();
            }
        }
    });

    // Format phone inputs
    setupPhoneFormatting();

    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
}

// Lead Modal functions
function openLeadModal() {
    console.log("Opening lead modal...");
    if (leadModal) {
        leadModal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Focus on first input
        const firstInput = leadModal.querySelector("input");
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        // Track modal opening (analytics placeholder)
        trackEvent("modal_opened", "lead_form");
    } else {
        console.error("Lead modal element not found");
    }
}

function closeLeadModal() {
    console.log("Closing lead modal...");
    if (leadModal) {
        leadModal.style.display = "none";
        document.body.style.overflow = "auto";

        // Track modal closing (analytics placeholder)
        trackEvent("modal_closed", "lead_form");
    }
}

// Photo Modal functions
function openPhotoModal(photoIndex) {
    console.log("Opening photo modal with index:", photoIndex);
    if (photoModal && galleryPhotos[photoIndex]) {
        currentPhotoIndex = photoIndex;
        updatePhotoModal();
        photoModal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Track photo view
        trackEvent("photo_viewed", "gallery", {
            photo_title: galleryPhotos[photoIndex].title,
            photo_index: photoIndex,
        });
    } else {
        console.error("Photo modal element not found or invalid photo index");
    }
}

function closePhotoModal() {
    console.log("Closing photo modal...");
    if (photoModal) {
        photoModal.style.display = "none";
        document.body.style.overflow = "auto";

        // Track modal closing
        trackEvent("photo_modal_closed", "gallery");
    }
}

function previousPhoto() {
    currentPhotoIndex =
        (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    updatePhotoModal();
    trackEvent("photo_navigation", "gallery", {
        direction: "previous",
        photo_index: currentPhotoIndex,
    });
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    updatePhotoModal();
    trackEvent("photo_navigation", "gallery", {
        direction: "next",
        photo_index: currentPhotoIndex,
    });
}

function updatePhotoModal() {
    if (!photoModal || !galleryPhotos[currentPhotoIndex]) return;

    const photo = galleryPhotos[currentPhotoIndex];
    const photoImg = document.getElementById("photoModalImage");
    const photoTitle = document.getElementById("photoModalTitle");
    const photoCounter = document.getElementById("photoModalCounter");

    if (photoImg) {
        photoImg.src = photo.src;
        photoImg.alt = photo.alt;
    }

    if (photoTitle) {
        photoTitle.textContent = photo.title;
    }

    if (photoCounter) {
        photoCounter.textContent = `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;
    }
}

// Form handling
function handleLeadForm(event) {
    console.log("Handling form submission...");
    event.preventDefault();

    const form = event.target;

    // Get form fields
    const nameField = form.querySelector('input[type="text"]');
    const emailField = form.querySelector('input[type="email"]');
    const phoneField = form.querySelector('input[type="tel"]');
    const timeField = form.querySelector("select");

    const leadData = {
        name: nameField ? nameField.value : "",
        email: emailField ? emailField.value : "",
        phone: phoneField ? phoneField.value : "",
        timeframe: timeField ? timeField.value : "",
        timestamp: new Date().toISOString(),
        source: "quartier_landing_page",
    };

    console.log("Lead data:", leadData);

    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
        showNotification(
            "Por favor, preencha todos os campos obrigatórios.",
            "error",
        );
        return;
    }

    // Validate email
    if (!isValidEmail(leadData.email)) {
        showNotification("Por favor, insira um e-mail válido.", "error");
        return;
    }

    // Validate phone
    if (!isValidPhone(leadData.phone)) {
        showNotification("Por favor, insira um telefone válido.", "error");
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success simulation
        showNotification(
            "Obrigado! Em breve entraremos em contato com você.",
            "success",
        );

        // Reset form
        form.reset();

        // Close modal if it's open
        if (leadModal && leadModal.style.display === "block") {
            closeLeadModal();
        }

        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        // Track successful submission
        trackEvent("form_submitted", "lead_conversion", leadData);

        // Redirect to WhatsApp after success with correct phone number
        setTimeout(() => {
            const message = encodeURIComponent(
                `Olá! Acabei de preencher o formulário no site e gostaria de saber mais sobre o Quartier Santa Inês. Meu nome é ${leadData.name}.`,
            );
            window.open(
                `https://wa.me/5567999422025?text=${message}`,
                "_blank",
            );
        }, 2000);
    }, 1500);
}

// Countdown timer
function startCountdown() {
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            // Reset to 7 days when countdown ends
            targetDate.setTime(now + 7 * 24 * 60 * 60 * 1000);
        }

        const days = Math.floor(Math.abs(distance) / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (Math.abs(distance) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
            (Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60),
        );

        // Update DOM elements
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");

        if (daysElement)
            daysElement.textContent = String(days).padStart(2, "0");
        if (hoursElement)
            hoursElement.textContent = String(hours).padStart(2, "0");
        if (minutesElement)
            minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    // Update immediately
    updateCountdown();

    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Start new interval
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Phone number formatting
function setupPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach((input) => {
        input.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");

            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }

            e.target.value = value;
        });

        // Add placeholder
        if (!input.placeholder) {
            input.placeholder = "(67) 99999-9999";
        }
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                // Add staggered animation for grid items
                const gridItems = entry.target.querySelectorAll(
                    ".diferencial-card, .amenidade-item, .pagamento-card, .gallery-item",
                );
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll(
        ".diferenciais, .amenidades, .localizacao, .pagamento, .prova-social",
    );
    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.6s ease-out";
        observer.observe(section);

        // Prepare grid items for animation
        const gridItems = section.querySelectorAll(
            ".diferencial-card, .amenidade-item, .pagamento-card, .gallery-item",
        );
        gridItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.transition = "all 0.4s ease-out";
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /\(\d{2}\)\s\d{4,5}-\d{4}/;
    const cleanPhone = phone.replace(/\D/g, "");
    return phoneRegex.test(phone) || cleanPhone.length >= 10;
}

function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;

    // Set notification content
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    const backgroundColor =
        type === "success"
            ? "#4CAF50"
            : type === "error"
              ? "#f44336"
              : "#2196F3";
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1002;
        max-width: 400px;
        font-family: var(--font-family-base);
        font-size: 14px;
        animation: slideInRight 0.3s ease-out;
    `;

    const notificationContent = notification.querySelector(
        ".notification-content",
    );
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;

    const closeButton = notification.querySelector(".notification-close");
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        margin-left: 12px;
    `;

    // Add close functionality
    closeButton.addEventListener("click", function () {
        notification.style.animation = "slideOutRight 0.3s ease-out";
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    });

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = "slideOutRight 0.3s ease-out";
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function trackEvent(action, category, data = {}) {
    // Analytics tracking placeholder
    console.log("Event tracked:", { action, category, data });

    // Here you would integrate with Google Analytics, Facebook Pixel, etc.
    // Example:
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: data.source || 'landing_page'
    // });

    // Facebook Pixel example:
    // fbq('track', 'Lead', data);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Planta Modal functions
function openPlantaModal() {
    console.log("Opening planta modal...");
    if (plantaModal) {
        plantaModal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Track planta view
        trackEvent("planta_viewed", "localizacao");
    } else {
        console.error("Planta modal element not found");
    }
}

function closePlantaModal() {
    console.log("Closing planta modal...");
    if (plantaModal) {
        plantaModal.style.display = "none";
        document.body.style.overflow = "auto";

        // Track modal closing
        trackEvent("planta_modal_closed", "localizacao");
    }
}

// Floating Logo functionality
function setupFloatingLogo() {
    const floatingLogo = document.getElementById("floatingLogo");
    const footer = document.querySelector(".footer");
    const footerLogo = document.querySelector(".footer-logo");

    if (!floatingLogo || !footer || !footerLogo) return;

    let isMovingToFooter = false;
    let lastScrollY = window.scrollY;

    function updateFloatingLogo() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const footerRect = footer.getBoundingClientRect();
        const footerLogoRect = footerLogo.getBoundingClientRect();

        // Calcula se o rodapé está visível
        const footerVisible = footerRect.top < windowHeight;

        // Se o rodapé está visível e ainda não começou a mover
        if (footerVisible && !isMovingToFooter) {
            isMovingToFooter = true;
            floatingLogo.classList.add("moving-to-footer");

            // Calcula a posição final baseada na logo do rodapé
            const targetX =
                footerLogoRect.left +
                footerLogoRect.width / 2 -
                floatingLogo.offsetWidth / 2;
            const targetY =
                footerLogoRect.top +
                window.scrollY +
                footerLogoRect.height / 2 -
                floatingLogo.offsetHeight / 2;

            // Move a logo para a posição do rodapé
            floatingLogo.style.left = targetX + "px";
            floatingLogo.style.top = targetY + "px";

            // Esconde a logo flutuante após a animação
            setTimeout(() => {
                floatingLogo.style.opacity = "0";
                floatingLogo.style.visibility = "hidden";
            }, 600);
        } else if (!footerVisible && isMovingToFooter) {
            // Se o rodapé não está mais visível, volta a logo para a posição original
            isMovingToFooter = false;
            floatingLogo.classList.remove("moving-to-footer");
            floatingLogo.style.left = "";
            floatingLogo.style.top = "";
            floatingLogo.style.opacity = "";
            floatingLogo.style.visibility = "";
        }

        // Efeito de fade baseado no scroll
        if (!isMovingToFooter) {
            const scrollProgress = Math.min(scrollY / 200, 1);
            const opacity = 0.9 - scrollProgress * 0.1;
            floatingLogo.style.opacity = Math.max(opacity, 0.7);
        }

        lastScrollY = scrollY;
    }

    // Throttle da função de scroll para melhor performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateFloatingLogo);
            ticking = true;
            setTimeout(() => {
                ticking = false;
            }, 16);
        }
    }

    // Event listeners
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", updateFloatingLogo);

    // Inicialização
    updateFloatingLogo();
}

// Export functions for global access
window.openLeadModal = openLeadModal;
window.closeLeadModal = closeLeadModal;
window.handleLeadForm = handleLeadForm;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.previousPhoto = previousPhoto;
window.nextPhoto = nextPhoto;
window.openPlantaModal = openPlantaModal;
window.closePlantaModal = closePlantaModal;
