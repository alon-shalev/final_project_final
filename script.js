let cartBtn = document.querySelector('#cart');
let shopingCart = document.querySelector('.shopping_cart');
cartBtn.addEventListener('click', function (event) {
  event.preventDefault();
  shopingCart.classList.toggle('on');


})


let addToCartBTN = document.querySelector('#add_to_bag');
addToCartBTN.addEventListener('click', addToCart)
let products=JSON.parse(localStorage.getItem('products'));
function addToCart(event) {
  event.preventDefault();
  //let prodactId= addToCartBTN.dataset.productId;
  // let {prodactId}=addToCartBTN.dataset;
  let {
    dataset: {
      productId
    }
  } = addToCartBTN;
  let qty = document.querySelector('.qty').value;
  console.log(productId);
  console.log(qty);
  // localStorage.setItem(JSON.stringify(productId));
  // localStorage.setItem(JSON.stringify(qty));
  let product = {
    id: productId,
    quantity: qty
  }
  
  products.push(product);
  localStorage.setItem('products',JSON.stringify(products))
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

}
let navMenu = document.querySelector('.nav_categories');
let firstLine =document.querySelector('.line-one');
let secondLine =document.querySelector('.line-two');
let thirdLine =document.querySelector('.line-three');
let line=document.querySelector('.line');

 btn.addEventListener("click",function(){
     navMenu.classList.toggle("changeIt");
     firstLine.classList.toggle("changeIt");
     secondLine.classList.toggle("changeIt");
     thirdLine.classList.toggle("changeIt");

 });

