import HeroFrame from '@/components/HeroFrame'
import { PageShell, SectionHead, Kicker } from '@/components/ui'
import { FONT, PALETTE, METHODOLOGY_VERSION } from '@/design/constants'

function H({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 44, marginBottom: 14 }}>
      <Kicker>{kicker}</Kicker>
      <h2
        style={{
          marginTop: 8,
          fontFamily: FONT.display,
          fontSize: 32,
          lineHeight: 1.15,
          letterSpacing: '-0.005em',
          color: PALETTE.text,
          fontWeight: 500,
        }}
      >
        {children}
      </h2>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: 12,
        fontFamily: FONT.body,
        fontSize: 17,
        lineHeight: 1.7,
        color: PALETTE.textSub,
        maxWidth: 760,
      }}
    >
      {children}
    </p>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: 14,
        fontFamily: FONT.display,
        fontSize: 22,
        lineHeight: 1.5,
        color: PALETTE.text,
        maxWidth: 760,
        fontStyle: 'italic',
      }}
    >
      {children}
    </p>
  )
}

export default function MethodologyPage() {
  return (
    <PageShell maxWidth={1040}>
      <section style={{ paddingTop: 36 }}>
        <HeroFrame intensity="lg" accentRgb={PALETTE.brassRgb} accentRgb2={PALETTE.violetRgb}>
          <div style={{ padding: '44px 38px' }}>
            <Kicker>
              METHODOLOGY · {METHODOLOGY_VERSION} · LAST UPDATED 2026-05-17
            </Kicker>
            <h1
              style={{
                marginTop: 14,
                fontFamily: FONT.display,
                fontSize: 52,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                fontWeight: 500,
                color: PALETTE.text,
                textWrap: 'balance',
              }}
            >
              How Atlas Truth grades the news.
            </h1>
            <Lead>
              The most important page on this site. If you only read one document about
              Atlas Truth, this is the one. It defines the verdicts, the four signals, the
              outlets we monitor, the lines we hold, and the limits we admit.
            </Lead>
          </div>
        </HeroFrame>
      </section>

      <article>
        <H kicker="I">Why we built this.</H>
        <P>
          A reader who wants to know whether a factual claim is true should be able to find
          out in three taps &mdash; not by reading eight outlets, not by trusting a single
          one, not by guessing which spectrum is closer to the documentary record on a given
          day. Atlas Truth was built to make that three-tap path real: claim, sources,
          primary document.
        </P>
        <P>
          We are not the first to try. Fact-checking organisations have done careful work
          for two decades. We owe their methodology pages an enormous debt and we cite
          several in our{' '}
          <a href="/about/sources" style={{ color: PALETTE.brass, textDecoration: 'none' }}>
            sources
          </a>{' '}
          document. What Atlas Truth contributes that we have not seen elsewhere is a
          per-claim graph &mdash; a single canonical statement of a verifiable claim, with
          every outlet&rsquo;s reporting on that claim collapsed into one row, linked to
          the primary document that resolved it.
        </P>

        <H kicker="II">What we grade.</H>
        <P>
          Atlas Truth grades <strong>verifiable factual claims</strong>. A verifiable
          factual claim is a statement of fact about the world that is, in principle,
          falsifiable by reference to a primary document or independent corroboration. A
          roll-call vote. A GDP revision. A retracted Cabinet appointment. A peer-reviewed
          study&rsquo;s headline number. A court ruling. A regulatory filing. A bill text.
          These are the claims we touch.
        </P>
        <P>
          For each one, the verdict engine reads four signals and produces one of six
          verdicts. That is the entire product surface on the grading side. Everything
          else &mdash; the spectrum strips, the leaderboards, the honesty scores &mdash; is
          downstream of those verdicts.
        </P>

        <H kicker="III">What we do not grade.</H>
        <Lead>
          We do not grade opinion. We do not grade prediction. We do not grade framing,
          tone, headline aggression, or editorial judgement.
        </Lead>
        <P>
          A column arguing that a bill is bad policy is not a factual claim. A pundit
          predicting a recession is not a factual claim. A magazine cover&rsquo;s choice
          of photograph is not a factual claim. Each of these is a legitimate journalistic
          act, and each is outside the engine&rsquo;s scope. When opinion appears alongside
          fact in the same article, we extract only the factual statements and tag the
          article&rsquo;s overall type as <code>opinion</code> / <code>analysis</code> /{' '}
          <code>satire</code> in the source panel of any claim that quotes it. Opinion
          articles never carry a verdict.
        </P>

        <H kicker="IV">The four signals.</H>
        <P>
          The grading function <code>computeVerdict(claim, evidence)</code> reads exactly
          four signals. No black-box scoring. No proprietary model weights. The four
          signals are:
        </P>
        <P>
          <strong>1. Outlet agreement, with spectrum band.</strong> For each outlet that
          reported the claim, did they assert it as true, dispute it, or report it without
          taking a position? Outlets are grouped by spectrum band so the engine can see
          whether agreement is cross-spectrum or single-spectrum.
        </P>
        <P>
          <strong>2. Primary documents.</strong> For each linked primary document &mdash;
          court filing, agency release, transcript, roll-call vote, peer-reviewed paper
          &mdash; does the document corroborate the claim, contradict it, partially
          corroborate it, or remain silent? Atlas Truth maintains its own index of primary
          sources and editorial reviewers approve every claim&ndash;document link.
        </P>
        <P>
          <strong>3. Retraction status.</strong> Has any reporting outlet retracted its
          reporting of this claim? Was the retraction accompanied by independent
          confirmation that the original was wrong? Retractions are heavily weighted.
        </P>
        <P>
          <strong>4. Headline-body fidelity.</strong> For each reporting outlet, does the
          headline accurately summarise the body of the article? A literally-true headline
          that is misleading in context fails this signal.
        </P>

        <H kicker="V">The six verdicts.</H>
        <P>
          <strong>VERIFIED.</strong> Three or more independent outlets across at least two
          spectrum bands agree, at least one primary document corroborates, headline-body
          fidelity holds, and no live retraction. The strongest verdict the engine can
          produce.
        </P>
        <P>
          <strong>CORROBORATED.</strong> Three or more cross-spectrum outlets agree, but no
          primary document has yet corroborated. The claim is strong but not yet
          documentary.
        </P>
        <P>
          <strong>MIXED.</strong> The claim contains sub-claims, of which at least one is
          VERIFIED or CORROBORATED and at least one is FALSE or DISPUTED. The badge is
          split &mdash; emerald on one half, loss-red on the other. The reader must read
          the breakdown to understand which parts are true and which are not. MIXED never
          shimmers and never appears without an attached breakdown panel.
        </P>
        <P>
          <strong>DISPUTED.</strong> Outlets disagree, or coverage is single-spectrum, or
          headline-body fidelity fails on a majority of reporting outlets. The claim is
          contested in the public record.
        </P>
        <P>
          <strong>FALSE.</strong> A primary document directly contradicts the claim, or a
          retraction has been issued with independent confirmation that the original was
          wrong. FALSE never shimmers; the label is rendered in solid loss-red. Losses
          never shimmer; neither do lies.
        </P>
        <P>
          <strong>UNVERIFIED.</strong> The engine has not gathered enough evidence to apply
          any of the rules above. Breaking news without primary documents lives here. The
          engine is honest about the limits of its inputs.
        </P>

        <H kicker="VI">Independence.</H>
        <P>
          Atlas Truth&rsquo;s grading function is pure. It takes evidence as input and
          returns a verdict. The function&rsquo;s source is version-controlled and every
          verdict on the site is stamped with the function version that produced it. A
          reader can see exactly which rule fired on which evidence on the{' '}
          <code>DECISION TRACE</code> panel of every claim page.
        </P>
        <P>
          No editorial reviewer can overwrite the verdict produced by the function. What
          editorial review can do is correct the inputs &mdash; relink a primary document,
          edit a sub-claim wording, mark an outlet&rsquo;s reporting as agreeing or
          disagreeing &mdash; and the function re-runs. Every input edit is logged.
        </P>

        <H kicker="VII">Spectrum bands.</H>
        <P>
          Outlets are placed into one of seven spectrum bands: FAR LEFT, LEFT, CENTER-LEFT,
          CENTER, CENTER-RIGHT, RIGHT, FAR RIGHT. Band placement is a quarterly editorial
          decision informed by published cross-outlet coverage comparisons over a rolling
          12-month window. Band placement affects only one thing in the grading function:
          whether agreement is cross-spectrum. It does not directly affect any
          outlet&rsquo;s composite Honesty Score.
        </P>
        <P>
          A user who disagrees with our band placement for a given outlet can override
          their personal placement on the{' '}
          <a
            href="/settings/methodology-overrides"
            style={{ color: PALETTE.brass, textDecoration: 'none' }}
          >
            methodology-overrides
          </a>{' '}
          page. The published placement remains the published placement.
        </P>

        <H kicker="VIII">Primary documents.</H>
        <P>
          The primary-document index includes federal and state court dockets (via
          CourtListener where available), the Federal Register, SEC EDGAR, congress.gov
          roll-call votes and bill text, FEC filings, BLS and BEA scheduled releases, the
          full Census release calendar, and a curated set of NGO data drops. Public
          on-the-record video transcripts are auto-transcribed and editorially verified
          before linking.
        </P>
        <P>
          When a claim is extracted, the engine retrieves candidate primary documents from
          the index against the claim&rsquo;s entities and time window. An editorial
          reviewer approves or rejects each candidate before the link is permanent on the
          claim page. Rejections are logged.
        </P>

        <H kicker="IX">The dissent log.</H>
        <P>
          Every claim page has a dissent log. Any reader &mdash; anonymous or named &mdash;
          can post a substantive argument that the verdict, the inputs, or the methodology
          itself is wrong on this claim. Editorial reviewers respond on the record. The
          response is a HeroFrame within the dissent thread, brass-accented to indicate
          official editorial voice.
        </P>
        <P>
          Dissents that produce a methodology change are linked from the changelog at the
          bottom of this page. A challenge that surfaces a real problem is the most useful
          input we can receive.
        </P>

        <H kicker="X">Versioning.</H>
        <P>
          Methodology is version-controlled. This page&rsquo;s current version is{' '}
          <strong>{METHODOLOGY_VERSION}</strong>. Every verdict on the site links to the
          methodology version that produced it &mdash; a reader can always trace which
          rules and which weights were in effect on a given day. Prior versions remain
          published; they do not silently disappear.
        </P>

        <H kicker="XI">Limits.</H>
        <Lead>
          A short list of the things this product does not yet do well. We will not pretend
          otherwise.
        </Lead>
        <P>
          The grading function does not yet handle multilingual claims. Non-English outlets
          are absent from the cross-spectrum agreement signal even when their reporting is
          substantive. We are working on this.
        </P>
        <P>
          Breaking news is hard. The first hour of a single-source story is almost always
          UNVERIFIED. The engine does not pretend otherwise &mdash; but a reader who wants
          rapid headlines should know the verdict comes later, not at the moment of push.
        </P>
        <P>
          Claim extraction is currently a hybrid of machine and editorial workflow.
          High-virality claims are reviewed before publication; lower-traffic claims may
          appear with a <code>MACHINE-EXTRACTED · UNREVIEWED</code> tag in the source
          panel. The tag is visible. We do not hide it.
        </P>
        <P>
          Methodology disclosure rubrics are a snapshot. An outlet that publishes a
          corrections policy on Tuesday will see its Disclosure sub-score adjust on the
          following weekly recompute &mdash; not in real time.
        </P>
      </article>

      <section style={{ paddingTop: 48, paddingBottom: 64 }}>
        <SectionHead title="REVIEWERS" kicker="OUTSIDE PASS BEFORE PUBLIC RELEASE" />
        <HeroFrame intensity="md" accentRgb={PALETTE.brassRgb}>
          <div
            style={{
              padding: 24,
              fontFamily: FONT.body,
              fontSize: 15,
              lineHeight: 1.65,
              color: PALETTE.textSub,
            }}
          >
            Atlas Truth&rsquo;s methodology was reviewed by three named outside reviewers
            before this page went public: an academic working on media measurement at a
            North American R1 institution, a working journalist at a non-partisan
            cross-spectrum desk, and a media-law attorney with corrections-policy
            experience. Their names and any disclosed conflicts appear on the{' '}
            <a
              href="/about/governance"
              style={{ color: PALETTE.brass, textDecoration: 'none' }}
            >
              governance
            </a>{' '}
            page.
          </div>
        </HeroFrame>
      </section>
    </PageShell>
  )
}
