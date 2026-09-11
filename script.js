/* =========================================================
   PREMIUM CINEMATIC PORTFOLIO
   GALLERY SYSTEM
========================================================= */


/* =========================================================
   NAVBAR SCROLL
========================================================= */

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const closeMenu = document.querySelector(".close-menu");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.add("active");

        document.body.classList.add("menu-open");

    });

}


if (closeMenu && navLinks) {

    closeMenu.addEventListener("click", function () {

        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
========================================================= */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

    });

});


/* =========================================================
   OPEN CATEGORY GALLERY
========================================================= */

function openGallery(galleryId) {

    const mainPortfolio =
        document.getElementById("mainPortfolio");

    const galleries =
        document.querySelectorAll(".gallery-section");

    const selectedGallery =
        document.getElementById(galleryId);


    if (!selectedGallery) {

        console.error(
            "Gallery not found:",
            galleryId
        );

        return;
    }


    /* Close mobile menu */

    if (navLinks) {

        navLinks.classList.remove("active");

    }

    document.body.classList.remove("menu-open");


    /* Hide main portfolio */

    if (mainPortfolio) {

        mainPortfolio.classList.add(
            "portfolio-hidden"
        );

    }


    /* Remove active from all galleries */

    galleries.forEach(function (gallery) {

        gallery.classList.remove("active");

        gallery.style.display = "none";

    });


    /* Activate selected gallery */

    selectedGallery.classList.add("active");

    selectedGallery.style.display = "block";


    /* Enable gallery mode */

    document.body.classList.add("gallery-mode");

    document.body.classList.add("gallery-open");


    /* Save active gallery */

    document.body.setAttribute(
        "data-active-gallery",
        galleryId
    );


    /* Start from top */

    window.scrollTo({

        top: 0,
        left: 0,
        behavior: "auto"

    });

}


/* =========================================================
   CLOSE CATEGORY GALLERY
========================================================= */

function closeGallery() {

    const mainPortfolio =
        document.getElementById("mainPortfolio");

    const galleries =
        document.querySelectorAll(".gallery-section");

    const portfolioSection =
        document.getElementById("portfolio");


    /* Close lightbox if open */

    const lightbox =
        document.getElementById("lightbox");

    if (
        lightbox &&
        lightbox.classList.contains("active")
    ) {

        closeLightbox();

    }


    /* Hide all galleries */

    galleries.forEach(function (gallery) {

        gallery.classList.remove("active");

        gallery.style.display = "none";

    });


    /* Show main portfolio */

    if (mainPortfolio) {

        mainPortfolio.classList.remove(
            "portfolio-hidden"
        );

    }


    /* Remove gallery mode */

    document.body.classList.remove(
        "gallery-mode"
    );

    document.body.classList.remove(
        "gallery-open"
    );


    /* Remove active gallery */

    document.body.removeAttribute(
        "data-active-gallery"
    );


    /* Return to portfolio */

    setTimeout(function () {

        if (portfolioSection) {

            portfolioSection.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    }, 50);

}


/* =========================================================
   ESC KEY
   PRESS ESC TO CLOSE GALLERY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const lightbox =
                document.getElementById("lightbox");


            /* Close lightbox first */

            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

                return;

            }


            /* Otherwise close gallery */

            const activeGallery =
                document.querySelector(
                    ".gallery-section.active"
                );

            if (activeGallery) {

                closeGallery();

            }

        }

    }
);


/* =========================================================
   LIGHTBOX VARIABLES
========================================================= */

let currentGalleryItems = [];

