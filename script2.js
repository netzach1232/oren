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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const ageMinSelect = document.getElementById("ageMin");
    const ageMaxSelect = document.getElementById("ageMax");
    const requiredFields = form.querySelectorAll("[required]");
    const registerBtn = document.querySelector('button[type="submit"]');
    const focusableElements = form.querySelectorAll('input, select, textarea, button');

    // מילוי גיל מינימום
    for (let i = 18; i <= 85; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        ageMinSelect.appendChild(option);
    }

    // מילוי גיל מקסימום לפי גיל מינימום שנבחר
    ageMinSelect.addEventListener("change", () => {
        const selectedMin = parseInt(ageMinSelect.value, 10);

        if (!isNaN(selectedMin)) {
            ageMaxSelect.disabled = false;
            ageMaxSelect.innerHTML = '<option value="">גיל מקסימום</option>';

            for (let i = selectedMin; i <= 85; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                ageMaxSelect.appendChild(option);
            }
        } else {
            ageMaxSelect.disabled = true;
            ageMaxSelect.innerHTML = '<option value="">גיל מקסימום</option>';
        }
    });

    // --- ולידציה בלחיצה בלבד ---
    function clearErrorBanners() {
        document.querySelectorAll(".error-banner").forEach(el => el.remove());
    }

    function showErrorBanner(input) {
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
        requiredFields.forEach((input) => {
            let isEmpty = false;
            if (input.type === "radio" || input.type === "checkbox") {
                const group = form.querySelectorAll(`[name="${input.name}"]`);
                const oneChecked = Array.from(group).some(el => el.checked);
                isEmpty = !oneChecked;
            } else {
                isEmpty = !input.value.trim();
            }
            if (isEmpty) {
                showErrorBanner(input);
                if (!firstInvalid) firstInvalid = input;
            }
        });
        if (firstInvalid) {
            e.preventDefault();
            scrollToElement(firstInvalid);
            firstInvalid.focus();
        }
    });

    // --- אנטר עובר לשדה הבא ולא שולח ---
    form.addEventListener("keydown", (e) => {
        const active = document.activeElement;
        if (e.key === "Enter") {
            // אם על כפתור שליחה – תן לשלוח
            if (active && (active.tagName === "BUTTON" || active.type === "submit")) return;

            // מניעת שליחה
            e.preventDefault();

            // מעבר לשדה הבא
            const index = Array.from(focusableElements).indexOf(active);
            const next = focusableElements[index + 1];
            if (next) next.focus();
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
