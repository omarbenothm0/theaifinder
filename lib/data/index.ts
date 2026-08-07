import {
  INITIAL_TOOLS as SEED_TOOLS,
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES
} from './seedData';
import { chatgptTool } from './tools/chatgpt';
import { claudeTool } from './tools/claude';
import { cursorTool } from './tools/cursor';
import { v0Tool } from './tools/v0';
import { midjourneyTool } from './tools/midjourney';
import { dallE3Tool } from './tools/dall-e-3';
import { runwayTool } from './tools/runway';
import { elevenlabsTool } from './tools/elevenlabs';
import { perplexityTool } from './tools/perplexity';
import { gammaTool } from './tools/gamma';
import { jasperTool } from './tools/jasper';
import { descriptTool } from './tools/descript';
import { sunoAiTool } from './tools/suno-ai';
import { notionAiTool } from './tools/notion-ai';

export const INITIAL_TOOLS = [chatgptTool, claudeTool, cursorTool, v0Tool, midjourneyTool, dallE3Tool, runwayTool, elevenlabsTool, perplexityTool, gammaTool, jasperTool, descriptTool, sunoAiTool, notionAiTool];
export {
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES
};