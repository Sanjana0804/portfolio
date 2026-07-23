/* =====================================================
   NAVBAR
===================================================== */

const header =
    document.getElementById("header");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

menuBtn.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle("active");

    }
);


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove("active");

            }
        );

    });



/* =====================================================
   OPEN CATEGORY GALLERY
===================================================== */

function openGallery(category) {


    /* Get all galleries */

    const galleries =
        document.querySelectorAll(
            ".gallery-section"
        );


    /* Hide all galleries */

    galleries.forEach(
        function (gallery) {

            gallery.classList.remove(
                "active"
            );

        }
    );


    /* Get category cards */

    const categoryGrid =
        document.getElementById(
            "categoryGrid"
        );


    /* Hide category cards */

    categoryGrid.style.display =
        "none";


    /* Create selected gallery ID */

    const selectedGallery =
        document.getElementById(
            category + "Gallery"
        );


    /* Show selected gallery */

    if (selectedGallery) {

        selectedGallery.classList.add(
            "active"
        );


        /* Scroll to gallery */

        setTimeout(
            function () {

                selectedGallery.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            },
            100
        );

    }

}



/* =====================================================
   CLOSE CATEGORY GALLERY
===================================================== */

function closeGallery() {


    /* Get all galleries */

    const galleries =
        document.querySelectorAll(
            ".gallery-section"
        );


    /* Hide all galleries */

    galleries.forEach(
        function (gallery) {

            gallery.classList.remove(
                "active"
            );

        }
    );


    /* Show categories */

    const categoryGrid =
        document.getElementById(
            "categoryGrid"
        );


    categoryGrid.style.display =
        "grid";


    /* Scroll to categories */

    categoryGrid.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}



/* =====================================================
   LIGHTBOX VARIABLES
===================================================== */

let currentGalleryItems = [];

let currentLightboxIndex = 0;



/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(item) {


    /* Find parent gallery */

    const gallery =
        item.closest(
            ".gallery-section"
        );


    if (!gallery) {

        return;

    }


    /* Get items ONLY from
       selected category */

    currentGalleryItems =
        Array.from(
            gallery.querySelectorAll(
                ".gallery-item"
            )
        );


    /* Find clicked item */

    currentLightboxIndex =
        currentGalleryItems.indexOf(
            item
        );


    /* Display clicked item */

    showLightboxItem();

}



/* =====================================================
   SHOW LIGHTBOX ITEM
===================================================== */

function showLightboxItem() {


    /* Get current item */

    const item =
        currentGalleryItems[
            currentLightboxIndex
        ];


    if (!item) {

        return;

    }


    /* Get lightbox */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    /* Get content container */

    const content =
        document.getElementById(
            "lightboxContent"
        );


    /* Clear old content */

    content.innerHTML =
        "";


    /* Find image */

    const image =
        item.querySelector(
            "img"
        );


    /* Find video */

    const video =
        item.querySelector(
            "video"
        );



    /* =================================================
       SHOW IMAGE
    ================================================= */

    if (image) {


        const newImage =
            document.createElement(
                "img"
            );


        newImage.src =
            image.src;


        newImage.alt =
            image.alt;


        content.appendChild(
            newImage
        );

    }



    /* =================================================
       SHOW VIDEO
    ================================================= */

    if (video) {


        const newVideo =
            document.createElement(
                "video"
            );


        newVideo.src =
            video.src;


        newVideo.controls =
            true;


        newVideo.autoplay =
            true;


        newVideo.playsInline =
            true;


        newVideo.preload =
            "metadata";


        content.appendChild(
            newVideo
        );


        /* Try autoplay */

        newVideo.play()
            .catch(
                function () {

                    console.log(
                        "Video autoplay blocked."
                    );

                }
            );

    }


    /* Open lightbox */

    lightbox.classList.add(
        "active"
    );


    /* Stop background scrolling */

    document.body.style.overflow =
        "hidden";

}



/* =====================================================
   NEXT / PREVIOUS
===================================================== */

function changeLightbox(direction) {


    /* Check if gallery exists */

    if (
        currentGalleryItems.length === 0
    ) {

        return;

    }


    /* Change index */

    currentLightboxIndex +=
        direction;


    /* If first item,
       go to last item */

    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            currentGalleryItems.length - 1;

    }


    /* If last item,
       go to first item */

    if (
        currentLightboxIndex >=
        currentGalleryItems.length
    ) {

        currentLightboxIndex =
            0;

    }


    /* Show item */

    showLightboxItem();

}



/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {


    /* Get lightbox */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    /* Get content */

    const content =
        document.getElementById(
            "lightboxContent"
        );


    /* Remove image/video */

    content.innerHTML =
        "";


    /* Hide lightbox */

    lightbox.classList.remove(
        "active"
    );


    /* Restore page scrolling */

    document.body.style.overflow =
        "";

}



/* =====================================================
   CLICK OUTSIDE TO CLOSE
===================================================== */

document
    .getElementById("lightbox")
    .addEventListener(
        "click",
        function (event) {


            /* Only close if
               background is clicked */

            if (
                event.target === this
            ) {

                closeLightbox();

            }

        }
    );



/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {


        /* ESCAPE */

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        /* RIGHT ARROW */

        if (
            event.key === "ArrowRight"
        ) {

            changeLightbox(1);

        }


        /* LEFT ARROW */

        if (
            event.key === "ArrowLeft"
        ) {

            changeLightbox(-1);

        }

    }
);