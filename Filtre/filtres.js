const formulaire = document.querySelector(".btnS");
const urlImage = 'http://localhost:5678/api/works';
import { GeneratGallery } from "../gallery/gallery.js";



async function GeneratFiltre() {
  let Valeurbtn = 1;
  const response = await fetch('http://localhost:5678/api/categories')
  const categories = await response.json()

  categories.forEach(categorie => {
    const filtre = document.createElement('button')
    filtre.innerText = categorie.name
    filtre.setAttribute('id', categorie.name)
    filtre.setAttribute('value', Valeurbtn++)
    filtre.classList.add('btn')
    formulaire.appendChild(filtre)
  
  });
};
await GeneratFiltre()


const url = 'http://localhost:5678/api/works';

const gallery = document.querySelector('.gallery')
// Fonction click sur les boutons
function filtreListener() {
  const boutons = document.querySelectorAll('.btn')
  
  for ( let btn of boutons) {
    btn.addEventListener('click', () => {
        
      gallery.innerHTML = ''
        
        fetch(url)
        .then(response => response.json())
        .then((datas) => {
          if (btn.value == 0){
            GeneratGallery()
          }
          else {
            for(let data of datas){
              if (data.categoryId == btn.value){
                let Gallerydisplay ="";
          
          Gallerydisplay += `<figure>
          <img src=${data.imageUrl} alt=${data.title}>
          <figation>${data.title}</figation>
          </figure>`
          document.querySelector(".gallery").insertAdjacentHTML("beforeend", Gallerydisplay)
              }
            }
          };  
        });
      });
    };
  };
filtreListener();