const products= [
    {
        id: 1,
        name: "همبرگر معمولی",
        price: 8000,
        image:"img/hamburger.png"
    },
    {
        id: 2,
        name: "همبرگر مخصوص",
        price: 10000,
        image:"img/hamburger.png"
    },
    {
        id: 3,
        name: "همبرگر معمولی با قارچ و پنیر",
        price: 10000,
        image:"img/hamburger.png"
    },
    {
        id: 4,
        name: "همبرگر مخصوص با قارچ و پنیر",
        price: 20000,
        image:"img/hamburger.png"
    },
    {
        id: 5,
        name: "سیب زمینی سرخ کرده ویژه",
        price: 25000,
        image:"img/french_fries.png"
    },
    {
        id: 6,
        name: "سیب زمینی سرخ کرده",
        price: 10000,
        image:"img/french_fries.png"
    },
    {
        id: 7,
        name: "نوشابه رژیمی",
        price: 6000,
        image:"img/soda.png"
    },
    {
        id: 8,
        name: "نوشابه",
        price: 5000,
        image:"img/soda.png"
    },
    {
        id: 9,
        name: "سالاد فصل",
        price: 8000,
        image:"img/salad.png"
    },
    {
        id: 10,
        name: "سالاد سزار",
        price: 25000,
        image:"img/salad.png"
    }
]
function renderProducts(){
    const Menu= document.getElementById("menu");
    Menu.innerHTML= "";
    products.forEach(product =>{
        const productElement= document.createElement("div");
        productElement.className= "product";
        let navText = "";
        if ((cart[product.id] || 0) * product.price !== 0) {
            navText = `<nav id="nav">${(cart[product.id] || 0) * product.price}</nav>`;
        }
        productElement.innerHTML= `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>${product.price} تومان</p>
                <div>
                    <button onclick="add(${product.id})">+</button>
                    <span>${cart[product.id] || 0}</span>
                    <button onclick="remove(${product.id})">-</button>
                </div>
                ${navText}
            </div>
        `;
        Menu.appendChild(productElement);
    })
}
let cart= JSON.parse(localStorage.getItem("cart")) || {};
totalPriceElement= document.getElementById("total");
    Fee= document.getElementById("fee");
    Payable= document.getElementById("payable");
let totalPrice;
function renderCart(){
    const cartItems= Object.keys(cart).map(productId =>{
        const product= products.find(p => p.id == productId);
        return{ ...product, count: cart[productId]};
    })
    totalPrice= cartItems.reduce((acc, item) => acc + (item.price * item.count), 0);
    totalPriceElement.innerText= totalPrice + " تومان";
    Fee.innerText= totalPrice * 0.05 + " تومان";
    Payable.innerText= totalPrice + totalPrice * 0.05 + " تومان";
}
function add(id){
    if(cart[id]){
        cart[id]++;
    }else{
        cart[id]= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts();
    renderCart();
}
function remove(id){
    if(cart[id]){
        cart[id]--;
        if(cart[id]=== 0){
            delete cart[id];
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts();
    renderCart();
}
const Off= document.getElementById("off");
    Submit= document.getElementById("submit");
    Discount= document.getElementById("discount");
Discount.innerText= "0 درصد";
Submit.addEventListener("click", () =>{
    if(Off.value=== "gold"){
        Discount.innerText= "30 درصد"
        Off.value= "";
        Payable.innerText= (totalPrice + totalPrice * 0.05) * 7 / 10 + " تومان"
    }else if(Off.value=== "silver"){
        Discount.innerText= "20 درصد"
        Off.value= "";
        Payable.innerText= (totalPrice + totalPrice * 0.05) * 8 / 10 + " تومان"
    }else if(Off.value=== "bronze"){
        Discount.innerText= "10 درصد"
        Off.value= "";
        Payable.innerText= (totalPrice + totalPrice * 0.05) * 9 / 10 + " تومان"
    }else{
        Discount.innerText= "0 درصد"
        Payable.innerText= totalPrice + totalPrice * 0.05 + " تومان"
    }
})
const Checkout= document.getElementById("checkout");
Modal= document.getElementById("modal");
Checkout.addEventListener("click", () =>{
    if(totalPrice!== 0){
        localStorage.removeItem("cart");
        cart= {};
        renderProducts();
        renderCart();
        Modal.style.display= "block";
    }
})
document.getElementById("close").addEventListener("click", () => {
    Modal.style.display = "none";
})
renderProducts()
renderCart()