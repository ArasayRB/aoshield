import { addUser,allUser, deleteUser } from "./services";

export const goresCreateData = async (url,props,headers)=>{
    
    const created = await addUser(url,props,headers)
                    .then((response) => {return response;})
                    .catch((error)=>{return error});
                    return created;
}

export const goresAllData = async (url)=>{
    
    const all = await allUser(url)
                    .then((response) => {return response;})
                    .catch((error)=>{return error});
                    return all;
}

export const goresDelData = async (url)=>{
    try {
    
        const deleted = await deleteUser(url)
                        .then((response) => {return response;})
                        .catch((error)=>{return error});
                        return deleted;
    } catch (error) {
        console.log(error);
    }
}