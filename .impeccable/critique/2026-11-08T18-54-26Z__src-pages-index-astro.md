---
target: homepage
total_score: 27
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 1
p2_count: 3
p3_count: 1
target_identity: "file:C:\\Users\\Ishan\\ishan\\src\\pages\\index.astro"
target_fingerprint: "sha256:ee418f0e57ab5c08a84acb542328672a2260d60f7bc213470fa2131cae853ee2"
target_path: "C:\\Users\\Ishan\\ishan\\src\\pages\\index.astro"
timestamp: 2026-11-08T18-54-26Z
slug: src-pages-index-astro
---
Method: dual-agent (A: ses_e438fbf5effex3PDNZV5xy5OJk · B: ses_e438fbf5effd8RXh4XzfA98hIR)

# Critique — Homepage (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Reading progress is a 1px hairline; the chapter rail is ≥1400 only, unlabeled and low-contrast, and stays on "05" through the epilogue and footer. |
| 2 | Match System / Real World | 4 | Chapter, contents, ledger, margin and epilogue language maps cleanly to the field-journal positioning; project stages are plain language. |
| 3 | User Control and Freedom | 4 | Anchor jumps, contents links, menu close, back-to-top and native dialog behaviour; no traps; reduced motion respected. |
| 4 | Consistency and Standards | 3 | Link affordances vary; ledger rows look inert; external story/menu links do not announce new tabs; rail omits the epilogue the contents includes; "Year" contains "Ongoing" and "Forthcoming." |
| 5 | Error Prevention | 4 | No forms or input on this page; external links and mailto are direct; the empty notes state is explained, not an error. |
| 6 | Recognition Rather Than Recall | 2 | The rail requires memorising 00–05; no chapter title on hover/focus; the labelled contents sits below the whole prologue. |
| 7 | Flexibility and Efficiency | 3 | Header Work, contents, work index and rail are accelerators, but the hero's primary CTA is the preface and the rail is desktop-only and tiny. |
| 8 | Aesthetic and Minimalist Design | 4 | Distinctive, cohesive and restrained; the apparatus is occasionally over-articulated, but it does not clutter the reading. The 8px microtype is a legibility issue, not visual clutter. |
| 9 | Error Recovery | n/a | Static page with no input or form error states; the one empty state is explained, not an error. |
| 10 | Help and Documentation | n/a | No complex task or documentation need; the only non-obvious state is explained in-page. |
| **Total** | | **27/32 (84%)** | **Good** |

Eight heuristics scored; 9 and 10 are n/a. The 2 for recognition is the one real failure.

## Design Specificity Verdict

**LLM assessment:** This is authored. The cover is a thesis: a 135px Fraunces sentence with "understand" in italic orange, an 8px mono issue line, a grayscale portrait, and an editorial apparatus that continues into folios, a dotted contents page, a seven-row ledger and a warm epilogue. The visual language is a printed feature, but the content architecture is the real signature: Prologue → The question → The work → The method → The syllabus → The margin → Epilogue, with honest statuses and a deliberately empty shelf. Swap the palette and the structure still belongs to this portfolio; it would not survive intact in a generic project gallery.

The genre is familiar — dark editorial portfolio, serif display, mono apparatus, oversized numerals. What keeps it from being interchangeable is the discipline of the evidence: DermoAI's custom diagram plus metrics and caveat, the real Atlas and Halcyon screenshots, the ledger's "In development", "Prototypes & concepts", "Reserved index entry", and copy that names what is mocked. The specificity is content-led, not interaction-led.

The weakest authorship is where the metaphor becomes decoration: the number-only chapter rail, the over-indexed numbering system (nav 01–04, chapters 00–05, stories 02.x, projects 01–07, figures 01–07, syllabus 01–05), and the contents placed after the prologue. Holistically the page is coherent and often beautiful; the warm epilogue lands, the copy is specific and unhyped, and the states (hover, focus, menu, reduced motion) are considered. But the IA is optimized for a reader, not a screener, and the smallest type carries the information a screener needs. Accessibility is mostly strong — focus, semantics, alt text, reduced motion — except the rail and unannounced new tabs. Edge cases are strong except the 320px hero and the contents reveal. **Verdict: distinctive and authored, not category-interchangeable; strongest in composition and content, weakest in navigation and action hierarchy.**