let currentLightboxIndex = 0;


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(element) {

    const lightbox =
        document.getElementById("lightbox");

    const lightboxContent =
        document.getElementById(
            "lightboxContent"
        );


    if (
        !lightbox ||
        !lightboxContent ||
        !element
    ) {

        return;

    }


    /* -----------------------------------------------------
       GET CURRENT ACTIVE GALLERY
    ----------------------------------------------------- */

    const activeGallery =
        document.querySelector(
            ".gallery-section.active"
        );


    if (!activeGallery) {

        return;

    }


    /* -----------------------------------------------------
       GET ALL IMAGES + VIDEOS
    ----------------------------------------------------- */

    currentGalleryItems =
        Array.from(
            activeGallery.querySelectorAll(
                ".gallery-item img, .gallery-item video"
            )
        );


    /* -----------------------------------------------------
       GET CLICKED IMAGE / VIDEO
    ----------------------------------------------------- */

    const clickedMedia =
        element.querySelector(
            "img, video"
        );


    if (!clickedMedia) {

        return;

    }


    /* -----------------------------------------------------
       FIND CORRECT INDEX
    ----------------------------------------------------- */

    currentLightboxIndex =
        currentGalleryItems.indexOf(
            clickedMedia
        );


    if (currentLightboxIndex < 0) {

        currentLightboxIndex = 0;

    }


    /* -----------------------------------------------------
       SHOW CONTENT
    ----------------------------------------------------- */

    showLightboxItem();


    /* -----------------------------------------------------
       SHOW LIGHTBOX
    ----------------------------------------------------- */

    lightbox.classList.add("active");

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   SHOW CURRENT LIGHTBOX ITEM
========================================================= */

function showLightboxItem() {

    /* -----------------------------------------------------
       RESET ZOOM
    ----------------------------------------------------- */

    currentZoom = 1;


    const zoomLevel =
        document.getElementById(
            "zoomLevel"
        );


    if (zoomLevel) {

        zoomLevel.textContent = "100%";

    }


    /* -----------------------------------------------------
       GET CONTENT AREA
    ----------------------------------------------------- */

    const lightboxContent =
        document.getElementById(
            "lightboxContent"
        );


    if (!lightboxContent) {

        return;

    }


    /* -----------------------------------------------------
       STOP OLD VIDEO
    ----------------------------------------------------- */

    const oldVideo =
        lightboxContent.querySelector(
            "video"
        );


    if (oldVideo) {

        oldVideo.pause();

        oldVideo.removeAttribute(
            "src"
        );

        oldVideo.load();

    }


    /* -----------------------------------------------------
       CLEAR OLD CONTENT
    ----------------------------------------------------- */

    lightboxContent.innerHTML = "";


    /* -----------------------------------------------------
       GET CURRENT MEDIA
    ----------------------------------------------------- */

    const element =
        currentGalleryItems[
            currentLightboxIndex
        ];


    if (!element) {

        return;

    }


    /* =====================================================
       IMAGE
    ===================================================== */

    if (
        element.tagName.toLowerCase()
        === "img"
    ) {

        const image =
            document.createElement("img");


        image.src =
            element.currentSrc ||
            element.src;


        image.alt =
            element.alt ||
            "Portfolio image";


        lightboxContent.appendChild(
            image
        );

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    else if (
        element.tagName.toLowerCase()
        === "video"
    ) {

        const video =
            document.createElement("video");


        /* Video controls */

        video.controls = true;


        /* Autoplay */

        video.autoplay = true;


        /* Mobile support */

        video.playsInline = true;


        /* Load video */

        video.preload = "auto";


        /* Important for autoplay */

        video.muted = true;


        /* Get original source */

        const videoSource =
            element.getAttribute("src");


        if (videoSource) {

            video.src = videoSource;

        }


        /* Keep poster if available */

        const poster =
            element.getAttribute(
                "poster"
            );


        if (
            poster &&
            poster !== "image/.jpg"
        ) {

            video.poster = poster;

        }


        /* Add video */

        lightboxContent.appendChild(
            video
        );


        /* -------------------------------------------------
           PLAY VIDEO
        ------------------------------------------------- */

        video.addEventListener(
            "loadeddata",
            function () {

                video.play().catch(
                    function (error) {

                        console.log(
                            "Video autoplay:",
                            error
                        );

                    }
                );

            }
        );


        /* Try playing immediately too */

        const playPromise =
            video.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(
                function () {

                    console.log(
                        "Click the play button if autoplay is blocked."
                    );

                }
            );

        }

    }

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxContent =
        document.getElementById(
            "lightboxContent"
        );


    if (!lightbox) {

        return;

    }


    /* -----------------------------------------------------
       STOP VIDEO
    ----------------------------------------------------- */

    if (lightboxContent) {

        const video =
            lightboxContent.querySelector(
                "video"
            );


        if (video) {

            video.pause();

            video.currentTime = 0;

            video.removeAttribute(
                "src"
            );

            video.load();

        }


        lightboxContent.innerHTML = "";

    }


    /* -----------------------------------------------------
       HIDE LIGHTBOX
    ----------------------------------------------------- */

    lightbox.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "lightbox-open"
    );

}


