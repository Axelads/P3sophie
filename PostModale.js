export function PostModale () {
const fileInput = document.getElementById('input-file');
const titleInput = document.querySelector('.form-AjoutPhoto input[type="text"]');
const categorySelect = document.getElementById('Selection-Categorie');
const form = document.querySelector('.form-AjoutPhoto');
const token = localStorage.getItem('token');

form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const formData = new FormData;
        formData.append('title', titleInput.value);
        formData.append('image', fileInput.files[0]);
        formData.append('category', categorySelect.value);
        
        // Effectuez la requête POST
        fetch('http://localhost:5678/api/works', {
             method: 'POST',
             headers: {
             "Authorization": `Bearer ${token}`},
            
             body : formData,
        })
               
        
        .then(data => {
          console.log("ok")
          data.push(formData);
            
        })
})
}