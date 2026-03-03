document.addEventListener('DOMContentLoaded', function() {
    
    // --- SALUT PERSONALIZAT IN FUNCTIE DE ORA --- 
    const oraCurenta = new Date().getHours();
    const mesajSalut = document.querySelector('header p');

    if (mesajSalut) {
        if (oraCurenta >= 6 && oraCurenta < 12) {
            mesajSalut.textContent = "Bună dimineața! Bine ai venit pe pagina mea.";
        } else if (oraCurenta >= 12 && oraCurenta < 18) {
            mesajSalut.textContent = "Bună ziua! Bine ai venit pe pagina mea.";
        } else {
            mesajSalut.textContent = "Bună seara! Bine ai venit pe pagina mea.";
        }
    }

    // --- HANDLE UIESTE FORMULARUL DE CONTACT ---
    const form = document.querySelector('form');
    const feedbackMessage = document.getElementById('form-feedback');

    form.addEventListener('submit', function(event) {

        event.preventDefault(); // opreste refresh-ul paginii la submit

        const nume = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mesaj = document.getElementById("message").value;

        if (nume.length < 2) {
            feedbackMessage.textContent = "Eroare: Numele este prea scurt!";
            feedbackMessage.style.color = 'red';
            
        } else if (!email.includes('@')) {
            feedbackMessage.textContent = "Eroare: Email-ul trebuie să conțină @!";
            feedbackMessage.style.color = 'red';
            
        } else if (mesaj.length < 10) {
            feedbackMessage.textContent = "Eroare: Mesajul trebuie să aibă cel puțin 10 caractere!";
            feedbackMessage.style.color = 'red';
            
        } else {
            // validare reusita
            feedbackMessage.textContent = "Multumim, " + nume + "! Mesajul a fost trimis.";
            feedbackMessage.style.color = 'green';
            
            // curatarea campurilor dupa submit
            form.reset(); 
        }
    });
});