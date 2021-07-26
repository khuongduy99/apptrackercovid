import React from 'react';
import Card from './Card';

export default function HighLights({ report }) {
    const data = report.length > 0 ? report[report.length - 1] : [];
    const summayReport = [];
    var summary = [];
    if (report.length > 0) {
        summayReport.push(report[0]);
        summayReport.push(report[Math.ceil(report.length / 2)]);
        summayReport.push(report[report.length - 1]);
        
        summary = [
            {
                title: "Số ca nhiễm",
                count: data.TotalConfirmed ? data.TotalConfirmed : data.Confirmed,
                color: "#e78181",
                data: [
                    {
                        count: summayReport[0].TotalConfirmed ? summayReport[0].TotalConfirmed : summayReport[0].Confirmed,
                        date: summayReport[0].Date
                    },
                    {
                        count: summayReport[1].TotalConfirmed ? summayReport[1].TotalConfirmed : summayReport[1].Confirmed,
                        date: summayReport[1].Date
                    },
                    {
                        count: summayReport[2].TotalConfirmed ? summayReport[2].TotalConfirmed : summayReport[2].Confirmed,
                        date: summayReport[2].Date
                    }
                ]
            },
            {
                title: "Số ca khỏi",
                count: data.TotalRecovered ? data.TotalRecovered : data.Recovered,
                type: "Recovered",
                color: "#83ce83",
                data: [
                    {
                        count: summayReport[0].TotalRecovered ? summayReport[0].TotalRecovered : summayReport[0].Recovered,
                        date: summayReport[0].Date
                    },
                    {
                        count: summayReport[1].TotalRecovered ? summayReport[1].TotalRecovered : summayReport[1].Recovered,
                        date: summayReport[1].Date
                    },
                    {
                        count: summayReport[2].TotalRecovered ? summayReport[2].TotalRecovered : summayReport[2].Recovered,
                        date: summayReport[2].Date
                    }
                ]
            },
            {
                title: "Số ca tử vong",
                count: data.TotalDeaths ? data.TotalDeaths : data.Deaths,
                type: "Deaths",
                color: "grey",
                data: [
                    {
                        count: summayReport[0].TotalDeaths ? summayReport[0].TotalDeaths : summayReport[0].Deaths,
                        date: summayReport[0].Date
                    },
                    {
                        count: summayReport[1].TotalDeaths ? summayReport[1].TotalDeaths : summayReport[1].Deaths,
                        date: summayReport[1].Date
                    },
                    {
                        count: summayReport[2].TotalDeaths ? summayReport[2].TotalDeaths : summayReport[2].Deaths,
                        date: summayReport[2].Date
                    }
                ]
            }
        ]
    }



    return (
        <>
            <div className="row">
                {
                    summary.map((item, index) => {
                        return (
                            <Card key={index} dataChart={item.data} title={item.title} count={item.count} color={item.color} />
                        )
                    })
                }
            </div>
        </>
    )
}
