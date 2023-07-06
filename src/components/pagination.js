import * as React from 'react';

export const Pagination = ({updatePagination,page,executing}) => {

    return(
        <nav aria-label="..." className={executing?'d-none':''}>
            <ul className="pagination pagination-lg justify-content-center">
                <li className={(page===1||page==='1')?"page-item disabled":"page-item"}>
                <a className="page-link" onClick={()=>updatePagination(1,5)} tabIndex={(page===1||page==='1')?"-1":""}>1</a>
                </li>
                <li className={(page===2||page==='2')?"page-item disabled":"page-item"}><a className="page-link" onClick={()=>updatePagination(2,5)} tabIndex={(page===2||page==='2')?"-1":""}>2</a></li>
                <li className={(page===3||page==='3')?"page-item disabled":"page-item"}><a className="page-link" onClick={()=>updatePagination(3,5)} tabIndex={(page===3||page==='3')?"-1":""}>3</a></li>
            </ul>
        </nav>
    )
}