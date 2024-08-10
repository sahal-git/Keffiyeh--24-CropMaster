document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const image = document.getElementById('image');
            image.src = event.target.result;
            image.style.display = 'block';
            document.getElementById('cropperContainer').style.display = 'block';

            // Initialize Cropper.js
            const cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
            });

            document.getElementById('downloadBtn').disabled = false;
            document.getElementById('downloadBtn').addEventListener('click', function() {
                const fileName = document.getElementById('fileName').value.trim();
                if (!fileName) {
                    alert("Please enter a code number for the file name.");
                    return;
                }

                cropper.getCroppedCanvas({
                    width: 2048,
                    height: 2048
                }).toBlob(function(blob) {
                    if (blob.size > 3 * 1024 * 1024) {
                        alert("The file size exceeds 3MB. Please select another image or crop smaller.");
                    } else {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = fileName + '.jpeg';
                        link.click();

                        URL.revokeObjectURL(link.href);

                        // Attempt to redirect after download
                        try {
                            window.location.href = "https://forms.gle/hHFJwMQ8rJZWyCrH8";
                        } catch (error) {
                            console.error('Redirection failed:', error);
                            showRedirectButton();
                        }

                        // Fallback: Show redirect button after 5 seconds if redirect fails
                        setTimeout(showRedirectButton, 5000);
                    }
                }, 'image/jpeg', 0.9);
            }, { once: true });
        };
        reader.readAsDataURL(file);
    }
});

function showRedirectButton() {
    const redirectButton = document.createElement('button');
    redirectButton.textContent = "Click here if not redirected";
    redirectButton.style.position = "fixed";
    redirectButton.style.bottom = "20px";
    redirectButton.style.right = "20px";
    redirectButton.style.padding = "10px 20px";
    redirectButton.style.backgroundColor = "#007BFF";
    redirectButton.style.color = "#fff";
    redirectButton.style.border = "none";
    redirectButton.style.borderRadius = "5px";
    redirectButton.style.cursor = "pointer";
    redirectButton.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    redirectButton.addEventListener('click', function() {
        window.location.href = "https://forms.gle/hHFJwMQ8rJZWyCrH8";
    });

    document.body.appendChild(redirectButton);
}
