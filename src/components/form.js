import { useState,useEffect } from 'react';
import {API_ENDPOINT,API_TOKEN,CONFIG} from '../utils/settings';
import { goresCreateData,goresAllData, goresUpdateData ,goresDelData } from '../utils/goresFetchData';
import { List } from "./list";
import { gorestData } from '../utils/gorestData';
import { Spinner } from './spinner';


const url = API_ENDPOINT+'public/v2/users';
const apiData = gorestData(url+'?page=1&per_page=5');

const generateRandomId = () => {
    let id = '333';
    let maxIter = 2;
    let i = 0;
    while (i<maxIter) {
        id+=''+Math.floor(Math.random()*100);
        i++;
    }

    return id;
}    

export const Form = (props=undefined) =>{
    const [user,setUser] = useState({
        id:generateRandomId(),
        username:'',
        email:'',
        gender:'male',
        active:'active'
    });
    const [errorMsg,setErrorMsg] = useState(null);
    const [data,setData] = useState(apiData.read());
    const [searchBy,setSearchBy] = useState('');
    const [isChecked,setIsChecked] = useState((user.active==='active')?true:false);
    const [successMsg,setSuccessMsg] = useState(null);
    const {id,username,email,gender,active} = user;
    
    const [deleted,setDeleted]=useState(null);
    const [added,setAdded]=useState(null);
    const [executing,setExecuting]=useState(null);
    const [countDeleted,setCountDeleted]=useState(0);
    const [countAdded,setCountAdded]=useState(0);
    const [countUpdated,setCountUpdated]=useState(0);
    const [crud,setCrud]=useState('Create');

    const [page,setPage]=useState(1);
    const [per_page,setPerPage]=useState(5);


    const all = async (id=undefined) =>{
        let url = '';
        if(id!==undefined)
            url = API_ENDPOINT+'public/v2/users/'+id;
        else
            url = API_ENDPOINT+'public/v2/users?page='+page+'&per_page='+per_page;
        await goresAllData(url).then((added)=>{
            
        if(added.ok===false){
            let errors=added.json();
            errors.then((error)=>{
                let messgError='';
                if(id!==undefined)
                    messgError+=error['message'];
                else
                    for (let index = 0; index < error.length; index++) {
                        if(index>1)
                            messgError+=error[index]['field']+' '+error[index]['message'];
                        else
                            messgError+=','+error[index]['field']+' '+error[index]['message'];
                        
                    }
                setErrorMsg(''+messgError);
                setSuccessMsg(null);
            })
        }else if(added.ok===true){
            let datas = added.json();
            datas.then((rows)=>{
                setSuccessMsg(null);
                setErrorMsg(null);
                if(id!==undefined)
                setData(data.filter(user=>user.id===rows.id));
                else
                setData(rows);
            })
            setExecuting(null);
        }
        return added;
        });
    }

    
    useEffect(()=>{
    },[data]);

    const updatePagination = (page,per_page) => {
        setExecuting('Executing...'); 
        setPage(page);
        setPerPage(per_page);console.log('page',page,'per_page',per_page)
        all();
    }

    const create = async (props) =>{   
        setErrorMsg(null);
        setSuccessMsg(null);
        setExecuting('Executing...'); 
        let url = API_ENDPOINT+'public/v2/users';
        let headers = CONFIG.headers_post;
        var added = await goresCreateData(url,props,headers).then((response)=>{
            let messgError='';
            if(response.ok===false){
                let error=response.json();
                error.then((error)=>{
                    for (let index = 0; index < error.length; index++) {
                        if(index<1){
                            messgError+=error[index]['field']+' '+error[index]['message'];
                        }else{
                            messgError+=','+error[index]['field']+' '+error[index]['message'];
                        }
                    }
                    setErrorMsg(' '+messgError);
                    setSuccessMsg(null);
                })
                
            }else if(response.ok===true){
                setSuccessMsg('Created succefully');
                setErrorMsg(null);
                resetData();
                let count = countAdded+1;

                setAdded('added');
                setCountAdded(count);
                all();
            }
            setExecuting(null); 
        });
        return added;
    }

    const update = async (props) =>{   
        setErrorMsg(null);
        setSuccessMsg(null);
        setExecuting('Executing...'); 
        let url = API_ENDPOINT+'public/v2/users/'+props.id;
        let headers = CONFIG.headers_post;
        var updated = await goresUpdateData(url,props,headers).then((response)=>{
            let messgError='';
            if(response.ok===false){
                let error=response.json();
                error.then((error)=>{
                    for (let index = 0; index < error.length; index++) {
                        if(index<1){
                            messgError+=error[index]['field']+' '+error[index]['message'];
                        }else{
                            messgError+=','+error[index]['field']+' '+error[index]['message'];
                        }
                    }
                    setErrorMsg(' '+messgError);
                    setSuccessMsg(null);
                })
                
            }else if(response.ok===true){
                setSuccessMsg('Updated succefully');
                setErrorMsg(null);
                resetData();
                let count = countUpdated+1;

                setCountUpdated(count);
                all();
            }
            setExecuting(null); 
            setCrud('Create');
        });
        return updated;
    }

    const deleteData = async (id) =>{
        setErrorMsg(null);
        setDeleted(null);
        setExecuting('Executing...');
        let deleteUrl = url+'/'+id+'?access-token='+API_TOKEN;
        //document.getElementById(id).remove();
        await goresDelData(deleteUrl).then((response)=>{
            if(response.ok===false){
                let error=response.json();
                error.then((error)=>{
                    let messgError='';
                    for (let index = 0; index < error.length; index++) {
                        if(index<1)
                            messgError+=error[index]['message'];
                    }
                    setErrorMsg(' '+messgError);
                })
            }else{
                let count = countDeleted+1;
                all();
                setDeleted('deleted');
                setCountDeleted(count);
            }
            setExecuting(null);
        });
    }

    const showData = (iden) => {
        let idToSplice = data.find(user=>user.id===iden);
        setIsChecked(idToSplice.status==='inactive'?false:true);
        let newUser = {
            id:idToSplice.id,
            username:idToSplice.name,
            email:idToSplice.email,
            gender:idToSplice.gender,
            active:idToSplice.status
        }
        setUser(newUser);
        setCrud('Update');
    }

    const resetData = (user=undefined)=>{
        setUser(
            user!==undefined?user:{
            id:generateRandomId(),
            username:'',
            email:'',
            gender:'male',
            active:'active'
        })
        return true;
    }

    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const values = [id,username,email,gender,active];
        let errorMsg='';
        const allValuesFull = values.every((campo)=>{
            const value = `${campo}`.trim();
            return value!=='' && value!=='0';
        });

        if(allValuesFull){
            let data={
                id:user.id,
                name:user.username,
                email:user.email,
                gender:user.gender,
                status:(isChecked===true)?'active':'inactive'
            }
            
            create(data);
        }else{
            errorMsg='values are missing';
        }
        setErrorMsg(errorMsg);
    }

    const handleOnUpdate = (event) =>{
        event.preventDefault();
        const values = [id,username,email,gender,active];
        let errorMsg='';
        const allValuesFull = values.every((campo)=>{
            const value = `${campo}`.trim();
            return value!=='' && value!=='0';
        });

        if(allValuesFull){
            let data={
                id:user.id,
                name:user.username,
                email:user.email,
                gender:user.gender,
                status:(isChecked===true)?'active':'inactive'
            }
            
            update(data);
        }else{
            errorMsg='values are missing';
        }
        setErrorMsg(errorMsg);
    }

    const handleToogle= () => {
        setIsChecked(!isChecked);
    }

    const handleInputChange = (event) =>{
        setUser({
            ...user,
            [event.target.name]:event.target.value
        });
    }

    const handleSearchChange = (event) =>{
        setSearchBy(event.target.value);
        if(event.target.value==='')
            all()
    }

    return(
        <div className='container mb-3 p-3 bg-white'>
            {errorMsg && <div className='alert alert-dismissible alert-danger fade show' role='alert'>
                <p>Error: {errorMsg}</p>
                </div>}
            {successMsg && <div className='alert alert-dismissible alert-success fade show' role='alert'>
                <p className='text-success'>{successMsg}</p>
                </div>}
            {executing && <div className='text-primary'>
                        <Spinner/>
                        </div>}
            <form  id='create_data' className={executing?"row g-2 m-2 hidden":"row g-2 m-2"} onSubmit={(e)=>{crud==='Create'?handleOnSubmit(e):handleOnUpdate(e)}}>
                    <input type='hidden' value={id}/>
                    <div className='col-md'>
                        <div className='form-floating'>
                            <input 
                            id='username'
                            name='username'
                            className='form-control'
                            value={username}
                            onChange={handleInputChange}
                            />
                            <label>Name</label>
                        </div>
                    </div>

                    <div className='col-md'>
                        <div className='form-floating'>
                        <input 
                        id='email' 
                        placeholder='name@example.com'
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={handleInputChange}
                        />
                        <label>Email</label>
                        </div>
                    </div>

                    
                    <div className='col-md'>
                        <div className='form-floating'>
                        <select 
                        id='gender' 
                        placeholder='Select Gender'
                        name='gender'
                        className='form-select'
                        value={gender}
                        onChange={handleInputChange}
                        >
                            <option value='female'>Female</option>
                            <option value='male'>Male</option>
                        </select>
                        <label>Gender</label>
                        </div>
                    </div>

                    
                    <div className='col-md mt-4'>
                        <div className='form-check form-switch form-floating'>
                        <input
                        type='checkbox' 
                        role='switch'
                        id='active' 
                        placeholder='Select Status'
                        name='active'
                        className='form-check-input'
                        value={active}
                        checked={isChecked}
                        onChange={handleToogle}
                        />
                        <label>Status</label>
                        </div>
                    </div>
                    <button type='submit' className={executing?'btn btn-gray disable':'btn btn-primary'}>
                        {crud}
                    </button>
            </form>
            <div className='input-group p-2'>
                    <input 
                    type='search'
                    placeholder='Search'
                    className='form-control'
                    value={searchBy}
                    onChange={handleSearchChange}
                    aria-label='Search'
                    aria-describedby='search-addon'
                    />
                <button type='button' className='btn btn-outline-primary' onClick={()=>all(searchBy)}>
                    Search
                </button>
            </div>
            {deleted && <span className='text-danger'>Deleted: {countDeleted} </span>}
            {added && <span className='text-primary'>Created: {countAdded} </span>}
            <List 
            data={data} 
            key={user.id} 
            deleteData={deleteData}
            errorMsg={errorMsg}
            page={page}
            deleted={deleted}
            executing={executing}
            showData={showData}
            updatePagination={updatePagination}
            countDeleted={countDeleted}
            />
        </div>
    );
}