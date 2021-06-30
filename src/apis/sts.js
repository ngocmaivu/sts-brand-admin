import axios from 'axios';

const baseURL = "https://sts-project.azurewebsites.net/api/";
export default axios.create({
    baseURL: baseURL
});