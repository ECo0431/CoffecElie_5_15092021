const URLAPI = "http://localhost:3000/api/cameras";

main();
nbrPanier();

async function main(){

    const getData = await fetch(URLAPI);
    const data = await getData.json();

    const produitsIndex = document.getElementById("produits-index");
    let x = 0;

    for(let i = 0; i < data.length; i++){

        produitsIndex.innerHTML += 
        `<article class="article-index">
            <a href="./front-end/html/produits.html?${data[i]._id}" class="liens-index">
                <div class="box-index">
                <img class="images-index img-i-${x}" src="${data[i].imageUrl}">
                    <h2>${data[i].name}</h2>
                    <p>${data[i].description}</p>
                </div>
            </a>
        </article>`

        if(x == 0){
            x = 1;
        }else{
            x = 0;
        }
    };
};

function nbrPanier(){
    recupLocalStorage = JSON.parse(localStorage.getItem("produit"));

    const nbrPanier = document.querySelector("#nbr-panier");
    
    nbrPanier.innerHTML = `
        <p>${recupLocalStorage.length}</p>
    `;
};


