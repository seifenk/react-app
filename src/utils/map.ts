import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { singleton } from "./index";

class PdMap {
    public map!: Cesium.Viewer;
    public divId: string;
    constructor(divId) {
        this.divId = divId;
        this.init();
    }
    async init() {
        if (!document.getElementById(this.divId)) {
            throw Error("未检测到mapContainer容器，地图初始化失败！");
        }
        window.CESIUM_BASE_URL = "/Cesium";
        Cesium.Ion.defaultAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzVhZTQ3Mi0xYTk3LTRjNzQtODFiYS04ZTgyYWVmYWFkM2YiLCJpZCI6MjEwODIyLCJpYXQiOjE3MTM5Mjc3ODF9.ynUVIFFHbo2jtfYSd7VTobuBXGzU27g6G914YaAr7_I";
        this.map = new Cesium.Viewer("mapContainer", {
            timeline: false,
            animation: false,
            terrain: Cesium.Terrain.fromWorldTerrain({
                requestWaterMask: true,
            }),
        });
        this.map.scene.primitives.add(await Cesium.createOsmBuildingsAsync());
        this.map.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(106.58897191286087, 29.560364659397038, 400),
        });
        console.log("地图示例已创建");
    }
}

const singleMap = singleton<typeof PdMap>(PdMap, "地图在已在单例模式运行，请勿重复创建");

export { singleMap as PdMap };
