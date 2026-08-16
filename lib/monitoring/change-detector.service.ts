import { ToolSnapshotData, DetectedChange, ChangeCategory, ChangeSeverity, SourceUrls } from '../../types/monitoring';

export class ChangeDetectorService {
  static detectChanges(
    previous: ToolSnapshotData | null,
    current: ToolSnapshotData,
    previousSourceUrls?: SourceUrls,
    currentSourceUrls?: SourceUrls
  ): DetectedChange[] {
    const changes: DetectedChange[] = [];

    if (!previous) {
      // First snapshot - no comparison possible
      return changes;
    }

    // Category: Product name
    if (previous.productName !== current.productName) {
      changes.push({
        category: 'product_name',
        fieldName: 'productName',
        previousValue: previous.productName,
        currentValue: current.productName,
        severity: 'warning',
      });
    }

    // Category: Pricing
    if (previous.pricingModel !== current.pricingModel) {
      changes.push({
        category: 'pricing',
        fieldName: 'pricingModel',
        previousValue: previous.pricingModel,
        currentValue: current.pricingModel,
        severity: 'warning',
      });
    }

    if (previous.monthlyPrice !== current.monthlyPrice) {
      const priceDiff = Math.abs((current.monthlyPrice || 0) - (previous.monthlyPrice || 0));
      changes.push({
        category: 'pricing',
        fieldName: 'monthlyPrice',
        previousValue: String(previous.monthlyPrice),
        currentValue: String(current.monthlyPrice),
        severity: priceDiff > 10 ? 'critical' : 'warning',
      });
    }

    // Category: Free tier
    if (previous.hasFreeTier !== current.hasFreeTier) {
      changes.push({
        category: 'free_tier',
        fieldName: 'hasFreeTier',
        previousValue: String(previous.hasFreeTier),
        currentValue: String(current.hasFreeTier),
        severity: 'warning',
      });
    }

    if (previous.hasFreeTrial !== current.hasFreeTrial) {
      changes.push({
        category: 'free_tier',
        fieldName: 'hasFreeTrial',
        previousValue: String(previous.hasFreeTrial),
        currentValue: String(current.hasFreeTrial),
        severity: 'info',
      });
    }

    // Category: Plans (compare pricingTiers)
    const planChanges = this.detectPlanChanges(previous.pricingTiers, current.pricingTiers);
    changes.push(...planChanges);

    // Category: Features (compare features arrays)
    const featureChanges = this.detectArrayChanges(
      previous.features,
      current.features,
      'features'
    );
    changes.push(...featureChanges);

    // Category: Platforms
    const platformChanges = this.detectArrayChanges(
      previous.platforms,
      current.platforms,
      'platforms'
    );
    changes.push(...platformChanges);

    // Category: Integrations
    const integrationChanges = this.detectArrayChanges(
      previous.integrations,
      current.integrations,
      'integrations'
    );
    changes.push(...integrationChanges);

    // Category: Usage limits
    const usageLimitChanges = this.detectUsageLimitChanges(
      previous.usageLimits,
      current.usageLimits
    );
    changes.push(...usageLimitChanges);

    // Category: Languages
    const languageChanges = this.detectArrayChanges(
      previous.languages,
      current.languages,
      'languages'
    );
    changes.push(...languageChanges);

    // Category: Export formats
    const exportFormatChanges = this.detectArrayChanges(
      previous.exportFormats,
      current.exportFormats,
      'export_formats'
    );
    changes.push(...exportFormatChanges);

    // Category: Limitations
    const limitationChanges = this.detectArrayChanges(
      previous.limitations,
      current.limitations,
      'limitations'
    );
    changes.push(...limitationChanges);

    // Category: Target audience
    const targetAudienceChanges = this.detectArrayChanges(
      previous.targetAudience,
      current.targetAudience,
      'target_audience'
    );
    changes.push(...targetAudienceChanges);

    // Category: Discontinued features
    const discontinuedFeaturesChanges = this.detectArrayChanges(
      previous.discontinuedFeatures,
      current.discontinuedFeatures,
      'discontinued_features'
    );
    changes.push(...discontinuedFeaturesChanges);

    // Category: Policy changes
    const policyChangesChanges = this.detectArrayChanges(
      previous.policyChanges,
      current.policyChanges,
      'policy_changes'
    );
    changes.push(...policyChangesChanges);

    // Category: Official URLs
    if (previousSourceUrls && currentSourceUrls) {
      const urlChanges = this.detectUrlChanges(previousSourceUrls, currentSourceUrls);
      changes.push(...urlChanges);
    }

    return changes;
  }

