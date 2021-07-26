import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
//import { Button, ButtonGroup } from '@material-ui/core';
// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
    chart: {

    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '	#7A0826'],
        ],
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {
            name: 'Dân số',
            joinBy: ['hc-key', 'key'],
        },
    ],
};

const MapChart = ({ mapData }) => {
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            //console.log({ mapData });
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }));

            setOptions(() => ({
                ...initOptions,
                title: {
                    text: mapData.title,
                },
                series: [
                    { ...initOptions.series[0], mapData: mapData, data: fakeData },
                ],
            }));

            if (!mapLoaded) setMapLoaded(true);
        }
    }, [mapData, mapLoaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [options, mapData]);

    if (!mapLoaded) return null;

    return (
        <>
            <div className="card card-mini mb-4">
                <div className="card-body">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={cloneDeep(options)}
                        constructorType={'mapChart'}
                        ref={chartRef}
                    />
                </div>
            </div>
        </>

    );
};

MapChart.defaultProps = {
    mapData: {},
};

export default React.memo(MapChart);
