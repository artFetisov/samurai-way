import {FC} from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const Friends: FC = () => {
    const users = useTypedSelector(state => state.users.users)

    return <div>
        <h3></h3>
    </div>
}