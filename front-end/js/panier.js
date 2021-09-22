let recupLocalStorage = [];
const MAINPANIER = document.querySelector(".main-panier");
recupLocalStorage = JSON.parse(localStorage.getItem("produit"));
const produitsPanier = document.getElementById("produits-panier");
let validForm = 0;


if(recupLocalStorage){
    if (recupLocalStorage.length > 0){
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
            
                
                    btnCommander.addEventListener("click", async e =>{
                        if(validForm == 6){
                        e.preventDefault();
                
                        const contact = {
                            firstName: document.querySelector("#prenom").value,
                            lastName: document.querySelector("#nom").value,
                            address: document.querySelector("#adresse").value,          
                            city: document.querySelector("#ville").value,
                            email: document.querySelector("#email").value
                        };
                
                        const data = {
                            contact,
                            products: JSON.parse(localStorage.getItem("products"))
                        };
                        
                        const promise = await fetch("http://localhost:3000/api/cameras/order",{
                            method: "POST",
                            body: JSON.stringify(data),
                            headers:{
                                "Content-Type": "application/json"
                            }
                        });
                
                        const result = await promise.json();
                
                        localStorage.setItem("numeroCommande", result.orderId);
                
                        localStorage.setItem("contact", JSON.stringify(contact));
                
                        document.location.href="../../front-end/html/commande.html"; 
                    }else{
                        console.log("ok")
                    }
                    });


            };
            
            function afficheForm(){
                const sectionForm = document.querySelector("#section-form");
            
                sectionForm.innerHTML = `
                <article>
                <form class="row g-3 none" id="form">
                    <div class="col-md-6">
                    <label for="nom" name="nom" class="form-label text-light">Nom</label>
                    <input type="text" class="form-control" id="nom" required>
                    <small id="nom-ok" class="form-ok"></small>
                    <small id="nom-nok" class="form-nok"></small>
                    </div>
                    <div class="col-md-6">
                    <label for="prenom" name="prenom" class="form-label text-light">Prénom</label>
                    <input type="text" class="form-control" id="prenom" required>
                    <small id="prenom-ok" class="form-ok"></small>
                    <small id="prenom-nok" class="form-nok"></small>
                    </div>
                    <div class="col-md-12">
                        <label for="email" class="form-label text-light">Email</label>
                        <input type="email" name="email" class="form-control" id="email" required>
                        <small id="email-ok" class="form-ok"></small>
                        <small id="email-nok" class="form-nok"></small>
                    </div>
                    <div class="col-12">
                        <label for="adresse" class="form-label text-light">Adresse</label>
                        <input type="text" name="adresse" class="form-control" id="adresse" required>
                        <small id="adresse-ok" class="form-ok"></small>
                        <small id="adresse-nok" class="form-nok"></small>
                    </div>
                    <div class="col-md-6">
                        <label for="ville" class="form-label text-light">Ville</label>
                        <input type="text" name="ville" class="form-control" id="ville" required>
                        <small id="ville-ok" class="form-ok"></small>
                        <small id="ville-nok" class="form-nok"></small>
                    </div>
                    <div class="col-md-2">
                        <label for="cp" class="form-label text-light">CP</label>
                        <input type="text" name="cp" class="form-control" id="cp" required>
                        <small id="cp-ok" class="form-ok"></small>
                        <small id="cp-nok" class="form-nok"></small>
                    </div>
                    <div class="col-12">
                        <button id="btn-commander" type="submit" class="btn btn-light text-light">Commander</button>
                    </div>
                    </form>
                </article>
                `
            };
            
            function regex(){
                let form = document.querySelector("#form");
            
                form.nom.addEventListener("change", function(){
                    validNom(this);
                });
                form.prenom.addEventListener("change", function(){
                    validPrenom(this)
                });
                form.email.addEventListener("change", function(){
                    validEmail(this)
                });
                form.adresse.addEventListener("change", function(){
                    validAdresse(this)
                });
                form.ville.addEventListener("change", function(){
                    validVille(this)
                });
                form.cp.addEventListener("change", function(){
                    validCp(this)
                    console.log(validForm)
                });

                const validNom = function(inputNom){
                    let nomRegexExp = new RegExp("^[a-zA-Z]{2,10}$", "g")
                    let testNom = nomRegexExp.test(inputNom.value);
                    let nomOK = document.querySelector("#nom-ok");
                    let nomNOK = document.querySelector("#nom-nok")
                    if(testNom){
                        nomOK.innerHTML = "Nom Valide";
                        validForm++;
                    }else{
                        nomNOK.innerHTML = "Nom Invalide";
                    }
                };
                
                const validPrenom = function(inputPrenom){
                    let nomRegexExp = new RegExp("^[a-zA-Z]{2,10}$", "g")
                    let testPrenom = nomRegexExp.test(inputPrenom.value);
                    let prenomOK = document.querySelector("#prenom-ok");
                    let prenomNOK = document.querySelector("#prenom-nok")
                    if(testPrenom){
                        prenomOK.innerHTML = "Prénom Valide";
                        validForm++;
                    }else{
                        prenomNOK.innerHTML = "Prénom Invalide";
                    }
                };
                
                const validEmail = function(inputEmail){
                    let emailRegexExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g")
                    let testEmail = emailRegexExp.test(inputEmail.value);
                    let emailOK = document.querySelector("#email-ok");
                    let emailNOK = document.querySelector("#email-nok")
                    if(testEmail){
                        emailOK.innerHTML = "Email Valide";
                        validForm++;
                    }else{
                        emailNOK.innerHTML = "Email Invalide";
                    }
                };
                
                const validAdresse = function(inputAdresse){
                    let adresseRegexExp = new RegExp("[a-zA-Z0-9]+", "g")
                    let testAdresse = adresseRegexExp.test(inputAdresse.value);
                    let adresseOK = document.querySelector("#adresse-ok");
                    let adresseNOK = document.querySelector("#adresse-nok")
                    if(testAdresse){
                        adresseOK.innerHTML = "Adresse Valide";
                        validForm++;
                    }else{
                        adresseNOK.innerHTML = "Adresse Invalide";
                    }
                };
                
                const validVille = function(inputVille){
                    let villeRegexExp = new RegExp("([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$", "g")
                    let testVille = villeRegexExp.test(inputVille.value);
                    let villeOK = document.querySelector("#ville-ok");
                    let villeNOK = document.querySelector("#ville-nok")
                    if(testVille){
                        villeOK.innerHTML = "Ville Valide";
                        validForm++;
                    }else{
                        villeNOK.innerHTML = "Ville Invalide";
                    }
                };
                
                const validCp = function(inputCp){
                    let cpRegexExp = new RegExp("[0-9]{3,5}$", "g")
                    let testCp = cpRegexExp.test(inputCp.value);
                    let cpOK = document.querySelector("#cp-ok");
                    let cpNOK = document.querySelector("#cp-nok")
                    if(testCp){
                        cpOK.innerHTML = "CP Valide";
                        validForm++;
                    }else{
                        cpNOK.innerHTML = "CP Invalide";
                    }
                };
            };
        afficheForm();
        envoiCoordonneesLocalStorage();
        regex();
        nbrPanier(recupLocalStorage);
        supprProduitsPanier(recupLocalStorage);
        calculPrixTotal(recupLocalStorage);
        console.log(validForm)

    }else if(recupLocalStorage == null || recupLocalStorage == 0){
        MAINPANIER.innerHTML=`
            <h1 class="h1-commande">Votre panier est vide</h1>
        `;
    };
}else{
    MAINPANIER.innerHTML=`
    <h1 class="h1-commande">Votre panier est vide</h1>
`; 
}









