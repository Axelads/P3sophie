import {PageAdmin} from "../JS/admin.js";

document.addEventListener('DOMContentLoaded', PageAdmin);
let ValeurIcone = 1;
let ValeurImg = 1;

export function toggleModalContainer() {
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('.close-modal');
    const overlay = document.querySelector('.overlay');
    const modalGallery = document.querySelector('.modal-Galery');

    modalContainer.classList.toggle('active');

    

    if (modalContainer.classList.contains('active')) {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(datas => {             

                for (let data of datas) {
                    const figure = document.createElement("figure");
                    const btnIcone = document.createElement("button");
                    btnIcone.setAttribute('value', data.id);
                    btnIcone.setAttribute('class', "figation");

                    let trashIcon = document.createElement("i");
                    trashIcon.classList.add("fa-regular");
                    trashIcon.classList.add("fa-trash-can");
                    trashIcon.classList.add("poubelles");
                    trashIcon.style.color = "#FFFFFF";
                    // trashIcon.id = "TrashPosition";
                    

                    // Insertion des images de l'api  
                    let dynamiqueimage = document.createElement("img");
                    dynamiqueimage.src = data.imageUrl;
                    dynamiqueimage.setAttribute('id', `img-${data.id}`);

                
                    figure.appendChild(btnIcone);
                    btnIcone.appendChild(trashIcon);
                    figure.appendChild(dynamiqueimage);
                    modalGallery.appendChild(figure);                                     
                }
supp_img();
    })
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modalContainer.classList.remove('active');
            modalGallery.innerHTML=""
            ValeurIcone = 1;  
            ValeurImg = 1;
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function () {
            modalContainer.classList.remove('active');
            modalGallery.innerHTML=""
            ValeurIcone = 1;  
            ValeurImg = 1;
        });
    };


};

function supp_img() {//pour savoir sur quelle image un a selectionner et envoyer son id a la function delete_img
    let gallery = document.getElementsByClassName("figation");
    for (let btn of gallery){
        btn.addEventListener('click',() => {
            console.log("Button clicked. ID:", btn.value);
            let id = btn.value
            delete_img(id);
            // const modalContainer = document.querySelector('.modal-container');
            // modalContainer.classList.remove('active');
            const modalGallery = document.querySelector('.modal-Galery');
            modalGallery.innerHTML = "";
            
            GeneratGallery();
        });
    };
};

function delete_img(id) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(() => {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.remove('active');
      updateGallery(); // Actualisez la galerie
    });
  }

document.addEventListener('DOMContentLoaded', function () {
    const modalBtn = document.querySelector('.modalbtn');
    if (modalBtn) {
        modalBtn.addEventListener('click', function (event) {
            event.preventDefault();
            toggleModalContainer();
    });
}
});

const addImgButton = document.querySelector('.addImg');
const interieurModale = document.querySelector("#modal1");
const interieurModale2 = document.querySelector("#modal2");
addImgButton.addEventListener('click', function() {
    
      fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {

    interieurModale.style.display = "none";
    interieurModale2.style.display = "block";
        
    interieurModale2.innerHTML = `<div class="button-modale">
               <button class="close-add-modal">X</button>
               <button id="return-modal"><img src="../assets/images/arraw-left.png" class="arraw-left" alt="arraw-left"></button>
        </div>
        <div class="Ajout-Photo"><h3>Ajout photo</h3></div>
    <form action="" class="form-AjoutPhoto">
        <div class="ajoutPhoto">
           <i class="fa-regular fa-image ImgDefault"></i>
           <div class="AjouterPhoto">
              <label for="input-file">+ Ajouter photo</label>
              <input type="file" accept="image/jpeg, image/png, image/jpg" id="input-file" max-size="4000" name="imageUrl">
            </div>
            <p>jpg, png : 4mo max</p>
        </div>
        <div id="AjoutInfos">
                <label>Titre</label>
                <input id="test" type="text">
                <label>Catégorie</label>
            <div class="select-wrapper">
                    <select id="Selection-Categorie" name="categorie" required>
                     <option value="" disabled selected></option>
                     ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join('')}
                    </select>
            </div>
                <div class="borderValider">
                <input id="desact" type="submit" value="Valider">
            </div>
    </form>
</div>`;

// retourner a la modal1 en cliquant sur la fleche
const returnModalButton = document.getElementById("return-modal");
returnModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const interieurModale = document.querySelector("#modal1");
const interieurModale2 = document.querySelector("#modal2");
    
        interieurModale2.style.display = "none";
        interieurModale.style.display = "block";
});


// changement couleur button Valider
const inputTest = document.getElementById('test');
inputTest.addEventListener('input', verifierFormulaire);

const selectCategorie = document.getElementById('Selection-Categorie');
selectCategorie.addEventListener('change', verifierFormulaire);
function verifierFormulaire() {
    
    // const fileInput = document.getElementById('input-file');
    const textInput1 = document.getElementById('test').value;
    const textInput2 = document.getElementById('Selection-Categorie').value;
    
    const desactButton = document.getElementById('desact');

    if (textInput1 !== '' && textInput2 !== '') {
        desactButton.disabled = false;
        desactButton.style.background = '#1D6154';
        desactButton.style.cursor = 'pointer';
    } else {
        desactButton.disabled = true;
        desactButton.style.background = 'grey';
        desactButton.style.cursor = 'none';
    }
};

// fermer la modal2
const closeButton = document.querySelector('.close-add-modal');
closeButton.addEventListener('click', CloseModalButton);
function CloseModalButton() {
    const modalGalery = document.querySelector('.modal-Galery');
    const interieurModale = document.querySelector("#modal1");
     const interieurModale2 = document.querySelector("#modal2");

        modalGalery.innerHTML = '';   
        interieurModale2.style.display = "none";
        interieurModale.style.display = "block";
      

    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('active');

};
ChangeImg();
PostModale();
})
});


