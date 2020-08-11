const camelCaseToSentenceCase = (string) => {
  let result = string.replace(/([A-Z])/g, " $1");
  let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export default {
  buildFilters() {
    let filterObjects = [];
    const govApiFilters = [
      "newCasesByPublishDate",
      // "cumCasesByPublishDate",
      "newCasesBySpecimenDate",
      // "cumCasesBySpecimenDate",
      // "maleCases",
      // "femaleCases",
      "newAdmissions",
      // "cumAdmissions",
      // "cumAdmissionsByAge",
      // "cumTestsByPublishDate",
      // "newTestsByPublishDate",
      // "covidOccupiedMVBeds",
      // "hospitalCases",
      // "plannedCapacityByPublishDate",
      "newDeathsByPublishDate",
      // "cumDeathsByPublishDate",
      "newDeathsByDeathDate",
      // "cumDeathsByDeathDate",
      // "femaleDeaths",
      // "maleDeaths",
    ];
    govApiFilters.forEach((filter) => {
      // let prettyName = camelCaseToSentenceCase(filter);
      let filterReadable = camelCaseToSentenceCase(filter);
      let words = filterReadable.split(" ");
      let stat = words[1];
      let criterion = words.slice(2).join(" ");
      // let prettyName = filterReadable.replace("New", "");

      let exclusions = [];
      // Exclusions for nations

      // Exclusions for regions
      if (filter.includes("Publish") || filter.includes("Admissions")) {
        exclusions.push("region");
      }
      // Exclusions for utlas
      if (filter.includes("Deaths") || filter.includes("Admissions")) {
        exclusions.push("utla");
      }

      filterObjects.push({
        name: filter,
        stat: stat,
        criterion: criterion,
        // prettyName: prettyName,
        excludeFor: exclusions,
      });
    });

    return filterObjects;
  },
};
