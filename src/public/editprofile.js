const popup = document.getElementById("editFormPopup");
const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveChanges");

editButton.addEventListener("click",(e)=>{
    popup.style.display = "flex"
});

document.addEventListener("click",(e)=>{
    if (e.target === popup) {
        popup.style.display = "none"
    }
});

saveButton.addEventListener("click",(e)=>{
    e.preventDefault();
    alert("Changes Saved!⚡")
});

