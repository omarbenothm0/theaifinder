import fs from 'fs';
import path from 'path';
import {
  Tool,
  Category,
  Persona,
  Comparison,
  Review,
  Article,
  ToolFilterOptions,
  FinderAnswer
} from '../types/tool';
import {
  INITIAL_TOOLS,
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES
} from './data';

interface DBState {
  tools: Tool[];
  categories: Category[];
  personas: Persona[];
  comparisons: Comparison[];
  reviews: Review[];
  articles: Article[];
}

class DBRepository {
  private dataFilePath = path.join(process.cwd(), 'data_store.json');
  private state: DBState;

  constructor() {
    this.state = this.loadData();
  }

  private loadData(): DBState {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const fileContent = fs.readFileSync(this.dataFilePath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        return {
          tools: parsed.tools && parsed.tools.length ? parsed.tools : INITIAL_TOOLS,
          categories: parsed.categories && parsed.categories.length ? parsed.categories : INITIAL_CATEGORIES,
          personas: parsed.personas && parsed.personas.length ? parsed.personas : INITIAL_PERSONAS,
          comparisons: parsed.comparisons && parsed.comparisons.length ? parsed.comparisons : INITIAL_COMPARISONS,
          reviews: parsed.reviews || this.getInitialReviews(),
          articles: parsed.articles && parsed.articles.length ? parsed.articles : INITIAL_ARTICLES
        };
      }
    } catch (err) {
      console.warn('Could not read data_store.json, using seed data:', err);
    }

