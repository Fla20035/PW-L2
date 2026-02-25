// Pasul 4: Crearea funcției pentru formular
function submitForm() {
    
    // Pasul 6: Salvarea celor 3 elemente de formular în constante
    // Folosim .value pentru a extrage textul scris de utilizator în acele câmpuri
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    // Pasul 7: Printarea celor 3 elemente în consolă
    console.log("Datele introduse în formular sunt:");
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesaj:", mesaj);

    // Pasul 8: Printarea unei avertizări la finalul funcției
    console.warn("Goodbye World!");
}