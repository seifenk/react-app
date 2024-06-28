import { Progress, Button } from "antd";
import { UploadOutlined, FileFilled, CloseCircleOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { postUploadChunk, postMergeChunk } from "@/api/index";
import { cutFile } from "@/utils/index";

const UploadChunk = ({ chunkSize = 1024 * 1024, threadCount = 4, netCount = 3 }) => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState("normal");
    const [tips, setTips] = useState("等待文件...");
    const file = useRef<File | null>(null); // 使用useState创建状态变量file
    const [fileInfo, setFileInfo] = useState({ name: "", size: "" });

    const inputRef = useRef<HTMLInputElement>(null);
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
                    setTips("切片上传完成，请通知后端合并");
                    return;
                }
                const formData = new FormData();
                formData.append("file", urls[index].chunk);
                formData.append("index", urls[index].index);
                formData.append("hash", urls[index].hash);
                formData.append("name", file.current!.name);
                index++;
                try {
                    await postUploadChunk(formData);
                    setPercent(Math.floor(((index + 1) / urls.length) * 100));
                    setTips("第" + index + "分片上传中..." + `总共(${urls.length})`);
                    request();
                } catch (e) {
                    setTips("上传失败");
                    setStatus("exception");
                    throw new Error("上传失败");
                }
            };
            for (let i = 0; i < times; i++) {
                request();
            }
        });
    };

    const reset = () => {
        file.current = null;
        setPercent(0);
        setFileInfo({ name: "", size: "" });
        setStatus("normal");
        setTips("等待文件...");
    };

    const handleChange = e => {
        reset();
        file.current = e.target.files[0];
        setFileInfo({ name: file.current!.name, size: (file.current!.size / 1024 / 1024).toFixed(1) + "M" });
    };
    const handleUpload = async () => {
        if (file.current === null) return;
        setTips("文件切片中...");
        const arr: any = await cutFile(file.current, chunkSize, threadCount);

        await concurRequest(arr, netCount);
    };
    const merge = async () => {
        if (file.current === null) return;
        const res = await postMergeChunk({ name: file.current!.name });
        setTips("合并成功");
        setStatus("success");
    };
    return (
        <div className="text-[12px]">
            <input ref={inputRef} type="file" name="" id="" onChange={handleChange} style={{ display: "none" }} />
            <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => {
                    inputRef.current?.click();
                }}>
                选择文件
            </Button>
            <Button type="primary" ghost onClick={handleUpload}>
                上传
            </Button>
            <Button type="primary" ghost onClick={merge}>
                合并
            </Button>
            <div className="my-1 text-[#666]">{tips}</div>
            <div className="border-[#d0d0d0] border-2 border-solid flex items-center p-1">
                <div className="left mr-[12px] ">
                    <FileFilled className="text-[16px] text-[#ccc]" />
                </div>
                <div className="center min-w-[200px]">
                    <div className="flex justify-between items-center">
                        <span>{fileInfo.name}</span>
                        <span className="ml-[12px]">{fileInfo.size}</span>
                    </div>

                    <Progress percent={percent} status={status as any} />
                </div>
                <div className="right ml-[12px]">
                    <CloseCircleOutlined className="text-[16px] text-[#ccc]" onClick={reset} />
                </div>
            </div>
        </div>
    );
};

export default UploadChunk;
