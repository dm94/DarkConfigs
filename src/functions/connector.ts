import { ConfigInfo, ConfigFile } from "@/types/configfile";
import { getConfigParams } from "@/types/requests";

const baseUrl: string = import.meta.env.VITE_APP_API_URL as string;

export const getConfig = async (id: string): Promise<ConfigInfo> => {
  const response = await fetch(`${baseUrl}/configs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  return {
    configId: json.configId,
    name: json.name,
    description: json.description,
    karma: json.karma,
    downloads: json.downloads,
    features: json.features,
  } as ConfigInfo;
};

export const getConfigFile = async (id: string): Promise<ConfigFile> => {
  const response = await fetch(`${baseUrl}/configs/${id}/download`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()) as ConfigFile;
};

export const getConfigs = async (
  params?: getConfigParams
): Promise<ConfigInfo[]> => {
  const url = new URL(`${baseUrl}/configs`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key as keyof typeof params]) {
        url.searchParams.append(
          key,
          params[key as keyof typeof params] as string
        );
      }
    });
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()) as ConfigInfo[];
};

export const uploadConfigFile = async (
  name: string,
  description: string,
  config: ConfigFile
): Promise<ConfigInfo> => {
  const response = await fetch(`${baseUrl}/configs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      config: config,
    }),
  });

  return (await response.json()) as ConfigInfo;
};
