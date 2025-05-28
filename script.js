
document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");
    const suggestionsBox = document.getElementById("citySuggestions");

    cityInput.addEventListener("input", () => {
        const val = cityInput.value.toLowerCase();
        suggestionsBox.innerHTML = "";

        if (!val) return;

        const matches = cities.filter(city =>
            city.toLowerCase().includes(val)
        );

        matches.slice(0, 20).forEach(city => {
            const div = document.createElement("div");
            div.textContent = city;
            div.style.cursor = "pointer";
            div.style.padding = "5px";
            div.style.borderBottom = "1px solid #ccc";
            div.addEventListener("click", () => {
                cityInput.value = city;
                suggestionsBox.innerHTML = "";
            });
            suggestionsBox.appendChild(div);
        });
    });

    document.addEventListener("click", (e) => {
        if (!cityInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.innerHTML = "";
        }
    });
});

document.getElementById("registerBtn").addEventListener("click", function () {
    const checkbox = document.getElementById("agree");

    if (checkbox.checked) {
        window.location.href = "Registration card.html";
    } else {
        alert("עליך לאשר את התנאים לפני המשך ההרשמה.");
    }
});
