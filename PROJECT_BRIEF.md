# Padhaispace — Project Brief

**Status:** Founding project charter · Version 1.0  
**Established:** 9 October 2026  
**Repository:** https://github.com/Ninelives21/Padhaispace  
**Design reference:** https://github.com/Ninelives21/Pankusdesk

> **Core promise:** Learn the science. Then master the exam.
>
> Complete, carefully written Physics and Chemistry notes that are free to read, with dedicated exam-wise PYQ video solutions and optional paid PDF editions.

## 1. Mission and audience

Padhaispace is an India-focused educational reference website for students studying Physics and Chemistry, initially serving these seven examination pathways:

1. JEE Main
2. JEE Advanced
3. BITSAT
4. CBSE (Classes XI and XII)
5. NEET UG
6. Intermediate Public Examinations (IPE)
7. EAMCET / EAPCET

**State variants matter:** Andhra Pradesh and Telangana must be independently tracked for IPE and EAPCET, with source years and board/exam authorities recorded. A pathway is not necessarily a single official document.

## 2. Editorial approach and knowledge base

- Begin with the original free Physics and Chemistry lectures by Alakh Pandey as a valuable **research and teaching reference**.
- Produce **original, independently written and academically reviewed** notes, not copied transcripts, diagrams, or proprietary lecture handouts. Free availability of videos does not grant redistribution rights. Link to source lectures and seek permission where close adaptation or reproduction is needed.
- Preserve strong teaching: conceptual intuition, sequence of reasoning, clear derivations, meaningful examples, misconceptions, diagrams, and worked problems.
- Maintain **one canonical Physics library** and **one canonical Chemistry library**.
- Cover the **union** of the relevant syllabi, not merely the topics that overlap. A non-overlapping topic belongs in the appropriate subject library, rather than in a duplicated exam-specific book.
- Use supplementary authoritative sources to fill gaps and review accuracy. Students should encounter coherent, complete chapters rather than stitched-together lecture summaries.
- Keep source/provenance information available to editors without cluttering reading pages.

## 3. Syllabi and coverage

**The first implementation milestone is an internal Syllabus Inventory page.**

- Collect official Physics and Chemistry syllabus documents for all seven pathways.
- Preserve original wording and copies or links to the source documents; record authority, jurisdiction, exam/academic year, revision, date checked, and URL.
- Track separately whether a source is **located**, **downloaded/archived**, **verified**, **extracted**, and **mapped**. Do not conflate these stages or claim verification without checking.
- Keep original syllabus structure intact in source records before mapping to canonical Padhaispace topics.
- Provide syllabus-led browsing or filtering without maintaining seven duplicate versions of the same notes.
- Syllabus changes must be versioned so a previous year is not silently replaced.

## 4. Previous-year questions (PYQs)

- PYQ collections are **independent and exam-specific**. Do not force seven exams into one common question-bank schema.
- The current preferred direction is AI-assisted or AI-generated **YouTube Shorts and longer video explanations**, organised by exam, subject, chapter and topic.
- Padhaispace can index, link to, or embed these videos. Where appropriate, videos link students back to the relevant canonical notes.
- Video quality, mathematical correctness, originality, and copyright/usage rights must be reviewed. YouTube monetisation is subject to eligibility and platform policies; Shorts Feed revenue and embedded regular-video revenue work differently.
- A full on-site interactive question bank is **not part of the initial build**.

## 5. Business model

| Offering | Student access / revenue |
| --- | --- |
| Full online Physics and Chemistry notes | Free to read; no compulsory account |
| Professionally typeset, printable/offline PDF editions | Paid, optional downloads |
| PYQ explanation videos hosted on YouTube | Free to watch; possible creator advertising revenue if eligible |

Paid PDFs should provide genuine convenience: strong typesetting, navigable bookmarks, print layouts, diagram quality, indexes and bundles. Do not store protected paid files in a publicly accessible repository or static web directory. Payment and secure fulfilment can be added later.

No intrusive advertising, forced subscription, or paywall on the online notes is planned at launch.

## 6. Visual design and UX

**Design model: Pankusdesk, calmer and more editorial.**

- Simple, clean, consistent and content-first; avoid the visual noise of coaching-commerce websites.
- Use a near-white/slate base, restrained muted-blue accents, generous whitespace, light borders, minimal shadows, and very few decorative cards.
- Reuse shared design tokens and components; do not hand-style every page independently.
- Prioritise legible long-form notes (generally 16–18 px body text), clear heading hierarchy, concise breadcrumbs, comfortable line lengths, and correctly rendered mathematics and diagrams.
- Keep primary navigation small: **Physics · Chemistry · PYQs · Syllabi**, plus search when available. The internal **Admin** workspace is separate from normal student navigation.
- Use progressive disclosure for *optional* details, not essential explanations. Avoid deep nested menus, unnecessary animations, overwhelming filters and gratuitous dashboard charts.
- Make the site mobile-friendly, keyboard-accessible, and aim for WCAG 2.2 AA accessibility.
- A student should reach the content with as few decisions as possible. The educational material can be detailed; the interface should not be.

## 7. Technology and ownership principles

- Work in the single repo: **Ninelives21/Padhaispace**.
- Prefer Pankusdesk's understandable approach: **HTML, modular CSS, small JavaScript modules, and inspectable JSON/Markdown**. Choose a framework or static-site generator later only if it solves a demonstrated need.
- Keep source material, editorial content, and presentation separate where useful, but **avoid ChemDesk-style opaque pipelines and premature abstraction**.
- Start with the actual site repo rather than a disposable inventory application.
- The admin inventory may initially be a **local or publicly viewable read-only page**. A hidden link or `/admin` path is not authentication; add proper access control before allowing private data or web-based editing.
- Keep changes small, testable, reviewable and easy to understand in VS Code.

## 8. Domains and publishing

- **padhaispace.in** and **padhaispace.com** are owned through Namecheap.
- Proposed: **www.padhaispace.in** as canonical website; **padhaispace.com** redirects there.
- Proposed initial public hosting: GitHub Pages, subject to actual technical needs.
- Do not change Namecheap DNS until local and preview builds are working and the publishing approach is confirmed.
- Public GitHub hosting is not suitable for unpublished paid content or secrets.

## 9. Initial milestones

1. **Approve and document design foundation:** borrow Pankusdesk's palette and conventions; use minimal shared CSS tokens and components.
2. **Create the Syllabus Inventory:** a tidy table of exam pathways, sources, authority/year, Physics/Chemistry coverage and honest verification stages.
3. **Collect and verify the actual syllabi:** source PDFs/links first, detailed structure second, topic mapping third.
4. **Build representative subject chapters:** demonstrate exemplary Physics and Chemistry notes before scaling production.
5. **Pilot PYQ videos:** test a small batch of carefully reviewed videos and their discovery from chapter pages.
6. **Later:** paid downloadable PDF workflow and full public-site launch.

## 10. Principles for future decisions

- **Subject notes are generic; exam syllabi are mappings; PYQs are exam-specific.**
- Prioritise **editorial quality, completeness, clarity, and trust** over feature count.
- Clearly separate **decisions** above from **proposals** (labelled as such), and avoid treating provisional source links, years or statuses as validated facts.
- The repository is the durable source of truth for project decisions. Update this document when major decisions change rather than letting the architecture drift silently.
