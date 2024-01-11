function DeleteProjet () {
const buttonDelete = document.querySelectorAll("#TrashPosition");
buttonDelete.forEach(a => {
    a.addEventListener("click", (event) =>
    event.preventDefault();
    
    const ImageId =  event.target.id;
    
    console.log(ImageId);
      
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5678/api/works/${ImageId}`, {
         method: "DELETE",
         headers: {
            "Accept": '*/*',
            "Authorization": `Bearer ${token}`
        } 
    })
    .then((response) =>{
        if (response.ok) {
            const 
        }
    })
})
}