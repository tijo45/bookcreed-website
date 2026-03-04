---
title: "Behind the Scenes: How I Use a SQLite Database to Manage 300+ Characters Across 8 Books"
description: "The intersection of writing and engineering — how Eva Noir built a world database to track characters, bloodlines, combat traditions, and canon rules across The Warrior Prince Saga."
date: 2026-03-04
slug: behind-the-scenes-world-db
author: "Eva Noir"
tags:
  - behind the scenes
  - writing process
  - worldbuilding
  - technology
  - warrior prince saga
---

# Behind the Scenes: How I Use a SQLite Database to Manage 300+ Characters Across 8 Books

I have a confession that will either delight you or horrify you, depending on which side of the writer-engineer divide you live on:

**My world bible is a SQLite database.**

Not a Word document. Not a Notion board. Not a wall covered in index cards and red string (though I respect the aesthetic). It's a relational database — the same technology that powers your bank's transaction system and your phone's contact list — and it's the single most important tool I use to write The Warrior Prince Saga.

Let me tell you why, and how.

## The Problem: Scale

Here's the math of an eight-book series set in a kingdom with five thousand years of history:

- **30+ named characters** with complex relationships, appearances across multiple books, and arcs that evolve over the series
- **17 distinct locations**, from the Capital's Grand Arena to the industrial streets of Greyport to the cold stone of Lucian's western fortress
- **80+ historical events** spanning the kingdom's founding to a full-scale Confederate invasion
- **8 ruling bloodlines** with lineage, mottos, sigils, and political allegiances
- **4 combat traditions** with specific rules, religious significance, and narrative implications
- **A canon rule system** that governs everything from how Challenge Right works to the theological framework of the Church of the Eternal Blade
- **Cross-references everywhere.** Cassian's self-inflicted scar (third of seven) connects to the Seven Farmers Incident (historical event), which connects to King Daveth (character, ruler), which connects to the corrupted Warrior Code (canon rule), which connects to Marcus's discovery of The True Code (event, book 3), which connects to the Reformed Code (event, book 7).

Try managing that in a spreadsheet. I did, for the first two books. It was a nightmare.

The problem isn't tracking individual facts — any tool can do that. The problem is tracking *relationships between facts*. When I write a scene where Cassian confesses at The Quenching, I need to know: what is this ritual? what church is he in? who's the priest? what's the priest's history? what has Cassian done since his last confession? which book established this ritual? does it contradict anything I wrote three books ago?

That's a relational query. And relational queries are what relational databases were built for.

## The Solution: world.db

My world database has twelve tables. Let me walk you through the architecture, because honestly, I think it's cool, and if you're both a writer and a tech person, this might change how you approach series management.

### Characters Table

The heart of everything. Every named character gets a row with:

