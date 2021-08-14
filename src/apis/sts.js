import axios from 'axios';

let tmpApi = 'https://sts-project.azurewebsites.net/api/';
let officialAPI = "http://35.72.3.192:8090/api/";

const baseURL = officialAPI;
export default axios.create({
    baseURL: baseURL
});

export const getOfficialAPI = () => officialAPI;