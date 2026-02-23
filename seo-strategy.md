# BookCreed.com — SEO & Backlink Strategy
*Generated: February 22, 2026*

---

## 1. Current SEO Audit Summary

### ✅ What's Already Good
- **Root layout metadata**: Title template, description, keywords, OG tags, Twitter cards all present
- **WebSite + Organization JSON-LD**: `WebSiteJsonLd` component in root layout with SearchAction
- **Article JSON-LD**: `ArticleJsonLd` on each blog post page
- **Dynamic sitemap**: `sitemap.ts` auto-generates from blog posts and static pages
- **`generateMetadata`**: Used on blog `[slug]` and series `[slug]` pages for dynamic meta
- **31 blog posts**: Strong content base targeting high-value fantasy keywords
- **Some internal linking**: A few blog posts link to `/series`, `/quiz`, `/lore`

### ❌ Issues & Gaps

#### Missing Schema Markup
| Page | Issue |
|------|-------|
| `/lore/*` (world, characters, seven-scars, timeline) | No page-specific structured data (should use `Article` or `WebPage` schema) |
| `/quiz/*` | No `Quiz` or `LearningResource` schema |
| `/leaderboard` | No structured data |
| `/series/[slug]/[bookNumber]` | Should have `Book` schema (`schema.org/Book`) with author, ISBN, publisher, etc. |
| `/free` | No `Product` or `Offer` schema for free book promotions |

#### Missing Meta / SEO Elements
- **No `robots.txt`** in `/public/` — Next.js won't auto-generate one without `app/robots.ts`
- **Lore pages** (`/lore/world`, `/lore/characters`, `/lore/timeline`, `/lore/seven-scars`): Likely missing unique `generateMetadata` — check and add per-page titles/descriptions
- **`/quiz` pages**: Need unique meta descriptions per quiz (not just the hub)
- **`/leaderboard`**: Needs its own metadata export
- **No `BreadcrumbList` schema**: Missing on series > book detail pages and lore sub-pages
- **Author page missing**: No dedicated `/author/eva-noir` page — critical for E-E-A-T signals

#### Content/Technical Gaps
- **No FAQ schema** on blog posts that answer questions (e.g., "Books Like Game of Thrones")
- **No `sameAs` links** in Organization schema (add Amazon author page, Goodreads, social profiles)
- **OG image**: Only one global image (`book1.jpg`) — each blog post and book page should have unique OG images

---

## 2. Internal Linking Opportunities

Most blog posts do NOT link to other pages on the site. This is a major missed opportunity.

### Priority Internal Links to Add

| From (Blog Post) | Link To | Anchor Text Suggestion |
|---|---|---|
| Every blog post mentioning "epic fantasy" | `/series/kingdom-of-valdrath` | "The Kingdom of Valdrath series" |
| Every blog post mentioning "quiz" or "test" | `/quiz` | "Test your knowledge with our fantasy quizzes" |
| `morally-grey-protagonist-fantasy-series` | `/lore/characters` | "Meet the morally complex characters of Valdrath" |
| `worldbuilding-tips-for-fantasy-writers` | `/lore/world` | "See our worldbuilding in action" |
| `fantasy-books-complex-magic-systems` | `/lore/seven-scars` | Already links ✅ |
| `best-epic-fantasy-series-2026` | `/read/book-1` | "Read Chapter 1 free" |
| `self-publishing-epic-fantasy-lessons` | `/blog/self-published-fantasy-books-worth-reading-2026` | Cross-link between related posts |
| `dark-fantasy-books-political-intrigue` | `/blog/political-fantasy-books-like-game-of-thrones` | Cross-link |
| `exiled-prince-trope-fantasy` | `/lore/characters` | "Explore the exiled prince of Valdrath" |
| All "Game of Thrones" comparison posts | Each other | Create a "Related Posts" component |

### Structural Linking Improvements
1. **Add a "Related Posts" section** at the bottom of every blog post (3-4 related articles)
2. **Lore pages should link to relevant blog posts** (e.g., `/lore/world` → worldbuilding blog posts)
3. **Quiz results page** should link to the book being quizzed and the lore pages
4. **Series page** should link to related blog posts about the books
5. **Footer**: Add links to top blog posts (pillar content)

---

## 3. Actionable Technical SEO Fixes

### Priority 1 (Do This Week)
- [ ] Create `app/robots.ts` with standard allow rules and sitemap URL
- [ ] Add `Book` schema to `/series/[slug]/[bookNumber]` pages (title, author, ISBN, publisher, datePublished)
- [ ] Add `BreadcrumbList` schema to book detail and lore sub-pages
- [ ] Create `/author/eva-noir` page with `Person` schema and links to all books
- [ ] Populate `sameAs` in Organization JSON-LD (Amazon, Goodreads, social profiles)

### Priority 2 (This Month)
- [ ] Add unique OG images per blog post (can use a template with dynamic text overlay)
- [ ] Add `FAQPage` schema to question-format blog posts
- [ ] Add `generateMetadata` to all lore pages, quiz pages, and leaderboard
- [ ] Build a "Related Posts" component for blog post pages
- [ ] Add internal links to the 20+ blog posts currently not linking to other site pages

