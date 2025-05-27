import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import {
  createProject,
  getProject,
  getAllProjects,
  contribute,
  endProject
} from '../controllers/project';

const router = Router();

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get(
  '/:id',
  param('id').isMongoId(),
  validateRequest,
  getProject
);

// Create new project
router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('tokenSymbol').isString().notEmpty(),
    body('totalSupply').isNumeric().isFloat({ min: 0 }),
    body('initialPrice').isNumeric().isFloat({ min: 0 }),
    body('minContribution').isNumeric().isFloat({ min: 0 }),
    body('maxContribution').isNumeric().isFloat({ min: 0 }),
    body('startTime').isISO8601(),
    body('endTime').isISO8601(),
    body('ownerAddress').isEthereumAddress()
  ],
  validateRequest,
  createProject
);

// Contribute to project
router.post(
  '/:id/contribute',
  [
    param('id').isMongoId(),
    body('contributorAddress').isEthereumAddress(),
    body('amount').isNumeric().isFloat({ min: 0 })
  ],
  validateRequest,
  contribute
);

// End project
router.post(
  '/:id/end',
  param('id').isMongoId(),
  validateRequest,
  endProject
);

export default router; 