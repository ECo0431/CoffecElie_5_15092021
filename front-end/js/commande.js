const NUMEROCOMMANDE = localStorage.getItem("numeroCommande");
const ARTICLECOMMANDE = document.getElementById("article-commande");
let tablePrix = [];
let recupLocalStorage = [];

recupLocalStorage = JSON.parse(localStorage.getItem("produit"));

for(let i = 0; i < recupLocalStorage.length; i++){
    tablePrix[i] = recupLocalStorage[i].prix;
}
const reducer = (acc, curr) => acc + curr;//Calcule la somme d'un tableau
const TOTALPRIX = tablePrix.reduce(reducer);


console.log(TOTALPRIX)

ARTICLECOMMANDE.innerHTML =`
<h1 class="h1-commande">Orinoco<br>Vous remercie d'avoir passer une commande<br>N° ${NUMEROCOMMANDE}<br>d'un total de ${TOTALPRIX} €<br>:)</h1>
<a href="../../index.html">
    <button class="btn btn-light text-light">Revenir à l'acceuil</button>
</a>
`;
