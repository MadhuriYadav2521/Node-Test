import Users from "../modals/userModel.js"
import encrypt from "encryptjs"

export const register = async (req, res) => {
    try {
        console.log("inside register");
        const { name, email, password, pin, role, number } = req.body;
        var secretKey = 'ios'
        var plainPassword = password;
        var plainPin = pin;
        var cipherPassword = encrypt.encrypt(plainPassword, secretKey, 256);
        var cipherPin = encrypt.encrypt(plainPin, secretKey, 256);
        let user = new Users({
            name,
            email,
            password: cipherPassword,
            pin: cipherPin,
            role,
            number
        })
        console.log(user);
        await user.save();
        return res.send("registration successful");

    } catch (error) {
        return res.send(error);
    }
}

export const login = async (req,res) => {
    try{
        const{ email, password} = req.body;
        if(!email) return res.send("email is reqiured");
        if(!password) return res.send("password is reqiured");
        const user = await Users.find({email}).exec();
        var secretKey ='ios'
        var decipherPassword = encrypt.decrypt(user[0].password,secretKey,256);
        if(user.length){
            if(decipherPassword == password){
                return res.send("you are logged in");
            }else{
                res.send("wrong credentials")
            }
        }else{
            res.send("user not found")
        }
      


    }catch(error){
        return res.send(error);
    }
}

export const getToken = async (req,res) => {
    try{
        const{ id } = req.body;
        if(!id) return res.send("user id is required.")
        let random = ""
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let charLength = characters.length
        let length = 10;
        for(var i=0; i<length; i++){
            random += characters.charAt(Math.floor(Math.random() * charLength));
        }
        let accessToken = random;
        const userToken = await Users.find({ _id : id}).exec();
        if(userToken[0].accessToken){
            return res.send("you already have access token")
        }else{
            const user = await Users.findByIdAndUpdate( { _id : id}, { accessToken});

            setTimeout( async () => {
                const user = await Users.findByIdAndUpdate({ _id: id}, {$unset: {accessToken : 1}})
            }, 120 * 1000)
            await user.save();
            return res.send("token generated")
           
        }

    }catch(error){
        res.send(error);
    }
}