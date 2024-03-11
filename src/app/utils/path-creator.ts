import { pathSections } from '../config/router-paths';

export const createPath = (arr: pathSections[], startWithSlash = true): string => {

    return startWithSlash ? '/' + arr.join('/') : arr.join('/');

};
