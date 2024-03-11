export const getValueByPath = (obj: Record<string, any>, path: string) => {

    const pathArr = path.split('>');

    return pathArr.reduce((acc, key) => {

        if (Object.prototype.hasOwnProperty.call(acc, key)) {

            return acc[ key ];

        } else {

            return undefined;

        }

    }, obj);

};