### Priority 3 (Ongoing)
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Core Web Vitals (Next.js should be good, but verify)
- [ ] Add alt text audit for all images across the site

---

## 4. Backlink Strategy — 10 Realistic Targets

### Tier 1: Fantasy Book Directories & Lists (Easiest)
1. **Self-Published Fantasy Blog (SPFBO community)**
   - URL: https://mark---lawrence.blogspot.com/p/spfbo.html and related reviewer blogs
   - Action: Submit "The Kingdom of Valdrath" for SPFBO 12 (annual self-published fantasy competition). Even if not selected, dozens of reviewer blogs pick up entries.
   - Expected: 5-15 backlinks from reviewer blogs

2. **Fantasy Book Review (fantasybookreview.co.uk)**
   - Action: Submit book for free review. They accept indie/self-published titles.
   - Expected: 1 dofollow link from a DA 50+ domain

3. **Goodreads Author Profile & Listopia**
   - Action: Create/claim Eva Noir author profile. Add books to relevant Listopia lists ("Best Self-Published Fantasy," "Books Like Game of Thrones," "Epic Fantasy With Political Intrigue")
   - Expected: Nofollow but high-authority domain (DA 90+), drives referral traffic

4. **The StoryGraph**
   - Action: List all books, encourage readers to add and review
   - Expected: Growing alternative to Goodreads, good for discovery

### Tier 2: Writing & Author Communities
5. **r/Fantasy (Reddit) — Self-Promo Threads**
   - URL: reddit.com/r/Fantasy
   - Action: Participate in monthly self-promotion threads, "What are you reading?" threads, and writer AMAs. The sub allows self-promo in designated threads.
   - Expected: Nofollow links but massive fantasy readership (2M+ members). Also post in r/selfpublish, r/ProgressionFantasy

6. **KBoards / Kboards Writers' Cafe**
   - URL: kboards.com
   - Action: Create author profile, participate in book promotion threads
   - Expected: Dofollow profile link + community visibility

7. **Fantasy-Faction.com**
   - Action: Submit guest post about worldbuilding or the self-publishing journey. They accept community articles.
   - Expected: 1 dofollow link from a niche-relevant DA 40+ site

### Tier 3: Content-Based Link Building
8. **Guest Posts on Writing Blogs**
   - Targets: The Creative Penn (thecreativepenn.com), Kindlepreneur (kindlepreneur.com), Reedsy Blog (blog.reedsy.com)
   - Action: Pitch articles based on existing blog content — "Self-Publishing Epic Fantasy: Lessons Learned" is already written and could be adapted
   - Expected: 1-2 high-DA dofollow links

9. **BookBub Author Profile**
   - URL: bookbub.com
   - Action: Create free author profile, run Featured Deals when eligible
   - Expected: DA 80+ nofollow link, significant discovery traffic, newsletter exposure

10. **Indie Fantasy Book Podcasts**
    - Targets: Worldbuilders Podcast, The Fantasy Inn, Grimdark Magazine podcast, BookTube channels
    - Action: Pitch Eva Noir as a guest to discuss worldbuilding, the quiz/gamification angle (unique hook), or self-publishing journey
    - Expected: Show notes backlinks (usually dofollow), new audience reach

### Bonus: Quick Wins
- **AllAuthor.com**: Free author profile with book listings (dofollow)
- **BookSirens / NetGalley**: ARC distribution platforms that generate reviewer backlinks
- **Wikipedia**: If "Kingdom of Valdrath" gains enough notability, create a stub article (long-term)
- **HARO/Connectively**: Respond to journalist queries about self-publishing, fantasy trends, gamification in reading

---

## 5. Content Gap Analysis — Blog Topics to Target

Based on current content, these high-volume keywords are NOT yet covered:
- "how to get into fantasy books" (beginner guide — links to your series)
- "fantasy book series reading order" (create a resource, link to your own)
- "best fantasy audiobooks 2026" (if audiobook exists or is planned)
- "fantasy map making for authors" (if lore/world page has a map)
- "book club picks fantasy 2026" (position your book for book clubs)

---

## 6. Quick-Start Checklist

Week 1:
- [ ] Create `robots.ts`
- [ ] Add `Book` schema to book detail pages
- [ ] Claim/create Goodreads, BookBub, StoryGraph profiles
- [ ] Add internal links to 5 highest-traffic blog posts

Week 2-3:
- [ ] Submit to 3 book review sites (Fantasy Book Review, SPFBO, BookSirens)
- [ ] Post in r/Fantasy self-promo thread
- [ ] Pitch 1 guest post to a writing blog

Month 2:
- [ ] Build "Related Posts" component
- [ ] Add FAQ schema to question-format posts
- [ ] Pitch podcast appearances
- [ ] Create author page with Person schema

---

*This strategy focuses on realistic, achievable actions. Fantasy/book niches are relationship-driven — consistent community participation matters more than mass outreach.*
