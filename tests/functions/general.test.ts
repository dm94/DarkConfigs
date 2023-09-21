import { describe, expect, it } from "vitest";
import { toCamelCase } from "@/functions/general";

describe("Functions -> General", () => {
  it("toCamelCase -> It transfor the text to camelCase", () => {
    const text = toCamelCase("this-is-camel-case");
    expect(text).toBe("thisIsCamelCase");
  });
});
