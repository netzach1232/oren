function removeErrorBanners() {
    document.querySelectorAll(".error-banner").forEach(banner => banner.remove());
}

document.getElementById("registerBtn").addEventListener("click", function (e) {
    const agree = document.getElementById("agree");

    // שלב 1 – בדיקה אם הצ'קבוקס מסומן
    if (!agree.checked) {
        e.preventDefault(); // מבטל את ההמשך
        alert("עליך לאשר את התנאים לפני ההרשמה.");
        return;
    }

    // אם כן - ממשיכים:
    removeErrorBanners(); // אם יש באנרים קודמים - הסר אותם
    document.body.classList.add("transitioning"); // כבה אלמנטים אחרים
    this.classList.add("expand-fullscreen"); // הגדל את הכפתור

    // המתן ואז עבור דף
    setTimeout(() => {
        window.location.href = "Registration card.html";
    }, 700);
});
