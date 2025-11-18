export type PluginInfo = {
  DISABLED_FEATURES?: string[];
  ENABLED_FEATURES?: string[];
};

export interface BotGUI {
  LOCALE?: string;
  CONFIRM_EXIT?: boolean;
  SAVE_GUI_POS?: boolean;
  BUTTON_SIZE?: number;
  ALWAYS_ON_TOP?: boolean;
  MAIN_GUI_WINDOW?: any;
  CONFIG_GUI_WINDOW?: any;
  CONFIG_LEVEL?: string;
}

export type BotSettings = {
  BOT_GUI?: BotGUI;
  API_CONFIG?: any;
  MAP_DISPLAY?: any;
  CUSTOM_BACKGROUND?: any;
  OTHER?: any;
};

export type ConfigFile = {
  AVOIDED?: any;
  PREFERRED?: any;
  SAFETY?: any;
  PLAYER_INFOS?: any;
  PLAYER_TAGS?: string[];
  CUSTOM_CONFIGS?: any;
  PLUGIN_INFOS?: {
    [key: string]: PluginInfo;
  };
  GENERAL?: any;
  COLLECT?: any;
  LOOT?: any;
  PET?: any;
  GROUP?: any;
  MISCELLANEOUS?: any;
  BOT_SETTINGS?: BotSettings;
  EXTRA?: any;
  UNRESOLVED?: any;
};

export type ConfigInfo = {
  configId: string;
  name: string;
  description: string;
  karma: number;
  downloads: number;
  features?: string[];
  ownerId?: string;
};

export type UserInfo = {
  userId: string;
  discordId: string;
  username: string;
  avatar?: string;
};
