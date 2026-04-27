const multer=require('multer');
const express=require('express');
const musicController=require("../controllers/music.controller");

const upload=multer({
    storage:multer.memoryStorage(),
});
const router=express.Router();
router.post("/upload",upload.single("music"), musicController.createMusic);
router.get("/", musicController.getAllMusic);


 module.exports=router;
