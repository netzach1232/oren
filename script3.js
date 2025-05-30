document.addEventListener("DOMContentLoaded", function () {
    const ageInput = document.getElementById("age");

    ageInput.addEventListener("input", function () {
        // הסרה של תווים לא חוקיים
        this.value = this.value.replace(/\D/g, '');

        // הגבלת אורך ל-2 ספרות
        if (this.value.length > 2) {
            this.value = this.value.slice(0, 2);
        }
    });

    // ולידציה סופית לפני שליחה — בטופס
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        const val = parseInt(ageInput.value, 10);
        if (isNaN(val) || val < 18 || val > 99) {
            e.preventDefault();
            alert("יש להזין גיל תקני בין 18 ל-99");
            ageInput.focus();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const heightSelect = document.getElementById("heightSelect");

    for (let height = 140; height <= 210; height++) {
        const option = document.createElement("option");
        option.value = height;
        option.textContent = `${height} ס"מ`;
        heightSelect.appendChild(option);
    }
});


function addSelectedCityTag(cityName) {
    const tag = document.createElement("div");
    tag.className = "city-tag"; // שים לב לשינוי כאן

    const text = document.createElement("span");
    text.textContent = cityName;

    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
        tag.remove();
        selectedCities.delete(cityName);
        // עדכון ה-hidden input
        hiddenInput.value = Array.from(selectedCities).join(",");
    });

    tag.appendChild(text);
    tag.appendChild(closeBtn);
    selectedBox.appendChild(tag);

    // עדכון הערך הנסתר של השדה
    hiddenInput.value = Array.from(selectedCities).join(",");
}
