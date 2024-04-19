import { ENVIRONMENTS } from "../constants/environment_constants";

export const getApiStage = () => {
    switch (process.env.NODE_ENV) {
        case ENVIRONMENTS.PROD:
            return 'prod';
        case ENVIRONMENTS.BETA:
            return 'beta';
        case ENVIRONMENTS.UAT:
        default:
            return 'uat';
    }
};

export const getApiBasePrefix = (prefix: 'appClient' | 'worker') => {

    const apiStage = getApiStage();

    return `ims/${prefix}/${apiStage}`

}