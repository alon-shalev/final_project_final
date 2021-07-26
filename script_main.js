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
    img:"faded-hoodie.jpg",
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



for(let i =0; i< carts.length; i++){
    carts[i].addEventListener("click",() => {
        cartAmount( products[i]);
        totalCost(products[i]);
     

    });
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent() = productNumbers;

    }
    
}





function cartAmount(product, action){
    let productNumbers= localStorage.getItem('cartAmount', 1);
    productNumbers=parseInt(productNumbers);
    
let cartItems = localStorage.getItem('productsInCart');
cartItems= JSON.parse(cartItems);

if(action == "decrease"){
    localStorage.setItem('cartAmount', productNumbers-1);
    document.querySelector('.cart span').textContent =  parseInt(productNumbers - 1);
}else if(productNumbers){
localStorage.setItem('cartAmount', productNumbers + 1);
document.querySelector('.cart span').textContent = parseInt(productNumbers + 1);

}else{
    localStorage.setItem('cartAmount', 1);
    document.querySelector('.cart span').textContent =parseInt(1);

}


//    if(productNumbers)  {
//        localStorage.setItem('cartAmount',parseInt(productNumbers + 1));
//        document.querySelector('.cart span').textContent = productNumbers + 1;
//    }else{
//        localStorage.setItem('cartAmount',parseInt(1));
//        document.querySelector('.cart span').textContent = 1;
//    }
   setItems(product);}
//     productNumbers = parseInt(productNumbers);
// if(productNumbers)
// {
//     localStorage.setItem('cartAmount',parseInt(productNumbers + 1));
//     document.querySelector('.cart span').textContent = productNumbers + 1;


// }else{
//     localStorage.setItem('cartAmount',parseInt(productNumbers));
//     document.querySelector('.cart span').textContent = 1;

// }
  
// 
 

function setItems(product){
    

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("hi");
  if(cartItems != null){
      if(cartItems[product.tag] == undefined){
          cartItems = {
              ...cartItems,
              [product.tag]: product
          }
      }
      cartItems[product.tag].inCart += 1;
  }else{
      product.inCart = 1;
      cartItems ={
          [product.tag]:product
      }
  }
    
    //     cartItems[product.tag].inCart += 1 ;
    //     console.log("if");

    // }else{
    //     product.inCart = 1;
    //     cartItems={

    //         [product.tag]: product

    //     }
    //     console.log("else");

    // }
  
    
localStorage.setItem("productsInCart",JSON.stringify(cartItems));



}
function totalCost(product,action){
//    let price = product.price;

let cartCost = localStorage.getItem('totalCost');
 if(action == "descrease"){
     cartCost = parseInt(cartCost);
     localStorage.setItem('totalCost', cartCost - currentProduct.price);
 }
   else if(cartCost != null){
    cartCost = parseInt(cartCost);

    localStorage.setItem('totalCost', cartCost + product.price);

   }else{

    localStorage.setItem('totalCost', product.price);

   }
   
 }



 function displayCart(){
     let cartItems = localStorage.getItem("productsInCart");
     cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".allProducts");
let cartCost = localStorage.getItem('totalCost');

