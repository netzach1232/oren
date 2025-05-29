// === טופס שידוכים - סקריפט מלא עם ולידציה, הצעות לעיר, ובאנרים ===

const cityInput = document.getElementById("cityInput");
const suggestionsBox = document.getElementById("citySuggestions");
const selectedCityBox = document.getElementById("selectedCityBox");

// --- הצעות ערים ---
cityInput.addEventListener("input", () => {
    const val = cityInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = "";
    if (!val) {
        suggestionsBox.style.display = "none";
        return;
    }
    const matches = cities.filter(city => city.toLowerCase().includes(val));
    matches.slice(0, 20).forEach(city => {
        const div = document.createElement("div");
        div.textContent = city;
        div.className = "suggestion-item";
        div.addEventListener("click", () => {
            cityInput.value = "";
            suggestionsBox.innerHTML = "";
            suggestionsBox.style.display = "none";
            addSelectedCity(city);
        });
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = matches.length ? "block" : "none";
});

function addSelectedCity(cityName) {
    const existingTags = Array.from(selectedCityBox.children).map(tag => tag.textContent.replace("×", "").trim());
    if (existingTags.includes(cityName)) return;
    const tag = document.createElement("div");
    tag.className = "city-tag";
    tag.textContent = cityName;
    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "×";
    closeBtn.onclick = () => tag.remove();
    tag.appendChild(closeBtn);
    selectedCityBox.appendChild(tag);
}

// --- גילאים ---
window.onload = () => {
    const minAgeSelect = document.getElementById("ageMin");
    const maxAgeSelect = document.getElementById("ageMax");
    if (!minAgeSelect || !maxAgeSelect) return;
    for (let age = 18; age <= 65; age++) {
        const opt = document.createElement("option");
        opt.value = age;
        opt.textContent = age;
        minAgeSelect.appendChild(opt);
    }
    minAgeSelect.addEventListener("change", () => {
        const minAge = parseInt(minAgeSelect.value);
        maxAgeSelect.innerHTML = "";
        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "גיל מקסימום";
        maxAgeSelect.appendChild(defaultOpt);
        if (!isNaN(minAge)) {
            maxAgeSelect.disabled = false;
            for (let age = minAge; age <= 65; age++) {
                const opt = document.createElement("option");
                opt.value = age;
                opt.textContent = age;
                maxAgeSelect.appendChild(opt);
            }
        } else {
            maxAgeSelect.disabled = true;
        }
    });
};

// --- Enter בשדה עיר ---
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const firstSuggestion = suggestionsBox.querySelector(".suggestion-item");
        if (firstSuggestion) {
            firstSuggestion.click();
        } else if (cityInput.value.trim()) {
            addSelectedCity(cityInput.value.trim());
            cityInput.value = "";
            suggestionsBox.innerHTML = "";
            suggestionsBox.style.display = "none";
        }
    }
});

// --- ולידציה ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const requiredFields = form.querySelectorAll("[required]");
    const registerBtn = document.querySelector('button[type="submit"]');

    function clearErrorBanners() {
        document.querySelectorAll(".error-banner").forEach(el => el.remove());
    }

    function showErrorBanner(input, index) {
        const banner = document.createElement("div");
        banner.className = "error-banner";
        banner.textContent = "שדה חובה";
        const container = input.closest(".field-wrapper") || input.closest(".form-group") || input.closest(".checkbox-group") || input.closest(".gender-options") || input.parentElement;
        if (container && !container.querySelector(".error-banner")) {
            container.style.position = "relative";
            container.appendChild(banner);
        }
    }

    function scrollToElement(element) {
        const target = element.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2);
        const start = window.pageYOffset;
        const distance = target - start;
        const duration = 1000;
        let startTime = null;

        function animateScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, start + distance * progress);
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }

    registerBtn.addEventListener("click", (e) => {
        clearErrorBanners();
        let firstInvalid = null;
        requiredFields.forEach((input, index) => {
            let isEmpty = false;
            if (input.type === "radio" || input.type === "checkbox") {
                const group = form.querySelectorAll(`[name="${input.name}"]`);
                const oneChecked = Array.from(group).some(el => el.checked);
                isEmpty = !oneChecked;
            } else {
                isEmpty = !input.value.trim();
            }
            if (isEmpty) {
                showErrorBanner(input, index);
                if (!firstInvalid) firstInvalid = input;
            }
        });
        if (firstInvalid) {
            e.preventDefault();
            scrollToElement(firstInvalid);
            firstInvalid.focus();
        }
    });

    document.addEventListener("keydown", (e) => {
        const active = document.activeElement;
        if (e.key === "Enter") {
            if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) {
                e.preventDefault();
                active.blur();
            } else {
                registerBtn.click();
            }
        }
    });
});

// --- עדכון שם קובץ ---
function updateFileName(input) {
    const label = document.getElementById("fileLabel");
    if (input.files.length > 0) {
        label.textContent = input.files[0].name;
    } else {
        label.textContent = "לא נבחר קובץ";
    }
}
