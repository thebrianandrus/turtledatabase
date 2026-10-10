# TurtleDatabase.com

The ultimate archive of turtles and tortoises. This is a static site with plain HTML, CSS and JavaScript. It has no build step, framework or dependencies.

## Structure

```
index.html            Home: hero, realms, featured titan, search
oceans.html           Realm I: sea turtles
rivers.html           Realm II: freshwater turtles
lands.html            Realm III: tortoises & box turtles
ancients.html         Realm IV: fossil turtles
archive.html          Searchable, filterable species index (?q= &realm= &status=)
species.html          Species profile template (species.html?id=leatherback)
titans.html           Size rankings and record holders
conservation.html     Threats, IUCN status guide, how to help
field-notes.html      Articles
submit.html           Sighting report form
about.html, contact.html, newsletter.html, 404.html
assets/css/style.css  All styles
assets/js/species.js  ★ The species database: edit this to add species
assets/js/main.js     Nav, footer, artwork sprite, search, profiles, forms, animation
favicon.svg, robots.txt, sitemap.xml, CNAME
```

## Adding a species

Add an object to `window.SPECIES` in `assets/js/species.js` with a unique `id`, a `realm` (`ocean`, `river`, `land` or `ancient`) and a `status` (IUCN code). The new species appears automatically on the following pages:

- the matching realm page
- the archive
- `species.html?id=your-id`

The stat counts update automatically too.

## Forms

The sighting, contact and newsletter forms show a success message but **don't send anywhere yet**. To make one send, paste an endpoint into its `data-endpoint=""` attribute, for example a [Formspree](https://formspree.io) URL. Submissions are POSTed there as form data.

Also replace the placeholder email `hello@turtledatabase.com` in `contact.html`.

## Hosting

The site works on any static host, such as GitHub Pages, Netlify, Vercel or Cloudflare Pages. For GitHub Pages, the `CNAME` file already points to `www.turtledatabase.com`.

To preview the site locally, run:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Accuracy note

Conservation statuses follow the IUCN Red List at time of writing and do change. Re-check them at iucnredlist.org periodically.
