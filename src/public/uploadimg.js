const fileInput = document.getElementById('file-upload');
const uploadSection = document.getElementById('upload-section');
const imagePreviewSection = document.getElementById('image-preview-section');
const imagePreview = document.getElementById('image-preview');

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        imagePreview.src = objectURL;
        uploadSection.classList.add('hidden');
        imagePreviewSection.classList.remove('hidden');
    }
}

function cancelImage() {
    fileInput.value = '';
    imagePreview.src = '';
    URL.revokeObjectURL(imagePreview.src); // Clean up the URL
    uploadSection.classList.remove('hidden');
    imagePreviewSection.classList.add('hidden');
}

