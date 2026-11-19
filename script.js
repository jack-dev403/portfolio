document.addEventListener("DOMContentLoaded", () => {


    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.textContent = "☰";
            }
        });
    }


    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {


        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

    
                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    const typedText = document.getElementById("typedText");

    if (typedText && !prefersReducedMotion) {

        const phrases = [
            "digital experiences.",
            "useful web projects.",
            "creative solutions."
        ];

        let phraseIndex = 0;
        let characterIndex = phrases[0].length;
        let deleting = true;


        function typeNextPhrase() {

            const currentPhrase = phrases[phraseIndex];

            if (deleting) {
                characterIndex--;

                typedText.textContent = currentPhrase.substring(
                    0,
                    characterIndex
                );

                if (characterIndex <= 0) {
                    deleting = false;

                    phraseIndex = (phraseIndex + 1) % phrases.length;

                    setTimeout(typeNextPhrase, 400);
                    return;
                }

                setTimeout(typeNextPhrase, 45);

            } else {
                const nextPhrase = phrases[phraseIndex];

                characterIndex++;

                typedText.textContent = nextPhrase.substring(
                    0,
                    characterIndex
                );

                if (characterIndex >= nextPhrase.length) {
                    deleting = true;

                    setTimeout(typeNextPhrase, 1800);
                    return;
                }

                setTimeout(typeNextPhrase, 75);
            }
        }


        setTimeout(typeNextPhrase, 1800);
    }



    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

        
            if (!contactForm.reportValidity()) {
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.textContent =
                    "Please complete all the fields before continuing.";

                return;
            }

            const recipient = "jackkamau4458@gmail.com";

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            formStatus.textContent =
                "Opening your email app. Please review and send the message there.";

            window.location.href = mailtoLink;
        });
    }

});