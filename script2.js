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
    const input = document.getElementById("cityInput");
    const suggestionsBox = document.getElementById("citySuggestions");
    const selectedBox = document.getElementById("selectedCityBox");
    const hiddenInput = document.getElementById("selectedCityHidden");

    const selectedCities = new Set();

    // הצגת הצעות תוך כדי הקלדה
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

    // ✅ הקשה על אנטר בוחרת את העיר אם קיימת
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = input.value.trim();
            if (!value) return;

            const match = cities.find(city => city === value || city.toLowerCase() === value.toLowerCase());

            if (match && !selectedCities.has(match)) {
                selectedCities.add(match);
                addSelectedCityTag(match);
                input.value = "";
                suggestionsBox.style.display = "none";
            }
        }
    });

    // יצירת תגית עם העיר שנבחרה
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

    // סגירת תיבת ההצעות בלחיצה מחוץ
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".field-wrapper")) {
            suggestionsBox.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.setAttribute("novalidate", "true");

    // Custom slow scroll function
    function slowScrollTo(element, duration = 2000) { // Duration in milliseconds (2000 = 2 seconds)
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - (window.innerHeight / 2) + (element.offsetHeight / 2); // Center the element
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Progress from 0 to 1
            const ease = easeInOutQuad(progress); // Easing function for smooth animation

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Easing function for smooth animation
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animation);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let hasErrors = false;
        let firstErrorField = null;

        // Remove all previous banners
        document.querySelectorAll(".error-banner").forEach(banner => banner.remove());

        const requiredFields = form.querySelectorAll("[required]");
        const checkedGroups = new Set();

        requiredFields.forEach(field => {
            const wrapper = field.closest(".field-wrapper, .field-wrapper123, .upload-target-field, .upload-image-field-centered");
            if (!wrapper) return;

            const name = field.name;
            const type = field.type;
            const tagName = field.tagName.toLowerCase();
            let isValid = true;

            if ((type === "checkbox" || type === "radio") && !checkedGroups.has(name)) {
                isValid = !!form.querySelector(`[name="${name}"]:checked`);
                checkedGroups.add(name);
            } else if (tagName === "select") {
                isValid = field.value !== "" && field.value !== "בחר מצב משפחתי" && field.value !== "בחר איזור" && field.value !== "בחר גובה";
            } else if (type !== "checkbox" && type !== "radio") {
                isValid = field.value.trim() !== "";
            }

            if (!isValid) {
                hasErrors = true;
                const banner = document.createElement("div");
                banner.className = "error-banner";
                banner.textContent = "שדה חובה";
                banner.style.position = "absolute";
                banner.style.top = "0";
                banner.style.left = "0";
                banner.style.backgroundColor = "#ffdddd";
                banner.style.color = "#a00";
                banner.style.padding = "6px 12px";
                banner.style.borderRadius = "8px";
                banner.style.fontSize = "0.9rem";
                banner.style.zIndex = "100";
                banner.style.fontFamily = "'Heebo', sans-serif";
                banner.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                banner.style.whiteSpace = "nowrap";
                banner.style.direction = "rtl";
                banner.style.animation = "fadeIn 0.3s ease";
                wrapper.style.position = "relative";
                wrapper.prepend(banner);

                if (!firstErrorField) {
                    firstErrorField = wrapper;
                }
            }
        });

        if (hasErrors && firstErrorField) {
            // Use the custom slow scroll function
            slowScrollTo(firstErrorField, 3000); // 3 seconds duration for very slow scroll
        } else if (!hasErrors) {
            form.submit();
        }
    });
});
