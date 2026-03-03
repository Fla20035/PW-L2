function submitForm(event) {
    
    event.preventDefault();

    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    console.log("Datele introduse în formular sunt:");
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    console.warn("Goodbye World!");
}


document.addEventListener('DOMContentLoaded', function() {
    
    // Acum putem căuta liniștiți, pentru că HTML-ul există!
    const oraCurenta = new Date().getHours();
    const mesajSalut = document.querySelector('header p');

    // Măsură de siguranță: ne asigurăm că a găsit paragraful înainte să îi schimbăm textul
    if (mesajSalut) {
        if (oraCurenta >= 6 && oraCurenta < 12) {
            mesajSalut.textContent = "Bună dimineața! Bine ai venit pe pagina mea.";
        } else if (oraCurenta >= 12 && oraCurenta < 18) {
            mesajSalut.textContent = "Bună ziua! Bine ai venit pe pagina mea.";
        } else {
            mesajSalut.textContent = "Bună seara! Bine ai venit pe pagina mea.";
        }
    }
});