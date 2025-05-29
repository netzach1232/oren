
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

window.onload = function () {
    const button = document.getElementById("registerBtn");
    const checkbox = document.getElementById("agree");

    if (button && checkbox) {
        button.addEventListener("click", function () {
            if (checkbox.checked) {
                window.location.href = "Registration card.html";
            } else {
                alert("עליך לאשר את התנאים לפני המשך ההרשמה.");
            }
        });
    }
};


window.onload = () => {
    const minAgeSelect = document.getElementById("ageMin");
    const maxAgeSelect = document.getElementById("ageMax");

    // אם אחד מהם לא קיים – לא נמשיך
    if (!minAgeSelect || !maxAgeSelect) return;

    // מלא את גיל מינימום
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
