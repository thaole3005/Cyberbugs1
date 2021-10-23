import React from 'react'

export default function Detail(props) {






    return (
        <div>
            giá trị tham số: {props.match.params.id}
            <br/>
            Path name hiện tại: {props.match.path}
            <br/>
            Url hiện tại: {props.match.url}
        </div>
    )
}
