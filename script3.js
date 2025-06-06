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

document.addEventListener("DOMContentLoaded", () => {
    const ageMinSelect = document.getElementById("ageMin");
    const ageMaxSelect = document.getElementById("ageMax");
    const form = document.querySelector("form");
    const focusableElements = form.querySelectorAll('input, select, textarea, button');

    // גילאים לשני השדות
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

    // מניעת שליחה מיידית עם Enter ועבירה לשדה הבא
    form.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const current = document.activeElement;

            // אם עומדים על כפתור שליחה – תן לו לעבוד כרגיל
            if (current.tagName.toLowerCase() === 'button' || current.type === 'submit') return;

            e.preventDefault();

            // מצא את האינדקס הנוכחי
            const currentIndex = Array.from(focusableElements).indexOf(current);
            const next = focusableElements[currentIndex + 1];

            // תן פוקוס לשדה הבא אם קיים
            if (next) next.focus();
        }
    });
});


const maxFiles = 3;
let allImages = [];

// הצגת שדה העלאת תמונות לאחר בחירת יעד
document.querySelectorAll('input[name="uploadTarget"]').forEach(radio => {
    radio.addEventListener("change", () => {
        document.getElementById("uploadImageField").style.display = "flex";
    });
});

// האזנה לקלט קבצים
document.getElementById("imageInput").addEventListener("change", async function () {
    await handleFiles(this.files);
    this.value = ""; // איפוס – מאפשר לבחור שוב
});

async function handleFiles(files) {
    const previewWrapper = document.getElementById("previewWrapper");

    for (let file of files) {
        if (allImages.length >= maxFiles) {
            alert("ניתן לבחור עד 3 תמונות בלבד.");
            break;
        }

        const compressed = await compressImage(file);
        const imgURL = URL.createObjectURL(compressed);
        allImages.push({ file: compressed, url: imgURL });

        // עטיפה חיצונית לכל תמונה + אייקון
        const container = document.createElement("div");
        container.className = "preview-container";

        const box = document.createElement("div");
        box.className = "preview-image-box";

        const img = document.createElement("img");
        img.src = imgURL;

        const removeIcon = document.createElement("img");
        removeIcon.src = "images/remove-user.png";
        removeIcon.className = "remove-icon-img";
        removeIcon.title = "מחק תמונה";

        removeIcon.onclick = function () {
            allImages = allImages.filter(i => i.url !== imgURL);
            URL.revokeObjectURL(imgURL);
            container.remove();
        };

        box.appendChild(img);
        container.appendChild(box);
        container.appendChild(removeIcon);
        previewWrapper.appendChild(container);
    }
}




function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;

                // התאמת גודל לשמירה על יחס
                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((maxWidth / width) * height);
                        width = maxWidth;
                    } else {
                        width = Math.round((maxHeight / height) * width);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                }, "image/jpeg", quality);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById("phone");
    const form = document.getElementById("registerForm");

    // רשימת קידומות תקינות
    const validPrefixes = [
        "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
        "02", "03", "04", "08", "09",
        "072", "073", "074", "075", "076", "077", "078", "079"
    ];

    // יצירת הודעת שגיאה
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-banner";
    errorMessage.textContent = "10 ספרות עם קידומת חוקית";
    errorMessage.style.display = "none";
    phoneInput.parentNode.appendChild(errorMessage);

    // פונקציה לבדיקת תקינות מספר טלפון
    function isValidPhone(value) {
        // בדיקה שיש בדיוק 10 ספרות
        if (!/^\d{10}$/.test(value)) return false;
        // בדיקת קידומת
        const prefix2 = value.slice(0, 2);
        const prefix3 = value.slice(0, 3);
        return validPrefixes.includes(prefix2) || validPrefixes.includes(prefix3);
    }

    // ניקוי תווים לא מספריים והגבלת אורך
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
        // הצגת הודעת שגיאה בזמן אמת
        errorMessage.style.display = isValidPhone(this.value) ? "none" : "block";
    });

    // בדיקה בעת שליחת הטופס
    form.addEventListener("submit", function (e) {
        if (!isValidPhone(phoneInput.value)) {
            e.preventDefault(); // חסימת שליחת הטופס
            errorMessage.style.display = "block";
            phoneInput.focus();
            // גלילה לשדה עם השגיאה
            phoneInput.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            errorMessage.style.display = "none";
        }
    });

    // מניעת שליחה עם Enter בשדה הטלפון אם המספר לא תקין
    phoneInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !isValidPhone(this.value)) {
            e.preventDefault();
            errorMessage.style.display = "block";
            this.focus();
        }
    });
});
