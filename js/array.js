document.addEventListener('DOMContentLoaded', function() {
    const elementeLista = document.querySelectorAll('#education ol li');
    const arrayElementeEducatie = [];
    const arrayElementeEducatie2018 = [];
    const arraryPrimulCuvantElementeEducatie = [];

    elementeLista.forEach(function(li) {
        arrayElementeEducatie.push(li.textContent);
        arraryPrimulCuvantElementeEducatie.push(li.textContent.split(' ')[0]);

        if (li.textContent.includes('2018')) {
            arrayElementeEducatie2018.push(li.textContent);
        }
    });

    const totalAniStudiu = arrayElementeEducatie.reduce(function(total, textElement) {

        const aniGasiti = textElement.match(/\d{4}/g);
        
        if (aniGasiti && aniGasiti.length >= 2) {
            const anInceput = parseInt(aniGasiti[0], 10);
            const anFinal = parseInt(aniGasiti[1], 10);
            
            const durata = anFinal - anInceput;
            
            return total + durata;
        } else {
            return total;
        }
        
    }, 0);

    console.log('Array cu elementele din secțiunea Educație:', arrayElementeEducatie);
    console.log('Elementul "2018" este prezent în array-ul cu elementele din secțiunea Educație:', arrayElementeEducatie2018);
    console.log('Array cu primul cuvânt din fiecare element din secțiunea Educație:', arraryPrimulCuvantElementeEducatie);
    console.log("Total ani de studiu: " + totalAniStudiu);
});