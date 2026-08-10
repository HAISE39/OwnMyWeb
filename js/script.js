// ============================================================
// VELLIXAO OFFICIAL — Minimal interactions
// ============================================================

// Mobile nav
function hamburg() {
    document.querySelector(".dropdown").classList.add("active");
}

function cancel() {
    document.querySelector(".dropdown").classList.remove("active");
}

// Typewriter
const texts = ["DEVELOPER", "PROGRAMMER", "DESIGNER", "DIGITAL CREATOR"];
let speed = 80;
const tw = document.querySelector(".tw");
let textIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (!tw) return;
    if (charIndex < texts[textIndex].length) {
        tw.innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1800);
    }
}

function eraseText() {
    if (!tw) return;
    if (tw.innerHTML.length > 0) {
        tw.innerHTML = tw.innerHTML.slice(0, -1);
        setTimeout(eraseText, 40);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.addEventListener("DOMContentLoaded", typeWriter);

// Subtle reveal on scroll
(function () {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("in"));
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay;
                    if (delay) entry.target.style.transitionDelay = delay + "ms";
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
})();
