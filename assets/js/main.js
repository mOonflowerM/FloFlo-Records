//console.log('tu');

let mainDiv=document.getElementById('main-nav');
const myNav=[
    {name:"Home",link:"index.html"},
    {name:"Shop",link:"shop.html"},
    {name:"Contact",link:"contact.html"},
    {name:"Author",link:"author.html"},
    {name:"Docs",link:"#"},
   
    
]
function displayNav(item){
    try{
let isActivePage=document.body.getAttribute('data-page');
    let disp="";
    item.forEach(element => {
        let makeActive=(element.name===isActivePage)? "active" : "text-dark";
        disp+=` <li class="nav-item">
                <a class="nav-link ${makeActive} fs-5" aria-current="page" href="${element.link}">${element.name}</a>
              </li> `;

    });

mainDiv.innerHTML=disp;
    }
    catch(e){
        console.error("Navigacija se nije učitala:", e.message);
    }
    
}

displayNav(myNav);


