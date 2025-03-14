
import multer from "multer";
import path from "path";

//configure the storage
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/')
    },
    filename:(req,file,cb) =>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})

//file fitlter

const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg']
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)

    }else {
        cb(new Error(`Only .jpeg .jpg and .png formats are allowed`),false)
    }
}
const upload = multer({storage,fileFilter})

export default upload;