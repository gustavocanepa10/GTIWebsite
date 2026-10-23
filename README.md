# Pixel Perfect Screenshot Forge

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/61aa9c86-8c1d-41b6-bbf3-57b01b91d626).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The application uses JavaScript and JSX. React components live in `.jsx` files;
utilities and configuration use `.js`. The `@/` alias points to `src/` and is
configured in Vite, Vitest and `jsconfig.json`.

Run `npm run build` for a production build, `npm test` for tests and
`npm run lint` for ESLint. TanStack Start generates `src/routeTree.gen.js`;
the Vite configuration removes the type-only footer emitted by the current
TanStack Start version. Keep this compatibility step when updating the preset.

## Institutional pages

The four active solution pages are defined by `src/routes/solucoes.*.jsx`. Product and
report content lives in `src/data/products.js`; real image references and dimensions
live in `src/data/site.js`. `heroShot` is the replacement point for a future approved
capture with an open conversation. Keep the existing original screenshots intact.

Shared components under `src/components/site/` provide navigation, footer, contact,
screenshots, video placeholders and solution page sections. Report tabs identify
resources without confirmed material, rather than advertising unverified features.

The public contact section and commercial/navigation CTAs open WhatsApp at
`https://wa.me/552122037888` (+55 21 2203-7888), configured in `src/data/site.js`.
The default contact section does not display a demonstrative form.
A future authorized integration can supply `Contact` with an `onSend(values)`
function that resolves `{ success: true }` only after actual acceptance by a service.
Loading, duplicate prevention, failure and success states are already supported.
No contact endpoint or external submission service is configured.

`VideoDemo` accepts an approved MP4/WebM URL, poster and optional Portuguese captions.
Without a source it displays an explicit placeholder. The Home's reusable video
catalog is `src/data/videos.js`. Add approved MP4 files to `public/videos/` and
configure their title, thumbnail and path there. Standard paths are
`/videos/atendimento.mp4`, `/videos/telefonia.mp4`, `/videos/relatorios.mp4` and
`/videos/apresentacao.mp4`; the existing `apresentacaoV2.mp4` is accepted as an
alternative for the overview. The user-confirmed `1021 (2).mp4` is the current
alternative for the reports demonstration. Unidentified recordings are not assigned to modules.
The build manifest enables videos present and nonempty at startup/build time.
If a configured video is missing from that inventory, the card checks its paths
with a HEAD request when the page opens. Only a successful `video/mp4` response
enables playback; an HTML fallback is rejected. Newly added videos therefore work
after reloading the page without a server restart. Rebuild for deployment to include
new local files in the published output. MP4s stay
in `public/`, and players use native controls and `preload="none"`, without autoplay.
Official contact information, the privacy policy, remaining module videos and additional report
captures still require approved materials. No placeholder privacy link is published.

Set `VITE_SITE_URL` only after confirming the public domain; `.env.example` documents
this optional setting. Each route supplies its own title, description, Open Graph
and Twitter metadata. Canonical URLs are omitted when the domain is unconfigured.

For optional browser QA, start Vite on `127.0.0.1:4317` and a separate headless
Chromium profile with remote debugging on port `9223`, then run
`node scripts/qa-browser.mjs`. It checks all five pages at nine viewport widths
and saves screenshots/results in the operating system's temporary directory.
