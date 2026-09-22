import type { Metadata } from 'next';
import './landing.css';
import { LANDING_HTML } from '@/lib/landing/markup';
import { LANDING_JSONLD } from '@/lib/landing/jsonld';
import LandingBehaviors from '@/components/landing/LandingBehaviors';

export const metadata: Metadata = {
  title: { absolute: 'Abishek M K · App & Website Developer in Trichy' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Abishek M K · App & Website Developer in Trichy',
    description: 'Android and iOS apps, websites and booking systems, designed, built and launched by one developer. Free quote within a day.',
    url: '/',
  },
};

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LANDING_JSONLD }} />
      {/* Markup is ported verbatim from the locked prototype so the design can't drift. */}
      <div className="lp" dangerouslySetInnerHTML={{ __html: LANDING_HTML }} />
      <LandingBehaviors />
    </>
  );
}
