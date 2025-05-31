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
