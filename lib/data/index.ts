import {
  INITIAL_CATEGORIES as SEED_CATEGORIES,
  INITIAL_PERSONAS as SEED_PERSONAS,
  INITIAL_COMPARISONS as SEED_COMPARISONS,
  INITIAL_ARTICLES
} from './seedData';
import { chatgptTool } from './tools/chatgpt';
import { claudeTool } from './tools/claude';
import { cursorTool } from './tools/cursor';
import { claudeCodeTool } from './tools/claude-code';
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
  PM_PERSONA,
  PM_TOOLS,
  PM_USE_CASES,
  PM_PERSONA_USE_CASES,
  PM_TOOL_USE_CASES,
  PM_VERIFIED_AT,
} from './pm-cluster';
import { PM_COMPARISONS } from './pm-comparisons';
import { CODING_COMPARISONS } from './coding-comparisons';
import { CODING_CATEGORY } from './coding-category';
import { PROJECT_MANAGEMENT_CATEGORY } from './project-management-category';
import { STUDY_EDUCATION_CATEGORY } from './study-education-category';
import {
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
import {
  TEACHER_PERSONA,
  TEACHER_USE_CASES,
  TEACHER_PERSONA_USE_CASES,
  TEACHER_TOOL_USE_CASES,
  TEACHER_VERIFIED_AT,
} from './teacher-cluster';
import {
  SMALL_BUSINESS_PERSONA,
  SMALL_BUSINESS_USE_CASES,
  SMALL_BUSINESS_PERSONA_USE_CASES,
  SMALL_BUSINESS_TOOL_USE_CASES,
  SMALL_BUSINESS_VERIFIED_AT,
} from './small-business-cluster';
import {
  RESEARCHER_PERSONA,
  RESEARCHER_USE_CASES,
  RESEARCHER_PERSONA_USE_CASES,
  RESEARCHER_TOOL_USE_CASES,
  RESEARCHER_VERIFIED_AT,
} from './researcher-cluster';
import {
  REAL_ESTATE_PERSONA,
  REAL_ESTATE_USE_CASES,
  REAL_ESTATE_PERSONA_USE_CASES,
  REAL_ESTATE_TOOL_USE_CASES,
  REAL_ESTATE_VERIFIED_AT,
} from './real-estate-cluster';
import {
  WRITER_PERSONA,
  WRITER_USE_CASES,
  WRITER_PERSONA_USE_CASES,
  WRITER_TOOL_USE_CASES,
  WRITER_VERIFIED_AT,
} from './writer-cluster';
import { WRITING_CATEGORY } from './writing-category';

export const INITIAL_TOOLS = [
  chatgptTool,
  claudeTool,
  cursorTool,
  claudeCodeTool,
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

export const INITIAL_CATEGORIES = [
  ...SEED_CATEGORIES.filter((c) => c.slug !== 'writing' && c.slug !== 'coding'),
  WRITING_CATEGORY,
  CODING_CATEGORY,
  PROJECT_MANAGEMENT_CATEGORY,
  STUDY_EDUCATION_CATEGORY,
];
export const INITIAL_PERSONAS = [
  ...SEED_PERSONAS.filter(
    (p) =>
      p.slug !== 'marketers' &&
      p.slug !== 'teachers' &&
      p.slug !== 'real-estate-agents' &&
      p.slug !== 'writers'
  ),
  PM_PERSONA,
  STUDENT_PERSONA,
  MARKETER_PERSONA,
  TEACHER_PERSONA,
  SMALL_BUSINESS_PERSONA,
  RESEARCHER_PERSONA,
  REAL_ESTATE_PERSONA,
  WRITER_PERSONA,
];

export const INITIAL_COMPARISONS = [...SEED_COMPARISONS, ...PM_COMPARISONS, ...CODING_COMPARISONS];

export {
  INITIAL_ARTICLES,
  PM_USE_CASES,
  PM_PERSONA_USE_CASES,
  PM_TOOL_USE_CASES,
  PM_VERIFIED_AT,
  PM_COMPARISONS,
  CODING_COMPARISONS,
  STUDENT_USE_CASES,
  STUDENT_PERSONA_USE_CASES,
  STUDENT_TOOL_USE_CASES,
  STUDENT_VERIFIED_AT,
  MARKETER_USE_CASES,
  MARKETER_PERSONA_USE_CASES,
  MARKETER_TOOL_USE_CASES,
  MARKETER_VERIFIED_AT,
  MARKETER_PERSONA,
  TEACHER_USE_CASES,
  TEACHER_PERSONA_USE_CASES,
  TEACHER_TOOL_USE_CASES,
  TEACHER_VERIFIED_AT,
  TEACHER_PERSONA,
  SMALL_BUSINESS_USE_CASES,
  SMALL_BUSINESS_PERSONA_USE_CASES,
  SMALL_BUSINESS_TOOL_USE_CASES,
  SMALL_BUSINESS_VERIFIED_AT,
  SMALL_BUSINESS_PERSONA,
  RESEARCHER_USE_CASES,
  RESEARCHER_PERSONA_USE_CASES,
  RESEARCHER_TOOL_USE_CASES,
  RESEARCHER_VERIFIED_AT,
  RESEARCHER_PERSONA,
  REAL_ESTATE_USE_CASES,
  REAL_ESTATE_PERSONA_USE_CASES,
  REAL_ESTATE_TOOL_USE_CASES,
  REAL_ESTATE_VERIFIED_AT,
  REAL_ESTATE_PERSONA,
  WRITER_USE_CASES,
  WRITER_PERSONA_USE_CASES,
  WRITER_TOOL_USE_CASES,
  WRITER_VERIFIED_AT,
  WRITER_PERSONA,
};
