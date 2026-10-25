import type { Preview } from "@storybook/react-vite"

import "../src/index.css"

const preview: Preview = {
  beforeEach: ({ canvasElement, parameters }) => {
    canvasElement.id = "storybook-root"

    // Shrink-wrap the root so screenshots capture only the component, unless
    // the story explicitly needs the full width.
    if (parameters.layout !== "padded" && parameters.layout !== "fullscreen") {
      canvasElement.style.width = "fit-content"
    }

    // The Storybook UI reuses the same root between stories, so don't let the
    // width leak into the next one.
    return () => {
      canvasElement.style.width = ""
    }
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
