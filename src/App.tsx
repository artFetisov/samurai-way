import React from 'react';
import {MyLayout} from "./components/layout/Layout";
import {Router} from "./router/Router";

export const App = () => {
    return <MyLayout>
        <Router/>
    </MyLayout>
}


