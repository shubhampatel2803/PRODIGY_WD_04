AOS.init({ duration: 1000, once: true });

// LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 800);
});


// TYPEWRITER EFFECT
const text = ["Frontend Developer", "MERN Stack Learner", "Problem Solver"];
let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  current = text[i];

  if (isDeleting) {
    document.getElementById("type").textContent = current.substring(0, j--);
  } else {
    document.getElementById("type").textContent = current.substring(0, j++);
  }

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// GITHUB PROJECTS
fetch("https://api.github.com/users/shubhampatel2803/repos")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("project-container");

    data.slice(0, 6).forEach(repo => {
      const div = document.createElement("div");
      div.className = "project-card";

      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description"}</p>
        <a href="${repo.html_url}" target="_blank" class="btn">View</a>
      `;

      container.appendChild(div);
    });
  });