import React from 'react'
import { Pagination } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import '../../pages/member/lukeStyle.scss'
import { log } from 'util'


const MyPagination = props => {
    let page_items = []
    let pt = props.totalPage
    console.log("MyPagination", props.nowPage);
    for(let page = 1; page <= pt ; page++) {
        page_items.push(
            <LinkContainer
                to= {props.pagePath + page}
                key={page}
            >
                <Pagination.Item
                    onClick = { ()=>{
                        props.changePage(page)
                    }}
                >
                {page}
                </Pagination.Item>
            </LinkContainer>
        )
    }

    let fp = props.nowPage -1
    if(fp < 1) fp = 1
    let np = props.nowPage + 1
    if (np > pt) np = pt
    



    return(
        <>
            <div className="pageWrap pt-5" >
                <Pagination className="d-flex"
                    style={{marginLeft: '500px'}}
                >
                <LinkContainer to={props.pagePath + 1 } key={-1}
                onClick = { ()=>{
                        props.changePage(1)
                    }}
                >
                    <Pagination.First className="none" />
                </LinkContainer>
                <LinkContainer
                    to={props.pagePath + fp }
                    key={0}
                    onClick = { ()=>{
                        props.changePage(fp)
                    }}
                >
                    <Pagination.Prev className="none" />
                </LinkContainer>
                {page_items}
                <LinkContainer
                    to={props.pagePath + np}
                    key={10000}
                    onClick = { ()=>{
                        console.log("np", np)
                        props.changePage(np)
                    }}
                >
                    <Pagination.Next className="none" />
                </LinkContainer>
                <LinkContainer
                    to={props.pagePath + pt}
                    key={10001}
                    onClick = { ()=>{
                        props.changePage(pt)
                    }}
                >
                    <Pagination.Last className="none" />
                </LinkContainer>
                </Pagination>
            </div>
        </>
    )

}


export default MyPagination