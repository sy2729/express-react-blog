import actions from '../action';
import store from '../store';

export const passPost = (obj) => {
  store.dispatch(actions.getOnePost(obj))
}

