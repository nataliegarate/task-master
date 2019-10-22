import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_POST = 'ADD_POST'
const VIEW_POSTS = 'VIEW_POSTS'

/**
 * INITIAL STATE
 */
const initalPostState = {
  single: {},
  all: []
}

/**
 * ACTION CREATORS
 */
const addPost = post => ({type: ADD_POST, post})

const viewPosts = posts => ({type: VIEW_POSTS, posts})
/**
 * THUNK CREATORS
 */
export const requestAddPost = post => async dispatch => {
  try {
    const res = await axios.post('/api/posts', post)
    dispatch(addPost(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const requestViewPosts = () => async dispatch => {
  try {
    const res = await axios.get(`/api/posts`)
    dispatch(viewPosts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initalPostState, action) {
  switch (action.type) {
    case ADD_POST:
      return {all: [...state.all, action.post], single: action.post}
    case VIEW_POSTS:
      return {...state, all: [...action.posts]}
    default:
      return state
  }
}
