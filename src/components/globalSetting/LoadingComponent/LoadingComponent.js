import React from 'react';
import styleLoading from './LoadingComponent.module.css';
import loading from '../../../assets/img/loading/loading.gif'
import { useSelector } from 'react-redux';



//component LoadingComponent quản lí về nghiệp vụ hiển thị/ ẩn icon loading
export default function LoadingComponent() {

    const {isLoading} = useSelector(state => state.LoadingReducer)

    if(isLoading === true) {

        return (
            <div className = {styleLoading.bgLoading}>
                <img src = {loading} alt = "loading"/>
            </div>
        )
    } else {
        return '';
    }
}
