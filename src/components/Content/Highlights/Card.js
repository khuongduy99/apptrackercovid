import React, { useState, useEffect } from 'react';
import HighchartsReact from "highcharts-react-official";
import HighChart from "highcharts";
import moment from "moment";
import { makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';
const useStyles = makeStyles({
    wrapper: (props) => {
        return { borderLeft: `6px solid ${props.color}` };
    }
})

const generateOptions = (data, title, color) => {
    const categories = data.map((item) => moment(item.date).format('DD/MM/YYYY'));
    return {
        chart: {
            height: 100,
            type: 'areaspline'
        },
        accessibility: {
            description: null
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        colors: [color],
        xAxis: {
            categories: categories,
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: null,
            labels: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: title,
            data: data.map((item) => item.count)
        }]
    };
}

export default function Card({ title, count, color, dataChart }) {
    const styles = useStyles({ color });
    const [options, setOptions] = useState({});
    useEffect(() => {
        setOptions(generateOptions(dataChart, title, color))
    }, [dataChart, title, color]);
    return (
        <>
            <div className="col-xl-4 col-sm-6">
                <div className={`card card-mini mb-4 ${styles.wrapper}`}>
                    <div className="card-body">
                        <h2 className="mb-1"><CountUp end={count} separator=' ' duration={2} /></h2>
                        <p>{title}</p>
                        <HighchartsReact
                            highcharts={HighChart}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
