//Adapted from Forrest Walker project 7 walkthrough on YouTube
class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }
    static auth() {
        const keys = {
            client_id: "FCX1ZM3ELYTULJY3YTXJFD3BYC1JNSZ4I2OHFCGP1R1GFI0K",
            client_secret: "GFCGLWMF1N0H2VLQ3CFWOULAW1ZWY5YOY2SJKFJPYE3X4GCS",
            v: "20181001" 
        };
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join("&");
    }
    static urlBuilder(urlParams){
        if(!urlParams){
            return "";
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    static simpleFetch(endPoint, method, urlParams) {
        let dataRequest = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlParams
            )}`,
            dataRequest
            )
        .then(res => res.json())
    }
}
export default class FourSquareAPI{
    static search(urlParams){
        return Helper.simpleFetch("/venues/search", "GET", urlParams);
    }
    static getDetailVenues(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getPhotosVenues(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}