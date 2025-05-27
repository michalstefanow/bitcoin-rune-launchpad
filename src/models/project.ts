import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  tokenSymbol: string;
  totalSupply: number;
  initialPrice: number;
  minContribution: number;
  maxContribution: number;
  startTime: Date;
  endTime: Date;
  ownerAddress: string;
  status: 'pending' | 'active' | 'ended' | 'cancelled';
  contributions: Array<{
    contributorAddress: string;
    amount: number;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    tokenSymbol: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    totalSupply: {
      type: Number,
      required: true,
      min: 0
    },
    initialPrice: {
      type: Number,
      required: true,
      min: 0
    },
    minContribution: {
      type: Number,
      required: true,
      min: 0
    },
    maxContribution: {
      type: Number,
      required: true,
      min: 0
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    ownerAddress: {
      type: String,
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'ended', 'cancelled'],
      default: 'pending',
      index: true
    },
    contributions: [{
      contributorAddress: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true
  }
);

// Indexes
projectSchema.index({ status: 1, endTime: 1 });
projectSchema.index({ ownerAddress: 1, status: 1 });
projectSchema.index({ 'contributions.contributorAddress': 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema); 