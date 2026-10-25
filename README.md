# Visual regression testing

Each Storybook story is screenshotted (`#storybook-root` only) with Vitest browser mode + Playwright and compared with the baselines in `tests/visual/__screenshots__/`.

## Running the tests

Baselines are rendered on Linux, in the official Playwright Docker image, so results are identical locally and in GitHub Actions. Docker is required to run or update them:

```bash
npm run test:visual:docker          # compare against the baselines
npm run test:visual:update:docker   # regenerate baselines, then review and commit the PNGs
```

`npm run test:visual` runs the tests on your own OS. It looks for `-darwin` baselines that don't exist, so use it only for quick iteration. It generates the HTML report in `.vitest/` and opens it. Set `CI=1` to skip opening it.

Other scripts:

| Script | What it does |
| --- | --- |
| `test:visual:update` | Regenerate baselines on your own OS |
| `test:visual:show-report` | Serve and open the last report from `.vitest/` |

## Reports and failures

https://github.com/user-attachments/assets/9c063eb0-b5d2-425a-8efe-8cc06a3beea1

In the demo video above you can see that the test detected a missing 'half' button. When a comparison fails, the report shows the baseline, actual and diff images for that story. The images are also written to `.vitest/attachments/`.

In CI (`.github/workflows/visual.yml`) the `.vitest` folder is uploaded as the `visual-report` artifact. To view a downloaded report, unzip it and serve the folder (opening `index.html` directly doesn't work, because browsers block the report's requests on `file://` pages):

```bash
cd path/to/visual-report
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Maintenance

- When bumping `playwright`, update the image tag in `package.json` and in the workflow to the same version.
- Playwright, Vitest and the related packages are pinned to exact versions so the browser build can't drift between runs.

---

# Project setup

React + TypeScript + Vite + shadcn/ui. Stories live next to their components and run in Storybook (`npm run storybook`).

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
