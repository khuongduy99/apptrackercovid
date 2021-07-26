import React, { useState, useEffect } from 'react';
import HighchartsReact from "highcharts-react-official";
import HighChart from "highcharts";
import moment from "moment";
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data, countryName) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            type: 'spline'
        },
        title: {
            text: countryName 
        },
        colors: ["#dc3c3c", "#23c835", "#313a32"],
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: null,
            labels: {
                enabled: false
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Số ca nhiễm',
            marker: {
                symbol: 'square'
            },
            data: data.map((item) => item.TotalConfirmed ? item.TotalConfirmed : item.Confirmed)

        }, {
            name: 'Số ca khỏi',
            marker: {
                symbol: 'diamond'
            },
            data: data.map((item) => item.TotalRecovered ? item.TotalRecovered : item.Recovered)
        }, {
            name: 'Số ca tử vong',
            marker: {
                symbol: 'triangle'
            },
            data: data.map((item) => item.TotalDeaths ? item.TotalDeaths : item.Deaths)
        }]
    };
}

const LineChart = ({ data, countryName }) => {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');
    console.log(countryName);
    if(countryName) {
        countryName = "Biểu đồ số liệu Covid quốc gia " + countryName;
    } else {
        countryName = "Biểu đồ số liệu Covid Toàn thế giới";
    }
    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(Math.max(data.length - 30, 1));
                break;
            case '7':
                customData = data.slice(Math.max(data.length - 7, 1));
                break;

            default:
                customData = data;
                break;
        }
        
        setOptions(generateOptions(customData, countryName));
    }, [data, reportType, countryName]);


    return (
        <>
            <div className="card card-mini mb-4">
                <div className="card-body">
                    <ButtonGroup
                        size='small'
                        aria-label='small outlined button group'
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            color={reportType === 'all' ? 'secondary' : ''}
                            onClick={() => setReportType('all')}
                        >
                            Tất cả
                        </Button>
                        <Button
                            color={reportType === '30' ? 'secondary' : ''}
                            onClick={() => setReportType('30')}
                        >
                            30 ngày
                        </Button>
                        <Button
                            color={reportType === '7' ? 'secondary' : ''}
                            onClick={() => setReportType('7')}
                        >
                            7 ngày
                        </Button>
                    </ButtonGroup>
                    <HighchartsReact
                        highcharts={HighChart}
                        options={options}
                    />
                </div>
            </div>

        </>
    )
}

export default React.memo(LineChart);