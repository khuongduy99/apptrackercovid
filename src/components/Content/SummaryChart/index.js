import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import MapChart from './MapChart';
import { getMapWorld, getMapDataByCountryId } from './../../../apis';


export default function SummaryChart({ report, countryId, countryName }) {
    const [mapData, setMapData] = useState({});
    useEffect(() => {
        
        if (countryId) {
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        } else {
            getMapWorld()
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    return (
        <>
            <div className="row">
                <div className="col-md-7">
                    {/* Sales Graph */}
                    <LineChart data={report} countryName={countryName} />
                </div>
                <div className="col-md-5">
                    <MapChart mapData={mapData} />
                </div>
            </div>
        </>
    )
}


