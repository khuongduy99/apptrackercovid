import { React, useEffect, useState } from 'react';
import Content from './components/Content';
import { getCountries, getReportWorldTotalFromDateToDate, getReportByCountry } from './apis';
import Header from './components/Header';
import moment from "moment";
import { sortBy } from 'lodash';

function App() {
  const [countries, setCountries] = useState([]);
  const [report, setReport] = useState([]);
  const [selectCountryId, setSelectCountryId] = useState('');
  const [oldSelectCountryId, setOldSelectCountryId] = useState('');
  const [countryName, setCountryName] = useState('');
  const [oldCountryName, setOldCountryName] = useState('');

  useEffect(() => {
    getCountries().then((res) => {
      var data = res.data;
      data = sortBy(data, 'Country');
      setCountries(data);
    });
  }, []);

  const handleOnChange = (e, v) => {
    setOldSelectCountryId(selectCountryId);
    setOldCountryName(countryName);
    v ? setSelectCountryId(v.ISO2.toLowerCase()) : setSelectCountryId('');
    v ? setCountryName(v.Country) : setCountryName('');
  };

  useEffect(() => {
    if (selectCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        if(res.data.length) {
          res.data.pop();
          setReport(res.data);
        } else {
          alert("Không tìm thấy dữ liệu của quốc gia này!");
          setSelectCountryId(oldSelectCountryId);
          setCountryName(oldCountryName);
        }
      });
    } else {
      var now = new Date().setDate(new Date().getDate() - 1);
      var dateAgo = new Date().setDate(new Date().getDate() - 200);
      getReportWorldTotalFromDateToDate(moment(dateAgo).format('YYYY-MM-DD'), moment(now).format('YYYY-MM-DD')).then((res) => {
        setReport(sortBy(res.data, 'Date'));
      })
    }
  }, [selectCountryId, countries, oldSelectCountryId, oldCountryName]);

  return (
    <>
      <div className="wrapper">
        {/* Github Link */}
        <a href="https://github.com/khuongduy99" className="github-link">
          <svg width={70} height={70} viewBox="0 0 250 250" aria-hidden="true">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="75%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#896def', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#482271', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M 0,0 L115,115 L115,115 L142,142 L250,250 L250,0 Z" fill="url(#grad1)" />
          </svg>
          <i className="mdi mdi-github-circle" />
        </a>
        <div className="page-wrapper">

          <Header />
          <Content
            countries={countries}
            handleOnChange={handleOnChange}
            report={report}
            countryId={selectCountryId}
            countryName={countryName}
          />

        </div> {/* End Page Wrapper */}
      </div> {/* End Wrapper */}
    </>
  );

}

export default App;
