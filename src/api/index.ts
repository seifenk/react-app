import { service } from "./request";

export function postLogin(data: any) {
    return service.post("/auth/login", data);
}

export function postUserPage(data: any) {
    return service.post("/user/page", data);
}

export function postStuPage(data: any) {
    return service.post("/student/page", data);
}

export function postAddStu(data: any) {
    return service.post("/student/add", data);
}

export function setPsw(data: any) {
    return service.post("/user/setPsw", data);
}

export function setProfile(data: any) {
    return service.post("/user/setProfile", data);
}

export function getProfile() {
    return service.get("/user/getProfile");
}