- **Identity:** name, titles, bloodline, birth year, death year, status
- **Physical description:** enough to keep me consistent across books (Cassian is always 6'2", dark hair, grey eyes, seven specific scars)
- **Personality traits and skills:** so I don't accidentally make a bookish scholar into a combat expert four books later
- **First appearance:** which book they show up in

This sounds basic until you realize I can query it:

```sql
SELECT name, status, titles
FROM characters
WHERE bloodline = 'Stormborn'
ORDER BY birth_year;
```

Instantly, I see every Stormborn character, their current status (alive, dead, exiled), and their titles. When I'm writing Book 7 and need to remember which brothers are still alive and what they're called now, the answer is one query away.

### Character Relationships Table

This is where it gets powerful. Every relationship between characters is a row: Cassian → Father Matthias (mentor/father figure), Cassian → Sera (spouse), Lucian → Daveth (NOT biological son — discovered in Book 6).

When I'm writing a scene between two characters, I can pull up their entire relationship history. When did they meet? How has the relationship changed? Are there secrets between them that the reader knows but the characters don't?

### Character Appearances Table

Tracks which characters appear in which books, their role, which chapters they're in, their significance, and notes on their character arc. This solves the most embarrassing problem in series writing: forgetting who's in what book.

It also prevents a subtler problem: character drift. If Marcus is "the bookish fifth prince who'd rather be in the archives" in Book 1, he'd better not suddenly become an action hero in Book 5 without a clear arc justifying the change. The appearance notes keep me honest.

### Historical Events Table

Eighty-plus events with dates, descriptions, participants, outcomes, and consequences. This is my timeline.

The power here is **consequence tracking**. Every historical event has a "consequences" field. The Seven Farmers Incident's consequence is Cassian's exile. Cassian's exile's consequence is his return when Aldric dies. Aldric's death's consequence is the succession crisis. The succession crisis's consequence is Cassian's Challenge Right against Lucian. And so on, chain after chain, for five thousand years.

When I need to understand *why* something is happening in Book 6, I can trace the causal chain backward through the events table. It's like version control for narrative.

### Combat Traditions Table

Four traditions, each with origin dates, descriptions, practitioners, requirements, and narrative significance:

1. **The Seven's Trial** — face seven opponents shirtless. The central ritual of Valdrath.
2. **Challenge Right** — judicial combat. How Cassian forces Lucian into the open.
3. **The Rite of Scars** — royal coming-of-age. Theo completes his in Book 1.
4. **The Quenching** — confession ritual. Cassian confesses monthly for the seven farmers.

Having these formalized prevents me from accidentally changing the rules. In Book 1, I established that Challenge Right requires a "valid grievance" and willingness to "stake life." If I tried to use it differently in Book 5, the database would catch the inconsistency — or at least, I'd catch it when I checked.

### Canon Rules Table

This is my favorite table, and the one that makes other writers look at me funny. Every rule of the world — theological, legal, cultural, physical — gets a row with category, description, the book that established it, examples, exceptions, and priority.

When I write "In Valdrath, scars are scripture," that's a canon rule. It has implications. If scars are scripture, then deliberately hiding your scars is an act of shame. If deliberately hiding your scars is shameful, then Cassian's twelve years in Greyport — working as a mechanic, covering his body, not fighting — is a form of self-punishment even deeper than exile. He wasn't just hiding from the kingdom. He was hiding his scripture.

That interpretation emerged from querying the canon rules while writing Book 3. I didn't plan it. The database surfaced it.

### The Rest

- **Books table:** status of each book, word counts, themes, synopses, protagonist/antagonist links
- **Rulers table:** every king of Valdrath in order, with reign dates and achievements
- **Wars table:** military conflicts with belligerents, outcomes, and casualties
- **Locations table:** every place in the world, with geography, culture, and strategic importance
- **Religious Institutions table:** the Church of the Eternal Blade and its theology
- **Bloodlines table:** noble houses with mottos, sigils, and histories

## How I Actually Use It Day-to-Day

Here's the practical workflow:

**Before writing a chapter,** I query the characters who appear in it. I pull up their relationships, their recent arc notes, their current status. I check the historical events that are relevant. I review any canon rules that might apply.

**While writing,** I keep the database open in a terminal. If I need to know whether Cassian has been to the Capital since Book 1, I query character appearances. If I need to remember Lord Harston's political position, I query characters. If I'm not sure whether a plot point contradicts something from four books ago, I query canon rules.

**After writing,** I update. New events get added. Character statuses change. Arc notes get appended. Canon rules get created or modified if the chapter established something new.

It takes about fifteen minutes per writing session. It saves hours of rereading previous books to check consistency.

## Why SQLite?

Because it's the simplest possible tool that does the job.

SQLite is a single file. My entire world — five thousand years of history, thirty characters, eighty events — is a single file called `world.db` that I can copy, back up, or move between machines by dragging it to a folder.

No server. No cloud service. No subscription. No internet connection required. I can write on a plane, in a cabin with no Wi-Fi, anywhere — and my world bible is right there in the same directory as my manuscripts.

For writers considering this approach: you don't need to be a software engineer. You need to learn about five SQL commands:

- `SELECT` (read data)
- `INSERT` (add data)
- `UPDATE` (change data)
- `CREATE TABLE` (define structure)
- `WHERE` (filter results)

That's it. You can learn them in an afternoon. The payoff is a world management system that scales from a trilogy to a twenty-book epic without breaking a sweat.

## The Unexpected Benefit: AI-Assisted Writing

Here's something I didn't anticipate when I built the database: it's the perfect interface between my brain and AI writing tools.

When I use AI assistance for brainstorming, outlining, or checking consistency, I can feed the relevant database tables directly into the conversation. The AI gets structured, accurate, comprehensive context — not a messy document I have to explain, but clean data with clear relationships.

"Here are all the Stormborn characters, their statuses, and their relationships. Here are the events of Books 1-5. Here are the canon rules about Challenge Right. Now help me outline a scene where Theo must invoke Challenge Right for the first time as king."

The database doesn't replace creativity. It *amplifies* it by handling the bookkeeping so my brain can focus on the art.

## What I'd Do Differently

If I started over, I'd add a few things:

- **A scenes table** linking chapters to characters, locations, and events
- **A foreshadowing tracker** — what I've planted and where it pays off
- **A reader-knowledge table** tracking what the audience knows vs. what characters know (for managing dramatic irony)

But honestly? The current system works. It's the backbone of an eight-book series with a five-thousand-year timeline, and it fits in a file smaller than a single photograph on your phone.

Sometimes the best tool for writing fantasy isn't magical at all. Sometimes it's a database and a dream.

---

*The Warrior Prince Saga — built on SQLite, written in blood and coffee — starts with [The Exile's Return](https://bookcreed.com/series/warrior-prince-saga/1). Explore the world it tracks at [bookcreed.com/lore](https://bookcreed.com/lore).*
