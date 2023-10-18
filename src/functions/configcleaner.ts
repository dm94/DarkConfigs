import { ConfigFile, PluginInfo } from "@/types/configfile";

export const unnecesaryFeatureInfo = [
  "eu.darkbot.popcorn.def.UserAgentUpdater",
];
export const oldFeatures = [
  "com.deeme.modules.PallladiumHangar",
  "eu.darkbot.drmalito.minicore.MiniTrain",
  "com.deeme.modules.PaladiumModule",
  "eu.darkbot.leanon00.Main.Features.GGSpinner",
  "com.deeme.tasks.Discord",
  "com.botorbit.darkplane.features.chaosalienmodule.ChaosAlienModule",
  "com.botorbit.darkplane.extrasplus.ExtrasPlus",
  "com.deeme.modules.AstralGate",
];

export const oldModules = ["com.deemetool"];
export const blackListModules = ["fernando.qmieasputodemrd"];

export const oldPluginsByName = ["Dmplugin_by_Dm94Dani", "Schifo_by_Fabio"];

export const leakInfoFromFeatues = [
  "com.deeme.tasks.discord.Discord.discordWebHook",
  "com.deeme.tasks.WeeklySchedule.profile1.hangarId",
  "com.deeme.tasks.WeeklySchedule.profile2.hangarId",
  "com.deeme.tasks.WeeklySchedule.profile3.hangarId",
  "com.deeme.tasks.WeeklySchedule.profile4.hangarId",
  "com.deeme.modules.PalladiumHangar.collectHangar",
  "com.deeme.modules.PalladiumHangar.sellHangar",
  "com.deeme.modules.SentinelModule.MASTER_ID",
  "com.deeme.tasks.Ifttt.iftttTriggerName",
  "com.deeme.tasks.Ifttt.iftttApiKey",
  "eu.darkbot.kaiserdj.lac.Launch.CUSTOM_FILE",
  "com.punikekk.modules.follow.FollowModule.FOLLOW_ID",
  "eu.darkbot.ter.dks.tasks.RemoteStats.NGROK_AUTH",
  "eu.darkbot.ter.dks.tasks.RemoteStats.SERVER_FILE",
  "eu.darkbot.leanon00.Main.Features.DiscordTask.discordWebHook",
  "com.pikapika.tasks.nova.Nova.NOVA_INFO",
  "com.pikapika.tasks.nova.Nova.roster",
  "com.pikapika.tasks.nova.Nova.resource",
  "com.pikapika.behaviour.gateSpinShipChanger.GateSpinShipChanger.GATE_HANGER",
  "com.pikapika.behaviour.gateSpinShipChanger.GateSpinShipChanger.SPIN_HANGER",
  "com.pikapika.behaviour.gateSpinShipChanger.GateSpinShipChanger.SPIN_PROFILE.HANGER",
  "com.pikapika.behaviour.gateSpinShipChanger.GateSpinShipChanger.GATE_PROFILE.HANGER"
];

export const unnecesaryInfoFromFeatures = [
  "com.punikekk.tasks.skylab.SkylabBuilder.SKYLAB_INFO",
  "com.pikapika.tasks.dispatch.Dispatch.TIME_STATUS",
  "com.pikapika.tasks.dispatch.Dispatch.DISPATCH_INFO",
  "com.pikapika.tasks.dispatchGate.DispatchGate.DISPATCH_GATE_INFO",
  "com.pikapika.tasks.dispatchGate.DispatchGate.TIME_STATUS",
  "com.pikapika.tasks.gateBonus.GateBonus.GATE_BONUS_INFO",
  "com.pikapika.tasks.nova.Nova.TIME_STATUS",
  "com.pikapika.behaviour.eventConfigChanger.EventConfigChanger.escort.lastCheck",
  "com.pikapika.behaviour.eventConfigChanger.EventConfigChanger.labyrinth.lastCheck",
  "com.pikapika.behaviour.eventConfigChanger.EventConfigChanger.plutus.lastCheck",
  "com.pikapika.behaviour.eventConfigChanger.EventConfigChanger.npc_event.lastCheck",
  "com.pikapika.behaviour.eventConfigChanger.EventConfigChanger.world_boss_event.lastCheck",
];

export const permitFeature = (key: string): boolean => {
  if (oldFeatures.includes(key) || unnecesaryFeatureInfo.includes(key)) {
    return false;
  }

  if (oldModules.find((m) => key.includes(m))) {
    return false;
  }

  if (blackListModules.find((m) => key.includes(m))) {
    return false;
  }

  return true;
};

