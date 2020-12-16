import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controlers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

//para apçicar o midleware em todas as rotas de agentamentos
appointmentsRouter.use(ensureAuthenticated);

//SoC: Separation of Concerns (Separação de preocupações)
// DTO - data transform object

// http://localhost:3333/appointments
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
