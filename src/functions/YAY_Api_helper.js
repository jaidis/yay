import DeviceInfo from "react-native-device-info";

/**
 * FETCH_INTERNET_DATA_ASYNC
 * @description Busca datos en una URL con async y await devuelve los datos parseados a JSON en teoría cuando estén disponibles
 */
export async function fetchInternetDataAsync(url, json_request) {
  // console.log('fetchInternetData')
  try {
    let data = await fetch(url, json_request);
    let dataJSON = await data.json();
    return dataJSON;
  } catch (fetchInternetData) {
    console.log(fetchInternetData);
  }
}

/**
 * GET_REQUEST_POST_ASYNC
 * @description Devuelve un JSON meditante peticion POST a la API
 */
export async function getRequestPostAsync(dataJSON = {}) {
  try {
    postJSON = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataJSON)
    };
    return postJSON;
  } catch (getRequestPostAsyncERROR) {
    console.log("GET_REQUEST_POST_ASYNC", getRequestPostAsyncERROR);
  }
}
