document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("cityInput");
    const suggestionsBox = document.getElementById("citySuggestions");
    const selectedBox = document.getElementById("selectedCityBox");
    const hiddenInput = document.getElementById("selectedCityHidden");

    const selectedCities = new Set();

    input.addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();
        suggestionsBox.innerHTML = "";

        if (value.length < 1) {
            suggestionsBox.style.display = "none";
            return;
        }

        const filtered = cities.filter(city =>
            city.toLowerCase().startsWith(value)
        );

        if (filtered.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        filtered.slice(0, 20).forEach(city => {
            const item = document.createElement("div");
            item.className = "suggestion-item";
            item.textContent = city;

            item.addEventListener("click", () => {
                if (!selectedCities.has(city)) {
                    selectedCities.add(city);
                    addSelectedCityTag(city);
                    input.value = "";
                }
                suggestionsBox.style.display = "none";
            });

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.style.display = "block";
    });

    function addSelectedCityTag(cityName) {
        const tag = document.createElement("div");
        tag.className = "city-tag";

        const text = document.createElement("span");
        text.textContent = cityName;

        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", () => {
            tag.remove();
            selectedCities.delete(cityName);
            hiddenInput.value = Array.from(selectedCities).join(",");
        });

        tag.appendChild(text);
        tag.appendChild(closeBtn);
        selectedBox.appendChild(tag);
        hiddenInput.value = Array.from(selectedCities).join(",");
    }

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".field-wrapper")) {
            suggestionsBox.style.display = "none";
        }
    });
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


// מאזין לשינוי הבחירה ברדיו
document.querySelectorAll('input[name="uploadTarget"]').forEach(radio => {
    radio.addEventListener("change", () => {
        const uploadSection = document.getElementById("uploadImageField");
        uploadSection.style.display = "block";
    });
});

// מעדכן את תווית הקובץ
function updateFileName(input) {
    const label = document.getElementById("fileLabel");
    if (input.files.length > 0) {
        label.textContent = input.files.length === 1
            ? input.files[0].name
            : `${input.files.length} קבצים נבחרו 📷`;
    } else {
        label.textContent = "לא נבחר קובץ להעלה 📷";
    }
}
