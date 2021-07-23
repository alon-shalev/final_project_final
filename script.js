let cartBtn = document.querySelector('#cart');
let shopingCart = document.querySelector('.shopping_cart');
let closeCartBtn = document.querySelector('.close-cart');
let cartItemsAmount = document.querySelector('.cart_amount');
cartBtn.addEventListener('click', function (event) {
  event.preventDefault();
  shopingCart.classList.toggle('on');


})
  //let prodactId= addToCartBTN.dataset.productId;
  // let {prodactId}=addToCartBTN.dataset;

let addToCartBTN = document.querySelector('#add_to_bag');
addToCartBTN.addEventListener('click', addToCart);
let products=[];
  products =JSON.parse(localStorage.getItem('products'));
function addToCart(event) {
  event.preventDefault();

  let {
    dataset: {
      productId
    }
  } = addToCartBTN;
  let qty = document.querySelector('.qty').value;
  console.log(productId);
  console.log(qty);
  
  let product = {
    id: productId,
    quantity: qty
  }

  

  localStorage.setItem('products',JSON.stringify(product));
  let prodactImg=document.querySelector('img').src;//שליפה של התמונה
  
  let productName=document.querySelector('.proudact_title').innerHTML;
  let productPrice=document.querySelector('.productPrice').innerHTML;

  //שאלה לאלכס
//הוספה לסל של פריט קיים , העלאת המחיר בהתאם לכמות


let productTemplet=` <li>
<h3>${productName}</h3>
<div class="price">
    ${productPrice}
</div>
<img src=${prodactImg}>
<div class="qtyP">
    ${qty}
</div>
</li>`;
let listOfP=document.querySelector('.proudact_list');
  listOfP.innerHTML+=productTemplet;
  console.log(productTemplet);



  // this function will check if current id appears in cart-its not finished!
  const buttons = document.querySelectorAll("button");
  buttons.forEach(function(button){
    button.onclick = function(event){
      console.log(event.target);
    }
  });


};
let navMenu = document.querySelector('.nav_categories');
let firstLine =document.querySelector('.line-one');
let secondLine =document.querySelector('.line-two');
let thirdLine =document.querySelector('.line-three');
let line=document.querySelector('.line');

 btn.addEventListener("click",function(event){
     navMenu.classList.toggle("changeIt");
     firstLine.classList.toggle("changeIt");
     secondLine.classList.toggle("changeIt");
     thirdLine.classList.toggle("changeIt");

 });

let index=0;
let clicked=document.querySelector('.photo-box');
let chosen_product= document.querySelector('.photo-box img').src;
console.log(chosen_product);
clicked.addEventListener("click",function(){
for(let i=0;i<productsArry.length;i++){
  
  if(chosen_product==productsArry[i].img){
   index=i;
   console.log(index);
  }
}

let productPageImg=productsArry[index].img;
let productPagePrice=productsArry[index].price;
let setImg=document.querySelector('.gallery-main-img');
setImg.innerHTML=`<img src=${productPageImg}>`;
location.href="productPage.html";
});



//  switch images 

function changeImage(event){
  
  var targetElement = event.target;
  document.getElementById("mainImg").src = targetElement.getAttribute("src")


}

// // //  popup 
// let popup = document.querySelector('.popup');
// let close = document.querySelector('#close');

// window.addEventListener("load",function(){
//   showPopUp();
// });



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

// close.addEventListener("click",function(event){
//   popup.classList.remove("show");
// });

// // let switchImg = document.querySelectorAll('.box');
// // imgThumb.addEventListener("click",changeImage());


let productsArry=[
  {
    code:1,
    img:"jeans.jpg",
    price: 79
  },
  {
      code:2,
      img:"58338161_023_d.jpg",
      price: 49
    },
    {
      code:3,
      img:"blacklady.jpg",
      price: 89
    },
    {
      code:4,
      img:"baggy-mekufteret.jpg",
      price: 79
    },
    {
        code:5,
        img:"miroor.jpg",
        price: 120
      },
      {
        code:6,
        img:"cher.jpg",
        price: 100
      },
      {
        code:7,
        img:"ner.jpg",
        price: 12
      }
   
  
  ]