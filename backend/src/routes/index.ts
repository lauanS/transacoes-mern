import { Express } from 'express-serve-static-core';
import express, { Request, Response } from 'express';
import transations from '@/routes/transations';

const routes = (app: Express) => {
  app.route('/')
    .get((_req: Request, res: Response) => res.status(200).send('zeztra-transations'));

  app.use(express.json());
  app.use('/transations', transations);
};

export default routes;