export const cleanConfig = (config: ConfigFile, language = "en"): ConfigFile => {
  const configCopy = { ...config };

  delete configCopy?.["PLAYER_INFOS"];
  delete configCopy?.["UNRESOLVED"];
  delete configCopy?.["BOT_SETTINGS"]?.["BOT_GUI"]?.["MAIN_GUI_WINDOW"];
  delete configCopy?.["BOT_SETTINGS"]?.["BOT_GUI"]?.["CONFIG_GUI_WINDOW"];
  delete configCopy?.["BOT_SETTINGS"]?.["CUSTOM_BACKGROUND"]?.["IMAGE"];
  
  if (configCopy?.["BOT_SETTINGS"]?.["BOT_GUI"]?.["LOCALE"]) {
    configCopy["BOT_SETTINGS"]["BOT_GUI"]["LOCALE"] = language;
  }

  return cleanDisabledFeatures(configCopy);
};

export const getEnabledFeatures = (config: ConfigFile): string[] => {
  if (!config?.PLUGIN_INFOS || typeof config.PLUGIN_INFOS !== "object") {
    return [];
  }

  const pluginInfo = config.PLUGIN_INFOS;

  const keys = Object.keys(pluginInfo);
  let enableFeatures: string[] = [];

  keys.forEach((key) => {
    if (oldPluginsByName.includes(key)) {
      return;
    }

    const pluginInfoValue: PluginInfo = pluginInfo[key];
    if (
      pluginInfoValue.ENABLED_FEATURES &&
      pluginInfoValue.ENABLED_FEATURES.length > 0
    ) {
      const features = pluginInfoValue.ENABLED_FEATURES.filter((f) =>
        permitFeature(f)
      );
      enableFeatures = enableFeatures.concat(features);
    }
  });

  return enableFeatures;
};

export const cleanDisabledFeatures = (config: ConfigFile): ConfigFile => {
  if (!config?.PLUGIN_INFOS || typeof config.PLUGIN_INFOS !== "object") {
    return config;
  }

  const configCopy = { ...config };

  const pluginInfo = config.PLUGIN_INFOS;
  const pluginInfoCopy: {
    [key: string]: any;
  } = {};

  const keys = Object.keys(pluginInfo);
  let enableFeatures: string[] = [];

  keys.forEach((key) => {
    const pluginInfoValue: PluginInfo = pluginInfo[key];
    if (
      pluginInfoValue.ENABLED_FEATURES &&
      pluginInfoValue.ENABLED_FEATURES.length > 0
    ) {
      const features = pluginInfoValue.ENABLED_FEATURES.filter((f) =>
        permitFeature(f)
      );
      enableFeatures = enableFeatures.concat(features);
      pluginInfoCopy[key] = {
        ENABLED_FEATURES: features,
        DISABLED_FEATURES: pluginInfoValue.DISABLED_FEATURES ?? [],
      };
    }
  });

  configCopy["PLUGIN_INFOS"] = pluginInfoCopy;

  if (!config?.CUSTOM_CONFIGS) {
    return configCopy;
  }

  const customConfigs = config.CUSTOM_CONFIGS;
  const customConfigsKeys = Object.keys(customConfigs);

  const customConfigsCleaned: {
    [key: string]: any;
  } = {};

  customConfigsKeys
    .filter((key) => enableFeatures.includes(key))
    .forEach((key) => {
      customConfigsCleaned[key] = cleanLeakInfoFromFeatures(
        key,
        customConfigs[key]
      );
    });

  configCopy["CUSTOM_CONFIGS"] = customConfigsCleaned;

  return configCopy;
};

export const cleanLeakInfoFromFeatures = (
  featureKey: string,
  feature: any
): any => {
  if (!featureKey || !feature || typeof feature !== "object") {
    return feature;
  }

  const featureCopy: {
    [key: string]: any;
  } = {};

  const keys = Object.keys(feature);

  keys.forEach((key) => {
    const fullKey = `${featureKey}.${key}`;

    if (
      leakInfoFromFeatues.includes(fullKey) ||
      unnecesaryInfoFromFeatures.includes(fullKey)
    ) {
      return;
    }

    if (typeof feature[key] === "object" && !Array.isArray(feature[key])) {
      featureCopy[key] = cleanLeakInfoFromFeatures(fullKey, feature[key]);
      return;
    }

    featureCopy[key] = feature[key];
  });

  return featureCopy;
};
