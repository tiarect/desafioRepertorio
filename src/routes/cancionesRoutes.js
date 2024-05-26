import { Router } from 'express';
import { getHtml, getCanciones, postCanciones, putCancion, deleteCancion } from '../controllers/cancionesC.js';

const router = Router();

router.get('/', getHtml);
router.get('/canciones', getCanciones);
router.post('/canciones', postCanciones);
router.put('/canciones/:id', putCancion);
router.delete('/canciones/:id', deleteCancion);

export default router;
