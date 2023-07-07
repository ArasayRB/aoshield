import * as React from 'react';
import { Pagination } from './pagination';

export const List = ({data,deleteData,showData,updatePagination,page,executing})=>{
        return(
            <div className={executing?"container rounded hidden":"container rounded"}>  
                <table className='table rounded'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data?.map((item)=>{
                                return(
                                <tr key={item.id} id={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className={executing?'btn btn-gray disable mr-5':'btn btn-danger mr-5'} onClick={()=>deleteData(item.id)}> Delete</button>
                                        <button className={executing?'btn btn-gray disable mr-5':'btn btn-success mr-5'} onClick={()=>showData(item.id)}>Update</button>
                                    </td>
                                </tr>);
                            })}
                    </tbody>
                </table>

                <Pagination key='paginate' page={page} updatePagination={updatePagination} executing={executing}/>

            </div>
        );
}