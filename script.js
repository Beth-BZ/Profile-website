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

const EMAIL = "fkadeal@open.et";

const form = document.querySelector("#contact-form");
const phone = document.querySelector("#phone");
const phoneError = document.querySelector("#phone-error");
const statusText = document.querySelector("#form-status");

function phoneProblem(value) {
  const startsWrong = !/^(0|09)?$/.test(value) && !value.startsWith("09");
  if (startsWrong) return "The number must start with 09.";
  if (value.length < 10) return "Enter all 10 digits, for example 0912345678.";
  return "";
}

if (phone) {
  phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/\D/g, "");
    const problem = phoneProblem(phone.value);
    phone.setCustomValidity(problem);
    phoneError.textContent = problem.startsWith("The number") ? problem : "";
  });

  phone.addEventListener("blur", () => {
    if (phone.value) phoneError.textContent = phoneProblem(phone.value);
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const subject = "Portfolio inquiry: " + data.get("subject");
    const body =
      "Name: " +
      data.get("name") +
      "\n" +
      "Email: " +
      data.get("email") +
      "\n" +
      "Phone: " +
      data.get("phone") +
      "\n\n" +
      data.get("message");

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const mailtoLink =
      "mailto:" + EMAIL + "?subject=" + encodedSubject + "&body=" + encodedBody;
    const gmailLink =
      "https://mail.google.com/mail/?view=cm&to=" +
      EMAIL +
      "&su=" +
      encodedSubject +
      "&body=" +
      encodedBody;

    window.open(gmailLink, "_blank", "noopener");

    statusText.textContent =
      "Gmail should open with your message ready to send. Prefer another mail app? ";
    const fallback = document.createElement("a");
    fallback.href = mailtoLink;
    fallback.textContent = "Open it in your mail app.";
    statusText.append(fallback);
  });
}