function ChangeImg() {
    // remplacement de l'icone par le file (img) charger 
    const fileInput = document.getElementById('input-file');
    
    fileInput.addEventListener('change', function (event) {
        console.log("File input changed:", event);
        const selectedFile = event.target.files[0];

        // Vérification si un fichier est sélectionné
        if (selectedFile) {
            const divImg = document.createElement('span');
            divImg.classList.add('spanImg');

            const imgElement = document.createElement('img');
            imgElement.classList.add('ImgDefault');
            imgElement.src = URL.createObjectURL(selectedFile);
            const ajoutPhotoDiv = document.querySelector('.ajoutPhoto');
            ajoutPhotoDiv.innerHTML = '';
            ajoutPhotoDiv.appendChild(divImg);
            divImg.appendChild(imgElement);
        }
    });
};


// GENERATION DE LA GALLERY

export function GeneratGallery() {
    const Gallery = document.querySelector(".gallery");
    const urlImage = 'http://localhost:5678/api/works';
  
    fetch(urlImage)
      .then(response => response.json())
      .then(datas => {
        for (let data of datas) {
          const figure = document.createElement("figure");
  
          // Insertion des images de l'api
          let dynamiqueimage = document.createElement("img");
          dynamiqueimage.src = data.imageUrl;
          dynamiqueimage.alt = data.title;
          dynamiqueimage.setAttribute("id", data.id);
  
          // Insertion des titres des images
          const figcaption = document.createElement("figcaption");
          figcaption.innerHTML = data.title;
  
          // construction des balises
          figure.appendChild(dynamiqueimage);
          figure.appendChild(figcaption);
          Gallery.appendChild(figure);
        }
      });
  }
  GeneratGallery();
  
 function updateGallery() {
    const Gallery = document.querySelector(".gallery");
    Gallery.innerHTML = '';
    
    toggleModalContainer();
  };

  // AJOUT D'UN PROJET

  async function PostModale() {
    const fileInput = document.getElementById('input-file');
    const titleInput = document.querySelector('.form-AjoutPhoto input[type="text"]');
    const categorySelect = document.getElementById('Selection-Categorie');
    const form = document.querySelector('.form-AjoutPhoto');
    const token = localStorage.getItem('token');
    const Gallery = document.querySelector(".gallery");
    const modalGallery = document.querySelector('.modal-Galery');
    

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData;
        formData.append('title', titleInput.value);
        formData.append('image', fileInput.files[0]);
        formData.append('category', categorySelect.value);

        try {
            // Effectuez la requête POST avec async/await
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            // Vérifiez si la requête a réussi
            if (!response.ok) {
                throw new Error(`Erreur lors de la requête : ${response.status} - ${response.statusText}`);
            }

            console.log("OK");
            Gallery.innerHTML="";
            modalGallery.innerHTML = "";
            interieurModale2.style.display = "none";
            interieurModale.style.display = "block";
            GeneratGallery();
            updateGallery();
            
        } catch (error) {
            console.error("Erreur :", error.message);
            // Gérez l'erreur ici si nécessaire
        }
    });
}