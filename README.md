# MAX FAX Dental & Cosmetic Clinic — website

Seven pages, no build step, no framework. Static HTML, CSS and JavaScript.

**Pages:** Home · Prices · Articles · Article (FUE vs DHI) · Contact · Thank-you · 404

---

## 1. Change these before you publish

Open each `.html` file and search for **`EDIT:`** — every editable spot is marked.
The critical ones:

### Everywhere (do these first)

| Find | Replace with | Where |
|---|---|---|
| `https://maxfaxclinic.netlify.app` | your real URL, once Netlify gives you one | all pages, `sitemap.xml`, `robots.txt` |
| `href="#"` on Facebook / Instagram / TikTok / YouTube | your real profile URLs | footer of every page, plus contact page |

Your phone, WhatsApp, email and address are **already filled in correctly** — you don't need to touch them.

### Page by page

**`index.html`**
- Headline and the paragraph under it
- The three figures in the hero (`2,000+` grafts, `12 mo` follow-up, `Fixed` pricing)
- **Instruments section** — confirm each instrument is genuinely what you use, and correct the "Origin" line under each. I've written *China* as you asked, but check the gauges and blade types match your actual tray. Don't list an instrument you don't own.
- Founder biography and the four credential lines (BDS, training, PMDC number)
- The three patient reviews
- Result gallery captions

**`prices.html`** — **every single price is invented.** Search for `PKR` and replace all of them. Delete any row for a treatment you don't offer.

**`contact.html`** — add the floor and office number to the address once you have it.

**`fue-vs-dhi.html`** — this is a real article you can publish as-is, but read it and change anything that doesn't match how you work.

> **Careful with promises.** The placeholder copy claims free consultations, fixed pricing that never changes, included follow-ups at months 1/6/12, and free corrective work within a year. Delete anything you don't actually do. In medical advertising those are commitments, not slogans.

---

## 2. Where your photos and video go

Every slot has a labelled placeholder in it already, so the site looks finished right now.
**Keep the filenames exactly as they are** and overwrite the files — no code changes needed.

### Photos → `assets/images/`

| Filename | What it is | Size | Shape |
|---|---|---|---|
| `founder.jpg` | **Asim Shahzad's portrait** | 1000 × 1250 | Portrait, face in top third |
| `hero-before.jpg` | Left of the homepage slider | 900 × 1100 | Portrait |
| `hero-after.jpg` | Right of the homepage slider | 900 × 1100 | Same crop, same light |
| `result-1.jpg` … `result-8.jpg` | Results gallery | 900 × 900 | Square |
| `article-1.jpg` … `article-6.jpg` | Article thumbnails | 1200 × 800 | Landscape 3:2 |
| `clinic.jpg`, `theatre.jpg` | Reception / procedure room | 1400 × 1050 | Landscape |
| `video-poster.jpg` | First frame of your video | 1600 × 900 | 16:9 |
| `og-image.jpg` | What shows when the link is shared on WhatsApp or Facebook | 1200 × 630 | 16:9 |

The before/after slider only convinces if both photos are shot from the same spot, same height, same light. That single detail does more for conversions than anything else on the page.

**Get written consent** from every patient before publishing their photo. Keep the forms.

### Video → `assets/videos/`

| Filename | Notes |
|---|---|
| `transition.mp4` | **Your transition video.** Under 8 MB, under 20 seconds, 1280×720 or 1920×1080 |
| `transition.webm` | Optional, smaller. If you make one, see the commented line in `index.html` next to `data-src` |

There's a placeholder `transition.mp4` in there now — delete it and drop yours in.
It plays **muted and looping**, so audio is pointless; phones won't play sound on autoplay anyway.

**Moving the video elsewhere:** in `index.html`, find `>>> YOUR TRANSITION VIDEO GOES HERE <<<`. That whole `<section class="videoband">` is self-contained — cut and paste it anywhere on the page.

**Compressing:** if your file is much over 8 MB, run it through <https://www.freeconvert.com/video-compressor> first. A 40 MB video will make the site feel slow on mobile data no matter how good the code is.

---

## 3. How the site handles images and video

You asked for this to be handled well. Here's what's actually happening:

**Images**
- Every photo sits in a box with a **shimmer placeholder** that fades into the real image once it has decoded. No blank gaps, no half-painted photos.
- Width and height are set on every `<img>`, so **nothing jumps around** as the page loads — this is a direct Google ranking factor (Cumulative Layout Shift).
- Anything below the fold is **lazy-loaded**: it doesn't download until you scroll near it.
- Anything in the first screenful is marked high priority so it loads first.
- This all works with **whatever image you drop in** — there's nothing to configure per photo.

**Video**
- **Nothing downloads until you scroll near it.** The poster image shows in the meantime.
- It **plays only while on screen** and pauses when you scroll past or switch tabs — so it never eats battery or data in the background.
- On a **slow connection or with Data Saver on**, the video never downloads at all. The poster stays. This matters a lot for mobile users in Pakistan.
- If someone has reduced-motion enabled in their OS, the video stays still.

**The map** on the contact page is heavy, so it also only loads once you scroll near it.

