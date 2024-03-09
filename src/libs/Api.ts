import axiosConfig from "./AxiosConfig";
const instance = axiosConfig;

export const getRequest = async ({
    API = "",
}) => {
    return new Promise((resolve, reject) => {
        instance
            .get(API)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                resolve(error.response);
            });
    });
};

export const deleteRequest = async ({
    API = "",
}) => {
    return new Promise((resolve, reject) => {
        instance
            .delete(API)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                resolve(error.response);
            });
    });
};

export const postRequest = ({
    API = "",
    data = {}
}) => {
    return new Promise((resolve, reject) => {
        instance
            .post(API, data)
            .then(result => {
                // console.log("result", result);
                resolve(result);
            })
            .catch(error => {
                // console.log("error --", error);
                reject(error.response);
            });
    });
};

export const patchRequest = ({
    API = "",
    DATA = {},
    HEADER = {},
}) => {
    return new Promise((resolve, reject) => {
        instance
            .patch(API, DATA, {
                headers: {
                    ...HEADER
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                resolve(error.response);
            });
    });
};

export const putRequest = ({
    API = "",
    data = {},
}) => {
    return new Promise((resolve, reject) => {
        instance
            .put(API, data, {})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};


export const updateAuthToken = (token = '') => {
    instance.defaults.headers = Object.assign({}, instance.defaults.headers, {
        Authorization: `Bearer ${token}`,
    });
};

export const setContentType = (type = "") => {
    instance.defaults.headers = Object.assign({}, instance.defaults.headers, {
        'Content-Type': type, // Set Content-Type header
    });
}