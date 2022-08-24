import {FC} from "react";
import ContentLoader from 'react-content-loader'

export const MyLoader: FC = (props) => {
    return <ContentLoader
        height={200}
        width={740}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="103" y="12" rx="3" ry="3" width="740" height="8"/>
        <rect x="102" y="152" rx="3" ry="3" width="740" height="6"/>
        <circle cx="50" cy="50" r="45"/>
        <circle cx="50" cy="153" r="45"/>
        <circle cx="50" cy="257" r="45"/>
        <rect x="105" y="117" rx="3" ry="3" width="200" height="7"/>
        <rect x="104" y="222" rx="3" ry="3" width="200" height="7"/>
        <rect x="105" y="48" rx="3" ry="3" width="171" height="6"/>
        <rect x="104" y="257" rx="3" ry="3" width="171" height="6"/>
    </ContentLoader>
}
