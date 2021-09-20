

let recupLocalStorage = [];

recupLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(recupLocalStorage[0])

const produitsPanier = document.getElementById("produits-panier");

for(let i = 0; i < recupLocalStorage.length; i++){

    produitsPanier.innerHTML += 
    `<article class="article-panier">
        <div class="box-panier">
            <div class="box-croix">
                <svg class="croix" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <img class="image-panier" src="${recupLocalStorage[i].image}">
            <div class="box-panier-txt">
                <h2>${recupLocalStorage[i].nomProduit}</h2>
                <p>x ${recupLocalStorage[i].quantite}</p>
            </div>
            <div class="box-panier-txt">
                <p>${recupLocalStorage[i].optionsProduit}</p>
                <p class="bold">${recupLocalStorage[i].prix} €</p>
            </div>
        </div>
    </article>`
};

nbrPanier(recupLocalStorage);

function nbrPanier(recupLocalStorage){
    const nbrPanier = document.querySelector("#nbr-panier");
    
    nbrPanier.innerHTML = `
        <p>${recupLocalStorage.length}</p>
    `;
};