**Deterministic scan:** The CLI detector returned 0 findings for `src/pages/index.astro` (exit 0), with a positive control confirming `.astro` files are scanned. The browser detector found 36 anti-patterns on the rendered page: 33 `undersized-ui-text`, 1 `italic-serif-display`, 1 `hero-eyebrow-chip`, and 1 `low-contrast`. The 33 undersized-text findings confirm the design review's P1 with hard evidence: nav spans at 8–10px, hero metadata and CTA at 8–9px, all six rail labels at 8px, and nine footer labels at 8px. The `low-contrast` finding is real and was missed by the LLM review: `.colophon-note--muted` is `#797267` on `#131110`, approximately 3.96:1, below the 4.5:1 AA threshold. The `italic-serif-display` and `hero-eyebrow-chip` findings match the rendered styles but are contextual false positives: the italic Fraunces headline and the tracked-caps metadata row are deliberate parts of the editorial register, not accidental slop. Six `text-occlusion` findings that appeared only after overlay injection were the detector's own labels occluding page text; they are excluded as self-detection artifacts.

**Visual overlays:** Injection succeeded in the headless browser. 36 overlay nodes were inserted and a screenshot confirms visible gold outlines and labels. No human-facing browser tab was presented, so there is no [Human] overlay to inspect; the evidence is the headless screenshot and console payload.

## Overall Impression

A genuinely beautiful, authored homepage that earns its editorial conceit. The single biggest opportunity is the gap between what the page is optimized for — a committed reader — and who it now says it serves: a time-boxed recruiter who needs scope, stage and proof before choosing to read. The work is strong enough to survive being surfaced earlier; the caveat and case-study links are too quiet to survive being buried.

## What's Working

1. **The cover composition and voice.** The 135px Fraunces headline, italic orange emphasis, 8px issue line, small grayscale portrait and three-column foot form a distinctive front page. "I build to understand" is specific, memorable and supported by the deck rather than hype.
2. **Honesty as a visual system.** The DermoAI plate, the Atlas "mocked pipeline" copy, the seven-row ledger and the empty shelf make the positioning visible. This is the strongest content-specific design decision on the page — not a generic "about me" section.
3. **The reading rhythm and epilogue.** Chapter heads, folio numbers, alternating story plates and the warm epilogue create a paced narrative; the final mailto is the clearest conversion moment on the site. The mobile menu is also elegantly executed and usable.

## Cognitive Load

| Item | Result | Note |
|---|---|---|
| Single focus | Pass | The cover has one message and one primary action; each chapter has one job. |
| Chunking | Pass | Six chapters plus epilogue; stories split into copy, plate, facts and links; ledger and syllabus are scannable lists. |
| Grouping | Pass | Chapter furniture, story grid, "At a glance" margin, ledger columns and epilogue block are consistently grouped. |
| Visual hierarchy | Pass | Display > deck > body > facts > links is clear. The caveat weighting is a priority issue, not a hierarchy collapse. |
| One thing at a time | Pass | Linear narrative; jumps are optional. |
| Minimal choices | Pass | Two cover actions, four nav items, three featured stories; the rail adds six choices but is auxiliary. |
| Working memory | Fail | Number-only rail; contents below the prologue; nav numbers, chapter numbers and project indices all reuse "01" for different things. |
| Progressive disclosure | Pass | Contents and ledger lead to case studies; summaries precede detail; "At a glance" is compact. |

**Failure count: 1 — low cognitive load.**

## Emotional Journey

The cover is a strong opening: confident, literary and personal. The 135px headline, the italic orange "understand", the issue line and the grayscale portrait create intrigue rather than a hard sell.

The prologue is the intimate peak of voice — the dropcap, the "Build, observe, revise" pull-quote and the contents list. The question chapter is a deliberate breath, but it is also the first lull: no artefact, no proof, just a personal essay.

The work and method chapters are the credibility peaks. DermoAI's plate and caveat, the Atlas and Halcyon screenshots, then the ledger's status column deliver the "this person builds real things and says what stage they are at" feeling. The syllabus is a humanising dip; the margin is the lowest point — principled, but static and repetitive — and it sits immediately before the epilogue.

The epilogue is a genuine peak-end: the warm panel, the direct question and the large email address turn the long read into an invitation. The footer's "A living document, not a finished one" is a quiet, consistent coda. The overall arc is coherent and designed for a reader; the risk is drop-off before the work and at the empty shelf.