    return {
      tools: INITIAL_TOOLS,
      categories: INITIAL_CATEGORIES,
      personas: INITIAL_PERSONAS,
      comparisons: INITIAL_COMPARISONS,
      reviews: this.getInitialReviews(),
      articles: INITIAL_ARTICLES
    };
  }

  private saveData() {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save data store:', err);
    }
  }

  private getInitialReviews(): Review[] {
    return [
      {
        id: 'rev-1',
        toolSlug: 'chatgpt',
        authorName: 'Alex Rivers',
        authorRole: 'Product Manager',
        rating: 5,
        comment: 'ChatGPT is an indispensable daily copilot. Standard GPT-4o analysis saves hours on market research.',
        date: '2026-07-28',
        verifiedUser: true
      },
      {
        id: 'rev-2',
        toolSlug: 'claude',
        authorName: 'Elena Rostova',
        authorRole: 'Lead Frontend Engineer',
        rating: 5,
        comment: 'Artifacts UI and Claude Sonnet prose quality are miles ahead for React code generation.',
        date: '2026-08-02',
        verifiedUser: true
      },
      {
        id: 'rev-3',
        toolSlug: 'cursor',
        authorName: 'David Chen',
        authorRole: 'Senior TypeScript Developer',
        rating: 5,
        comment: 'Composer multi-file edit mode completely changed how fast we refactor large components.',
        date: '2026-08-04',
        verifiedUser: true
      }
    ];
  }

  // --- Tools CRUD & Querying ---
  public getTools(options: ToolFilterOptions = {}) {
    let list = [...this.state.tools];

    // Search query
    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (options.category && options.category !== 'all') {
      const selectedCat = options.category;
      const lowerCat = selectedCat.toLowerCase();
      list = list.filter(
        (t) => t.categoryId === selectedCat || t.categoryName.toLowerCase() === lowerCat
      );
    }

    // Pricing model
    if (options.pricing && options.pricing !== 'all') {
      if (options.pricing === 'Free') {
        list = list.filter((t) => t.pricingModel === 'Free' || t.monthlyPrice === 0);
      } else {
        list = list.filter((t) => t.pricingModel === options.pricing);
      }
    }

    // Free option boolean filter
    if (options.hasFreeOption) {
      list = list.filter((t) => t.pricingModel === 'Free' || t.pricingModel === 'Freemium' || t.hasFreeTrial);
    }

    // Persona filter
    if (options.persona && options.persona !== 'all') {
      list = list.filter((t) => t.targetUsers.includes(options.persona!));
    }

    // Feature toggles
    if (options.hasApi) list = list.filter((t) => t.hasApi);
    if (options.hasMobileApp) list = list.filter((t) => t.hasMobileApp);
    if (options.hasExtension) list = list.filter((t) => t.hasExtension);

    // Min rating
    if (options.minRating) {
      list = list.filter((t) => t.rating >= options.minRating!);
    }

    // Sort order
    switch (options.sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      case 'price-asc':
        list.sort((a, b) => (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.monthlyPrice ?? 0) - (a.monthlyPrice ?? 0));
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.reviewCount - a.reviewCount);
        break;
    }

    const total = list.length;
    const page = options.page || 1;
    const limit = options.limit || 50;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      tools: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  public getToolBySlug(slug: string): Tool | undefined {
    return this.state.tools.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
  }

  public createTool(data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Tool {
    const newTool: Tool = {
      ...data,
      id: `tool-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.state.tools.unshift(newTool);
    this.updateCategoryToolCounts();
    this.saveData();
    return newTool;
  }

  public updateTool(slug: string, updates: Partial<Tool>): Tool | undefined {
    const index = this.state.tools.findIndex((t) => t.slug.toLowerCase() === slug.toLowerCase());
    if (index === -1) return undefined;

    const existingTool = this.state.tools[index];
    const mergedTool = { ...existingTool };

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        (mergedTool as any)[key] = value;
      }
    });

    this.state.tools[index] = {
      ...mergedTool,
      updatedAt: new Date().toISOString()
    };
    this.updateCategoryToolCounts();
    this.saveData();
    return this.state.tools[index];
  }

  public deleteTool(slug: string): boolean {
    const initialLen = this.state.tools.length;
    this.state.tools = this.state.tools.filter((t) => t.slug.toLowerCase() !== slug.toLowerCase());
    if (this.state.tools.length !== initialLen) {
      this.updateCategoryToolCounts();
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    this.updateCategoryToolCounts();
    return this.state.categories;
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    this.updateCategoryToolCounts();
    return this.state.categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  }

  private updateCategoryToolCounts() {
    this.state.categories.forEach((cat) => {
      cat.toolCount = this.state.tools.filter((t) => t.categoryId === cat.id).length;
    });
  }

  // --- Personas ---
  public getPersonas(): Persona[] {
    return this.state.personas;
  }

  public getPersonaBySlug(slug: string): Persona | undefined {
    return this.state.personas.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  }

  // --- Comparisons ---
  public getComparisons(): Comparison[] {
    return this.state.comparisons;
  }

  public getComparisonBySlug(slug: string): Comparison | undefined {
    // 1. Exact match in saved comparisons
    const existing = this.state.comparisons.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    if (existing) return existing;

    // 2. Dynamic slug resolution e.g. 'chatgpt-vs-claude'
    const parts = slug.split('-vs-');
    if (parts.length === 2) {
      const tool1 = this.getToolBySlug(parts[0]);
      const tool2 = this.getToolBySlug(parts[1]);
      if (tool1 && tool2) {
        return this.generateDynamicComparison(tool1, tool2);
      }
    }
    return undefined;
  }

  private generateDynamicComparison(tool1: Tool, tool2: Tool): Comparison {
    return {
      id: `comp-${tool1.slug}-${tool2.slug}`,
      slug: `${tool1.slug}-vs-${tool2.slug}`,
      tool1Slug: tool1.slug,
      tool2Slug: tool2.slug,
      title: `${tool1.name} vs ${tool2.name}: Side-by-Side Comparison & Recommendation`,
      overview: `Comparing ${tool1.name} and ${tool2.name} to help you decide which AI tool fits your workflow.`,
      bestFor1: tool1.tagline,
      bestFor2: tool2.tagline,
      verdict: `Both ${tool1.name} and ${tool2.name} are top-tier solutions in ${tool1.categoryName}. Choose ${tool1.name} if you prefer ${tool1.pricingModel} pricing and ${tool1.tags.slice(0, 2).join(', ')}. Choose ${tool2.name} for ${tool2.tags.slice(0, 2).join(', ')}.`,
      winnerSlug: tool1.rating >= tool2.rating ? tool1.slug : tool2.slug,
      featureBreakdown: [
        {
          feature: 'Rating',
          tool1Value: `${tool1.rating}/5 (${tool1.reviewCount} reviews)`,
          tool2Value: `${tool2.rating}/5 (${tool2.reviewCount} reviews)`,
          winnerSlug: tool1.rating > tool2.rating ? tool1.slug : tool1.rating < tool2.rating ? tool2.slug : 'tie'
        },
        {
          feature: 'Pricing Model',
          tool1Value: `${tool1.pricingModel} ${tool1.monthlyPrice ? `($${tool1.monthlyPrice}/mo)` : ''}`,
          tool2Value: `${tool2.pricingModel} ${tool2.monthlyPrice ? `($${tool2.monthlyPrice}/mo)` : ''}`,
          winnerSlug: 'tie'
        },
        {
          feature: 'API Access',
          tool1Value: tool1.hasApi ? 'Available' : 'No API',
          tool2Value: tool2.hasApi ? 'Available' : 'No API',
          winnerSlug: tool1.hasApi && !tool2.hasApi ? tool1.slug : !tool1.hasApi && tool2.hasApi ? tool2.slug : 'tie'
        },
        {
          feature: 'Mobile App',
          tool1Value: tool1.hasMobileApp ? 'iOS & Android' : 'Web Only',
          tool2Value: tool2.hasMobileApp ? 'iOS & Android' : 'Web Only',
          winnerSlug: tool1.hasMobileApp && !tool2.hasMobileApp ? tool1.slug : !tool1.hasMobileApp && tool2.hasMobileApp ? tool2.slug : 'tie'
        }
      ]
    };
  }

  // --- Reviews ---
  public getReviewsForTool(toolSlug: string): Review[] {
    return this.state.reviews.filter((r) => r.toolSlug.toLowerCase() === toolSlug.toLowerCase());
  }

  public addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    this.state.reviews.unshift(newRev);

    // Recalculate tool average rating & count
    const tool = this.getToolBySlug(review.toolSlug);
    if (tool) {
      const toolReviews = this.getReviewsForTool(review.toolSlug);
      const totalRating = toolReviews.reduce((sum, r) => sum + r.rating, 0);
      tool.rating = parseFloat((totalRating / toolReviews.length).toFixed(1));
      tool.reviewCount = toolReviews.length;
      this.saveData();
    }

    return newRev;
  }

  // --- Interactive Finder Evaluator ---
  public evaluateFinder(answer: FinderAnswer) {
    const { useCase, role, budgetPreference } = answer;

    const scored = this.state.tools.map((tool) => {
      let score = 50; // base score
      const matchReasons: string[] = [];

      // 1. Category / UseCase match
      if (
        tool.categoryId.includes(useCase) ||
        tool.categoryName.toLowerCase().includes(useCase) ||
        tool.tags.some((t) => t.toLowerCase().includes(useCase))
      ) {
        score += 35;
        matchReasons.push(`Direct match for ${useCase} workflows`);
      }

      // 2. Role / Persona match
      if (tool.targetUsers.includes(role)) {
        score += 25;
        matchReasons.push(`Optimized specifically for ${role.replace('-', ' ')}`);
      }

      // 3. Budget preference
      if (budgetPreference === 'free-only' && (tool.pricingModel === 'Free' || tool.monthlyPrice === 0)) {
        score += 20;
        matchReasons.push('100% Free plan available');
      } else if (budgetPreference === 'freemium' && (tool.pricingModel === 'Freemium' || tool.hasFreeTrial)) {
        score += 15;
        matchReasons.push('Includes free trial or freemium tier');
      }

      // 4. Feature bonuses
      if (tool.verified) score += 5;
      if (tool.rating >= 4.8) score += 10;

      return {
        tool,
        score: Math.min(100, score),
        matchReasons
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 5); // Return top 5 recommendations
  }

  // --- Admin Stats ---
  public getAdminStats() {
    return {
      totalTools: this.state.tools.length,
      totalCategories: this.state.categories.length,
      totalPersonas: this.state.personas.length,
      totalComparisons: this.state.comparisons.length,
      totalReviews: this.state.reviews.length,
      verifiedTools: this.state.tools.filter((t) => t.verified).length,
      featuredTools: this.state.tools.filter((t) => t.featured).length
    };
  }

  // --- Articles ---
  public getArticles(): Article[] {
    return this.state.articles;
  }

  public getArticleBySlug(slug: string): Article | undefined {
    return this.state.articles.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
  }
}

export const dbRepository = new DBRepository();
