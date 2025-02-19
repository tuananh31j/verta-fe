/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

interface InputObject {
    [key: string]: any;
}

export const convertObject = (inputObj: InputObject): InputObject => {
    return _.reduce(
        inputObj,
        (result, value, key) => {
            if (_.isArray(value) && !_.isEmpty(value)) {
                result[key] = value.join(',');
            } else if (_.isNull(value) || _.isUndefined(value)) {
                result[key] = ''; // Thay thế null hoặc undefined bằng chuỗi rỗng
            } else {
                result[key] = value;
            }
            return result;
        },
        {} as InputObject
    );
};
