import { ConfigInfo, ConfigFile } from "@/types/configfile";
import { UpdateKarmaType, getConfigParams } from "@/types/requests";

const baseUrl: string = import.meta.env.VITE_APP_API_URL as string;

export const getConfig = async (id: string): Promise<ConfigInfo> => {
  const response = await fetch(`${baseUrl}/configs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (json?.message) {
    throw Error(json?.message);
  }

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

  const parsed = await response.json();

  if (parsed?.message) {
    throw Error(parsed?.message);
  }

  return parsed as ConfigFile;
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

  const parsed = await response.json();

  if (parsed?.message) {
    throw Error(parsed?.message);
  }

  return parsed.map((p: ConfigInfo) => {
    return {
      configId: p.configId,
      name: p.name,
      description: p.description,
      karma: p.karma,
      downloads: p.downloads,
      features: p.features,
    }
  });
};

export const uploadConfigFile = async (
  name: string,
  description: string,
  config: ConfigFile,
  hidden: boolean,
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
      hidden: hidden,
    }),
  });


  const parsed = await response.json();

  if (parsed?.message) {
    throw Error(parsed?.message);
  }

  return parsed as ConfigInfo;
};

export const updateKarma = async (
  id: string,
  type: UpdateKarmaType
): Promise<Response> => {
  const response = await fetch(
    `${baseUrl}/configs/${id}/vote?` +
      new URLSearchParams({
        vote: type,
      }),
    {
      method: "POST",
    }
  );

  const parsed = await response.json();

  if (parsed?.message) {
    throw Error(parsed?.message);
  }

  return parsed;
};
