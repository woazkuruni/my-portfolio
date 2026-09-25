document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BASIC ELEMENTS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const revealElements = document.querySelectorAll(".reveal");
    const projectCards = document.querySelectorAll(".project-card");
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setMenuState(isOpen) {

        if (!menuBtn || !navLinks) {
            return;
        }

        const icon = menuBtn.querySelector("i");

        navLinks.classList.toggle(
            "show",
            isOpen
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuBtn.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );


        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    }


    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            function () {

                setMenuState(
                    !navLinks.classList.contains(
                        "show"
                    )
                );

            }
        );

    }


    navItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    setMenuState(false);

                }
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                navLinks &&
                navLinks.classList.contains("show") &&
                !event.target.closest(".nav-container")
            ) {

                setMenuState(false);

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains("show")
            ) {

                setMenuState(false);


                if (menuBtn) {

                    menuBtn.focus();

                }

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNav() {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 190;


        sections.forEach(
            function (section) {

                if (
                    section.offsetTop <=
                    scrollPosition
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        if (
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 10
        ) {

            const lastSection =
                sections[
                    sections.length - 1
                ];


            if (lastSection) {

                currentSection =
                    lastSection.getAttribute("id");

            }

        }


        navItems.forEach(
            function (item) {

                const isActive =
                    item.getAttribute("href") ===
                    "#" + currentSection;


                item.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    item.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    item.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbarState() {

        if (!navbar) {
            return;
        }


        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        backToTop.classList.toggle(
            "show",
            window.scrollY > 550
        );

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       OPTIMIZED SCROLL HANDLER
    ===================================================== */

    let scrollTicking = false;


    function handleScroll() {

        if (scrollTicking) {
            return;
        }


        scrollTicking = true;


        window.requestAnimationFrame(
            function () {

                updateActiveNav();

                updateNavbarState();

                updateBackToTop();


                scrollTicking = false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("show");


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"

                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       PROJECT CARD STAGGER
    ===================================================== */

    projectCards.forEach(
        function (
            project,
            index
        ) {

            project.style
                .transitionDelay =
                    index * 90 + "ms";


            project.addEventListener(
                "transitionend",
                function clearDelay() {

                    project.style
                        .transitionDelay =
                            "0ms";


                    project.removeEventListener(
                        "transitionend",
                        clearDelay
                    );

                }
            );

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SKILLS ACCORDION
    ===================================================== */

    const skillCategories =
        document.querySelectorAll(
            ".skill-category"
        );


    skillCategories.forEach(
        function (category) {

            const trigger =
                category.querySelector(
                    ".skill-category-trigger"
                );


            if (!trigger) {
                return;
            }


            trigger.addEventListener(
                "click",
                function () {

                    const isOpen =
                        category.classList.contains(
                            "open"
                        );


                    skillCategories.forEach(
                        function (item) {

                            item.classList.remove(
                                "open"
                            );


                            const itemTrigger =
                                item.querySelector(
                                    ".skill-category-trigger"
                                );


                            if (itemTrigger) {

                                itemTrigger.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }
                    );


                    if (!isOpen) {

                        category.classList.add(
                            "open"
                        );


                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       ABOUT INFINITE CYCLIC SLIDER
    ===================================================== */

    const aboutTrack =
        document.getElementById(
            "aboutTrack"
        );

    const aboutPrev =
        document.getElementById(
            "aboutPrev"
        );

    const aboutNext =
        document.getElementById(
            "aboutNext"
        );

    const aboutDots =
        document.getElementById(
            "aboutSliderDots"
        );


    if (
        aboutTrack &&
        aboutPrev &&
        aboutNext
    ) {

        let isAboutAnimating = false;

        let currentAboutIndex = 0;

        let aboutFallbackTimer = null;


        /* =============================================
           CARDS PER VIEW
        ============================================== */

        function getAboutCardsPerView() {

            if (
                window.innerWidth <= 650
            ) {

                return 1;

            }


            if (
                window.innerWidth <= 900
            ) {

                return 2;

            }


            return 3;

        }


        /* =============================================
           GET CARDS
        ============================================== */

        function getAboutCards() {

            return Array.from(
                aboutTrack.querySelectorAll(
                    ".about-card"
                )
            );

        }


        /* =============================================
           CARD MOVEMENT DISTANCE
        ============================================== */

        function getAboutStep() {

            const cards =
                getAboutCards();


            if (!cards.length) {

                return 0;

            }


            const cardWidth =
                cards[0]
                    .getBoundingClientRect()
                    .width;


            const style =
                window.getComputedStyle(
                    aboutTrack
                );


            const gap =
                parseFloat(
                    style.columnGap ||
                    style.gap
                ) || 0;


            return cardWidth + gap;

        }


        /* =============================================
           CAN SLIDE?
        ============================================== */

        function canAboutSlide() {

            return (
                getAboutCards().length >
                getAboutCardsPerView()
            );

        }


        /* =============================================
           UPDATE BUTTONS
        ============================================== */

        function updateAboutButtons() {

            const disabled =
                !canAboutSlide();


            aboutPrev.disabled =
                disabled;


            aboutNext.disabled =
                disabled;


            aboutPrev.setAttribute(
                "aria-disabled",
                String(disabled)
            );


            aboutNext.setAttribute(
                "aria-disabled",
                String(disabled)
            );

        }


        /* =============================================
           CREATE DOTS
        ============================================== */

        function createAboutDots() {

            if (!aboutDots) {

                return;

            }


            aboutDots.innerHTML =
                "";


            const total =
                getAboutCards()
                    .length;


            if (
                total <=
                getAboutCardsPerView()
            ) {

                return;

            }


            for (
                let i = 0;
                i < total;
                i++
            ) {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.classList.add(
                    "about-slider-dot"
                );


                dot.classList.toggle(
                    "active",
                    i ===
                    currentAboutIndex
                );


                aboutDots.appendChild(
                    dot
                );

            }

        }


        /* =============================================
           UPDATE DOTS
        ============================================== */

        function updateAboutDots() {

            if (!aboutDots) {

                return;

            }


            aboutDots
                .querySelectorAll(
                    ".about-slider-dot"
                )
                .forEach(
                    function (
                        dot,
                        index
                    ) {

                        dot.classList.toggle(
                            "active",
                            index ===
                            currentAboutIndex
                        );

                    }
                );

        }


        /* =============================================
           RESET TRACK
        ============================================== */

        function resetAboutTrack() {

            aboutTrack.style.transition =
                "none";


            aboutTrack.style.transform =
                "translateX(0)";


            void aboutTrack.offsetWidth;


            aboutTrack.style.transition =
                "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

        }


        /* =============================================
           TRANSITION FALLBACK
        ============================================== */

        function finishAboutSlide(
            callback
        ) {

            let finished = false;


            function finish(
                event
            ) {

                if (finished) {

                    return;

                }


                if (
                    event &&
                    (
                        event.target !==
                        aboutTrack ||
                        event.propertyName !==
                        "transform"
                    )
                ) {

                    return;

                }


                finished = true;


                aboutTrack
                    .removeEventListener(
                        "transitionend",
                        finish
                    );


                if (
                    aboutFallbackTimer
                ) {

                    window.clearTimeout(
                        aboutFallbackTimer
                    );


                    aboutFallbackTimer =
                        null;

                }


                callback();

            }


            aboutTrack
                .addEventListener(
                    "transitionend",
                    finish
                );


            aboutFallbackTimer =
                window.setTimeout(

                    function () {

                        finish(null);

                    },

                    700

                );

        }


        /* =============================================
           NEXT

           123 → 234 → 341 → 412
        ============================================== */

        aboutNext.addEventListener(
            "click",
            function () {

                if (
                    isAboutAnimating ||
                    !canAboutSlide()
                ) {

                    return;

                }


                const cards =
                    getAboutCards();


                const step =
                    getAboutStep();


                if (
                    !cards.length ||
                    step <= 0
                ) {

                    return;

                }


                isAboutAnimating =
                    true;


                aboutTrack.style.transition =
                    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";


                aboutTrack.style.transform =
                    "translateX(-" +
                    step +
                    "px)";


                finishAboutSlide(

                    function () {

                        const firstCard =
                            getAboutCards()[0];


                        if (firstCard) {

                            aboutTrack
                                .appendChild(
                                    firstCard
                                );

                        }


                        resetAboutTrack();


                        const total =
                            getAboutCards()
                                .length;


                        if (total) {

                            currentAboutIndex =
                                (
                                    currentAboutIndex +
                                    1
                                ) %
                                total;

                        }


                        updateAboutDots();


                        isAboutAnimating =
                            false;

                    }

                );

            }
        );


        /* =============================================
           PREVIOUS

           123 → 412 → 341 → 234
        ============================================== */

        aboutPrev.addEventListener(
            "click",
            function () {

                if (
                    isAboutAnimating ||
                    !canAboutSlide()
                ) {

                    return;

                }


                const cards =
                    getAboutCards();


                if (!cards.length) {

                    return;

                }


                const lastCard =
                    cards[
                        cards.length - 1
                    ];


                isAboutAnimating =
                    true;


                aboutTrack.style.transition =
                    "none";


                aboutTrack.insertBefore(
                    lastCard,
                    cards[0]
                );


                const step =
                    getAboutStep();


                aboutTrack.style.transform =
                    "translateX(-" +
                    step +
                    "px)";


                void aboutTrack.offsetWidth;


                aboutTrack.style.transition =
                    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";


                aboutTrack.style.transform =
                    "translateX(0)";


                finishAboutSlide(

                    function () {

                        const total =
                            getAboutCards()
                                .length;


                        if (total) {

                            currentAboutIndex =
                                (
                                    currentAboutIndex -
                                    1 +
                                    total
                                ) %
                                total;

                        }


                        updateAboutDots();


                        isAboutAnimating =
                            false;

                    }

                );

            }
        );


        /* =============================================
           ABOUT RESIZE
        ============================================== */

        window.addEventListener(
            "resize",
            function () {

                isAboutAnimating =
                    false;


                if (
                    aboutFallbackTimer
                ) {

                    window.clearTimeout(
                        aboutFallbackTimer
                    );


                    aboutFallbackTimer =
                        null;

                }


                resetAboutTrack();

                updateAboutButtons();

                createAboutDots();

                updateAboutDots();

            }
        );


        resetAboutTrack();

        updateAboutButtons();

        createAboutDots();

        updateAboutDots();

    }


    /* =====================================================
       PROJECTS INFINITE CYCLIC SLIDER

       DESKTOP / TABLET = 2 CARDS
       MOBILE = 1 CARD
    ===================================================== */

    const projectsTrack =
        document.getElementById(
            "projectsTrack"
        );

    const projectsPrev =
        document.getElementById(
            "projectsPrev"
        );

    const projectsNext =
        document.getElementById(
            "projectsNext"
        );

    const projectsDots =
        document.getElementById(
            "projectsSliderDots"
        );


    if (
        projectsTrack &&
        projectsPrev &&
        projectsNext
    ) {

        let projectAnimating =
            false;

        let currentProjectIndex =
            0;

        let projectFallbackTimer =
            null;


        /* =============================================
           PROJECT CARDS PER VIEW
        ============================================== */

        function getProjectsPerView() {

            if (
                window.innerWidth <= 650
            ) {

                return 1;

            }


            return 2;

        }


        /* =============================================
           GET PROJECT CARDS
        ============================================== */

        function getProjectCards() {

            return Array.from(
                projectsTrack
                    .querySelectorAll(
                        ".project-card"
                    )
            );

        }


        /* =============================================
           PROJECT STEP
        ============================================== */

        function getProjectStep() {

            const cards =
                getProjectCards();


            if (!cards.length) {

                return 0;

            }


            const cardWidth =
                cards[0]
                    .getBoundingClientRect()
                    .width;


            const style =
                window.getComputedStyle(
                    projectsTrack
                );


            const gap =
                parseFloat(
                    style.columnGap ||
                    style.gap
                ) || 0;


            return cardWidth + gap;

        }


        /* =============================================
           CAN PROJECTS SLIDE?
        ============================================== */

        function canProjectsSlide() {

            return (
                getProjectCards().length >
                getProjectsPerView()
            );

        }


        /* =============================================
           PROJECT BUTTON STATE
        ============================================== */

        function updateProjectButtons() {

            const disabled =
                !canProjectsSlide();


            projectsPrev.disabled =
                disabled;


            projectsNext.disabled =
                disabled;


            projectsPrev.setAttribute(
                "aria-disabled",
                String(disabled)
            );


            projectsNext.setAttribute(
                "aria-disabled",
                String(disabled)
            );

        }


        /* =============================================
           CREATE PROJECT DOTS
        ============================================== */

        function createProjectDots() {

            if (!projectsDots) {

                return;

            }


            projectsDots.innerHTML =
                "";


            const total =
                getProjectCards()
                    .length;


            if (
                total <=
                getProjectsPerView()
            ) {

                return;

            }


            for (
                let i = 0;
                i < total;
                i++
            ) {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.classList.add(
                    "projects-slider-dot"
                );


                dot.classList.toggle(
                    "active",
                    i ===
                    currentProjectIndex
                );


                projectsDots.appendChild(
                    dot
                );

            }

        }


        /* =============================================
           UPDATE PROJECT DOTS
        ============================================== */

        function updateProjectDots() {

            if (!projectsDots) {

                return;

            }


            projectsDots
                .querySelectorAll(
                    ".projects-slider-dot"
                )
                .forEach(
                    function (
                        dot,
                        index
                    ) {

                        dot.classList.toggle(
                            "active",
                            index ===
                            currentProjectIndex
                        );

                    }
                );

        }


        /* =============================================
           RESET PROJECT TRACK
        ============================================== */

        function resetProjectTrack() {

            projectsTrack.style.transition =
                "none";


            projectsTrack.style.transform =
                "translateX(0)";


            void projectsTrack.offsetWidth;


            projectsTrack.style.transition =
                "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

        }


        /* =============================================
           PROJECT TRANSITION FALLBACK

           transitionend কোনো কারণে fire না হলেও
           slider আর stuck হবে না।
        ============================================== */

        function finishProjectSlide(
            callback
        ) {

            let finished =
                false;


            function finish(
                event
            ) {

                if (finished) {

                    return;

                }


                if (
                    event &&
                    (
                        event.target !==
                        projectsTrack ||
                        event.propertyName !==
                        "transform"
                    )
                ) {

                    return;

                }


                finished =
                    true;


                projectsTrack
                    .removeEventListener(
                        "transitionend",
                        finish
                    );


                if (
                    projectFallbackTimer
                ) {

                    window.clearTimeout(
                        projectFallbackTimer
                    );


                    projectFallbackTimer =
                        null;

                }


                callback();

            }


            projectsTrack
                .addEventListener(
                    "transitionend",
                    finish
                );


            projectFallbackTimer =
                window.setTimeout(

                    function () {

                        finish(null);

                    },

                    700

                );

        }


        /* =============================================
           NEXT

           1 2
           2 3
           3 4
           4 1
           1 2
        ============================================== */

        projectsNext.addEventListener(
            "click",
            function () {

                if (
                    projectAnimating ||
                    !canProjectsSlide()
                ) {

                    return;

                }


                const cards =
                    getProjectCards();


                const step =
                    getProjectStep();


                if (
                    !cards.length ||
                    step <= 0
                ) {

                    return;

                }


                projectAnimating =
                    true;


                projectsTrack.style.transition =
                    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";


                projectsTrack.style.transform =
                    "translateX(-" +
                    step +
                    "px)";


                finishProjectSlide(

                    function () {

                        const firstCard =
                            getProjectCards()[0];


                        if (firstCard) {

                            projectsTrack
                                .appendChild(
                                    firstCard
                                );

                        }


                        resetProjectTrack();


                        const total =
                            getProjectCards()
                                .length;


                        if (total) {

                            currentProjectIndex =
                                (
                                    currentProjectIndex +
                                    1
                                ) %
                                total;

                        }


                        updateProjectDots();


                        projectAnimating =
                            false;

                    }

                );

            }
        );


        /* =============================================
           PREVIOUS

           1 2
           4 1
           3 4
           2 3
           1 2
        ============================================== */

        projectsPrev.addEventListener(
            "click",
            function () {

                if (
                    projectAnimating ||
                    !canProjectsSlide()
                ) {

                    return;

                }


                const cards =
                    getProjectCards();


                if (!cards.length) {

                    return;

                }


                const lastCard =
                    cards[
                        cards.length - 1
                    ];


                projectAnimating =
                    true;


                projectsTrack.style.transition =
                    "none";


                projectsTrack.insertBefore(
                    lastCard,
                    cards[0]
                );


                const step =
                    getProjectStep();


                projectsTrack.style.transform =
                    "translateX(-" +
                    step +
                    "px)";


                void projectsTrack.offsetWidth;


                projectsTrack.style.transition =
                    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";


                projectsTrack.style.transform =
                    "translateX(0)";


                finishProjectSlide(

                    function () {

                        const total =
                            getProjectCards()
                                .length;


                        if (total) {

                            currentProjectIndex =
                                (
                                    currentProjectIndex -
                                    1 +
                                    total
                                ) %
                                total;

                        }


                        updateProjectDots();


                        projectAnimating =
                            false;

                    }

                );

            }
        );


        /* =============================================
           PROJECT RESIZE FIX
        ============================================== */

        window.addEventListener(
            "resize",
            function () {

                projectAnimating =
                    false;


                if (
                    projectFallbackTimer
                ) {

                    window.clearTimeout(
                        projectFallbackTimer
                    );


                    projectFallbackTimer =
                        null;

                }


                resetProjectTrack();

                updateProjectButtons();

                createProjectDots();

                updateProjectDots();

            }
        );


        /* Initial project slider state */

        resetProjectTrack();

        updateProjectButtons();

        createProjectDots();

        updateProjectDots();

    }


    /* =====================================================
       PROJECT DETAILS MODAL
    ===================================================== */

    const projectModal =
        document.getElementById(
            "projectModal"
        );

    const projectModalClose =
        document.getElementById(
            "projectModalClose"
        );

    const projectModalTitle =
        document.getElementById(
            "projectModalTitle"
        );

    const projectModalDescription =
        document.getElementById(
            "projectModalDescription"
        );

    const projectModalImage =
        document.getElementById(
            "projectModalImage"
        );

    const projectModalPlaceholder =
        document.getElementById(
            "projectModalPlaceholder"
        );

    const projectModalLive =
        document.getElementById(
            "projectModalLive"
        );

    const projectModalGithub =
        document.getElementById(
            "projectModalGithub"
        );


    let lastProjectViewButton =
        null;


    /* =================================================
       OPEN PROJECT MODAL
    ================================================= */

    function openProjectModal(
        card,
        trigger
    ) {

        if (
            !projectModal ||
            !card
        ) {

            return;

        }


        lastProjectViewButton =
            trigger || null;


        const title =
            card.querySelector(
                ".project-content h3"
            );


        const description =
            card.querySelector(
                ".project-content > p"
            );


        const image =
            card.querySelector(
                ".project-image img"
            );


        const liveLink =
            card.querySelector(
                ".project-links .live-btn"
            );


        const githubLink =
            card.querySelector(
                ".project-links .github-btn"
            );


        /* Title */

        if (
            projectModalTitle
        ) {

            projectModalTitle.textContent =
                title
                    ? title
                        .textContent
                        .trim()
                    : "Project";

        }


        /* Description */

        if (
            projectModalDescription
        ) {

            projectModalDescription
                .textContent =
                    description
                        ? description
                            .textContent
                            .trim()
                        : "";

        }


        /* Image */

        if (
            image &&
            projectModalImage
        ) {

            projectModalImage.src =
                image.currentSrc ||
                image.src;


            projectModalImage.alt =
                image.alt || "";


            projectModalImage.style
                .display =
                    "block";


            if (
                projectModalPlaceholder
            ) {

                projectModalPlaceholder
                    .style
                    .display =
                        "none";

            }

        } else {

            if (
                projectModalImage
            ) {

                projectModalImage.src =
                    "";


                projectModalImage.alt =
                    "";


                projectModalImage.style
                    .display =
                        "none";

            }


            if (
                projectModalPlaceholder
            ) {

                projectModalPlaceholder
                    .style
                    .display =
                        "flex";

            }

        }


        /* Live Project */

        if (
            liveLink &&
            projectModalLive
        ) {

            projectModalLive.href =
                liveLink.href;


            projectModalLive.style
                .display =
                    "inline-flex";

        } else if (
            projectModalLive
        ) {

            projectModalLive
                .removeAttribute(
                    "href"
                );


            projectModalLive.style
                .display =
                    "none";

        }


        /* GitHub */

        if (
            githubLink &&
            projectModalGithub
        ) {

            projectModalGithub.href =
                githubLink.href;


            projectModalGithub.style
                .display =
                    "inline-flex";

        } else if (
            projectModalGithub
        ) {

            projectModalGithub
                .removeAttribute(
                    "href"
                );


            projectModalGithub.style
                .display =
                    "none";

        }


        /* Show modal */

        projectModal
            .classList
            .add(
                "open"
            );


        projectModal
            .setAttribute(
                "aria-hidden",
                "false"
            );


        document.body
            .classList
            .add(
                "modal-open"
            );


        if (
            projectModalClose
        ) {

            window.setTimeout(
                function () {

                    projectModalClose
                        .focus();

                },
                50
            );

        }

    }


    /* =================================================
       CLOSE PROJECT MODAL
    ================================================= */

    function closeProjectModal() {

        if (
            !projectModal ||
            !projectModal
                .classList
                .contains("open")
        ) {

            return;

        }


        projectModal
            .classList
            .remove(
                "open"
            );


        projectModal
            .setAttribute(
                "aria-hidden",
                "true"
            );


        document.body
            .classList
            .remove(
                "modal-open"
            );


        if (
            lastProjectViewButton
        ) {

            lastProjectViewButton
                .focus();


            lastProjectViewButton =
                null;

        }

    }


    /* =================================================
       VIEW DETAILS BUTTON
       + OUTSIDE / BACKDROP CLICK
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const viewButton =
                event.target.closest(
                    ".project-view-btn"
                );


            if (viewButton) {

                const card =
                    viewButton.closest(
                        ".project-card"
                    );


                openProjectModal(
                    card,
                    viewButton
                );


                return;

            }


            if (
                event.target.matches(
                    "[data-project-modal-close]"
                )
            ) {

                closeProjectModal();

            }

        }
    );


    /* =================================================
       MODAL X BUTTON
    ================================================= */

    if (
        projectModalClose
    ) {

        projectModalClose
            .addEventListener(
                "click",
                closeProjectModal
            );

    }


    /* =================================================
       MODAL ESC KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                    "Escape" &&
                projectModal &&
                projectModal
                    .classList
                    .contains("open")
            ) {

                closeProjectModal();

            }

        }
    );


    /* =====================================================
       GLOBAL RESIZE FIX
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 900
            ) {

                setMenuState(false);

            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateActiveNav();

    updateNavbarState();

    updateBackToTop();

});