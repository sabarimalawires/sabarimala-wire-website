document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVBAR
    ========================= */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                navbar.style.background =
                    "rgba(16,24,16,.94)";

                navbar.style.backdropFilter =
                    "blur(14px)";

            } else {

                navbar.style.background =
                    "linear-gradient(to bottom, rgba(10,16,10,.7), transparent)";

                navbar.style.backdropFilter =
                    "none";

            }

        }
    );


    /* =========================
       SIMPLE REVEAL ANIMATION
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".solution-card, .project-card, .service-list > div, .product-list div, .founder-card"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

            observer.observe(
                element
            );

        }
    );


    /* =========================
       SMOOTH ANCHOR SCROLL
    ========================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        }
    );

});

/* =========================================================
   PRODUCT EXPLORER
========================================================= */

const productOptions =
    document.querySelectorAll(".product-option");

const mainProductImage =
    document.getElementById("mainProductImage");

const mainProductName =
    document.getElementById("mainProductName");

const mainProductSpec =
    document.getElementById("mainProductSpec");

const mainProductNumber =
    document.getElementById("mainProductNumber");

const productDisplay =
    document.querySelector(".product-display-image");


let productChangeTimer;


/* =========================================================
   CHANGE PRODUCT
========================================================= */

function changeProduct(option) {

    const image =
        option.querySelector("img");

    const newImage =
        image.getAttribute("src");

    const name =
        option.dataset.name;

    const spec =
        option.dataset.spec;

    const number =
        option.querySelector(".product-number").textContent.trim();


    /* Remove active state */

    productOptions.forEach(item => {

        item.classList.remove("active");

    });


    /* Add active state */

    option.classList.add("active");


    /* Fade image */

    productDisplay.classList.add("changing");


    clearTimeout(productChangeTimer);


    productChangeTimer =
        setTimeout(() => {

            mainProductImage.src =
                newImage;

            mainProductImage.alt =
                name;

            mainProductName.textContent =
                name;

            mainProductSpec.textContent =
                spec;

            mainProductNumber.textContent =
                number;


            productDisplay.classList.remove("changing");

        }, 220);

}


/* =========================================================
   DESKTOP — HOVER
========================================================= */

productOptions.forEach(option => {

    option.addEventListener(
        "mouseenter",
        () => {

            if (
                window.innerWidth > 1000
            ) {

                changeProduct(option);

            }

        }
    );


    /* =====================================================
       MOBILE + DESKTOP CLICK
    ===================================================== */

    option.addEventListener(
        "click",
        () => {

            changeProduct(option);

        }
    );

});

/* =========================================================
   SWP PRODUCT SPRITE INTERACTION
========================================================= */

const productCards =
    document.querySelectorAll(".product-card");

const lightbox =
    document.getElementById("productLightbox");

const lightboxImage =
    document.querySelector(".lightbox-image");

const lightboxName =
    document.getElementById("lightboxName");

const lightboxSubtitle =
    document.getElementById("lightboxSubtitle");

const lightboxNumber =
    document.getElementById("lightboxNumber");

const closeButton =
    document.getElementById("lightboxClose");


function openProduct(card) {

    const row =
        Number(card.dataset.row);

    const col =
        Number(card.dataset.col);

    const name =
        card.dataset.name;

    const subtitle =
        card.dataset.subtitle;

    /*
        Position the SAME image to show
        only the selected 4x4 quadrant.
    */

    const positions = {

        "0-0": "0% 0%",
        "0-1": "33.333% 0%",
        "0-2": "66.666% 0%",
        "0-3": "100% 0%",

        "1-0": "0% 33.333%",
        "1-1": "33.333% 33.333%",
        "1-2": "66.666% 33.333%",
        "1-3": "100% 33.333%",

        "2-0": "0% 66.666%",
        "2-1": "33.333% 66.666%",
        "2-2": "66.666% 66.666%",
        "2-3": "100% 66.666%",

        "3-0": "0% 100%",
        "3-1": "33.333% 100%",
        "3-2": "66.666% 100%",
        "3-3": "100% 100%"

    };


    const position =
        positions[`${row}-${col}`];


    lightboxImage.style.backgroundPosition =
        position;


    lightboxName.textContent =
        name;


    lightboxSubtitle.textContent =
        subtitle;


    lightboxNumber.textContent =
        `SWP PRODUCT ${String(
            row * 4 + col + 1
        ).padStart(2, "0")}`;


    lightbox.classList.add("active");

}


/* Desktop */

productCards.forEach(card => {

    productCards.forEach(card => {

    card.addEventListener("click", () => {
        openProduct(card);
    });

});

});


/* Close */

closeButton.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/* Click outside */

lightbox.addEventListener("click", event => {

    if (
        event.target === lightbox
    ) {

        lightbox.classList.remove("active");

    }

});


/* ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }

});

/* =====================================================
   QUOTE FORM → WHATSAPP
===================================================== */

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("quoteName").value.trim();
        const phone = document.getElementById("quotePhone").value.trim();
        const location = document.getElementById("quoteLocation").value.trim();
        const product = document.getElementById("quoteProduct").value.trim();
        const quantity = document.getElementById("quoteQuantity").value.trim();
        const height = document.getElementById("quoteHeight").value.trim();
        const message = document.getElementById("quoteMessage").value.trim();

        // Create WhatsApp message
        const text =
`NEW QUOTE REQUEST

Name: ${name}

Phone: ${phone}

Project Location: ${location || "Not specified"}

Fencing Requirement: ${product || "Not specified"}

Approximate Quantity: ${quantity || "Not specified"}

Required Height: ${height || "Not specified"}

Project Details:
${message || "Not specified"}`;

        // WhatsApp number
        const whatsappNumber = "918778672804";

        // Create WhatsApp URL
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(text);

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

    });

}

/* =========================
   HERO COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Smooth easing
                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.floor(target * easedProgress);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);
        });
    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* =====================================================
   INFINITE PROJECT IMAGE SLIDER
   AUTO 2 SEC + SWIPE + CIRCULAR
===================================================== */

const projectSlider =
    document.querySelector(".project-slide-track");

if (projectSlider) {

    const originalSlides =
        Array.from(projectSlider.children);

    const totalSlides =
        originalSlides.length;

    let currentSlide = 0;
    let startX = 0;
    let isDragging = false;

    /* Clone ALL slides */
    originalSlides.forEach(slide => {

        const clone = slide.cloneNode(true);

        projectSlider.appendChild(clone);

    });


    /* Get slide width */

    function getSlideWidth() {

        const slide =
            projectSlider.children[0];

        const gap =
            parseFloat(
                getComputedStyle(projectSlider).gap
            ) || 0;

        return slide.offsetWidth + gap;
    }


    /* =========================
       MOVE
    ========================= */

    function moveSlider(animate = true) {

        projectSlider.style.transition =
            animate
                ? "transform 0.6s ease"
                : "none";

        projectSlider.style.transform =
            `translateX(-${currentSlide * getSlideWidth()}px)`;
    }


    /* =========================
       NEXT
    ========================= */

    function nextSlide() {

        currentSlide++;

        moveSlider(true);


        /*
           We are now showing
           the cloned IMAGE 1
        */

        if (currentSlide === totalSlides) {

            setTimeout(() => {

                currentSlide = 0;

                moveSlider(false);

            }, 600);

        }

    }


    /* =========================
       PREVIOUS
    ========================= */

    function previousSlide() {

        if (currentSlide === 0) {

            /*
               Jump to the cloned
               last image first
            */

            currentSlide = totalSlides;

            moveSlider(false);

            requestAnimationFrame(() => {

                currentSlide = totalSlides - 1;

                moveSlider(true);

            });

        }

        else {

            currentSlide--;

            moveSlider(true);

        }

    }


    /* =========================
       AUTO SLIDE
       EVERY 2 SECONDS
    ========================= */

    let autoSlide =
        setInterval(nextSlide, 2000);


    function restartAutoSlide() {

        clearInterval(autoSlide);

        autoSlide =
            setInterval(nextSlide, 2000);

    }


    /* =========================
       TOUCH START
    ========================= */

    projectSlider.addEventListener(
        "touchstart",
        event => {

            startX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    /* =========================
       TOUCH END
    ========================= */

    projectSlider.addEventListener(
        "touchend",
        event => {

            const endX =
                event.changedTouches[0].clientX;

            const difference =
                startX - endX;


            if (difference > 50) {

                nextSlide();

                restartAutoSlide();

            }

            else if (difference < -50) {

                previousSlide();

                restartAutoSlide();

            }

        },
        { passive: true }
    );


    /* =========================
       MOUSE DRAG
    ========================= */

    projectSlider.addEventListener(
        "mousedown",
        event => {

            isDragging = true;

            startX =
                event.clientX;

            projectSlider.style.cursor =
                "grabbing";

        }
    );


    projectSlider.addEventListener(
        "mouseup",
        event => {

            if (!isDragging) return;

            const endX =
                event.clientX;

            const difference =
                startX - endX;


            if (difference > 50) {

                nextSlide();

                restartAutoSlide();

            }

            else if (difference < -50) {

                previousSlide();

                restartAutoSlide();

            }


            isDragging = false;

            projectSlider.style.cursor =
                "grab";

        }
    );


    projectSlider.addEventListener(
        "mouseleave",
        () => {

            isDragging = false;

            projectSlider.style.cursor =
                "grab";

        }
    );


    /* =========================
       INITIAL POSITION
    ========================= */

    projectSlider.style.cursor =
        "grab";

    moveSlider(false);


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener(
        "resize",
        () => {

            moveSlider(false);

        }
    );

}