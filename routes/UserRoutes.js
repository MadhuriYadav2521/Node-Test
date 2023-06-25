import express from "express";
import { getToken, login, register } from "../controllers/userController.js";
import { checksForDeleteProduct, checksForGetProduct, checksForRegister, isUserValid } from "../middlewares/authMiddleware.js";
import { addProduct, deleteProduct, getProduct } from "../controllers/productController.js";



 var router = express.Router();

router.post('/register',checksForRegister,register);
router.post('/login',login);
router.post('/getToken',getToken);
router.post('/addProduct',isUserValid,addProduct);
router.get('/getProduct',checksForGetProduct,getProduct);
router.post('/deleteProduct',checksForDeleteProduct,deleteProduct);





 export default router;