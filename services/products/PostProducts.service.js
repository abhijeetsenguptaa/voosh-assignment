const Product_Model = require("../../models/product.model");

async function PostProductService(title, image) {
    try {
        // Create a new product instance
        const productCreation = new Product_Model({ title, image });

        // Save the product to the database
        await productCreation.save();

        return {
            status: true,
            message: "Product created successfully!"
        };
    } catch (error) {
        console.error("Error in product posting:", error.message);
        return {
            status: false,
            message: "An error occurred during product posting. Please try again later."
        };
    }
}

module.exports = PostProductService;
