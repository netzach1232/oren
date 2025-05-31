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


document.addEventListener("DOMContentLoaded", () => {
    const ageMinSelect = document.getElementById("ageMin");
    const ageMaxSelect = document.getElementById("ageMax");

    // נבנה את רשימת הגילאים (לדוגמה: 18 עד 85)
    for (let i = 18; i <= 85; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        ageMinSelect.appendChild(option);
    }

    ageMinSelect.addEventListener("change", () => {
        const selectedMin = parseInt(ageMinSelect.value, 10);

        if (!isNaN(selectedMin)) {
            ageMaxSelect.disabled = false;
            ageMaxSelect.innerHTML = '<option value="">גיל מקסימום</option>';

            // נכניס אופציות החל מהגיל שנבחר ועד 85 (כולל)
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
});

