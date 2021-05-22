import React, { useState } from 'react';
import { useHistory } from 'react-router';

const ApiAction = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const history = useHistory();

    // handle input data change
    const handleChangeInput = (e) => {
        const inputValue = e.target.value;
        const newInputValue = inputValue.includes(' ') ? inputValue.replace(' ', '') : inputValue.replace(',', '');
        const newInputValueNum = /\d/.test(newInputValue);
        if((e.keyCode === 188 || e.keyCode === 32 || e.keyCode === 13) && newInputValue.length > 0 && newInputValueNum){
            const newData = [...data];
            newData.push(newInputValue);
            setData(newData);
            document.getElementById('dataValue').value = '';
        }
    }

    
    // close data item from list
    const dataListClose = (index) => {
        const newDataList = [...data];
        const removeDataList = newDataList.filter((item, itemIndex) => itemIndex !== index);
        setData(removeDataList);
    }

    // handle search input
    const handleSearchInput = (e) => {
        const searchValue = e.target.value;
        const newSearchValue = searchValue.includes(' ') ? searchValue.replace(' ', '') : searchValue.replace(',', '');
        if((e.keyCode === 188 || e.keyCode === 32 || e.keyCode === 13) && newSearchValue.length > 0 ){
            const dataList = [...data];
            const findData = dataList.includes(newSearchValue);
            findData ? setSearch(1) : setSearch(0);
            document.getElementById('searchValue').value = newSearchValue;
        }
    }

    // handle form submit
    const handleFormSubmit = () => {
        if(data.length > 0){
            const newSortData = data.sort((a, b) => b-a);
            const getToken = JSON.parse(localStorage.getItem('site_fdkj_hjfdhfj'));
            const token = getToken.token;
            setLoading(true);
            fetch('http://localhost:5000/list', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Token': token
                },
                body: JSON.stringify(newSortData)
            })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if(data.status === 'Auth_Harmful'){
                    localStorage.removeItem('site_fdkj_hjfdhfj');
                    history.push('/signin');
                }else if(data.status === 'success'){
                    setStatus(data.status);
                    setData([]);
                }else if(data.status === 'error'){
                    setStatus(data.status);
                }
            })
        }
    }


    return (
        <div className="api">
             <h2>Insert Data To MongoDB Database</h2>
            
                <div className="form-floating mb-3">
                    <div className="data-cotainer">
                        <div className="input-data">
                            {
                                data.map((item, index) => {
                                    return(
                                        <span className="data-list" key={index} onClick={() => dataListClose(index)}>{item} <span className="data-list-close"><i className="far fa-times-circle"></i></span></span>
                                    )
                                })
                            }
                        </div>
                        <div className="input-field">
                            <input type="text" className="input-control" name="inputValue" onKeyUp={handleChangeInput} id="dataValue"  placeholder="Input Values:" />
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" onKeyUp={handleSearchInput} id="searchValue" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput"> Search Values:</label>
                </div>
                <div className="form-floating mb-3">
                    <button type="Submit" onClick={handleFormSubmit} className="btn btn-secondary bnt-block">{loading ? 'Loading...' : 'Save Now'}</button>
                    <br/>
                    <br/>
                    {
                        status === 'success' ? (
                            <p className="alert alert-success">Successfully Saved Now</p>
                        ) : status === 'error' ? (
                            <p className="alert alert-warning">Failed Saved Now</p>
                        ) : null
                    }
                </div>
           
            <h1>Result: { search === 0 ? 'False' : search === 1 ? 'True' : ' '}</h1>
            <strong>API:</strong>
            <p className="api-link"><span className="api-text">http://localhost:5000/list?user_id=1 </span></p>
            <p className="api-link"><span className="api-text">http://localhost:5000/list/all </span></p>
            <p className="api-link"><span className="api-text">http://localhost:5000/user/all </span></p>
          
        </div>
    );
};

export default ApiAction;