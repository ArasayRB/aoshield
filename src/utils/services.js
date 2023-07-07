export const addUser = ((url,props,headers)=>{
    return fetch(
        url,
        {
            method:'POST',
            headers:headers,
            body:JSON.stringify(props)
        }
        );
})

export const updateUser = ((url,props,headers)=>{
    return fetch(
        url,
        {
            method:'PUT',
            headers:headers,
            body:JSON.stringify(props)
        }
        );
})

export const allUser = ((url)=>{
    return fetch(
        url,
        );
})

export const findUser = ((url)=>{
    return fetch(
        url,
        );
})

export const deleteUser = ((url)=>{
    return fetch(
        url,
        {
            method:'DELETE'
        }
        );
})