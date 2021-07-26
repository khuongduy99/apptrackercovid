import React from 'react';
import HighLights from './Highlights';
import SummaryChart from './SummaryChart';
import SearchCountry from './SearchCountry';

export default function Content({countries, handleOnChange, countryId, report, countryName}) {
    return (
        <>
        <div className="content-wrapper">
            <div className="content">
                {/* Top Statistics */}
                <SearchCountry countries={countries} handleOnChange={handleOnChange} countryId={countryId}/>
                <HighLights report={report}/>
                <SummaryChart report={report} countryId={countryId} countryName={countryName}/>
            </div> {/* End Content */}
        </div> {/* End Content Wrapper */ }
        </>
    )
}