**Caching** is set in `netlify.toml`: images and video cache for a year, HTML always revalidates. So repeat visitors load the site almost instantly, but your text edits go live immediately.

---

## 4. SEO — what's already done and what you must do

### Already built in

- Unique `<title>` and meta description on every page, written around the terms people actually search ("hair transplant Islamabad", "hair transplant cost Pakistan")
- Canonical URLs, Open Graph and Twitter cards, so links look right when shared on WhatsApp
- **Structured data (JSON-LD)** — this is the important one:
  - `MedicalClinic` on the homepage with your address, phone, hours, services and geo coordinates. This is what feeds Google's business panel and map results.
  - `FAQPage` on the homepage — your FAQ answers can appear directly in search results
  - `Article` + `BreadcrumbList` on the article page
  - `ContactPage` on contact
- `sitemap.xml` and `robots.txt`
- Semantic headings — exactly one `<h1>` per page, in a sensible order
- Alt text on every image
- Clean URLs (`/prices` works as well as `/prices.html`)

### What you must do yourself

1. **Google Business Profile.** Claim it at <https://business.google.com>. For a local clinic this outranks everything on this list combined. Add photos, hours and your website URL.
2. **Google Search Console.** Add the site at <https://search.google.com/search-console>, verify it, and submit `sitemap.xml`. Do this the day you go live.
3. **Fix the coordinates.** The homepage JSON-LD has approximate Islamabad coordinates. Get your exact ones from Google Maps (right-click your clinic → the numbers at the top) and replace `"latitude": 33.7077, "longitude": 73.0563` in `index.html` and `contact.html`.
4. **Write articles.** Six placeholder cards currently all link to the one real article. Each new article you publish is another way people find you. See section 6.
5. **Get reviews on Google.** Ask every happy patient. Nothing else moves local rankings as fast.

---

## 5. Deploying to Netlify

### Drag and drop — 2 minutes

1. Put your real photos and video in first.
2. Select **everything inside** the project folder — `index.html`, `prices.html`, `articles.html`, `fue-vs-dhi.html`, `contact.html`, `thanks.html`, `404.html`, `css`, `js`, `assets`, `netlify.toml`, `robots.txt`, `sitemap.xml` — and zip it.
   ⚠️ Zip the **contents**, not the folder. If your zip opens into a single folder that then contains `index.html`, Netlify serves a 404.
3. Go to <https://app.netlify.com/drop>
4. Drag the zip on. About 30 seconds.
5. To update later: **Site → Deploys → drag a new zip** onto the deploy area.

### GitHub — better long term

1. New repository at <https://github.com/new>
2. Upload the files (GitHub's web uploader works fine)
3. Netlify: **Add new site → Import an existing project → GitHub → pick the repo**
4. Build command: **leave empty**. Publish directory: **`.`**
5. Deploy. Every future push redeploys automatically.

### Rename the site

**Site configuration → Site details → Change site name** → `maxfax-clinic` gives you `maxfax-clinic.netlify.app`.

### Custom domain

**Domain management → Add a domain you already own.** Netlify shows the two DNS records to add at your registrar. HTTPS is free and automatic, usually within an hour.

Once you have the final URL, do the find-and-replace from section 1 and redeploy.

---

## 6. The booking form

Uses **Netlify Forms** — already wired up, no backend needed.

- Submissions appear under **Site → Forms → booking** in your Netlify dashboard
- **Get emailed on every booking:** Forms → Settings and usage → Form notifications → Add notification → Email notification → enter `dramnausman@gmail.com`
- Spam trap is already in place
- The form captures: name, phone, email, city, treatment, preferred time, message, and **whether they want to come in or do a video call**
- After submitting, people land on `thanks.html`, which pushes them straight to WhatsApp to send photos

**This only works once deployed to Netlify.** Opening the file on your own computer, the form looks fine but submits nowhere. That's expected.

---

## 7. Adding a new article

1. Duplicate `fue-vs-dhi.html`, rename it with hyphens: `hair-transplant-aftercare.html`
2. Change the `<title>`, meta description, canonical URL, dates, headline and body
3. Update the two JSON-LD blocks at the top (headline, image, dates, URL)
4. On `articles.html`, copy one `<a class="artcard">` block and point it at the new file
5. Add the new URL to `sitemap.xml`
6. Redeploy

---

## 8. File map

```
index.html          homepage (hair transplant focused)
prices.html         all four price lists
articles.html       article index
fue-vs-dhi.html     full article + template for new ones
contact.html        map, hours, booking form, online consultations
thanks.html         after form submission
404.html            wrong address
netlify.toml        caching, security headers, clean URLs
robots.txt          search engine instructions
sitemap.xml         list of pages for Google
css/styles.css      all styling — colours are the variables at the top
js/main.js          menu, image loading, video control, slider, map loading
assets/favicon.svg  tab icon
assets/images/      all photos
assets/videos/      the transition video
```

To change the colour scheme, edit the hex values at the top of `css/styles.css`
(`--jade`, `--gold`, `--porcelain`, `--ink`). Every page picks them up.
