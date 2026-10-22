const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

function setMenu(open) {
  navbar.classList.toggle("active", open);
  menuIcon.classList.toggle("bx-x", open);
  menuIcon.setAttribute("aria-expanded", String(open));
}

menuIcon.addEventListener("click", () => {
  setMenu(!navbar.classList.contains("active"));
});

navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const form = document.querySelector("#contact-form");
const statusText = document.querySelector("#form-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const sendButton = form.querySelector("button[type='submit']");
    sendButton.disabled = true;
    statusText.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        statusText.textContent = "Thank you! Your message was sent.";
      } else {
        statusText.textContent =
          "Sorry, something went wrong. Please try again or email me directly.";
      }
    } catch (error) {
      statusText.textContent =
        "Network problem. Please check your connection and try again.";
    }

    sendButton.disabled = false;
  });

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phone-error");

  phoneInput.addEventListener("input", function () {
    // Keep digits only and limit to 10 characters
    this.value = this.value.replace(/\D/g, "").slice(0, 10);

    const phone = this.value;

    if (phone === "") {
      phoneError.textContent = "";
    } else if (!phone.startsWith("09")) {
      phoneError.textContent = "Phone number must start with 09.";
    } else if (phone.length < 10) {
      phoneError.textContent = "Enter all 10 digits.";
    } else {
      phoneError.textContent = "";
    }
  });

  function isValidPhone() {
    const valid = /^09\d{8}$/.test(phoneInput.value);

    if (!valid) {
      phoneError.textContent =
        "Enter a valid 10-digit phone number starting with 09.";
      phoneInput.focus();
    }

    return valid;
  }
}
