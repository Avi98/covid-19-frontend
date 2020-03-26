import React, { useEffect, useState } from "react"
import { select, json, geoPath, geoMercator, scaleLinear, min, max } from "d3";
import styled from "styled-components";

import { feature } from "topojson"
import _ from 'lodash'
import { covidArray } from "../types";

interface IMap {

}
interface IResponseData {

}

const useFetchCovid = () => {
    const [data, setData] = useState<covidArray>([]);
    useEffect(() => {
        const getData = async () => {
            fetch('https://covid19.mathdro.id/api/deaths').then((res) => res.json()).then(res => setData(res))

        }
        getData()

    }, [])
    return [...data]

}
const SVG = styled.svg`
    height: 100vh;
    width: 100vw;
    
    fill: #eeeeef;
    stroke: #ffff;
    stroke-opacity: 1.1;
    .sphere{
        fill: #ffff;
    }
`

const mergeData = (d1: any, d2: any) => {

    const data = _(d2).keyBy('properties.name').merge(_.keyBy(d1, 'countryRegion')).values().value()
    return data
}
export const Map: React.FC<IMap> = (props) => {
    const covidData = useFetchCovid()
    useEffect(() => {
        const svg = select('#map-container')
        const projection = geoMercator().translate([750, 450]).scale(200);
        const pathGenerator: any = geoPath().projection(projection);

        

        svg.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({ type: 'Sphere' }))

        if (covidData.length>0) {
            debugger
            const minVal =  covidData && min(covidData,(d,i)=>{
                return d.confirmed
            })
            const maxVal = covidData && max(covidData, (d, i)=>{
                return d.confirmed
            })
            const colorScale = scaleLinear()
            //@ts-ignore
            .domain([minVal, maxVal])
            .range([ "#f1e4e7","#f08080", "#f57b7b", ]);


            json<IResponseData>('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then((data: any) => {
                const countries: any = feature(data, data.objects.countries);
                // merge covidData and countries.features 
                const mergedData = mergeData(covidData, countries.features)
                svg.selectAll('path').data(mergedData)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', pathGenerator)
                    .style('fill', ()=> '#ccc')
                    .style('fill', (d: any, i: any) => {
                        const confirmed = d.confirmed;
                        return confirmed ? colorScale(confirmed): '#ccc'
                    });
            })
        }
    }, [covidData])


    return (
        <SVG id='map-container' />
    )
}
