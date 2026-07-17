const API =
"https://7n1w3n1hy8.execute-api.ap-south-1.amazonaws.com/prod/upload";

const uploadBtn = document.getElementById("uploadBtn");
const browseBtn = document.getElementById("browseBtn");
const fileInput = document.getElementById("fileInput");
browseBtn.onclick = () => {

    fileInput.click();

};
fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    browseBtn.innerHTML = file.name;

});


uploadBtn.onclick = async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }

    try {

        document.getElementById("status").innerHTML =
        "Generating Upload URL...";

        // Get Presigned URL
        const response = await fetch(API);
        const data = await response.json();

        const result = data.body ? JSON.parse(data.body) : data;

        // Show original image
        
        document.getElementById("originalPreview").src =
        URL.createObjectURL(file);
        const img = new Image();

        img.onload = function () {

            document.getElementById("originalDimensions").innerHTML =
                img.width + " × " + img.height;

        };

        img.src = URL.createObjectURL(file);
        document.getElementById("originalName").innerHTML =
        result.imageName;

        document.getElementById("originalSize").innerHTML =
        (file.size / 1024).toFixed(2) + " KB";

        document.getElementById("status").innerHTML =
        "Uploading Image...";

        // Upload to S3
        await fetch(result.uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });

        document.getElementById("status").innerHTML =
        "Image Uploaded.<br>Waiting for Lambda...";

        // Wait for Lambda
        await new Promise(resolve => setTimeout(resolve, 5000));

        const resizedImageURL =
        result.downloadURL + "?t=" + Date.now();

       
        document.getElementById("resizedPreview").src =
        resizedImageURL;

        document.getElementById("resizedName").innerHTML =
        result.resizedImage;

        document.getElementById("resizedSize").innerHTML =
        "400 × 400";

        

        const downloadBtn = document.getElementById("downloadBtn");

        downloadBtn.href = resizedImageURL;

        downloadBtn.download = result.resizedImage;

        downloadBtn.target = "_blank";

        downloadBtn.classList.add("active");

        document.getElementById("status").innerHTML =
        "✅ Image resized successfully.";

    } catch (err) {

        console.error(err);

        document.getElementById("status").innerHTML =
        "❌ " + err.message;

    }

};