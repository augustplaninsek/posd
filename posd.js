/*
Disclamer:
Ova skripta je nastala samo da olakša popunjavanje POSD obrasca na ePoreznoj i da privuče pažnju na to kako je država
namjerno nepotrebno zakomplicirala popunjavanje obrasca obzirom da se gotovo svi podaci daju izračunati.
Ne odgovaram za nikakve štete nastale uporabom ove skripte. Sve podatke provjerite prije spremanja.
Ova skripta radi samo za obrte s jednim vlasnikom i nije za područja Vukovara i ostala potpomognuta područja
koja imaju olakšice
Primjeri posd-a i exceli za provjeru:
- https://plaviured.hr/vodici/pausalni-obrt-predaja-po-sd-obrasca/
- https://www.hok.hr/novosti-iz-hok/obrtnici-pausalisti-prijava-dohotka-na-obrascu-po-sd-i-po-sd-z-0
Upute:
1. Popuni varijable na početku.
2. Kopiraj cijeli kod i zalijepi u konzolu dok je otvoren POSD na koraku 2 u ePoreznoj.
3. Provjeri podatke prije spremanja.
*/

const primiciUGotovini = 13500;
const primiciBezgotovinski = 74000;
const stopaPrireza = 12;
const uplacenoPoreza = 1500;
const brojMjeseciObavljanjaDjelatnosti = 12;

/* ------- do ovdje ------  */


const formatValue = a => {
    return a.toLocaleString('hr', {minimumFractionDigits: 2, maximumFractionDigits: 2});
};

const total = primiciUGotovini + primiciBezgotovinski; 
const dohodovniRazred = (primiciUGotovini + primiciBezgotovinski / brojMjeseciObavljanjaDjelatnosti) * 12;

let godisnjiDohodak = 0;
let porez = 0;

if (dohodovniRazred <= 85000){
    godisnjiDohodak = 12750;
    porez = 1275;
} else if (dohodovniRazred <= 115000) {
    godisnjiDohodak = 17250;
    porez = 1725;
} else if (dohodovniRazred <= 149000) {
    godisnjiDohodak = 22425;
    porez = 2242.5;
} else if (dohodovniRazred <= 230000) {
    godisnjiDohodak = 34500;
    porez = 3450;
} else {
    godisnjiDohodak = 45000;
    porez = 4500;
}

const prirez = porez * stopaPrireza / 100;

const totalPorez = porez + prirez;
const mjesecniPorez = totalPorez / brojMjeseciObavljanjaDjelatnosti;

const razlika = totalPorez - uplacenoPoreza;


document.querySelector("input[name*='PrimiciUGotovini'").value = formatValue(primiciUGotovini);
document.querySelector("input[name*='PrimiciNaplaceniBezgotovinskimPutem'").value = formatValue(primiciBezgotovinski);
document.querySelector("input[name*='UkupnoOstvareniPrimici'").value = formatValue(total);

document.querySelector("input[name*='GodisnjiDohodakPojedinacneDjelatnosti'").value = formatValue(godisnjiDohodak);

document.querySelector("input[name*='ProsjecnaStopa'").value = formatValue(stopaPrireza);
document.querySelector("input[name*='PrirezPorezuNaDohodak'").value = formatValue(prirez);
document.querySelector("input[name*='UkupniPausalniPorezNaDohodakIPrirezPorezuNaDohodak'").value = formatValue(totalPorez);

document.querySelector("input[name*='UkupnaObvezaPorezaNaDohodakIPrirezPorezuNakonUmanjenja'").value = formatValue(totalPorez);

document.querySelector("input[name*='UkupnoUplaceniPorezNaDohodakIPrirezPorezuNaDohodak'").value = formatValue(uplacenoPoreza);

if (razlika > 0){
    document.querySelector("input[name*='RazlikaZaUplatu'").value = formatValue(razlika);
} else {
    document.querySelector("input[name*='RazlikaZaPovrat'").value = formatValue(Math.abs(razlika));
}

document.querySelector("input[name*='MjesecniPausalniPorezIPrirezPorezuNaDohodak'").value = formatValue(mjesecniPorez);
