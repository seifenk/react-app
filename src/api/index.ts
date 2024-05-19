import { service } from "./request";

export function postLogin(data) {
    return service.post("/auth/login", data);
}

export function postAddUser(data) {
    return service.post("/user/add", data);
}

export function postUserPage(data) {
    return service.post("/user/page", data);
}

export function postStuPage(data) {
    return service.post("/student/page", data);
}

export function postAddStu(data) {
    return service.post("/student/add", data);
}

export function postUpdateStu(data) {
    return service.post("/student/update", data);
}

export function setPsw(data) {
    return service.post("/user/setPsw", data);
}

export function setProfile(data) {
    return service.post("/user/setProfile", data);
}

export function getProfile() {
    return service.get("/user/getProfile");
}

export function postUploadChunk(data: FormData) {
    return service.post("/file/chunk", data);
}

export function postMergeChunk(data) {
    return service.post("/file/merge", data);
}
