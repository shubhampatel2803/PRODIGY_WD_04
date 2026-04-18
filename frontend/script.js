// AOS INIT (your animation feature)
AOS.init({
  duration: 1000,
  once: true
});

// FIX LOADER (prevents infinite loading issue)
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 700);
});


// SAFE GITHUB FETCH (FIXED CRASH ISSUE)
fetch("https://api.github.com/users/shubhampatel2803/repos")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("project-container");

    container.innerHTML = "";

    data.slice(0, 6).forEach(repo => {

      const desc =
        repo.description && repo.description.trim() !== ""
          ? repo.description
          : "No description available — click view to explore project";

      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
  <h3>${repo.name}</h3>
  <p>${desc}</p>
  <small>⭐ ${repo.stargazers_count} | 🧠 ${repo.language || "N/A"}</small>
  <a href="${repo.html_url}" target="_blank">View Project</a>
`;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("project-container").innerHTML =
      "<p>Unable to load projects</p>";
  });