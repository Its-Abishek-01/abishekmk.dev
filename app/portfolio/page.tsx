import type { Metadata } from 'next';
import './portfolio.css';
import { PORTFOLIO_SHELL } from '@/lib/portfolio/shell';
import { FILE_META, renderMain, renderTree } from '@/lib/portfolio/content';
import PortfolioBehaviors from '@/components/portfolio/PortfolioBehaviors';

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'The developer portfolio of Abishek M K: Flutter apps, Node and MongoDB backends, React web and the servers behind them, laid out as a code repository.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Abishek M K · Developer Portfolio', url: '/portfolio' },
};

const html = PORTFOLIO_SHELL
  .replace('<ul class="tree" id="tree"></ul>', '<ul class="tree" id="tree">' + renderTree() + '</ul>')
  .replace('<main id="main"></main>', '<main id="main">' + renderMain() + '</main>')
  .replace('<b>● open to work</b>', '<b>● open to work</b><br><a href="/" style="color:#F2A93B">← abishek.wiozen.in</a>');

const personLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abishek M K',
  jobTitle: 'Software Engineer',
  url: 'https://abishek.wiozen.in/portfolio',
  address: { '@type': 'PostalAddress', addressLocality: 'Tiruchirappalli', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  knowsAbout: ['Flutter', 'Node.js', 'MongoDB', 'React', 'Firebase', 'AWS'],
  sameAs: ['https://www.linkedin.com/in/its-abishek-mk', 'https://github.com/Its-Abishek-01'],
});

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personLd }} />
      <div className="pf" dangerouslySetInnerHTML={{ __html: html }} />
      <PortfolioBehaviors files={FILE_META} />
    </>
  );
}
