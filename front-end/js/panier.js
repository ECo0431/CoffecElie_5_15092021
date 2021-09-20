

let recupLocalStorage = [];

recupLocalStorage = JSON.parse(localStorage.getItem("produit"));

const produitsPanier = document.getElementById("produits-panier");

for(let i = 0; i < recupLocalStorage.length; i++){

    produitsPanier.innerHTML += 
    `<article class="article-panier">
        <div class="box-panier">
            <div id="btn-suppr-${i}" class="box-croix">
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

function calculPrixTotal(recupLocalStorage){
    const sectionPrixTotal = document.querySelector("#section-prix-total");
    let tablePrix = [];
    
    for(let i = 0; i < recupLocalStorage.length; i++){
        tablePrix[i] = recupLocalStorage[i].prix;
    }
    
    const reducer = (acc, curr) => acc + curr;//Calcule la somme d'un tableau
    const totalPrix = tablePrix.reduce(reducer);
    
    sectionPrixTotal.innerHTML = `
    <p class="prix-total">TOTAL : ${totalPrix} €</p>
    `;
};

function nbrPanier(recupLocalStorage){
    const nbrPanier = document.querySelector("#nbr-panier");
    
    nbrPanier.innerHTML = `
        <p>${recupLocalStorage.length}</p>
    `;
};


function supprProduitsPanier(recupLocalStorage){
    const btnSuppr = [];

    for(let i = 0; i < recupLocalStorage.length; i++){
        btnSuppr[i] = document.querySelector("#btn-suppr-"+i);
    
        btnSuppr[i].addEventListener("click", ()=>{
            delete recupLocalStorage[i];
            
            let tableSansEmpty = recupLocalStorage.filter(function (el) {
                return el != null;
            });
            localStorage.setItem("produit", JSON.stringify(tableSansEmpty));
        
            location.reload();
        });
    };
};

function envoiCoordonneesLocalStorage(){

    const btnCommander = document.querySelector("#btn-commander");
    
    btnCommander.addEventListener("click", () =>{
        const client = {
            nom: document.querySelector("#nom").value,
            prenom: document.querySelector("#prenom").value,
            email: document.querySelector("#email").value,
            ville: document.querySelector("#ville").value,
            cp: document.querySelector("#cp").value
        };

        localStorage.setItem("client", JSON.stringify(client));
        document.location.href="../../front-end/html/commande.html"; 
    });
};

envoiCoordonneesLocalStorage();
nbrPanier(recupLocalStorage);
supprProduitsPanier(recupLocalStorage);
calculPrixTotal(recupLocalStorage);




