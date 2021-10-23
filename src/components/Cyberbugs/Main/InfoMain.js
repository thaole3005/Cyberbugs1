import React from 'react'
import ReactHtmlParser from "react-html-parser";



export default function InfoMain(props) {

    const {projectDetail} = props;

  
    const renderMemberAvatar = () => {
        
        return projectDetail.members?.map((member, index) => {
            return <div className="avatar" key={index}>
                <img src ={member.avatar} alt = {member.avatar}/>
            </div>
        })
    }

    return (
       
           <>
                <h2>{projectDetail.projectName}</h2>
                <section>
                    <h3 className="text-success">------------Description------------</h3>
                    {ReactHtmlParser(projectDetail.description)}
                </section>
                <div className="info" style={{ display: 'flex' }}>
                    <div className="search-block">
                        <input className="search" />
                        <i className="fa fa-search" />
                    </div>
                   
                    <div className="avatar-group" style={{ display: 'flex' }}>
                        {renderMemberAvatar()}
                    </div>
                    <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                    <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
                </div>
            </>
     

    )
}
