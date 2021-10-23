import React from 'react'

export default function PagenNotFound(props) {
    return (
        <div>
            <h2>Không tìm thấy trang: {props.match.url}</h2>
        </div>
    )
}
