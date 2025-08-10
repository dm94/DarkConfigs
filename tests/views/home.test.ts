import { screen, waitFor, fireEvent } from "@testing-library/vue";
import view from "../../src/views/home.vue";
import { customRender } from "../custom-render";
import { expect, vi } from "vitest";

const baseConfig = {
  configId: "65033ac2538fafee5bad75dd",
  name: "Cajeo y cofres",
  description: "Cajeo y cofres",
  karma: 0,
  downloads: 0,
  features: [
    "eu.darkbot.popcorn.def.AntiPush",
    "eu.darkbot.popcorn.def.CaptchaPicker",
    "eu.darkbot.popcorn.def.FlashPatcher",
    "eu.darkbot.teyrox.BOXList",
    "com.deeme.tasks.AutoChangeMap",
  ],
};

const NUMBER_OF_CONFIGS = 12;

vi.mock("@functions/connector", () => {
  return {
    getConfigs: vi.fn(() => Array(NUMBER_OF_CONFIGS).fill(baseConfig)),
  };
});

describe("Views -> Home", () => {
  it("It should render the config list", async () => {
    customRender(view);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    await waitFor(() => {
      const listOfConfings = screen.queryAllByTestId("config-card");
      expect(listOfConfings).toHaveLength(NUMBER_OF_CONFIGS);
    });

    const loadMoreButton = screen.getByTestId("load-more-button");
    expect(loadMoreButton).toBeInTheDocument();
    await fireEvent.click(loadMoreButton);

    const inputSearch = screen.getByTestId("input-search");
    expect(inputSearch).toBeInTheDocument();

    const inputButton = screen.getByTestId("input-button");
    expect(inputButton).toBeInTheDocument();
    await fireEvent.click(inputButton);
  });
});
