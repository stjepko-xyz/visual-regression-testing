import { afterEach, expect } from "vitest"
import { page } from "vitest/browser"

afterEach(async ({ task }) => {
  if (task.result?.state === "fail") return

  const root = document.getElementById("storybook-root")
  if (!root) return

  await document.fonts.ready
  await expect
    .element(page.elementLocator(root))
    .toMatchScreenshot(task.meta.storyId ?? task.name)
})
