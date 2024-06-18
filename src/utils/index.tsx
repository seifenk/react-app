import { AppstoreOutlined } from "@ant-design/icons";
import { log } from "console";
// eslint-disable-next-line import/no-webpack-loader-syntax
import myWorker from "worker-loader!@/workers/file.worker.js";
export const formatRoutesToMenu = (routeList: any[], prefix?: string) => {
    const arr: any[] = [];
    routeList.forEach(item => {
        const obj: Record<string, any> = {
            key: item.path.startsWith("/") ? item.path : `${prefix}/${item.path}`,
            label: item.label,
            icon: <AppstoreOutlined />,
        };
        if (item.children) {
            obj.children = formatRoutesToMenu(item.children, item.path.startsWith("/") ? item.path : `${prefix}/${item.path}`);
            arr.push(obj);
        } else {
            arr.push(obj);
        }
    });
    return arr;
};

export const cutFile = (file, chunkSize, threadCount) => {
    return new Promise((resolve, reject) => {
        const result: any[] = [];
        const chunkCount = Math.ceil(file.size / chunkSize);
        if (chunkCount < threadCount) threadCount = chunkCount;
        const workerChunkCount = Math.ceil(chunkCount / threadCount);
        let finishCount = 0;
        for (let i = 0; i < threadCount; i++) {
            const startIndex = i * workerChunkCount;
            let endIndex = startIndex + workerChunkCount;
            if (endIndex > chunkCount) endIndex = chunkCount;
            const worker = new myWorker();
            worker.postMessage({ file, chunkSize, startIndex, endIndex });
            // eslint-disable-next-line no-loop-func
            worker.onmessage = e => {
                for (let j = startIndex; j < endIndex; j++) {
                    result[j] = e.data[j - startIndex];
                }
                finishCount++;
                if (finishCount === threadCount) resolve(result);
                worker.terminate();
            };
            worker.onmessageerror = e => {
                reject(e);
            };
        }
    });
};

export const concurRequest = (urls: any[], maxNum: number = 3) => {
    return new Promise((resolve, reject) => {
        if (urls.length === 0) {
            resolve([]);
            return;
        }
        let index = 0;
        const times = Math.min(urls.length, maxNum);
        const request = async () => {
            if (index === urls.length) {
                resolve("上传成功");
                return;
            }
            const formData = new FormData();
            formData.append("file", urls[index].chunk);
            formData.append("index", urls[index].index);
            formData.append("hash", urls[index].hash);
            index++;
            try {
                // await postUploadChunk(formData);

                request();
            } catch (e) {
                throw new Error("上传失败");
            }
        };
        for (let i = 0; i < times; i++) {
            request();
        }
    });
};

export function singleton<T extends object>(className, tip: string): T {
    let ins: T;
    return new Proxy(className, {
        construct(target, args) {
            if (!ins) {
                ins = new target(...args);
            } else {
                console.warn(tip);
            }
            return ins;
        },
    });
}
