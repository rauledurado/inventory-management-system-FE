import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'
import config from 'config'

const DoughnutChart = ({ height, color = [] }) => {
    const theme = useTheme()

    const [offices, setOffices] = useState([])
    const [cities, setCities] = useState([])
    const [rawalpindiValue, setRawalpindiValue] = useState(0)
    const [karachiValue, setKarachiValue] = useState(0)
    const [lahoreValue, setLahoreValue] = useState(0)
    useEffect(() => {
        getAllData()
    }, [])
    const getAllData = () => {
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOffices(res.data.data)
                const rawalpindi = res.data.data.filter(
                    (office) =>
                        office.city === 'Islamabad' ||
                        office.city === 'Rawalpindi'
                )
                setRawalpindiValue(rawalpindi.length)
                const karachi = res.data.data.filter(
                    (office) => office.city === 'Karachi'
                )
                setKarachiValue(karachi.length)
                const lahore = res.data.data.filter(
                    (office) => office.city === 'Lahore'
                )
                setLahoreValue(lahore.length)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/office//getOfficesByCities`)
            .then((res) => {
                const filteredCities = res.data
                
                const newArray = filteredCities.map((item) => {
                    return (
                        { value: item.count, name: item._id }
                    )
                })
                setCities(newArray)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
            
    }

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'City Wise Distribution',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: cities,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }


    return (
        <>
            <ReactEcharts
                style={{ height: height }}
                option={{
                    ...option,
                    color: [...color],
                }}
            />

        </>
    )
}

export default DoughnutChart
