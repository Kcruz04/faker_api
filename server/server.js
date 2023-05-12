const express = require("express")
const app = express()
const port = 8000

app.use(express.json(), express.urlencoded({extended: true}))

// The import line will look different than what is in Faker's documentation
// because we are working with an express application
const { faker } = require('@faker-js/faker');
// we can create a function to return a random / fake "Product"
const createProduct = () => {
    const newFake = {
        name: faker.commerce.productName(),
        price: "$" + faker.commerce.price(),
        department: faker.commerce.department()
    };
    return newFake;
};
const userObject = () =>  {
    const newUser = {
        _id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
    return newUser
};
const companyObject = () => {
    const newCompany ={
        _id : faker.string.uuid(),
        name: faker.company.name(),
        address: {
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        } 
        
    }
    return newCompany
}
    
const newFakeProduct = createProduct();
console.log(newFakeProduct);
/*
 * The output of the above console log will look like this
 * {
 *   name: 'Anime Figure',
 *   price: '$568.00
 *   department: 'Tools' 
 * }
 */


// const Routes = require('./routes/users.routes')
// Routes(app)
app.get("/api/user",(req,res)=>{
    let newUser = userObject()
    res.json({
        message : "This route is createing a new user using Faker API...",
        user : newUser
    })
    console.log(newUser)
})
app.get("/api/company",(req, res) =>{
    let newCompany = companyObject()
    res.json({
        message : "This route is creating a new company",
        company : newCompany
    })
    console.log(newCompany)
})
app.get("/api/user/company", (req, res) => {
    let both = [userObject(), companyObject()]
    res.json({
        message: "This is user and company",
        both: both
    })
    console.log(both)
})
app.listen(port, () => console.log(`Locked and loaded on Port: ${port}`))