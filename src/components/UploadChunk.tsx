import { Progress, Button } from "antd";
import { useState, useRef } from "react";
import { postUploadChunk, postMergeChunk } from "@/api/index";
import { cutFile } from "@/utils/index";

const UploadChunk = ({ chunkSize = 1024 * 1024, threadCount = 4 }) => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState("normal");
    const inputRef = useRef<HTMLInputElement>(null);
    let file: File;
    const concurRequest = (urls: any[], maxNum: number) => {
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
                formData.append("name", file.name);
                index++;
                try {
                    await postUploadChunk(formData);
                    setPercent(Math.floor(((index + 1) / urls.length) * 100));
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
    const handleChange = e => {
        file = e.target.files[0];
        console.log(file);
    };
    const handleUpload = async () => {
        setPercent(0);
        const arr: any = await cutFile(file, chunkSize, threadCount);
        await concurRequest(arr, 3);
        setStatus("success");
    };
    const merge = async () => {
        await postMergeChunk({ name: file.name });
    };
    return (
        <div className="w-[200px]">
            <input ref={inputRef} type="file" name="" id="" onChange={handleChange} />
            <Button
                type="primary"
                onClick={() => {
                    inputRef.current?.click();
                }}>
                选择文件
            </Button>
            <Button type="primary" onClick={handleUpload}>
                上传
            </Button>
            <Button type="primary" onClick={merge}>
                合并
            </Button>
            <Progress percent={percent} status={status as any} />
        </div>
    );
};

export default UploadChunk;
