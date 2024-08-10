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
    
    // Enhanced styling for the button
    redirectButton.style.position = "fixed";
    redirectButton.style.top = "50%";
    redirectButton.style.left = "50%";
    redirectButton.style.transform = "translate(-50%, -50%)";
    redirectButton.style.padding = "15px 30px";
    redirectButton.style.backgroundColor = "#FF4500";  // Bright orange color for attention
    redirectButton.style.color = "#ffffff";
    redirectButton.style.fontSize = "18px";
    redirectButton.style.fontWeight = "bold";
    redirectButton.style.border = "none";
    redirectButton.style.borderRadius = "8px";
    redirectButton.style.cursor = "pointer";
    redirectButton.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    redirectButton.style.zIndex = "1000";  // Ensure it appears above other content
    redirectButton.style.transition = "background-color 0.3s ease";

    // Hover effect
    redirectButton.addEventListener('mouseover', function() {
        redirectButton.style.backgroundColor = "#FF6347";  // Lighter orange on hover
    });
    redirectButton.addEventListener('mouseout', function() {
        redirectButton.style.backgroundColor = "#FF4500";
    });

    redirectButton.addEventListener('click', function() {
        window.location.href = "https://forms.gle/hHFJwMQ8rJZWyCrH8";
    });

    document.body.appendChild(redirectButton);
}
