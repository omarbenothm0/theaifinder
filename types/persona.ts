import { Tool, UseCaseFitTier } from './tool';

export interface WorkflowTool {
  tool: Tool;
  fitTier: UseCaseFitTier;
  capabilities: string;
}

export interface WorkflowSection {
  slug: string;
  title: string;
  tools: WorkflowTool[];
}

export interface ToolRecommendation {
  tool: Tool;
  score: number;
  reason: string;
  specificStrength: string;
}
