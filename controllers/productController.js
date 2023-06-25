import Products from "../modals/productModel.js"

export const addProduct = async (req,res) => {
    try{
        const{title,price,category,image} = req.body;
        if (!title) return res.send("title is required");
        if (!price) return res.send("price is required");
        if (!category) return res.send("category is required");
        if (!image) return res.send("image is required");
        const product = new Products({
            title,price,category,image
        });
        await product.save();
        return res.send("product added successfully")


    }catch(error){
        res.send(error)
    }
}

export const getProduct = async (req,res) => {
    try{
        const product = await Products.find({}).exec();
        res.send(product)


    }catch(error){
        return res.send(error);
    }
}


export const deleteProduct = async (req,res) => {
    try{
        const{id} = req.body;
        if(!id) return res.send("product id is required.")
        const product = await Products.findByIdAndDelete({_id : id}).exec();
        await product.save();
        return res.send("product deleted")


    }catch(error){
        return res.send(error);
    }
}