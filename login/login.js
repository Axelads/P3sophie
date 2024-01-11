function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const url = 'http://localhost:5678/api/users/login';

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    window.location.href = '../index.html';
    console.log(data);
  })
  .catch(error => {
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = error.message;

    // Ajout l'ID "Error" à l'élément errorParagraph (qui est le <p>)
    errorParagraph.id = 'Error';

    const h2 = document.getElementById('Log').querySelector('h2');
    const existingError = document.getElementById('Error');

    // Si l'erreur n'est pas déjà affichée, l'ajouter
    if (!existingError) {
      h2.appendChild(errorParagraph);
    }
    console.error(error);
  });
}

const loginForm = document.getElementById('loginForm');
console.log(loginForm);
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login();
});





// const form = document.querySelector('form');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const errorParagraph = document.createElement('p');
// const Titre = document.querySelector('h2')

// // Evénements pour le formulaire
// form.addEventListener('submit', function (event) {
  
//   event.preventDefault();

//   // Recuperez les valeurs saisies par l'utilisateur
//   const userEmail = emailInput.value;
//   const userPassword = passwordInput.value;

//   // Verification e-mail et mot de passe corrects
//   if (userEmail === 'admin@admin.fr' && userPassword === 'admin') {
//     // Redirigez l'utilisateur vers la page accueil
//     window.location.href = '../index.html';
//   } else {
//     // message d'erreur
//     errorParagraph.textContent = 'Mot de passe ou E-mail incorrect';
//     // Ajout l'ID "Error" à l'élément errorParagraph (qui est le <p>)
//     errorParagraph.id = 'Error';
//     // Verifier si le message d'erreur existe déjà, sinon ajoutez-le
//     if (!Titre.contains(errorParagraph)) {
//       Titre.appendChild(errorParagraph);
//     }
//   }
// });