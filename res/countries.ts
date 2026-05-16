const supportedRegions =
  (
    Intl as typeof Intl & {
      supportedValuesOf?: (key: "region") => string[];
    }
  ).supportedValuesOf?.("region") ?? [];

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const countries: item[] = supportedRegions
  .map((code) => {
    const label = regionNames.of(code);

    return label
      ? {
          label,
          value: code.toLowerCase(),
        }
      : null;
  })
  .filter((country): country is item => Boolean(country))
  .sort((a, b) => a.label.localeCompare(b.label));

export default countries;
