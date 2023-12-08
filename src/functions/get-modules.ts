import json from "@/jsons/plugins.json";
import type { PluginItem } from "@typec/jsons.ts";


export const getPluginsFromFeatureList = (features: string[] = []): string[] => {
    if (!features || features.length <= 0) {
        return [];
    }

    const plugins: string[] = [];
    let pluginList: PluginItem[]  = json;


    features.forEach(feature => {
        const plugin = pluginList.find((pl) => feature.includes(pl.id));
        if (plugin && !plugins.includes(plugin.plugin)) {
            plugins.push(plugin.plugin);
        }
    });

    return plugins;
}