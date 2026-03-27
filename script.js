document.addEventListener("DOMContentLoaded", () => {
  const welcomeOverlay = document.getElementById("welcomeOverlay");
  const sparklesContainer = document.getElementById("sparkles");
  const copyButtons = document.querySelectorAll(".copy-btn");
  if (!welcomeOverlay) return;

  if (sparklesContainer) {
    for (let i = 0; i < 26; i += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${45 + Math.random() * 55}%`;
      sparkle.style.animationDelay = `${Math.random() * 4}s`;
      sparkle.style.animationDuration = `${6 + Math.random() * 5}s`;
      sparklesContainer.appendChild(sparkle);
    }
  }

  // Keep welcome visible briefly, then hide smoothly.
  setTimeout(() => {
    welcomeOverlay.classList.add("is-hidden");
  }, 3200);

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const valueToCopy = button.getAttribute("data-copy");
      if (!valueToCopy) return;

      let copied = false;
      try {
        await navigator.clipboard.writeText(valueToCopy);
        copied = true;
      } catch (error) {
        const tempInput = document.createElement("input");
        tempInput.value = valueToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        copied = document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      if (copied) {
        const oldText = button.textContent;
        button.textContent = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = oldText;
          button.classList.remove("copied");
        }, 1200);
      }
    });
  });
});
