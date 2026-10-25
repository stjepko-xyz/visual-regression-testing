# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

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

## Visual tests

Each Storybook story is screenshotted (`#storybook-root` only) with Vitest browser mode + Playwright and compared with the baselines in `tests/visual/__screenshots__/`.

Baselines are rendered on Linux, in the official Playwright Docker image, so results are identical locally and in GitHub Actions. Docker is required to run or update them:

```bash
npm run test:visual:docker          # compare against the baselines
npm run test:visual:update:docker   # regenerate baselines, then review and commit the PNGs
```

`npm run test:visual` runs the tests on your own OS. It looks for `-darwin` baselines that don't exist, so use it only for quick iteration.

In CI (`.github/workflows/visual.yml`) the `.vitest` folder is uploaded as the `visual-report` artifact. Download it and run `npx vite preview --outDir .vitest` to see the report, including diff images for failures.

When bumping `playwright`, update the image tag in `package.json` and the workflow to the same version.
