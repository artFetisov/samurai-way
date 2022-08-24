import {ResponseType, ResultCodeEnum} from "../../../api/api"
import {UsersActionCreators, UsersAsyncActionCreators} from "./action-creators";
import {UsersService} from "../../../services/users.service";

jest.mock('../api/users-api')

const userAPIMock = UsersService as jest.Mocked<typeof UsersService>

const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

// @ts-ignore
userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

test('success follow thunk ', async () => {
    const thunk = UsersAsyncActionCreators.follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActionCreators.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActionCreators.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActionCreators.toggleProgress(false, 1))
})

test('success unfollow thunk ', async () => {
    const thunk = UsersAsyncActionCreators.unfollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActionCreators.toggleProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActionCreators.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActionCreators.toggleProgress(false, 1))
})