/* =========================================================
   NEXT LIGHTBOX ITEM
========================================================= */

function nextLightbox() {

    if (
        !currentGalleryItems.length
    ) {

        return;

    }


    currentLightboxIndex++;


    if (
        currentLightboxIndex >=
        currentGalleryItems.length
    ) {

        currentLightboxIndex = 0;

    }


    showLightboxItem();

}


/* =========================================================
   PREVIOUS LIGHTBOX ITEM
========================================================= */

function prevLightbox() {

    if (
        !currentGalleryItems.length
    ) {

        return;

    }


    currentLightboxIndex--;


    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            currentGalleryItems.length - 1;

    }


    showLightboxItem();

}


/* =========================================================
   LIGHTBOX CLICK EVENTS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (!lightbox) {

            return;

        }


        /* Click outside content */

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   LIGHTBOX KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        /* RIGHT ARROW */

        if (
            event.key === "ArrowRight"
        ) {

            nextLightbox();

        }


        /* LEFT ARROW */

        if (
            event.key === "ArrowLeft"
        ) {

            prevLightbox();

        }

    }
);


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const galleries =
            document.querySelectorAll(
                ".gallery-section"
            );


        galleries.forEach(
            function (gallery) {

                gallery.classList.remove(
                    "active"
                );

                gallery.style.display =
                    "none";

            }
        );


        document.body.classList.remove(
            "gallery-mode"
        );

        document.body.classList.remove(
            "gallery-open"
        );

        document.body.classList.remove(
            "portfolio-hidden"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    }
);


/* =========================================================
   CONTACT / INQUIRY EMAIL
========================================================= */

const inquiryForm =
    document.getElementById(
        "inquiryForm"
    );


if (inquiryForm) {

    inquiryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const eventType =
                document.getElementById(
                    "event"
                ).value;


            const eventDate =
                document.getElementById(
                    "date"
                ).value;


            const location =
                document.getElementById(
                    "location"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            const subject =
                `New Portfolio Inquiry - ${eventType}`;


            const body =
`Hello Pankaj,

I would like to enquire about your photography/cinematography services.

Name: ${name}

Email: ${email}

Phone: ${phone}

Service Required: ${eventType}

Event Date: ${eventDate || "Not specified"}

Event Location: ${location || "Not specified"}

Message:

${message || "No additional message provided."}

Thank you.`;


            const gmailURL =
                "https://mail.google.com/mail/?view=cm&fs=1" +
                "&to=pankajgoswami9891@gmail.com" +
                "&su=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);


            window.open(
                gmailURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   LIGHTBOX ZOOM
========================================================= */

let currentZoom = 1;

const MIN_ZOOM = 1;

const MAX_ZOOM = 3;

const ZOOM_STEP = 0.25;


/* =========================================================
   UPDATE ZOOM
========================================================= */

function updateZoom() {

    const lightboxContent =
        document.getElementById(
            "lightboxContent"
        );


    const zoomLevel =
        document.getElementById(
            "zoomLevel"
        );


    if (!lightboxContent) {

        return;

    }


    const element =
        lightboxContent.querySelector(
            "img, video"
        );


    if (!element) {

        return;

    }


    element.style.transform =
        `scale(${currentZoom})`;


    if (zoomLevel) {

        zoomLevel.textContent =
            Math.round(
                currentZoom * 100
            ) + "%";

    }

}


/* =========================================================
   ZOOM IN
========================================================= */

function zoomIn() {

    if (
        currentZoom >= MAX_ZOOM
    ) {

        return;

    }


    currentZoom += ZOOM_STEP;


    if (
        currentZoom > MAX_ZOOM
    ) {

        currentZoom = MAX_ZOOM;

    }


    updateZoom();

}


/* =========================================================
   ZOOM OUT
========================================================= */

function zoomOut() {

    if (
        currentZoom <= MIN_ZOOM
    ) {

        return;

    }


    currentZoom -= ZOOM_STEP;


    if (
        currentZoom < MIN_ZOOM
    ) {

        currentZoom = MIN_ZOOM;

    }


    updateZoom();

}