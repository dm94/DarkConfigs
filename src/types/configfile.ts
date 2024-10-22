export type PluginInfo = {
  DISABLED_FEATURES?: string[];
  ENABLED_FEATURES?:  string[];
}

export interface BotGUI {
  LOCALE?: string;
  CONFIRM_EXIT?: boolean;
  SAVE_GUI_POS?: boolean;
  BUTTON_SIZE?: number;
  ALWAYS_ON_TOP?: boolean;
  MAIN_GUI_WINDOW?: unknown;
  CONFIG_GUI_WINDOW?: unknown;
  CONFIG_LEVEL?: string;
}

export type BotSettings = {
  BOT_GUI?: BotGUI;
  API_CONFIG?: unknown;
  MAP_DISPLAY?: unknown;
  CUSTOM_BACKGROUND?: unknown;
  OTHER?: unknown;
}

export type ConfigFile = {
  AVOIDED?: unknown;
  PREFERRED?: unknown;
  SAFETY?: unknown;
  PLAYER_INFOS?: unknown;
  PLAYER_TAGS?: string[];
  CUSTOM_CONFIGS?: unknown;
  PLUGIN_INFOS?: { 
    [key: string]: PluginInfo 
  };
  GENERAL?: unknown;
  COLLECT?: unknown;
  LOOT?: unknown;
  PET?: unknown;
  GROUP?: unknown;
  MISCELLANEOUS?: unknown;
  BOT_SETTINGS?: BotSettings;
  EXTRA?: unknown;
}

export type ConfigInfo = {
  configId: string;
  name: string;
  description: string;
  karma: number;
  downloads: number;
  features?: string[];
};
