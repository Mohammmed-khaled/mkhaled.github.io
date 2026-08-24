const scriptURL =
    "https://script.google.com/macros/s/AKfycbz6scxcK-ptww2QAVd_ZlQ3BFofFgfvCg3ORU3FgV6wWKaoiK9VDcq4Mc9wvivX-pQ/exec";

const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        statusMessage.textContent = "";

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            if (result.status !== "success") {
                throw new Error(result.message || "Message could not be sent.");
            }

            statusMessage.textContent = "Your message was sent successfully!";
            statusMessage.style.color = "green";

            form.reset();
        } catch (error) {
            console.error("Contact form error:", error);

            statusMessage.textContent =
                "Message could not be sent. Please email me directly.";

            statusMessage.style.color = "red";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}