

export const responseToBlob = async (response: Response) => {

   const  b = await response.blob();

    return  b

};
