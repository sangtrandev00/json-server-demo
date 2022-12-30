// const {faker} = require ('@faker-js/faker');

const {faker } = require('@faker-js/faker/locale/zh_CN');

// Thu vien cua node js
const fs = require('fs');
// import { faker } from '@faker-js/faker/locale/de';
// sets locale to vietnamese
// faker.locale = 'vi';

// Random data

console.log(faker.commerce.department());
console.log(faker.commerce.productName());
// console.log(faker.commerce.productName());
console.log(faker.commerce.productDescription());
// console.log(faker.commerce.department());
// console.log(faker.random.uuid());
console.log(faker.commerce.productAdjective());
console.log(faker.image.imageUrl());
console.log(faker.commerce.productMaterial());


const randomCategoryList = (n) => {
    if(n <= 0) return [];
    const categoryList = [];

    // Loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createAt: Date.now(),
            updatedAt: Date.now()
        }

        categoryList.push(category);
    })

    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts <= 0) return [];
    const productList = [];

    // random data
    for(const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(()=> {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.color.human(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400,400)
            };

            productList.push(product);
        })
    }

    return productList;
}


(()=> {

    // random data
    const categoryList = randomCategoryList(4);

    const productList = randomProductList(categoryList,5); // 20 products

    // prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Sang Tran Dev",
        }
    }

    // Write db object to db.json
    fs.writeFileSync('db.json',JSON.stringify(db), ()=> {
        console.log("Write data successfully");
    })


})()