import { screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import view from "../../src/views/upload.vue";
import { customRender } from "../custom-render";
import { expect, vi } from "vitest";
import configTest from "../assets/config-test.json";

vi.mock("@functions/connector", () => {
  return {
    uploadConfigFile: vi.fn(),
    getAuthToken: vi.fn().mockReturnValue(null),
  };
});

describe("Views -> Upload", () => {
  it("It should render the upload page", async () => {
    customRender(view);
    const page = screen.getByTestId("upload-page");
    expect(page).toBeInTheDocument();

    const inputTitle = screen.getByTestId("input-title") as HTMLInputElement;
    expect(inputTitle).toBeInTheDocument();
    await userEvent.clear(inputTitle);
    await userEvent.type(inputTitle, "Config name");
    expect(inputTitle.value).toBe("Config name");

    const textareaDescription = screen.getByTestId("textarea-description");
    expect(textareaDescription).toBeInTheDocument();
    await userEvent.clear(textareaDescription);
    await userEvent.type(textareaDescription, "Description");
    expect(textareaDescription.value).toBe("Description");

    const inputFile = screen.getByTestId("input-file");
    expect(inputFile).toBeInTheDocument();

    const listOfFeatures = screen.queryAllByTestId("feauture-config");
    expect(listOfFeatures).toHaveLength(0);

    const file = new File([JSON.stringify(configTest)], "test.json", {
      type: "text/plain",
    });

    await userEvent.upload(inputFile, file);

    const uploadButton = screen.getByTestId("upload-button");
    expect(uploadButton).toBeInTheDocument();
    await userEvent.click(uploadButton);

    await waitFor(() => {
      const listOfFeaturesWithUpload =
        screen.queryAllByTestId("feauture-config");
      expect(listOfFeaturesWithUpload).toHaveLength(5);
    });
  });
});