  private static detectPlanChanges(
    previous: any[],
    current: any[]
  ): DetectedChange[] {
    const changes: DetectedChange[] = [];

    const prevNames = new Set(previous.map((p) => p.name));
    const currNames = new Set(current.map((p) => p.name));

    // Detect plan additions
    for (const plan of current) {
      if (!prevNames.has(plan.name)) {
        changes.push({
          category: 'plans',
          fieldName: 'pricingTiers',
          previousValue: null,
          currentValue: JSON.stringify(plan),
          severity: 'info',
        });
      }
    }

    // Detect plan removals
    for (const plan of previous) {
      if (!currNames.has(plan.name)) {
        changes.push({
          category: 'plans',
          fieldName: 'pricingTiers',
          previousValue: JSON.stringify(plan),
          currentValue: null,
          severity: 'warning',
        });
      }
    }

    // Detect plan changes (for plans that exist in both)
    for (const prevPlan of previous) {
      const currPlan = current.find((p) => p.name === prevPlan.name);
      if (currPlan) {
        // Compare monthly prices (actual month-to-month pricing)
        if (prevPlan.monthlyPrice !== currPlan.monthlyPrice) {
          changes.push({
            category: 'pricing',
            fieldName: `pricingTiers.${prevPlan.name}.monthlyPrice`,
            previousValue: String(prevPlan.monthlyPrice),
            currentValue: String(currPlan.monthlyPrice),
            severity: 'warning',
          });
        }

        // Compare annual monthly prices (annual billing equivalent)
        if (prevPlan.annualMonthlyPrice !== currPlan.annualMonthlyPrice) {
          changes.push({
            category: 'pricing',
            fieldName: `pricingTiers.${prevPlan.name}.annualMonthlyPrice`,
            previousValue: String(prevPlan.annualMonthlyPrice),
            currentValue: String(currPlan.annualMonthlyPrice),
            severity: 'warning',
          });
        }

        // Note: billing period changes are not detected as separate changes
        // Only actual price changes (monthlyPrice, annualMonthlyPrice) are flagged
        // This ensures billing-period-only changes are not treated as price changes

        // Compare features arrays (case-insensitive)
        const featureChanges = this.detectArrayChanges(
          prevPlan.features,
          currPlan.features,
          'ai_features'
        );
        changes.push(
          ...featureChanges.map((c) => ({
            ...c,
            fieldName: `pricingTiers.${prevPlan.name}.features`,
          }))
        );
      }
    }

    return changes;
  }

  private static detectArrayChanges(
    previous: string[],
    current: string[],
    category: ChangeCategory
  ): DetectedChange[] {
    const changes: DetectedChange[] = [];
    const prevSet = new Set(previous.map(s => s.toLowerCase()));
    const currSet = new Set(current.map(s => s.toLowerCase()));

    // Detect additions
    for (const item of current) {
      if (!prevSet.has(item.toLowerCase())) {
        changes.push({
          category,
          fieldName: category,
          previousValue: null,
          currentValue: item,
          severity: 'info',
        });
      }
    }

    // Detect removals
    for (const item of previous) {
      if (!currSet.has(item.toLowerCase())) {
        changes.push({
          category,
          fieldName: category,
          previousValue: item,
          currentValue: null,
          severity: 'warning',
        });
      }
    }

    return changes;
  }

  private static detectUsageLimitChanges(
    previous: any | null,
    current: any | null
  ): DetectedChange[] {
    const changes: DetectedChange[] = [];

    if (!previous && !current) return changes;
    if (!previous) {
      changes.push({
        category: 'usage_limits',
        fieldName: 'usageLimits',
        previousValue: null,
        currentValue: JSON.stringify(current),
        severity: 'info',
      });
      return changes;
    }
    if (!current) {
      changes.push({
        category: 'usage_limits',
        fieldName: 'usageLimits',
        previousValue: JSON.stringify(previous),
        currentValue: null,
        severity: 'warning',
      });
      return changes;
    }

    const fields: (keyof any)[] = ['minutes', 'credits', 'generations', 'storage', 'seats'];
    for (const field of fields) {
      if (previous[field] !== current[field]) {
        changes.push({
          category: 'usage_limits',
          fieldName: `usageLimits.${String(field)}`,
          previousValue: String(previous[field] || null),
          currentValue: String(current[field] || null),
          severity: 'warning',
        });
      }
    }

    return changes;
  }

  private static detectUrlChanges(
    previous: SourceUrls,
    current: SourceUrls
  ): DetectedChange[] {
    const changes: DetectedChange[] = [];

    // Normalize URLs for comparison (remove trailing slashes)
    const normalizeUrl = (url: string | undefined): string => {
      if (!url) return '';
      return url.replace(/\/$/, '');
    };

    const fields: (keyof SourceUrls)[] = ['pricing', 'features', 'product'];
    for (const field of fields) {
      const prevUrl = normalizeUrl(previous[field]);
      const currUrl = normalizeUrl(current[field]);

      if (prevUrl !== currUrl) {
        changes.push({
          category: 'official_urls',
          fieldName: `sourceUrls.${String(field)}`,
          previousValue: previous[field] || null,
          currentValue: current[field] || null,
          severity: 'info',
        });
      }
    }

    return changes;
  }
}
