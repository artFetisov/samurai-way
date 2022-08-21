import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./router.data";

export const Router: FC = () => {
    return <Routes>
        {routes.map(r => <Route path={r.path} element={<r.element/>}/>)}
    </Routes>
}