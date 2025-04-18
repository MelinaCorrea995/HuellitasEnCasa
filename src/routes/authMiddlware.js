const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, userController.profile);
