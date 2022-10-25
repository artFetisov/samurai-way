import {FC, Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "./router.data";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Router: FC = () => {
    const {isAuth, id} = useTypedSelector(state => state.auth)
    
    return <>
        {isAuth &&
            <Routes>
                {privateRoutes.map(r => r.lazy
                    ? <Route key={r.path} path={r.path} element={<Suspense fallback={<></>}>
                        <r.element/>
                    </Suspense>}/>
                    : <Route key={r.path} path={r.path} element={<r.element/>}/>
                )}
                <Route path="/" element={<Navigate to={`/profile/${id}`}/>}/>
                <Route path="*" element={<Navigate to={`/profile/${id}`}/>}/>
            </Routes>
        }
        {!isAuth &&
            <Routes>
                {publicRoutes.map(r => <Route key={r.path} path={r.path} element={<r.element/>}/>)}
                <Route path="*" element={<Navigate to={`/login`}/>}/>
            </Routes>
        }
    </>
}