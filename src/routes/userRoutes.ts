import {Router} from "express";
import {
  login,
  // signup,
  // change_password,
  //  test,
} from "../controllers/userController";
//import {authenticateToken} from "../services/authService";
// import {config} from "../config";

const router = Router();

router.post("/login", login);
// router.post("/signup", signup);
// router.put("/change-password", authenticateToken(), change_password);

//router.get("/test", test);

export default router;
