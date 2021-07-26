







    let cartBtn = document.querySelector('#cart');
let shopingCart = document.querySelector('.shopping_cart');
let closeCartBtn = document.querySelector('.close-cart');

cartBtn.addEventListener('click', function (event) {
    event.preventDefault();
    shopingCart.classList.toggle('on');
    displayPopUpCart();
  
  
  })


  function displayPopUpCart(){
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
       <div class="productsInCart">
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




}
// // this function will check if current id appears in cart-its not finished!
// const buttons = document.querySelectorAll("button");
// buttons.forEach(function(button){
//   button.onclick = function(event){
//     console.log(event.target);
//   }
// });
// ---end of shopping cart - not finished!
