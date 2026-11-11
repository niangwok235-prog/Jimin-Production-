
document.addEventListener("DOMContentLoaded", () => {

  // COMPANY CONTACT SETTINGS
  const WHATSAPP = "67572603605";
  const EMAIL = "jimoxyamaski7@gmail.com";

  // SERVICES
  const services = [
    {
      name: "Photography",
      icon: "📷",
      category: "media",
      description: "Professional portraits, events, corporate photography and product images."
    },
    {
      name: "Videography",
      icon: "🎥",
      category: "media",
      description: "Creative event coverage, promotional videos, interviews and documentaries."
    },
    {
      name: "Graphic Design",
      icon: "✒️",
      category: "design",
      description: "Professional logos, posters, flyers, banners and visual communication."
    },
    {
      name: "Social Media Design",
      icon: "🌐",
      category: "digital",
      description: "Creative social media content and digital marketing visuals."
    },
    {
      name: "Print Design",
      icon: "🖨️",
      category: "print",
      description: "Business cards, brochures, labels, stickers and print-ready designs."
    },
    {
      name: "Drone Photography",
      icon: "🚁",
      category: "media",
      description: "Aerial photography and videography for special projects and events."
    },
    {
      name: "Website Development",
      icon: "💻",
      category: "digital",
      description: "Modern responsive websites for businesses and organisations."
    },
    {
      name: "ID Card Design",
      icon: "🪪",
      category: "print",
      description: "Professional personal, company, membership and staff identification."
    },
    {
      name: "Flyer & Poster Design",
      icon: "📰",
      category: "design",
      description: "Attention-grabbing flyers and posters for promotions and events."
    },
    {
      name: "Birthday Designs",
      icon: "🎂",
      category: "design",
      description: "Birthday invitations, banners, social media artwork and more."
    },
    {
      name: "CV & Resume Design",
      icon: "📄",
      category: "design",
      description: "Professional CV and resume layouts for job applications."
    },
    {
      name: "Video Editing",
      icon: "🎬",
      category: "media",
      description: "Professional editing, transitions, effects and storytelling."
    },
    {
      name: "Animation",
      icon: "✨",
      category: "digital",
      description: "Creative video animation, motion graphics and character animation."
    },
    {
      name: "Brand Identity",
      icon: "🏢",
      category: "design",
      description: "Complete brand identity and visual consistency for organisations."
    },
    {
      name: "Photo Editing",
      icon: "🖼️",
      category: "media",
      description: "Retouching, colour correction and creative image enhancement."
    },
    {
      name: "Company Profiles",
      icon: "📚",
      category: "print",
      description: "Professional company profiles, proposals and presentations."
    }
  ];

  const grid = document.getElementById("servicesGrid");
  const serviceSelect = document.getElementById("service");

  // BUILD SERVICE CARDS
  grid.innerHTML = services.map(service => `
    <article class="service-card" data-cat="${service.category}">
      <div class="service-icon">${service.icon}</div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <button type="button" data-service="${service.name}">
        Enquire About Service →
      </button>
    </article>
  `).join("");

  // POPULATE SERVICE SELECT
  serviceSelect.innerHTML += services.map(service =>
    `<option value="${service.name}">${service.name}</option>`
  ).join("") + `
    <option value="Custom Project">Custom Project</option>
    <option value="Other">Other Services</option>
  `;

  // SERVICE FILTERS
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {

      const category = chip.dataset.cat;

      chips.forEach(item => item.classList.remove("active"));
      chip.classList.add("active");

      document.querySelectorAll(".service-card").forEach(card => {
        card.hidden = !(
          category === "all" ||
          card.dataset.cat === category
        );
      });

    });
  });

  // MOBILE NAVIGATION
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  menuBtn.addEventListener("click", () => {

    const open = nav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    menuBtn.textContent = open ? "✕" : "☰";

  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation");
      menuBtn.textContent = "☰";
    });
  });

  // SERVICE ENQUIRY SHORTCUT
  grid.addEventListener("click", event => {

    const button = event.target.closest("[data-service]");

    if (!button) return;

    serviceSelect.value = button.dataset.service;

    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });

  });

  // ENQUIRY FORM
  const form = document.getElementById("enquiryForm");
  const result = document.getElementById("result");
  const messageOutput = document.getElementById("messageOutput");
  const whatsappLink = document.getElementById("whatsappLink");
  const emailLink = document.getElementById("emailLink");
  const status = document.getElementById("status");

  form.addEventListener("submit", event => {

    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = serviceSelect.value;
    const details = document.getElementById("details").value.trim();

    const message = [
      "Hello Jimin Multimedia Limited,",
      "",
      "I would like to make a project enquiry.",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Email: " + (email || "Not provided"),
      "Service: " + service,
      "",
      "Project details:",
      details,
      "",
      "Thank you."
    ].join("\n");

    messageOutput.value = message;

    whatsappLink.href =
      "https://wa.me/" + WHATSAPP +
      "?text=" + encodeURIComponent(message);

    emailLink.href =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent("Project Enquiry - " + service) +
      "&body=" + encodeURIComponent(message);

    result.hidden = false;
    status.textContent = "";

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  });

  // COPY MESSAGE
  document.getElementById("copyButton").addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(messageOutput.value);

      status.textContent = "Enquiry copied successfully.";

    } catch (error) {

      messageOutput.focus();
      messageOutput.select();

      status.textContent =
        "Select the message and choose Copy.";

    }

  });

  // FOOTER YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

});


