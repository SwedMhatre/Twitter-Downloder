const urlInput = document.getElementById("url");
const qualityInput = document.getElementById("quality");

const downloadBtn = document.getElementById("downloadBtn");
const btnText = document.getElementById("btnText");
const loader = document.getElementById("loader");

const status = document.getElementById("status");
const clearBtn = document.getElementById("clearBtn");


// Show / hide clear button
urlInput.addEventListener("input", () => {
    clearBtn.style.display =
        urlInput.value.length > 0 ? "block" : "none";
});


// Clear URL
clearBtn.addEventListener("click", () => {
    urlInput.value = "";
    clearBtn.style.display = "none";
    urlInput.focus();
});


// Download
downloadBtn.addEventListener("click", async () => {

    const url = urlInput.value.trim();
    const quality = qualityInput.value;

    status.textContent = "";
    status.className = "status";

    if (!url) {
        status.textContent = "Please enter a Twitter/X video URL.";
        status.classList.add("error");
        return;
    }

    downloadBtn.disabled = true;

    btnText.textContent = "Downloading...";
    loader.style.display = "block";

    try {

        const response = await fetch("/download", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url,
                quality: quality
            })
        });

        const data = await response.json();

        if (data.success) {

            status.textContent = "✓ " + data.message;
            status.classList.add("success");

            urlInput.value = "";
            clearBtn.style.display = "none";

        } else {

            status.textContent = data.message;
            status.classList.add("error");
        }

    } catch (error) {

        status.textContent =
            "Something went wrong. Please try again.";

        status.classList.add("error");

    } finally {

        downloadBtn.disabled = false;

        btnText.textContent = "Download Video";

        loader.style.display = "none";
    }
});


// Allow Enter key to download
urlInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        downloadBtn.click();
    }

});