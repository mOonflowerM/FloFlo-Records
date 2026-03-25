const carouselItems=[
    {"image":"assets/img/billieee.png","alt":"Billie - Hit Me Hard And Soft Banner"},
    {"image":"assets/img/beybanner.png","alt":"Beyonce - CowBoy Carter Banner"},
    {"image":"assets/img/metroisboomin.png","alt":"MetroBooming Banner"},
]
$(document).ready(function() {
    
    displayCarousel(carouselItems);
    ispisiAbout();
    
    $.ajax({
        url: "assets/data/products.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
          try{
            if(data.length===0) console.log("data was not collected in the right format")
        bestSellers(data);
          }catch(e){
            console.error("Greska u displeju bestsellera:", e.message);
            document.getElementById("bestSellers").innerHTML = "<p> No best sellers currently :(</p>";
          }
        },error: function(e) {
            console.log("data was not collected",e);
        }
    });
});



function displayCarousel(items){
    let carouselInner=document.querySelector('.carousel-inner');
   items.forEach((element,i) => {
    let divForCarousel = document.createElement('div');
    divForCarousel.classList.add('carousel-item');
    if(i==0){
        divForCarousel.classList.add('active');
    }
    let carouselImg=document.createElement('img');
    carouselImg.setAttribute('src',element.image);
    carouselImg.setAttribute('alt',element.alt);
    carouselImg.className="d-block w-100 img-fluid";
    divForCarousel.appendChild(carouselImg);
    carouselInner.appendChild(divForCarousel);
   });
}

function ispisiAbout(){
    let niceToMeetYouDiv=document.querySelector('.niceToMeetYou');
    
    niceToMeetYouDiv.innerHTML=`<div class="row title">
                    <h1 class="fw-bold title1">nice to meet you!</h1>
                    <h4 class="fw-semibold title2">this is us...</h6>
                    </div>
                    <div id="forParagraphSmaller">
                    <p class="paragraphSmaller">Welcome to Flo Records, your ultimate destination for vinyl enthusiasts and music lovers alike.</p>
                    <p class="paragraphSmaller">We offer a carefully curated selection of new and vintage vinyl records spanning all genres, from classic rock to contemporary indie. </p>
                    <p class="paragraphSmaller">Come visit us and experience the magic of music on vinyl.</p>
                    </div>
                    <a href="contact.html" role="button" class="btn btn-mine py-2 px-4 d-inline-block mt-1">Reach us</a>`;
}

function bestSellers(items){
    let divForBestSellers=document.getElementById("bestSellers");
    let item='';
   for(i of items){
    if(i.fav){
        item+=`<div class="col-lg-3 col-md-6 mb-5">
                <div class="card border-0 shadow-lg p-3 h-100">
                    <img class="img-fluid card-img-top" src="${i.img.src}" alt="${i.img.alt}"/>
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <h6 class="card-title mb-3 fw-bold">${i.name}</h6>
                        <p class="card-text fs-5 text-muted">$${i.price}</p>

                    </div>
                </div>
            </div>`
    }
 

   }
  divForBestSellers.innerHTML=item;

}


