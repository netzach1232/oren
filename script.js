function removeErrorBanners() {
    document.querySelectorAll(".error-banner").forEach(banner => banner.remove());
}

function showErrorBanner(targetElement, message) {
    const error = document.createElement("div");
    error.className = "error-banner";
    error.textContent = message;
    targetElement.appendChild(error);
}

document.getElementById("registerBtn").addEventListener("click", function () {
    removeErrorBanners(); // שלב ראשון – נקה שגיאות קודמות

    const checkbox = document.getElementById("agree");
    const btn = this;
    const requiredInputs = document.querySelectorAll('input[required]:not([type="hidden"])');
    let isValid = true;

    // בדיקת שדות חובה
    requiredInputs.forEach(input => {
        const fieldWrapper = input.closest(".field-wrapper") || input.parentElement;
        if (input.value.trim() === "") {
            showErrorBanner(fieldWrapper, "שדה זה חובה");
            isValid = false;
        }
    });

    // בדיקת הסכמה לתנאים
    if (!checkbox.checked) {
        const checkboxWrapper = checkbox.closest(".field-wrapper") || checkbox.parentElement;
        showErrorBanner(checkboxWrapper, "יש לאשר את התנאים לפני ההרשמה");
        isValid = false;
    }

    if (!isValid) return;

    // אם הכל תקין → הרץ אפקט ומעבר עמוד
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

