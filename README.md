# Roamly

Responsive travel discovery landing-page designs and reusable design foundations.

Roamly helps visitors find travel inspiration, compare destinations, and understand approximate trip costs before starting a plan. The current deliverable is a Figma design project with desktop, tablet, and mobile compositions—not a deployed travel application.

## Contents

- [Overview](#overview)
- [Project status](#project-status)
- [Figma project](#figma-project)
- [Experience and content](#experience-and-content)
- [Reusable components](#reusable-components)
- [Design foundations](#design-foundations)
- [Responsive layouts](#responsive-layouts)
- [Working with the designs](#working-with-the-designs)

## Overview

**Product direction:** From travel inspiration to confident trip planning.

**Intended audience:** Leisure travelers comparing Indian and international getaways, particularly people who want early visibility into duration and budget. Prices in INR suggest an India-oriented audience. This is a design assumption, not validated user research.

**Visual direction:** Calm, approachable, image-led travel discovery using warm surfaces, charcoal structure, terracotta accents, rounded cards, and soft elevation.

## Project status

| Area | Current state |
| --- | --- |
| Landing-page design | Desktop, tablet, and mobile compositions present |
| Reusable assets | Local components, text styles, variables, and documented foundations present |
| Product documentation | Product notes and a Guidelines page present |
| Application implementation | No application source implemented in this repository |
| Search, trip planning, budgeting, saved trips, and booking | Product intentions or visible entry points; working application flows are not established |
| Pricing | Illustrative five-day estimates per person; not live booking prices |
| Tests, build, and deployment | Not configured as project workflows |

## Figma project

[Open the Roamly design](https://www.figma.com/design/TPO9e7B2TNXeAXgyCcD0Io)

The design is organized into three pages:

1. **Roamly - Travel Landing Page** — desktop, mobile, and tablet landing-page sections, plus product and feature notes.
2. **Components** — reusable destination cards, search, buttons, footers, and logo themes.
3. **Guidelines** — product principles, color, typography, spacing and layout, shape, and elevation.

The product notes explain the intended audience, discovery experience, pricing context, scope boundaries, and content-handoff issues.

## Experience and content

### Navigation

The interface presents Explore, Trip planner, Budget, Saved, and a "Plan a trip" action. These labels communicate the intended product areas, but do not establish completed routes or implemented functionality.

### Hero and search

The hero introduces the experience with "Your Next Adventure Starts Here" and destination imagery. The search surface includes:

- Destination: "Where to?"
- Dates: "Anytime"
- Guest count: "2 Guests" by default
- Primary discovery action: "Search"

These describe the designed interface, not tested search behavior.

### Popular Destinations

Destination cards represent Jaipur, Manali, Bali, and Kyoto. Cards combine photography, destination name, duration, description, and estimated per-person cost. Some current card content is duplicated placeholder material; see the release checklist below.

### Featured Trips

The documented featured examples are:

| Destination | Duration | Illustrative estimate per person |
| --- | --- | --- |
| Goa, India | 5 days | ₹32,000 |
| Lisbon, Portugal | 5 days | ₹98,000 |
| Varanasi, India | 5 days | ₹18,000 |
| Ladakh, India | 5 days | ₹42,000 |

**Pricing disclaimer:** Estimates are illustrative, not live prices. Keep that explanation close to pricing wherever cards are reused. They are not booking offers, confirmed quotes, or a documented breakdown of included costs.

### Footer

The footer contains a brand statement, Company and Resources link groups, and Privacy and Terms entries. Link labels do not establish that corresponding pages or legal documents exist.

## Reusable components

The Components page contains:

| Asset | Available organization |
| --- | --- |
| Destination card | Destination variants for Jaipur, Bali, Manali, and Kyoto; Default and Hover states |
| Search | A reusable search component |
| Buttons | Primary and secondary button components |
| Footer | Desktop and mobile components |
| Roamly Logo | Light and Dark theme variants |

Variant names indicate available design assets, not verified interactions. Some destination variants currently repeat Jaipur content; verify content as well as variant names when reusing them.

Prefer existing components, local styles, and variables when extending the project rather than introducing visually similar duplicates.

## Design foundations

The Guidelines page is the reference for the documented values below.

### Color

| Primitive | Value | Intended use |
| --- | --- | --- |
| `color/sand` | `#F8F5EF` | Warm page backgrounds |
| `color/charcoal` | `#292A27` | Primary text, dark actions, and footer |
| `color/white` | `#FFFFFF` | Cards, search surfaces, and inverse text |
| `color/terracotta` | `#C4775A` | Short accents, discovery actions, and prices |
| `color/stone` | `#6B6B63` | Secondary text |

Documented semantic aliases:

| Alias | Primitive |
| --- | --- |
| `background/page` | sand |
| `surface/card` | white |
| `text/primary` | charcoal |
| `text/secondary` | stone |
| `text/inverse` | white |
| `action/primary` | charcoal |
| `action/accent` | terracotta |
| `background/footer` | charcoal |

**Accessibility caution:** The guidelines report terracotta on white at approximately 3.5:1, below the 4.5:1 target for normal-size text. Review small accent text and white-on-terracotta actions before release. The hero uses a 30% charcoal overlay; verify text contrast against the actual image rather than relying on the overlay alone.

### Typography

The design uses **Inter**.

| Role | Observed treatment |
| --- | --- |
| Hero heading | Bold; 64 px desktop, 48 px tablet, 36 px mobile; 110% line height |
| Section heading | Bold; 32 px desktop/tablet, 24 px mobile |
| Card title | 20 px, Semi Bold |
| Price | 18 px, Bold |
| Navigation | 15 px, Medium |
| Body | 16, 14, and 12 px styles |
| Labels | 16, 14, and 12 px Semi Bold styles |
| Footer heading | 14 px, Bold |
| Estimate caption | 12 px, Italic |

The 14 px body styles include Auto, 150%, and 160% leading. Consult the local text styles for the correct context rather than applying one line height globally.

### Spacing

Observed spacing variables: `0`, `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, and `80` px, named using the `space/<value>` pattern.

Typical roles include 24 px card padding, 24 px desktop/tablet card gutters, 16 px mobile card gaps, and responsive outer padding detailed below.

### Shape and elevation

| Token | Value | Role |
| --- | --- | --- |
| `radius/0` | 0 px | Full-width sections |
| `radius/4` | 4 px | Duration badges |
| `radius/8` | 8 px | Buttons |
| `radius/12` | 12 px | Search container |
| `radius/16` | 16 px | Destination and trip cards |

| Effect | Documented shadow |
| --- | --- |
| `Elevation/Card` | x 0, y 8, blur 24, spread 0, black at 5% |
| `Elevation/Search` | x 0, y 12, blur 24, spread 0, black at 10% |

## Responsive layouts

These measurements describe the existing artboards. They are **not production CSS breakpoint specifications**.

| Layout | Artboard width | Side padding | Card arrangement |
| --- | --- | --- | --- |
| Desktop | 1440 px | 80 px | Four 302 px cards, 24 px gutters |
| Tablet | 834 px | 32 px | Two 373 px cards, 24 px gutters |
| Mobile | 390 px | 24 px for sections | Single-column 342 px cards, 16 px gaps |

- Desktop section vertical padding is 80 px; tablet section vertical padding is 56 px.
- Mobile navigation uses 20 px side padding.
- Search fields are horizontal on desktop/tablet and vertically stacked on mobile.
- Card content padding remains 24 px.

## Working with the designs

1. Open the Figma project and review all three landing-page layouts.
2. Read the product notes for scope, assumptions, and price disclaimers.
3. Consult Guidelines before adding or restyling surfaces.
4. Reuse assets from Components and use the existing local styles and variables where appropriate.
5. Check destination-specific text, duration, imagery, and price together when changing a card.
6. Review updates across desktop, tablet, and mobile rather than assuming one composition scales automatically.
7. Document any new flows or states explicitly; do not treat navigation labels or component state names as proof that behavior exists.