## Priority Issues

### 1. P1 — Decision-critical type is set below the threshold of a scan

**What:** Stage labels and caveats are 8–9px mono: "Research study · 2026", "In development", "Complete build", plate meta, figcaptions, ledger headers, and DermoAI's "Research prototype — not clinically validated." The DermoAI metrics are 62px at 1440; the caveat is 9px. The "Read the DermoAI study" link is 9px. On mobile these labels remain 8–9px. The footer's muted colophon note also measures 3.96:1.

**Why it matters:** Recruiters scan. The product principle says scope, stage and proof must be legible within a fast scan, and DermoAI's product truth requires the "not clinically validated" limit to survive a fast read. Right now the visual hierarchy rewards the numbers and whispers the qualifier. The system also undermines the case-study links, which are the path from summary to proof.

**Fix:** Establish an 11–12px floor for functional labels and 12–13px for stage/disclaimer text. Promote DermoAI's caveat to a visible status line beside the metrics or under the headline, using the existing wording. Make "Read the case study" a 12px+ link or a small secondary button; keep the external repository quiet. Raise `.colophon-note--muted` to at least 4.5:1. Test at 320px and at 200% zoom.

**Suggested command:** `$impeccable typeset`

### 2. P2 — The screener's route to work is buried; the primary CTA is editorial

**What:** The first project content starts 3,450px down at 1440×1000 — 3.45 viewports. "The work" section begins at 3,078px. The primary CTA is "Begin reading," which goes to the prologue; the secondary "The full index" is 9px. The labelled contents appears after the prologue, around 1,700px. On mobile, Work and Contact are behind the hamburger.

**Why it matters:** The primary users are time-boxed recruiters and screeners. They need project names, stages and links before committing to a 10,000px narrative. The header Work link is an escape hatch on desktop, but the hero's hierarchy points to the preface, and mobile hides the equivalent behind a menu. This is the clearest tension between the field-journal concept and the product purpose.

**Fix:** Add a compact "Selected work" row under the cover deck using the existing three featured projects: DermoAI — Research study; Atlas — In development; Halcyon — Complete build, each linked to its case study. Turn "The full index" into a plainly labelled "See the work" secondary at 12px. Keep "Begin reading" as the editorial path, or make the two equal. On mobile, add a visible Work shortcut under the hero or in the sticky header. Do not add new projects or claims.

**Suggested command:** `$impeccable layout`

### 3. P2 — The chapter rail is decoration masquerading as navigation

**What:** It appears only at ≥1400px. Links are 33×22px, set in 8px mono, with inactive labels at 50% opacity — an effective 2.6:1 contrast against the surface. There are no visible chapter titles on hover or focus. At the epilogue and footer it still marks 05 "The margin" as active, and it omits the epilogue while the contents includes it. Keyboard users encounter it last in DOM order, after the epilogue.

**Why it matters:** At the largest, most impressive viewport the rail is the most "designed" navigation and the least usable. The contrast failure is real, the 22px target height is below the 24px guideline, and a number-only rail asks sighted users to memorise the contents. The mismatch between the rail and the chapter model erodes trust in an otherwise rigorous system.

**Fix:** Either remove it — the header, contents and work index already cover the need — or make it a real navigator: 11–12px chapter titles visible on hover/focus (and perhaps always at ≥1600), 24px minimum targets, ≥4.5:1 inactive contrast, an epilogue entry, and active logic that follows the epilogue. If it remains number-only, treat it as decoration, not navigation.

**Suggested command:** `$impeccable polish`

### 4. P2 — The work index looks static on touch

**What:** Ledger rows are links, but they have no arrow, underline or "view" affordance; color change on hover is the only cue. On mobile the field and year columns disappear and the status is 12px. The "Open the index" link is 9px.

**Why it matters:** The seven-row ledger is the portfolio's proof and the main route from summary to case study. On a phone there is no hover state, so the rows read as a table rather than a set of destinations. A recruiter may never discover that they are clickable.

**Fix:** Add a small chevron or arrow to each row, underline the title on hover/focus, and raise status/header text to 11–12px. On mobile keep the status as a tag or a clearly aligned value and make the chevron persistent. Promote "Open the index" to a 12px link.

**Suggested command:** `$impeccable clarify`

### 5. P3 — The empty-shelf chapter asks for a click that repeats itself

