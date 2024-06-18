import * as echarts from "echarts";
import { useRef, useEffect } from "react";
const EchartsMap = () => {
    const myRef = useRef(null);
    let myChart: echarts.ECharts;

    const resizeObserver = new ResizeObserver(() => {
        console.log(111);

        myChart.resize();
    });
    const options = {
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
        },
        series: [
            {
                name: "USA PopEstimates",
                type: "map",
                roam: true,
                map: "重庆",
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data: [
                    { name: "丰都县", value: 4822023 },
                    { name: "长寿区", value: 731449 },
                ],
            },
        ],
    };

    useEffect(() => {
        (async () => {
            const json = await (await fetch("https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json")).json();
            echarts.registerMap("重庆", json);
            myChart = echarts.init(myRef.current);

            myChart.setOption(options);
            resizeObserver.observe(myRef.current!);

            return () => {
                myChart.dispose();
                resizeObserver.unobserve(myRef.current!);
            };
        })();
    });

    return <div ref={myRef} style={{ height: "100%", width: "100%", flex: 1 }}></div>;
};

export default EchartsMap;
