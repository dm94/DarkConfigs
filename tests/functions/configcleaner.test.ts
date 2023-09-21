import { describe, expect, it } from "vitest";
import { cleanConfig, getEnabledFeatures } from "@/functions/configcleaner";

import configTest from "../assets/config-test.json";

describe("Functions -> Config Cleaner", () => {
  it("cleanConfig -> It should clear correctly the config", () => {
    const config = cleanConfig(configTest);
    expect(config["PLAYER_INFOS"]).toBe(undefined);
  });

  it("cleanConfig -> It should return the enabled features", () => {
    const enableFeatures = getEnabledFeatures(configTest);
    expect(enableFeatures).toHaveLength(5);

    expect(JSON.stringify(enableFeatures)).toBe(
      JSON.stringify([
        "eu.darkbot.popcorn.def.AntiPush",
        "eu.darkbot.popcorn.def.CaptchaPicker",
        "eu.darkbot.popcorn.def.FlashPatcher",
        "eu.darkbot.teyrox.BOXList",
        "com.deeme.tasks.AutoChangeMap",
      ])
    );
  });
});