**What:** "The margin" devotes a full chapter to the intentionally empty notes shelf and ends with "Visit the notes index." The /notes page repeats the same "Writing takes longer than building…" copy and the same three planned notes. The CTA is 9px.

**Why it matters:** The honesty is a strength, not a problem; the duplication is the problem. The click yields no new information, and the chapter is the valley immediately before the epilogue. On a long page, a detour that returns the same content weakens the final approach to contact.

**Fix:** Keep the statement and planned list — or keep one and let /notes own the full empty-state. Remove the "Visit the notes index" CTA, or make the destination distinct and useful. Consider shortening the homepage chapter to one statement plus a quiet link so the epilogue arrives sooner. Do not fill the shelf with invented notes.

**Suggested command:** `$impeccable distill`

## Persona Red Flags

**Jordan — first-time recruiter.** Jordan lands on a beautiful cover but sees no project names or links in the first viewport — only project types in the deck. The header Work link is visible on desktop, but the primary button says "Begin reading," and following it leads through the prologue and The question before The work (first story at 3.45 viewports). If he scans the DermoAI plate, the 82.79/87.30 figures dominate and the "not clinically validated" line is 9px. The case-study links are 9px. On mobile, Work and Contact are behind the hamburger. Jordan may leave with an impression of taste but not proof.

**Casey — distracted mobile user.** The mobile page is 12,433px — nearly 15 viewports at 390×844. There is no chapter rail; the labelled contents is after the prologue; the only persistent location cue is a 1px progress hairline. The menu is excellent and 44px-safe, but it is hidden. The ledger rows look static, the stage labels are 8px, and the 320px hero breaks "I build / to / understand." with "to" orphaned. If Casey is interrupted, the page offers no "resume where you were" or visible section marker.

**Sam — accessibility-dependent user.** The focus system is genuinely good: 3px solid #cf5a3c at 4px offset on the skip link, wordmark, nav and CTAs; the skip link works; headings, alt text, semantics and reduced motion are solid. The rail is the failure: inactive labels at 2.6:1, 8px type, 22px-high links, and a fixed position that does not match its last-in-DOM tab order. It marks 05 while Sam is in the epilogue. Story and menu external links also fail to announce "opens in a new tab" even though the footer does.

## Minor Observations

- At 320px the hero sets 51.2px type in a 280px column; the manual `<br>` plus wrapping produces "I build / to / understand." The 390px version is correct. Reduce the 320–360px hero size or keep "to understand." together.
- The contents block is visually present but never receives `.is-in`: Tailwind's `.contents` utility sets `display: contents`, so the wrapper has no box for the IntersectionObserver. Its 64px top margin and top border are also not rendered. Rename the class or force `display: block`; the intended reveal and spacing are lost.
- The ledger's "Year" column contains "Ongoing" (Robotics) and "Forthcoming" (Programming). Those are stages, not years. Rename the column "Year / stage" or use actual years.
- External story links ("Repository", "Live demo") and the menu's GitHub link open new tabs without an sr-only warning; the footer's external links do include one.
- The homepage metrics "4 × 16" (Halcyon) and "Live" (Atlas streaming coach) are opaque without the MDX notes. Use "4 voices" or show the note; use "Live model" rather than a status in a value slot.
- The meta title is "Ishan Asati — Ideas into things." while the visible thesis is "I build to understand." Both are fine lines; together they dilute the brand's central sentence.
- The portrait's grayscale-to-color hover is a pleasant reward but not an action; touch users never see it.
- The mobile menu at 320×568 scrolls 27px to reveal its metadata, and initial focus lands on the wordmark rather than the close button. Neither is a blocker.

## Questions to Consider

1. If a recruiter gives the page 30 seconds, what do they see? Today: a headline, a portrait and a Begin reading button — not the names and stages of the three featured projects. Would you trade some hero silence for a compact selected-work index, or is the slow reveal the point?
2. Is "Begin reading" the primary action for the primary user, or the author's preferred action? What would change if "See the work" were primary and the narrative were the reward?
3. Does the chapter rail earn its place? If it disappeared at 1440, what would actually be lost? If orientation is the answer, what would make it a real navigator rather than an 8px ruler?
4. Does the editorial numbering system clarify or decorate? With nav 01–04, chapters 00–05, stories 02.x, projects 01–07, figures 01–07 and syllabus 01–05, which numbers help a reader and which are texture?
