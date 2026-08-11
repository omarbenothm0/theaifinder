import {
  INITIAL_CATEGORIES as SEED_CATEGORIES,
  INITIAL_PERSONAS as SEED_PERSONAS,
  INITIAL_COMPARISONS as SEED_COMPARISONS,
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
import {
  PM_CATEGORY,
  PM_PERSONA,
  PM_TOOLS,
  PM_USE_CASES,
  PM_PERSONA_USE_CASES,
  PM_TOOL_USE_CASES,
  PM_VERIFIED_AT,
} from './pm-cluster';
import { PM_COMPARISONS } from './pm-comparisons';
import {
  STUDENT_CATEGORY,
  STUDENT_PERSONA,
  STUDENT_TOOLS,
  STUDENT_USE_CASES,
  STUDENT_PERSONA_USE_CASES,
  STUDENT_TOOL_USE_CASES,
  STUDENT_VERIFIED_AT,
} from './student-cluster';
import {
  MARKETER_PERSONA,
  MARKETER_TOOLS,
  MARKETER_USE_CASES,
  MARKETER_PERSONA_USE_CASES,
  MARKETER_TOOL_USE_CASES,
  MARKETER_VERIFIED_AT,
} from './marketer-cluster';

export const INITIAL_TOOLS = [
  chatgptTool,
  claudeTool,
  cursorTool,
  v0Tool,
  midjourneyTool,
  dallE3Tool,
  runwayTool,
  elevenlabsTool,
  perplexityTool,
  gammaTool,
  jasperTool,
  descriptTool,
  sunoAiTool,
  notionAiTool,
  ...PM_TOOLS,
  ...STUDENT_TOOLS,
  ...MARKETER_TOOLS,
];

export const INITIAL_CATEGORIES = [...SEED_CATEGORIES, PM_CATEGORY, STUDENT_CATEGORY];
export const INITIAL_PERSONAS = [
  ...SEED_PERSONAS.filter((p) => p.slug !== 'marketers'),
  PM_PERSONA,
  STUDENT_PERSONA,
  MARKETER_PERSONA,
];

export const INITIAL_COMPARISONS = [...SEED_COMPARISONS, ...PM_COMPARISONS];

export {
  INITIAL_ARTICLES,
  PM_USE_CASES,
  PM_PERSONA_USE_CASES,
  PM_TOOL_USE_CASES,
  PM_VERIFIED_AT,
  PM_COMPARISONS,
  STUDENT_USE_CASES,
  STUDENT_PERSONA_USE_CASES,
  STUDENT_TOOL_USE_CASES,
  STUDENT_VERIFIED_AT,
  MARKETER_USE_CASES,
  MARKETER_PERSONA_USE_CASES,
  MARKETER_TOOL_USE_CASES,
  MARKETER_VERIFIED_AT,
  MARKETER_PERSONA,
};
