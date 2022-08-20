import {IProfileState} from "./types";
import {ProfileActionCreators} from "./action-creators";
import profileReducer from "./index";

let state: IProfileState

beforeEach(() => {
    state = {
        posts: [
            {id: 0, message: 'You', likesCount: 0},
            {id: 1, message: 'Goodbye', likesCount: 2},
            {id: 2, message: 'I am the Best', likesCount: 18},
            {id: 3, message: 'Rock Star', likesCount: 18},
            {id: 4, message: 'I am believe you', likesCount: 101},
            {id: 5, message: 'Believer', likesCount: 39}
        ],
        userProfile: null,
        status: ''
    };
})

test('length of posts should be incremented', () => {
    const newPostText = 'Hey, samurai'
    const newState = profileReducer(state, ProfileActionCreators.addPost(newPostText));

    expect(newState.posts.length).toBe(7);
});

test('message of new post should be correct', () => {
    const newPostText = 'Hey, samurai'
    const newState = profileReducer(state, ProfileActionCreators.addPost(newPostText));

    expect(newState.posts[6].message).toBe(newPostText)
});

test('after deleting length of messages should be decrement', () => {
    const newState = profileReducer(state, ProfileActionCreators.deletePost(4));

    expect(newState.posts.length).toBe(5)
});

test('after deleting length should not be decrement if id is incorrect', () => {
    const newState = profileReducer(state, ProfileActionCreators.deletePost(100));

    expect(newState.posts.length).toBe(6)
});
