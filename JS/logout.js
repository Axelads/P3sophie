document.addEventListener('DOMContentLoaded', function () {
    
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', deleteStore);

    function deleteStore() {
        // Supprime l'élément "token" du localStorage
        localStorage.removeItem('token');
        // Recharge la page
        window.location.reload();
    }
});