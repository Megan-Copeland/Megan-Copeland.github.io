# Project Context: Megan-Copeland.github.io

## Overview
Personal academic/professional website for Megan Copeland, a Biology PhD candidate at Texas A&M University (graduating May 2026). Built with a BootstrapMade "Personal" template, heavily modified for scrollable layout.

## Current State (March 2026 — post-revision)
The site has been converted from a single-section-at-a-time layout to a fully scrollable page. All sections are visible in sequence and the nav bar links also work for jumping directly to sections.

### Layout
- **Header/Hero**: Full-viewport intro with name, tagline, and nav. Collapses to a sticky compact bar when user scrolls past it.
- **Spacer div** (`#header-spacer`): Dynamically sized by JS to prevent content jump when header becomes fixed.
- **Sections flow**: About → Research → Experience → Teaching → CV → Contact

### Section Details
- **About**: Bio, headshot, contact details
- **Research**: Stacked-row layout (full-width sections) — Published, Under Review, In Preparation, in that order. Each project listed with title, authors, and description. Published items link to journals. Thyroid Regulation in Teleost Fish (Eales, Copeland, MacKenzie) is listed under Published with a link to *General and Comparative Endocrinology* (ScienceDirect).
- **Experience**: Two-column — Research positions (PhD RA, Forensic Casework, Operation ID) and Scientific Writing & Publishing (JEI Copy Editor, GSA Peer Reviewer, Invited Speaker)
- **Teaching & Mentorship**: Research mentees (6 named students with topics) and TA history
- **CV**: Education, skills (including scientific writing category), awards. Links to Google Doc.
- **Contact**: Location, email, website, social links (GitHub, LinkedIn, Google Scholar, ORCID)

### Key Technical Changes
- CSS: Sections changed from `position: absolute; opacity: 0` to `position: relative; opacity: 1`
- CSS: Added `scroll-behavior: smooth; scroll-padding-top: 100px` to html
- CSS: Header hero reduced from 160vh to 100vh
- JS: Replaced show/hide toggle with scroll listener + spacer for sticky header transition
- JS: Added scroll-spy for active nav highlighting
- Removed unused portfolio-details.html (replaced with redirect)

## Files Modified
- `index.html` — all content changes
- `assets/css/style.css` — scrollable layout CSS
- `assets/js/main.js` — scroll-based navigation JS
- `portfolio-details.html` — replaced with redirect to index.html
- `context.md` — this file

## Remaining / Future Improvements
- Replace Google Doc CV link with a hosted PDF
- Update "Ph.D. Candidate" to "Ph.D." once degree is conferred
- Consider adding Leadership & Outreach section
- ORCID iD: 0009-0005-1397-6867 (placeholder — confirm correct)
