import express from 'express';
import { Request, Response } from 'express';
import processTransations from '@/services/transation/process';
import uploadFile from '@/services/file/upload';

const router = express.Router();

router.post('/upload', async (req: Request, res: Response): Promise<void> => {
  try {
    const filePath = await uploadFile(req);

    processTransations(filePath);

    res.status(200).send({ status: 'success' });
  } catch (error) {
    res.status(204).send({ status: 'error', error });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {

});

export default router;
