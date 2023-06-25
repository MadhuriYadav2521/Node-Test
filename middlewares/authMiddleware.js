import Users from "../modals/userModel.js"
import encrypt from "encryptjs";

export const checksForRegister = async (req, res, next) => {
    try {
        const { name, email, password, pin, role, number } = req.body;
        if (!name) return res.send("name is required.")
        if (!email) return res.send("email is required.")
        if (!password) return res.send("password is required.")
        if (!pin) return res.send("pin is required.")
        if (!role) return res.send("role is required.")
        if (!number) return res.send("number is required.")
        const user = await Users.find({ email }).exec();
        if (user.length) return res.send("email already exist")

        next();

    } catch (error) {
        return res.send(error);
    }

}

export const isUserValid = async (req, res,next) => {
    try {
        const { email, password, pin , accessToken} = req.body;
        if (!email) return res.send("email is required");
        if (!password) return res.send("password is required");
        if (!pin) return res.send("pin is required");
        if (!accessToken) return res.send("access token is required");
        const user = await Users.find({email}).exec();
        var secretKey = 'ios'
        var decipherPassword = encrypt.decrypt(user[0].password,secretKey,256);
        var decipherPin = encrypt.decrypt(user[0].pin,secretKey,256);
        if(user.length){
            if(user[0].accessToken == accessToken){

                if(decipherPassword === password && decipherPin === pin ){
                    if(user[0].role == "seller" || user[0].role == "admin"){
                        next();
                    }else{
                        return res.send("only seller and admin can add product")
                    }
                }else{
                    return res.send("wrong  pin or password")
                }
            }else{
                return res.send("wrong access token")
            }

        }else{
            return res.send("user not found");
        }


    } catch (error) {
        res.send(error);
    }
}



export const checksForGetProduct = async (req, res, next) => {
    try {
        const { email, accessToken} = req.body;
        if (!email) return res.send("email is required");
        if (!accessToken) return res.send("accessToken is required");
        
        const user = await Users.find({email}).exec();
        
        if(user.length){
            if(user[0].accessToken == accessToken){

                    if(user[0].role == "seller" || user[0].role == "admin"){
                        next();
                    }else{
                        return res.send("only seller and admin can add product")
                    }
               
            }else{
                return res.send("wrong access token")
            }

        }else{
            return res.send("user not found");
        }


    } catch (error) {
        res.send(error);
    }

}

export const checksForDeleteProduct = async (req, res, next) => {
    try {
        const { email, accessToken} = req.body;
        if (!email) return res.send("email is required");
        if (!accessToken) return res.send("accessToken is required");
        
        const user = await Users.find({email}).exec();
        
        if(user.length){
            if(user[0].accessToken == accessToken){

                    if(user[0].role == "admin"){
                        next();
                    }else{
                        return res.send("only admin can add product")
                    }
               
            }else{
                return res.send("wrong access token")
            }

        }else{
            return res.send("user not found");
        }


    } catch (error) {
        res.send(error);
    }

}