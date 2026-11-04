
// Engineering College JavaScript

console.log("Engineering College website loaded!");


// Student Life: News Filter

const filterContainer = document.querySelector("#newsFilters");

if (filterContainer) {

    const filterButtons = filterContainer.querySelectorAll(".filter-btn");
    const newsItems = document.querySelectorAll(".news-item");
    const filterStatus = document.querySelector("#filterStatus");

    // Show filters only when JavaScript is available
    filterContainer.hidden = false;

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;
            let visibleCount = 0;

            // Update active button
            filterButtons.forEach(item => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", isActive);
            });

            // Filter news cards
            newsItems.forEach(item => {

                const category = item.dataset.category;

                const isVisible =
                    selectedCategory === "all" ||
                    category === selectedCategory;

                item.hidden = !isVisible;

                if (isVisible) {
                    visibleCount++;
                }

            });

            filterStatus.textContent =
                `Showing ${visibleCount} news items.`;

        });

    });

}

// Contact Form Validation

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    const feedback = document.querySelector("#contactFeedback");

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Anti-spam honeypot
        const honeypot = document.querySelector("#website");

        if (honeypot.value.trim() !== "") {
            feedback.textContent = "Unable to process this request.";
            feedback.style.color = "#dc2626";
            return;
        }

        // Check required fields
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            feedback.textContent =
                "Please complete all required fields correctly.";

            feedback.style.color = "#dc2626";

            return;
        }

        // Demo success message
        feedback.textContent =
            "Thank you! Your message has been successfully submitted.";

        feedback.style.color = "#15803d";

        // Reset form
        contactForm.reset();

    });

}

// Registration Form Validation

const registrationForm = document.querySelector("#registrationForm");

if (registrationForm) {

    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");
    const intake = document.querySelector("#intake");
    const feedback = document.querySelector("#registrationFeedback");
    const studyError = document.querySelector("#studyError");

    // Prevent selecting a date in the past
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    intake.min = localDate;


    // Check password confirmation while typing
    function checkPasswords() {

        if (confirmPassword.value === "") {
            confirmPassword.setCustomValidity("");
            return;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }

    }

    password.addEventListener("input", checkPasswords);
    confirmPassword.addEventListener("input", checkPasswords);


    // Remove error styling when fields are corrected
    registrationForm.querySelectorAll("input, select").forEach(field => {

        field.addEventListener("input", () => {
            field.classList.remove("is-invalid");
        });

        field.addEventListener("change", () => {
            field.classList.remove("is-invalid");
        });

    });


    // Form submission
    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        feedback.textContent = "";
        feedback.className = "mt-4";

        checkPasswords();

        let isValid = true;

        // Validate all required fields
        const requiredFields = registrationForm.querySelectorAll(
            "input[required]:not([type='radio']), select[required]"
        );

        requiredFields.forEach(field => {

            if (!field.checkValidity()) {

                field.classList.add("is-invalid");
                isValid = false;

            } else {

                field.classList.remove("is-invalid");

            }

        });


        // Validate study mode
        const selectedMode = registrationForm.querySelector(
            "input[name='studyMode']:checked"
        );

        if (!selectedMode) {

            studyError.style.display = "block";
            isValid = false;

        } else {

            studyError.style.display = "none";

        }


        // Stop if something is invalid
        if (!isValid) {

            feedback.textContent =
                "Please check the highlighted fields and try again.";

            feedback.style.color = "#dc2626";

            registrationForm.reportValidity();

            return;

        }


        // Successful registration (demo)
        const studentName =
            document.querySelector("#fullName").value.trim();

        const selectedProgram =
            document.querySelector("#program").value;

        feedback.innerHTML = "";

        const successBox = document.createElement("div");
        successBox.className = "registration-success";

        const title = document.createElement("h4");
        title.textContent = "Application Submitted Successfully!";

        const message = document.createElement("p");
        message.textContent =
            `Thank you, ${studentName}! Your application for ${selectedProgram} has been completed successfully.`;

        const note = document.createElement("p");
        note.textContent =
            "This is a demonstration confirmation. Your application has not been sent to a real admissions office.";

        successBox.append(title, message, note);
        feedback.appendChild(successBox);

        // Clear form after successful submission
        registrationForm.reset();

        // Restore date restriction
        intake.min = localDate;

        // Remove validation styles
        registrationForm.querySelectorAll(".is-invalid").forEach(field => {
            field.classList.remove("is-invalid");
        });

        studyError.style.display = "none";

        // Move keyboard focus to confirmation
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();

    });

}

// FAQ Accordion

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    question.addEventListener("click", () => {

        const isExpanded =
            question.getAttribute("aria-expanded") === "true";

        // Close all FAQ items
        faqItems.forEach(otherItem => {

            const otherQuestion =
                otherItem.querySelector(".faq-question");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            const otherIcon =
                otherItem.querySelector(".faq-icon");

            otherQuestion.setAttribute("aria-expanded", "false");
            otherAnswer.hidden = true;
            otherIcon.textContent = "+";

        });

        // Open selected item
        if (!isExpanded) {

            question.setAttribute("aria-expanded", "true");
            answer.hidden = false;
            icon.textContent = "−";

        }

    });

});