//checking if its running on productContainer page element
if(cartItems && productContainer){
    productContainer.innerHTML = '';// when loading page frist is empty

    //looping through all objects
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
            <i class="far fa-window-close"></i>
            <img src="./images/${item.tag}.jpg">      
            <span>${item.name}</span>
        </div>
        <div class="price">$${item.price},00</div>
        <div class="qty">
        <i class="fas fa-arrow-left" id="decrease"></i>
        <span>${item.inCart}</span>

        <i class="fas fa-arrow-right" id="increase"></i>
        
        </div>
        <div class="total">
        $${item.inCart * item.price},00
        </div>

        `;
    });

    productContainer.innerHTML +=  `
    <div class="cartTotalContainer">
     <h4 class="cartTotalTitle>
                Total
     </h4>
                <h4 class="cartTotal">
                $${cartCost},00</h4>   
                </div>

    `;

}

deleteButtons();
manageQty();

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
             
        }
    }
    
   console.log(product_page_price)
location.href="productPage.html";
    
   
  
    })
   
   
}


function onProductPageLoad(){
    console.log("oded")
   // document.querySelector("#mainImg").src=img/product_page_img;
 document.querySelector('.productPrice').innerHTML=product_page_price;
    document.querySelector('#mainImg').src=img/product_page_img;
    document.querySelector('.proudact_title').innerHTML=product_page_name;
}
function deleteButtons(){
    let deleteButtons = document.querySelectorAll('.product i');
let productName;
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);
let cartCost = localStorage.getItem('totalCost');


let productNumbers = localStorage.getItem('cartAmount');
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].addEventListener("click", ()=> {
            //remove blank white space
                        productName=deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g,'');
                        localStorage.setItem('cartAmount', productNumbers - cartItems[productName].inCart);
                        localStorage.setItem('totalCost',cartCost - (cartItems[productName].price * cartItems[productName].inCart) );
            delete cartItems[productName];
            localStorage.setItem('productsInCart',JSON.stringify(cartItems));

onLoadCartNumbers();
displayCart();

//   
        });
    }
}


function manageQty(){
    let decBtn = document.querySelectorAll('#decrease');
    let incBtn = document.querySelectorAll('#increase');

    let cartItems = localStorage.getItem('productsInCart');
    let currentQty = 0;
    let currentProduct="";
    cartItems = JSON.parse(cartItems);


    for(let i = 0; i<decBtn.length; i++){
        decBtn[i].addEventListener('click',()=>{
            currentQty = decBtn[i].parentElement.querySelector('span').textContent;
            currentProduct = decBtn[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim().toLowerCase().replace(/ /g,'');
            console.log(currentProduct);

            if(cartItems[currentProduct].inCart > 1 && undefined ){
                cartItems[currentProduct].inCart -=1;
                cartAmount(cartItems[currentProduct],"decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart',JSON.stringify(cartItems));
                displayCart();
            }
           

        });
    }
    for(let i = 0; i<incBtn.length; i++){
        incBtn[i].addEventListener('click',()=>{
            currentQty = incBtn[i].parentElement.querySelector('span').textContent;
            currentProduct = incBtn[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim().toLowerCase().replace(/ /g,'');
            console.log(currentProduct);


            if( cartItems[currentProduct].inCart == undefined){

            
                cartItems[currentProduct].inCart += 1;
                cartAmount(  cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart',JSON.stringify(cartItems));
                displayCart();
            
            }
        });
    }

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

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
// //popup
// let popup = document.querySelector('.popup');
// let close = document.querySelector('#close');
=======
>>>>>>> Stashed changes
// //  shopping cart popup
//  let cartBtn = document.querySelector('#cart');
//  let shopingCart = document.querySelector('.shopping_cart');
//  let closeCartBtn = document.querySelector('.close-cart');
//  let cartItemsAmount = document.querySelector('.cart_amount');
//  cartBtn.addEventListener('click', function (event) {
//    event.preventDefault();
//    shopingCart.classList.toggle('on');
 
 
//  });



//  localStorage.setItem('products',JSON.stringify(product));
//  let prodactImg=document.querySelector('img').src;//שליפה של התמונה
 
//  let productName=document.querySelector('.proudact_title').innerHTML;
//  let productPrice=document.querySelector('.productPrice').innerHTML;

<<<<<<< Updated upstream



=======
>>>>>>> f99fd56538e4147c60f1f46d65dd1cedd16ce463

// window.addEventListener("load",function(){
//   showPopUp();
// });


<<<<<<< HEAD
=======
>>>>>>> Stashed changes
// let productTemplet=` <li>
// <h3>${productName}</h3>
// <div class="price">
//    ${productPrice}
// </div>
// <img src=${prodactImg}>
// <div class="qtyP">
//    ${qty}
// </div>
// </li>`;
// let listOfP=document.querySelector('.proudact_list');
//  listOfP.innerHTML+=productTemplet;
//  console.log(productTemplet);
<<<<<<< Updated upstream



=======
>>>>>>> f99fd56538e4147c60f1f46d65dd1cedd16ce463

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

// close.addEventListener("click",function(_event){
//   popup.classList.remove("show");
// });

//  // this function will check if current id appears in cart-its not finished!
//  const buttons = document.querySelectorAll("button");
//  buttons.forEach(function(button){
//    button.onclick = function(event){
//      console.log(event.target);
//    }
//  });
// // ---end of shopping cart - not finished!

//popup
let popup = document.querySelector('.popup');
let close = document.querySelector('#close');


// //endPopup



let cartBtn = document.querySelector('#cart');
let shopingCart = document.querySelector('.shopping_cart');
let closeCartBtn = document.querySelector('.close-cart');
let cartItemsAmount = document.querySelector('.cart_amount');
cartBtn.addEventListener('click', function (event) {
    console.log("running")

  event.preventDefault();
  shopingCart.classList.toggle('on');

})

// // let switchImg = document.querySelectorAll('.box');
// // imgThumb.addEventListener("click",changeImage());




// let clicked = document.querySelector('.photo-box h3');

// clicked.addEventListener("click", function(event){
//     preventDefault();
//     console.log("cliecked");
// })
onLoadCartNumbers();
displayCart();
// comments
