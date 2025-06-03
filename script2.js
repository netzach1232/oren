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

    // הקשה על אנטר בוחרת את העיר אם קיימת
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
        closeBtn.innerHTML = "×";
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

    const form = document.querySelector("form");

    form.setAttribute("novalidate", "true");

    // רשימת קידומות תקינות למספר טלפון
    const validPrefixes = [
        "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
        "02", "03", "04", "08", "09",
        "072", "073", "074", "075", "076", "077", "078", "079"
    ];

    // פונקציה לבדיקת תקינות מספר טלפון
    function isValidPhone(value) {
        if (!/^\d{10}$/.test(value)) return false;
        const prefix2 = value.slice(0, 2);
        const prefix3 = value.slice(0, 3);
        return validPrefixes.includes(prefix2) || validPrefixes.includes(prefix3);
    }

    // Custom slow scroll function
    function slowScrollTo(element, duration = 2000) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - (window.innerHeight / 2) + (element.offsetHeight / 2);
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

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

        // בדיקת מספר טלפון
        const phoneInput = document.getElementById("phone");
        if (phoneInput.value.trim() !== "" && !isValidPhone(phoneInput.value)) {
            hasErrors = true;
            const wrapper = phoneInput.closest(".field-wrapper, .field-wrapper123");
            const banner = document.createElement("div");
            banner.className = "error-banner";
            banner.textContent = "מספר טלפון לא תקין";
            wrapper.style.position = "relative";
            wrapper.appendChild(banner);
            if (!firstErrorField) {
                firstErrorField = wrapper;
            }
        }

        // בדיקת שאר השדות החובה
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
                wrapper.style.position = "relative";
                wrapper.appendChild(banner);
                if (!firstErrorField) {
                    firstErrorField = wrapper;
                }
            }
        });

        if (hasErrors && firstErrorField) {
            slowScrollTo(firstErrorField, 2000);
        } else if (!hasErrors) {
            form.submit();
        }
    });
});
