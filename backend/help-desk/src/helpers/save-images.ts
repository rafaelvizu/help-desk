import multer, { StorageEngine } from "multer";
import { Request, Response, NextFunction } from "express";


const storage: StorageEngine = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, './uploads/profile-images')
     },
     filename: function (req, file, cb) {
          cb(null, `profile-image-${req.body.user.id}-${req.body.user.email}`)
     },
});

const upload = multer({ storage,

     fileFilter: (req, file, cb) => {
          // caso não seja enviado nenhum arquivo
          if (!file) {
               return cb(new Error('No file sent!'));
          }
          // permitir apenas arquivos com extensão .jpg, .jpeg e .png
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
               return cb(new Error('Only image files are allowed!'));
          }
          else if (file.size > 1024 * 1024 * 5) {
               return cb(new Error('The image must be less than 5MB!'));
          }
          else
          {
               cb(null, true);
          }
     },
});

function saveImages(req: Request, res: Response, next: NextFunction)
{
     upload.single('profileImage')(req, res, (err) => {
          if (err == null || err.message == 'No file sent!')
          {
               next(); 
          }
          return res.status(422).json({ message: err.message });  
     });

     res.end();
}


export default saveImages;