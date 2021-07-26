import axios from "axios";
export const getCountries = () => axios.get("https://api.covid19api.com/countries");
export const getReportByCountry = (country) => axios.get(`https://api.covid19api.com/dayone/country/${country}`);
export const getReportWorldTotal = () => axios.get("https://api.covid19api.com/world/total");
export const getReportWorldTotalFromDateToDate = (fromDate, toDate) =>
    axios.get(`https://api.covid19api.com/world?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`);
export const getMapDataByCountryId = (countryId) =>
    import(
        `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
    );

export const getMapWorld = () =>
    import(
        `@highcharts/map-collection/custom/world-palestine-highres.geo.json`
    );
