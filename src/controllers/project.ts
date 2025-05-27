import { Request, Response } from 'express';
import { Project } from '../models/project';
import { logger } from '../utils/logger';

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      tokenSymbol,
      totalSupply,
      initialPrice,
      minContribution,
      maxContribution,
      startTime,
      endTime,
      ownerAddress
    } = req.body;

    const project = new Project({
      name,
      description,
      tokenSymbol,
      totalSupply,
      initialPrice,
      minContribution,
      maxContribution,
      startTime,
      endTime,
      ownerAddress,
      status: 'pending'
    });

    await project.save();

    logger.info('New project created:', { projectId: project._id });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to create project',
        code: 'CREATE_PROJECT_ERROR'
      }
    });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Project not found',
          code: 'PROJECT_NOT_FOUND'
        }
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch project',
        code: 'FETCH_PROJECT_ERROR'
      }
    });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ status: 'active' });
    
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch projects',
        code: 'FETCH_PROJECTS_ERROR'
      }
    });
  }
};

export const contribute = async (req: Request, res: Response) => {
  try {
    const { contributorAddress, amount } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Project not found',
          code: 'PROJECT_NOT_FOUND'
        }
      });
    }

    if (project.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Project is not active',
          code: 'PROJECT_NOT_ACTIVE'
        }
      });
    }

    if (amount < project.minContribution) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Contribution must be at least ${project.minContribution}`,
          code: 'INVALID_CONTRIBUTION_AMOUNT'
        }
      });
    }

    if (amount > project.maxContribution) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Contribution cannot exceed ${project.maxContribution}`,
          code: 'INVALID_CONTRIBUTION_AMOUNT'
        }
      });
    }

    project.contributions.push({
      contributorAddress,
      amount,
      timestamp: new Date()
    });

    await project.save();

    logger.info('New contribution:', {
      projectId: project._id,
      contributorAddress,
      amount
    });

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Error contributing to project:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to contribute to project',
        code: 'CONTRIBUTE_ERROR'
      }
    });
  }
};

export const endProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Project not found',
          code: 'PROJECT_NOT_FOUND'
        }
      });
    }

    if (project.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Project is not active',
          code: 'PROJECT_NOT_ACTIVE'
        }
      });
    }

    project.status = 'ended';
    await project.save();

    logger.info('Project ended:', { projectId: project._id });

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    logger.error('Error ending project:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to end project',
        code: 'END_PROJECT_ERROR'
      }
    });
  }
}; 