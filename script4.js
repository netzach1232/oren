const maxFilesID = 3;
let allImagesID = [];


// ✅ הצגת שדה העלאת תעודת זהות לאחר סימון צ'קבוקס
document.querySelectorAll('input[name="uploadTargetID"]').forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const uploadField = document.getElementById("uploadImageFieldID");
        uploadField.style.display = checkbox.checked ? "flex" : "none";
    });
});

// ✅ האזנה לקבצים שנבחרו
document.getElementById("imageInputID").addEventListener("change", async function () {
    await handleFilesID(this.files);
    this.value = "";
});

async function handleFilesID(files) {
    const previewWrapper = document.getElementById("previewID");

    for (let file of files) {
        if (allImagesID.length >= maxFilesID) {
            alert("ניתן לבחור עד 3 תמונות בלבד.");
            break;
        }

        const compressed = await compressImageID(file);
        const imgURL = URL.createObjectURL(compressed);
        allImagesID.push({ file: compressed, url: imgURL });

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
            allImagesID = allImagesID.filter(i => i.url !== imgURL);
            URL.revokeObjectURL(imgURL);
            container.remove();
        };

        box.appendChild(img);
        container.appendChild(box);
        container.appendChild(removeIcon);
        previewWrapper.appendChild(container);
    }
}


// ✅ פונקציית דחיסת תמונה
function compressImageID(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;

                // שמירה על יחס תמונה
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
