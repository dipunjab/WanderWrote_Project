
const profileCircle = document.querySelector('.profile-circle');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileCircle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});


const commentBtn = document.getElementById("commentbtn");
  const commentForm = document.getElementById("commentform");
  const form = document.getElementById("commentForm");

  commentBtn.addEventListener("click", () => {
    commentForm.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (e.target !== commentBtn && !commentForm.contains(e.target)) {
        commentForm.style.display = "none";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (response.ok) {
        commentForm.style.display = "none"; 
        form.reset(); 
      } else {
        // Handle error
        console.error("Form submission failed");
      }
    })
    .catch(error => {
      console.error("Form submission error:", error);
    });
  });
