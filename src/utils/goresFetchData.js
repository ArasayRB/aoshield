import { addUser, updateUser,allUser, findUser, deleteUser } from "./services";

export const goresCreateData = async (url,props,headers)=>{
    
    const created = await addUser(url,props,headers)
                    .then((response) => {return response;})
                    .catch((error)=>{return error});
                    return created;
}

export const goresUpdateData = async (url,props,headers)=>{
    
    const created = await updateUser(url,props,headers)
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

export const goresFindData = async (url)=>{
    
    const found = await findUser(url)
                    .then((response) => {return response;})
                    .catch((error)=>{return error});
                    return found;
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