import React, { useEffect, useState } from "react"
import { select, json, geoPath, geoMercator, } from "d3";
import styled from "styled-components";

import { feature } from "topojson"


interface IMap {

}
interface IResponseData {

}

const useFetchCovid = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const getData = async () => {
            fetch('https://covid19.mathdro.id/api/deaths').then((res) => res.json()).then(res => setData(res))

        }
        getData()

    }, [])
    return data

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
export const Map: React.FC<IMap> = (props) => {
    const data = useFetchCovid()
    useEffect(() => {
        const svg = select('#map-container')
        const projection = geoMercator().translate([750, 450]).scale(200);
        const pathGenerator: any = geoPath().projection(projection);

        svg.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({ type: 'Sphere' }))

        json<IResponseData>('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
            .then((data: any) => {
                const countries: any = feature(data, data.objects.countries);
                svg.selectAll('path').data(countries.features)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', pathGenerator);
            })
    }, [])


    return (
        <SVG id='map-container' />
    )
}
