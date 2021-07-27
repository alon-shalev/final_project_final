
let carts = document.querySelectorAll('.add-cart');

let products= [{
    code:1,
    name:"jeans",
    tag: "jeans",
    img:"jeans.jpg",
    price: 79,
    inCart:0
},{
    code:2,
    name:"faded hoodie",
    tag: "fadedhoodie",
    img:"fadedhoodie.jpg",
    price: 49,
    inCart:0
       
},{
    code:3,
    img:"overall.jpg",
    name:"overall",
    tag: "overall",
    price:89,
    inCart:0
},{
    code:4,
    name:"baggy buttons",
    tag:"baggymekufteret",
    img: "baggy-mekufteret.jpg",
    price: 49,
    inCart:0
},{
    code:5 ,
    name: "shower look",
    tag:"halook_1",
    img:"halook_1.jpg",
    price: 129,
    inCart:0
},
{
    code:6,
    name: "miroor",
    img:"miroor.jpg",
    tag:"miroor",
      price: 12,
     inCart: 0
},{
    code:7,
    name: "candle",
    tag:"candle",
    img:"ner.jpg",
    price: 129,
    inCart:0
}
];





for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
        location.reload();
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1 );
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    if( action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost',cartCost - product.price);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    // console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i class="fas fa-window-close"></i>

                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
            <i class="fas fa-arrow-left" id="decrease"></i>
            <span>${item.inCart}</span>
            <i class="fas fa-arrow-right" id="increase"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `;

    }

    deleteButtons();
    manageQuantity();
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product i');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    


    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            // console.log(productName);
            // console.log(cartItems[productName].name + " " + cartItems[productName].inCart)
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );

            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('#decrease');
    let increaseButtons = document.querySelectorAll('#increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers( cartItems[currentProduct], "decrease" );
                totalCost( cartItems[currentProduct], "decrease" );
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log("Increase button");
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);

            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            
                cartItems[currentProduct].inCart += 1;
                cartNumbers( cartItems[currentProduct]);
                totalCost( cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            
        })
    }
}


let chosen_box=document.querySelectorAll('.photo-box img');
let chosen_name=document.querySelectorAll('.photo-box .name');
let product_page_img;
let product_page_name;
let product_page_price;
for(let i=0; i<chosen_box.length;i++){
   
    chosen_box[i].addEventListener('click',function(){
        
        for(let j=0 ; j<products.length ; j++){


        if(products[j].name==chosen_name[i].textContent){
             product_page_img=products[j].img;
            product_page_name=products[j].name;
             product_page_price=products[j].price;
            localStorage.setItem('product_page_img',JSON.stringify(product_page_img)); 
            localStorage.setItem('product_page_name',JSON.stringify(product_page_name)); 
            localStorage.setItem('product_page_price',JSON.stringify(product_page_price)); 
             
        }
    }
    
   console.log(product_page_price)
location.href="productPage.html";
    
   
  
    })
   
   
}


function onProductPageLoad(){
    let picture=localStorage.getItem('product_page_img');
    picture=JSON.parse(picture);
    let namee=localStorage.getItem('product_page_name');
   namee=JSON.parse(namee);
    let pricee=localStorage.getItem('product_page_price');
    pricee=JSON.parse(pricee);

    console.log(pricee,picture,namee)
   // document.querySelector("#mainImg").src=img/product_page_img;
 document.querySelector('.productPrice').innerHTML=pricee;
    
    document.querySelector('.proudact_title').innerHTML=namee;
    document.querySelector('#mainImg').src="images/"+picture;
}


// switch images in prodcut page
function changeImage(event){
  
    var targetElement = event.target;
    document.getElementById("mainImg").src = targetElement.getAttribute("src")
  
  
  }
  
// hamburger menu 
let navMenu = document.querySelector('.nav_categories');
let firstLine =document.querySelector('.line-one');
let secondLine =document.querySelector('.line-two');
let thirdLine =document.querySelector('.line-three');
let line=document.querySelector('.line');

 btn.addEventListener("click",function(_event){
     navMenu.classList.toggle("changeIt");
     firstLine.classList.toggle("changeIt");
     secondLine.classList.toggle("changeIt");
     thirdLine.classList.toggle("changeIt");

 });
// ----end of hamburger menu --

let cartBtn = document.querySelector('#cart');
let shopingCart = document.querySelector('.shopping_cart');
let closeCartBtn = document.querySelector('.close-cart');
// let cartItemsAmount = document.querySelector('.cart_amount');
cartBtn.addEventListener("click",function(event){
    console.log("running");

  event.preventDefault();
  shopingCart.classList.toggle('on');

});

// let popup = document.querySelector('.popup');
// let close = document.querySelector('#close');
// function showPopUp(){
//   let timelimit = 5 ;
//   let i = 0;

// let timer = setInterval(function(){
// i++;
// if(i == timelimit){
//   clearInterval(timer);
//   popup.classList.add("show");
// }
// console.log(i);
// },1000);  }

// close.addEventListener("click",function(){
//   popup.classList.remove("show");
// });
// window.addEventListener("load",function(){
//       showPopUp();
//     });



onLoadCartNumbers();
displayCart();
let comment_btn=document.querySelector('#add-comment');
let comment_namee;
let comment_text;
comment_btn.addEventListener('click',function(event){
   event.preventDefault();
   console.log(event)
   let comment_namee=document.querySelector('.name-input').value;
    let comment_text=document.querySelector('.comment_input').value;
    console.log(document.querySelector('.name-input').values)
    console.log(comment_text)
   document.querySelector('.added-comment .comment-name').innerHTML=comment_namee;
   document.querySelector('.added-comment .comments-words').innerHTML=comment_text;
   
})


