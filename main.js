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
function renderCart(){
    const cartItems= Object.keys(cart).map(productId =>{
        const product= products.find(p => p.id == productId);
        return{ ...product, count: cart[productId]};
    })
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
renderProducts()
renderCart()