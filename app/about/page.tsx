import { Metadata } from 'next';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { SITE_NAME, sitePageTitle } from '../../lib/brand';
import { Sparkles, Target, Users, Award, Heart, ShieldCheck, Lightbulb, TrendingUp } from 'lucide-react';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle(`About ${SITE_NAME} - Our Mission, Story & Team`),
    description:
      `Learn about ${SITE_NAME} - the independent AI tools discovery platform built by engineers, researchers and AI practitioners. Discover our mission, editorial principles and how we curate software listings.`,
    canonicalUrl: '/about',
  });
}

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      <PageHero
        maxWidth="5xl"
        badge={
          <PageHeroAccentBadge icon={<Sparkles className="w-4 h-4 text-inverted-foreground/80" />}>
            About {SITE_NAME}
          </PageHeroAccentBadge>
        }
        title={
          <>
            Independent AI Tools Discovery,
            <br />
            <span className="text-inverted-foreground">Built by Practitioners</span>
          </>
        }
        description={`${SITE_NAME} is a curated directory of the world's best artificial intelligence software. We help professionals, creators and teams discover the right AI tools for their workflow - with honest reviews, head-to-head comparisons and verified pricing data.`}
      />

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            Icon: Target,
            title: 'Our Mission',
            text: 'Democratize access to the best AI tools. We believe every builder, creator and operator deserves clear, side-by-side guidance - not vague search results or paid placements.',
          },
          {
            Icon: Users,
            title: 'Who We Serve',
            text: `From indie developers to Fortune-500 engineering teams, from solo creators to marketing agencies - ${SITE_NAME} helps decision-makers shortlist software with confidence.`,
          },
          {
            Icon: Lightbulb,
            title: 'Editorial Independence',
            text: 'Our reviews and ratings are built by hands-on testers and researchers. We do not accept payment for featured placements, star ratings, or top positions.',
          },
          {
            Icon: TrendingUp,
            title: 'How We Curate',
            text: 'Every listing is verified against live product pages, pricing documentation, community sentiment and release notes. Outdated tools are flagged in our Needs Review queue.',
          },
        ].map(({ Icon, title, text }) => (
          <div
            key={title}
            className="bg-background-raised rounded-2xl border border-border/50 shadow-sm p-6 sm:p-7 space-y-2.5"
          >
            <div className="w-11 h-11 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-medium tracking-tight text-foreground-strong">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto bg-gradient-to-br from-foreground/5 via-background-raised to-rating/5 rounded-3xl border border-border/50 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2.5">
          <Award className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-medium tracking-tight text-foreground-strong">
            Our Editorial Principles
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 list-none counter-reset:principles">
          {[
            'Truth over traffic - we call out limitations and broken pricing pages even when it costs clicks.',
            'Primary sources first - every factual claim links to a verifiable product page or official doc.',
            'Community feedback loops - user reviews and scores are incorporated into directory listings.',
            'Hands-on testing where possible - editors trial features before publishing "verified" badges.',
            'Transparent update cadence - tool metadata is flagged as stale when last-verified dates exceed 60 days.',
            'No undisclosed sponsors - any brand collaboration is clearly labeled on the applicable listing.',
          ].map((line, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-foreground leading-relaxed">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <ShieldCheck className="w-4 h-4 text-verified" />
        </div>
        <h2 className="text-2xl font-medium tracking-tight text-foreground-strong">
          Thank you for trusting {SITE_NAME}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Questions about our methodology, want to suggest a tool, or interested in partnering?{' '}
          <a
            href="/contact"
            className="font-semibold text-foreground hover:text-foreground-strong underline decoration-border underline-offset-2"
          >
            Reach out to our team &rarr;
          </a>
        </p>
      </section>
    </div>
  );
}
