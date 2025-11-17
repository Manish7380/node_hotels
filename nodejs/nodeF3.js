class product {
    constructor(name,price,inStock){
        this.name = name;
        this.price = price;
        this.inStock = inStock;

    }
}
const product1 = new product("laptop",1200,true);
const product2 = new product("mouse",1400,false);
const product3 = new product("keyboard",1500,true);
console.log(product1);
console.log(product2);
console.log(product3);
