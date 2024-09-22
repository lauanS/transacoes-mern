import express from 'express';
import { Request, Response } from 'express';
import processTransations from '@/services/transation/process';
import uploadFile from '@/services/file/upload';
import listTransations from '@/services/transation/list';

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
  try {
    const { name, startDate, page, pageSize } = req.query;

    const params: { name?: string, startDate?: Date } = {};

    if (name && typeof name === 'string' && name.trim()) {
      params.name = name.trim();
    }

    if (startDate && typeof startDate === 'string' && new Date(startDate)) {
      params.startDate = new Date(startDate as string);
    }

    const pagination = {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 25
    };

    const result = await listTransations(params, pagination);

    res.status(200).jsonp(result);
  } catch (error) {
    console.log(error);
    res.status(204).send({ status: 'error', error });
  }
});

export default router;
