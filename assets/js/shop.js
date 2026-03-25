let allProducts=[];
let genresFilter=[];
$(document).ready(function(){

    $.ajax({
        url:"assets/data/categories.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            try{
                genresFilter=data;
                generateGenres(genresFilter);
                loadProducts();
               
            }
            catch(e){
                console.error("data was not collected", e);
            }
        }
    })


});



function loadProducts() {
    $.ajax({
        url: "assets/data/products.json",
        method: "GET",
        dataType: "json",
        success: function(productsData) {
            try {
                allProducts = productsData;
                displayShopProducts(allProducts); 
                $("#search").on("keyup", sortFilterSearch);
                $("#sort").on("change", sortFilterSearch);
                $("#genre-filter").on("change", sortFilterSearch);
                $("#show-favs").on("change", sortFilterSearch)
                $("#clearFilters").on("click", resetEverything);
            } catch (e) {
                console.log("error while loading products", e);
            }
        },
        error: function(err) {
            console.log("file not found", err);
        }
    });
}

function generateGenres(data){
    let divHtml='';
    let selectForGenres=document.getElementById("genre-filter");
    data.forEach(element => {
        divHtml+=`<option value="${element.id}">${element.name}</option>`
    });
    selectForGenres.innerHTML+=divHtml;
}
function displayShopProducts(allProducts){

 let divForProducts=document.getElementById("productsDisplay");
 let divHtml='';
 let favorites = JSON.parse(localStorage.getItem("favs")) || [];


f (data.length === 0) {
        divForProducts.innerHTML = `
            <div class="col-12 text-center my-5">
                <h3 class="fw-light text-muted heartFillInColor">no products found for selected criteria :(</h3>
            </div>`;
        return; 
    }

    
 allProducts.forEach(product=>{
    let isItFave = favorites.includes(product.name);
    let heartIcon = isItFave? "bi-heart-fill heartFillInColor" : "bi-heart";
    divHtml+=`<div class="col-lg-3 col-md-6 mb-5">
                <div class="card border-0 shadow-lg p-3 h-100">
                    <img class="img-fluid card-img-top" src="${product.img.src}" alt="${product.img.alt}"/>
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <h6 class="card-title mb-3 fw-bold">${product.name}</h6>

                        <p class="card-text text-muted">$${product.price}</p>
                    <button class="btn btn-link p-0" onclick="selectFave('${product.name}')">
                            <i class="bi ${heartIcon}"></i>
                        </button>
                </button>
                    </div>
                </div>
            </div>`;

 })
 divForProducts.innerHTML=divHtml;
}
function sortFilterSearch(){
    let products=[...allProducts];

    let sortValue=document.getElementById("sort").value;
    if(sortValue=="price-asc") products.sort((a,b)=>a.price-b.price);
    else if(sortValue === "price-desc") products.sort((a, b) => b.price - a.price);

    let genreId = document.getElementById("genre-filter").value;
    if(genreId != 0) {
        products = products.filter(p => p.katId == genreId);
    }

    let insertedText = document.getElementById("search").value.toLowerCase();
    if(insertedText != "") {
        products = products.filter(p => p.name.toLowerCase().includes(insertedText));
    }
    let showFavs=document.getElementById("show-favs").checked;
    if (showFavs) {
        let favorites = JSON.parse(localStorage.getItem("favs")) || [];
        products = products.filter(p => favorites.includes(p.name));
    }
displayShopProducts(products);
}



function selectFave(name) {
    let favorites = JSON.parse(localStorage.getItem("favs")) || [];

    if (favorites.includes(name)) {
        favorites = favorites.filter(item => item !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem("favs", JSON.stringify(favorites));
    sortFilterSearch();
}

function resetEverything() {
    document.getElementById("search").value = "";
    document.getElementById("sort").value = "default";
    document.getElementById("genre-filter").value = "0";
    document.getElementById("show-favs").checked = false;
    displayShopProducts(allProducts);
}

