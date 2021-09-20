const URLAPI = "http://localhost:3000/api/cameras";

afficheDescription();
nbrPanier();

async function afficheDescription(){

    const getData = await fetch(URLAPI);
    const data = await getData.json();

    const urlIdBrut = window.location.search;
    const urlIdNet = urlIdBrut.slice(1);

    const idProduitSelectionner = data.find((element) => element._id === urlIdNet);

    console.table(idProduitSelectionner);//L'objet en question doit être présent 

    const produitsIndex = document.getElementById("produits-description");
    let x = 0;

    produitsIndex.innerHTML += 
    `<article>
        <div class="box-description">
        <img class="images-description img-i-0" src="${idProduitSelectionner.imageUrl}">
            <div class="box-txt">
                <h2>${idProduitSelectionner.name}</h2>
                <p>${idProduitSelectionner.description}</p>
                <div class="box-end">
                    <div class="box-choix">
                        <p class="bold">Quantité :</p>
                        <input type="number" id="qte" name="qte-" min="1" max="99" value="1">
                        <p class="bold txt-list">Choix du modèle :</p>
                        <select class="form-select" id="list" aria-label="Default select example"> 
                        </select>
                    </div>
                    <div class="box-prix-bouton">
                    <p class="bold prix">${idProduitSelectionner.price/100} €</p>
                    <button id="btn-acheter" type="submit">Acheter</button>
                    </div>
                </div>
            </div>
        </div>
    </article>`

    recupChoixProduit(idProduitSelectionner);  
    listOptions(idProduitSelectionner);
};


function recupChoixProduit(idProduitSelectionner){

    const btnAcheter = document.querySelector("#btn-acheter");

    btnAcheter.addEventListener("click", (e) =>{
        e.preventDefault();
        location.reload();

        const list = document.querySelector("#list"); 
        const qte = document.querySelector("#qte");
        const choixList = list.value;
        let choixQte = qte.value;

        let optionsProduit = {
            nomProduit: idProduitSelectionner.name,
            id: idProduitSelectionner._id,
            optionsProduit: choixList,
            quantite: choixQte,
            prix: idProduitSelectionner.price*choixQte/100,
            image: idProduitSelectionner.imageUrl
        };

        ajoutProduitLocalStorage(optionsProduit)
    
    });
};

function listOptions(idProduitSelectionner){
    let listTable = [];

    for(let i = 0; i < idProduitSelectionner.lenses.length; i++){
        listTable +=
        `<option value="${idProduitSelectionner.lenses[i]}">${idProduitSelectionner.lenses[i]}</option>`;
    }

    const elList = document.querySelector("#list");
    elList.innerHTML = listTable;
};

function ajoutProduitLocalStorage(optionsProduit){
    let produitsLocalStorage = JSON.parse(localStorage.getItem("produit"));

    if(produitsLocalStorage){
        produitsLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitsLocalStorage));
    }else{
        produitsLocalStorage = [];
        produitsLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitsLocalStorage));
    };
};

function nbrPanier(){
    recupLocalStorage = JSON.parse(localStorage.getItem("produit"));

    const nbrPanier = document.querySelector("#nbr-panier");

    nbrPanier.innerHTML = `
        <p>${recupLocalStorage.length}</p>
    `;
};


