import express from "express";
import { dirname } from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';
import { removeFileExtension } from '../utils/helpers.js';
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";
import classesRoutes from "./classes.js";
import coursesRoutes from "./courses.js";
import evaluationsRoutes from "./evaluations.js";
import locationsRoutes from "./locations.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const routesPath = dirname(__filename);

router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/classes', classesRoutes);
router.use('/courses', coursesRoutes);
router.use('/evaluations', evaluationsRoutes);
router.use('/locations', locationsRoutes);

// Establecer cada archivo de la carpeta routes como una ruta excepto index y auth
// fs.readdirSync(routesPath).filter( async file => {
//   const fileName = removeFileExtension(file);
//   const routes = await import(`./${fileName}.js`)
  
//   return fileName !== 'index' && fileName !== 'auth'
//     ? router.use(`/${fileName}`, require(`./${fileName}.js`))
//     : ''
// })

router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

export default router
