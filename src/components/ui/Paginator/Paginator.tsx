import React, {FC, useState} from 'react'
import styles from './Paginator.module.scss'
import {Button,} from "antd";
import {UsersActionCreators} from "../../../store/reducers/users/action-creators";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

interface IPaginatorProps {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
    portionNumber: number
}

export const Paginator: FC<IPaginatorProps> = ({
                                                   totalUsersCount,
                                                   pageSize,
                                                   currentPage,
                                                   onPageChange,
                                                   portionSize = 10,
                                                   portionNumber
                                               }) => {
    const dispatch = useTypedDispatch()
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    const decrementPortionNumberHandler = () => {
        dispatch(UsersActionCreators.setPortionNumber(portionNumber - 1))
    }

    const incrementPortionNumberHandler = () => {
        dispatch(UsersActionCreators.setPortionNumber(portionNumber + 1))
    }

    return (
        <div className={styles.paginator}>
            <Button disabled={portionNumber <= 1} onClick={decrementPortionNumberHandler}>Prev</Button>
            <div className={styles.btnContainer}>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => <Button
                        type={currentPage === p ? 'primary' : 'default'}
                        className={styles.button}
                        key={p} value={p}
                        onClick={() => {
                            onPageChange(p)
                        }}>{p}</Button>
                    )}
            </div>
            <Button disabled={portionCount <= portionNumber} onClick={incrementPortionNumberHandler}> Next</Button>
        </div>
    );
}
