import React, {useEffect} from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'
import {useSelector, useDispatch} from 'react-redux';

export default function IndexCyberBugs(props) {
    console.log("props of indexCyberBugs", props);
    console.log("projectId", props.match.params.projectId);

    let {projectDetail} = useSelector(rootReducer => rootReducer.ProjectReducer);
    console.log("projectDetail", projectDetail);

    const dispatch = useDispatch();


    useEffect(() => {
        console.log("vào useEffect của indexCyberBugs")
        //khi người dùng link tới trang này bằng thẻ navlink ở projectName thì t sẽ lấy tham số từ url => gọi action saga
        const projectId = props.match.params.projectId;
        dispatch({
            type: 'GET_PROJECT_DETAIL_SAGA',
            projectId,
        })
    }, [])


    return (
           <div className="main">
                    <h3>Cyber Board</h3>
                    <HeaderMain projectDetail ={projectDetail}/>
                     <InfoMain projectDetail ={projectDetail}/>
                    <ContentMain projectDetail ={projectDetail}/> 
            </div>
        
    )
}
