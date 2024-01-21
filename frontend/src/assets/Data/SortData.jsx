import PluginData from "./Data";

const SortData = (query) => {
  if (query === "name") {
    return PluginData.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    const sorted = [...PluginData].sort((a, b) => {
      if (a[query] === b[query]) {
        return a.name.localeCompare(b.name);
      }
      return a[query].localeCompare(b[query]);
    });

    return sorted;
  }
};

export default SortData;
