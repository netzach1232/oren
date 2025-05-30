function removeErrorBanners() {
    document.querySelectorAll(".error-banner").forEach(banner => banner.remove());
}

function showErrorBanner(targetElement, message) {
    // הסרה מראש אם כבר יש באנר
    const existing = targetElement.querySelector(".error-banner");
    if (existing) existing.remove();

    const error = document.createElement("div");
    error.className = "error-banner";
    error.textContent = message;
    error.style.marginTop = "8px"; // קצת ריווח
    targetElement.appendChild(error);
}


(function setupCityAutocomplete() {
    const input = document.getElementById("cityInput");
    const suggestionsBox = document.getElementById("citySuggestions");
    const selectedBox = document.getElementById("selectedCityBox");
    const hiddenInput = document.getElementById("selectedCityHidden");

    input.addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();
        suggestionsBox.innerHTML = "";

        if (value.length < 1) {
            suggestionsBox.style.display = "none";
            return;
        }

        const filtered = cities.filter(city => city.toLowerCase().startsWith(value));

        if (filtered.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        filtered.slice(0, 20).forEach(city => {
            const item = document.createElement("div");
            item.textContent = city;
            item.style.padding = "8px 12px";
            item.style.cursor = "pointer";
            item.style.borderBottom = "1px solid #eee";
            item.addEventListener("click", () => {
                input.value = city;
                hiddenInput.value = city;
                input.setCustomValidity(""); // מנקה שגיאה אם הייתה
                selectedBox.textContent = `העיר שנבחרה: ${city}`;
                selectedBox.style.display = "block";
                suggestionsBox.style.display = "none";
            });
            suggestionsBox.appendChild(item);
        });

        suggestionsBox.style.display = "block";
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".field-wrapper")) {
            suggestionsBox.style.display = "none";
        }
    });
})();

document.getElementById("registerBtn").addEventListener("click", function () {
    removeErrorBanners();

    const checkbox = document.getElementById("agree");
    const cityInput = document.getElementById("cityInput");
    const selectedCity = document.getElementById("selectedCityHidden");
    const btn = this;
    let isValid = true;

    // בדיקת צ'קבוקס
    if (!checkbox.checked) {
        const checkboxWrapper = checkbox.closest(".field-wrapper") || checkbox.parentElement;
        showErrorBanner(checkboxWrapper, "יש לאשר את התנאים לפני ההרשמה");
        isValid = false;
    }

    // בדיקת אם העיר נבחרה מתוך ההשלמה האוטומטית
    if (selectedCity.value.trim() === "") {
        const fieldWrapper = cityInput.closest(".field-wrapper");
        showErrorBanner(fieldWrapper, "יש לבחור עיר מתוך הרשימה");
        isValid = false;
    }
    else {
        cityInput.setCustomValidity(""); // מנקה שגיאה אם נבחרה עיר
    }


    if (!isValid) return;

    // מעבר דף עם אפקט
    document.body.classList.add("transitioning");
    btn.classList.add("expand-fullscreen");

    setTimeout(() => {
        window.location.href = "Registration card.html";
    }, 700);
});


(function setupCityAutocomplete() {
    const input = document.getElementById("cityInput");
    const suggestionsBox = document.getElementById("citySuggestions");
    const selectedBox = document.getElementById("selectedCityBox");
    const hiddenInput = document.getElementById("selectedCityHidden");

    const selectedCities = new Set(); // כדי למנוע כפילויות

    input.addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();
        suggestionsBox.innerHTML = "";

        if (value.length < 1) {
            suggestionsBox.style.display = "none";
            return;
        }

        const filtered = cities.filter(city => city.toLowerCase().startsWith(value));

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
        tag.className = "selected-city-box";

        const text = document.createElement("span");
        text.textContent = cityName;

        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = () => {
            tag.remove();
            selectedCities.delete(cityName);
        };

        tag.appendChild(text);
        tag.appendChild(closeBtn);
        selectedBox.appendChild(tag);

        // עדכון ה־input הנסתר עם רשימת הערים (מופרדות בפסיק)
        hiddenInput.value = Array.from(selectedCities).join(",");
    }

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".field-wrapper")) {
            suggestionsBox.style.display = "none";
        }
    });
})();

