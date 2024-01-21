import PluginData from "./Data";

const plugsNames = PluginData.map((plug) => plug.name.replace(/ /g, "_").toLowerCase());

export default plugsNames