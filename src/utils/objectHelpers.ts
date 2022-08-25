import {IUser} from "../types/types";

export const updateObjectInArray = (items: IUser[], itemId: number, objPropName: 'id', newObjProps: { followed: boolean }) => {

    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    });
}


