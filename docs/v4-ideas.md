# v4 review: what to remove, add, change, enhance

Written 6 Sep 2026, after v3 shipped and the mobile pass landed. Read against the live page, the
research below, and the honest audit of what a first-time visitor still cannot do on this site.

## The one-line diagnosis

The page now proves that Priyam ships. What it still does not do is make the next step easy for
either audience. A business owner cannot see what happens after they email, what it might cost,
or how to reach Priyam the way they reach everyone else (WhatsApp). A hiring manager or French
reviewer cannot download anything, cannot verify the client, and cannot see the code.

Everything below serves those two gaps, then the logo.

## Remove

1. **"Running today" strip** (five grey names under the hero). It repeats the tab labels and
   carries no proof. Cut it. The hero note already says what the chat is.
2. **"One builder, every layer" pill marquee.** Decorative. Fold the stack into one quiet line in
   About ("Zoho, Telegram, Postgres, Next.js, Python, AWS IVS, Supabase") and drop the panel.
3. **The Donna card inside "the client's words".** It is not a client's words. Move Donna to About
   as one sentence with a link to the GitHub repo.
4. **"Love" in the nav.** That is Lemon's word for a wall of tweets; for a person it reads odd.
   Rename the section "Clients" and the nav item "Clients".

## Add

1. **"What happens after you email" (for owners).** A four-step strip under the hero chat:
   a 20-minute call, a written scope you sign, a fixed-price build in milestones, and a monthly
   operations line that covers uptime and API costs. This matches the pricing model in the
   business-os-lab notes (discovery fee, milestone build, operations retainer, outcome-based
   expansion). It answers "what does it cost" without a number, and it removes the biggest
   hesitation an SMB owner has: not knowing what they are signing up for.
2. **WhatsApp click-to-chat.** Indian owners live on WhatsApp; email is a barrier. A second door
   "Message me on WhatsApp" with a prefilled text ("Hi Priyam, I run ... and I want to talk about
   automating ..."). Needs Priyam's number and his consent to publish it.
3. **Book a call.** A Cal.com or Google appointment link, free, labelled "Book a 20-minute call".
   Research on freelance conversion is consistent: a button that names the length and the cost
   ("free") resolves three hesitations in five words.
4. **A 60 to 90 second screen recording** of Palak OS answering on Telegram and a Wolf Eyes order
   landing in Zoho. Real footage beats every screenshot on the page. Priyam records it; the page
   shows a poster frame with a play button (no autoplay, no YouTube chrome).
5. **Downloads for reviewers.** A one-page PDF per case study and a CV PDF (the visa CV already
   exists). French reviewers screen from PDFs; give them the file.
6. **Verifiable client proof.** Tirth's LinkedIn link under his name, and, if he agrees, his photo.
   A quote with a face and a profile link is worth three anonymous ones.
7. **FAQ, five questions, no more.** "Do you work with Zoho or Tally?", "What does it cost?",
   "Who owns the code?", "What if it breaks after launch?", "Do you work remotely and in which
   hours?" Each answer two sentences. Objections handled before the email.
8. **Availability line, dated.** "Taking one new build for Q4 2026" beside the primary button.
   True scarcity, refreshed monthly. Remove the moment it stops being true.
9. **Public code.** Hiring managers in the research say the same thing: if they cannot see code,
   the GitHub is invisible. The client repos are private. Options: publish Donna, or a small
   extracted library (the Zoho sync worker, the two-pass allocator) with the client's consent.
   One public, well-documented repo linked from the Numbers panel changes what a reviewer can do.
10. **A second business.** Palak Optical and the SES/Nemi work exist in the notes. If any of it is
    signed off and nameable, one more logo under "the client's words" answers the "one client"
    worry that PRODUCT.md already flagged.

## Change

1. **Hero qualifier.** Under the headline, one line saying who it is for: "For businesses that run
   on Zoho, Tally or WhatsApp, and for teams that hire people who ship." Two audiences, named.
2. **Primary button copy.** "Let's talk" is fine for hiring; for owners "Book a 20-minute call"
   converts better. Two buttons, two audiences, both in the hero.
3. **Numbers panel source line.** Add the date they were last refreshed and a link to the public
   repo once one exists.
4. **Footer.** "Ahmedabad, India" becomes "Ahmedabad, India · Paris from October 2026" or drops.
   Priyam's call, but a reviewer in Paris reads the Paris line as an asset.
5. **About.** Add what it is like to work with him: languages (English, Hindi, Gujarati), working
   hours, how he communicates (Telegram or WhatsApp, weekly written update). Relatable beats
   impressive here.

## Enhance

1. **Hero chat: let people type.** A fourth chip "Ask about your business" that opens the mailto
   with the message prefilled, so the simulation hands off to the real channel.
2. **Testimonial photos.** Even one face changes the section.
3. **Print stylesheet.** Reviewers print. Plates become flat, marquees become lists, the page
   becomes a clean six-page document.
4. **Privacy-friendly analytics** (GoatCounter, cookieless). Without it Priyam cannot learn
   which tab people open or where they leave. The footer's "no cookies" stays true; "no trackers"
   becomes "no cookies, no ads, one privacy-friendly counter".
5. **Sitemap and robots**, and a short `humans.txt`. Small, free, reviewers notice.

## The logo

The current mark (three bars and a dot) was designed to rhyme with the say-bar's "listening"
glyph. It reads as audio, not as Priyam, which is why it does not feel relatable. Four directions
are rendered in `docs/logo-directions.png`:

- **A. Said, done.** A chat bubble with a tick. The promise on the page, readable in any country.
- **B. The P with a dot.** His initial in the site's serif italic, marigold dot where the message
  lands. Personal, quiet, one voice with the wordmark.
- **C. A signature.** "Priyam" in the serif italic with a marigold underline stroke. Says "a person,
  not an agency". The bubble-tick becomes the favicon.
- **D. You and the system.** Two overlapping circles, the overlap marigold. A story in one sentence,
  but abstract.

Recommendation: **C for the wordmark, A for the favicon and app icon.** A signature is the most
relatable thing a one-person business can put on a page, and the bubble-tick carries the promise
into the browser tab. B is the safe second choice if the signature feels too informal.

## What this needs from Priyam

- Logo direction (A, B, C or D, or a mix).
- WhatsApp number and consent to publish it; a Cal.com or Google booking link.
- A screen recording, or permission for me to script and capture one from the local run.
- Tirth's LinkedIn URL and whether a photo may be used.
- Which repo, if any, can be public.
- Whether Palak Optical or the SES/Nemi work can be named.
- The footer location decision, and the current availability line.

## Sources consulted

- millo.co, "Landing page tactics freelancers can use to turn portfolio visitors into clients"
- resumly.ai, "Freelance portfolio that wins for software engineers in 2026"
- feedcoyote.com, "How to build a freelance portfolio that converts in 2026"
- codeboards.io and hakia.com developer portfolio guides, 2026 (proof of real work, live demos,
  public code, load under two seconds)
