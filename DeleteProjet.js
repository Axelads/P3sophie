document.addEventListener('DOMContentLoaded', () => {
const modale = document.querySelector(".modal");

modale.addEventListener("click", (event) => {
    event.preventDefault();
    
    if (event.target.classList.contains("fa-trash-can")) {
        const token = localStorage.getItem("token");
        const modale1 = document.querySelector("#modal1");
        const Gallery = document.querySelector(".gallery");


        const imagesGallery = Gallery.querySelectorAll("img");
        imagesGallery.forEach((image) => {
            const ImageId = image.id;
            console.log("image ID:", ImageId)
        })
        
        
        let slicedImageId, sliceButtonId;

        const imagesModale = modale1.querySelectorAll("img");
        imagesModale.forEach((image) => {
            const imageId = image.id;
            slicedImageId = imageId.slice(4);
            console.log("slicedImageId:", slicedImageId);
        });

        const buttons = modale1.querySelectorAll("button");
        buttons.forEach((button) => {
            const buttonId = button.id;
            sliceButtonId = buttonId.slice(4);
        });


        if (sliceButtonId === slicedImageId) {
            
            fetch(`http://localhost:5678/api/works/${ImageId}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(response => {
                    console.log("after fetch")
                    if (response.ok) {
                        console.log(`Image avec l'ID ${slicedImageId} supprimée avec succès.`);
                    } else {
                        console.error(`Échec de la suppression de l'image. Code de statut: ${response.status}`);
                    }
                }).catch(error => {
                    console.error("Une erreur s'est produite lors de la suppression de l'image.", error);
                });
            }
        }
    });
})



// const buttonDelete = document.querySelectorAll("#TrashPosition");
// buttonDelete.forEach(a => {
//     a.addEventListener("click", (event) => {
//     console.log("coucou");

      
//     const token = localStorage.getItem("token");

//     fetch(`http://localhost:5678/api/works/${ImageId}`, {
//          method: "DELETE",
//          headers: {
//             "Accept": '*/*',
//             "Authorization": `Bearer ${token}`
//         } 
//     })
//     .then((response) =>{
//         if (response.ok) {
        
//         }
//     });
// });
// });
