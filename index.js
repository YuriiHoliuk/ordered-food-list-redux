import { store } from './src/createStore.js';
import {
  clearSelection,
} from './src/actions.js';
import { renderControls, renderList } from './src/render.js';

const createRender = container => (state, dispatch) => {
  const controls = renderControls(state, dispatch);
  const list = renderList(state, dispatch);

  container.innerHTML = '';
  container.append(list, controls);
};

window.addEventListener('load', () => {
  const render = createRender(document.getElementById('app'));

  store.subscribe(() => {
    render(store.getState(), store.dispatch);
  });

  document.addEventListener('click', () => store.dispatch(clearSelection()));

  store.dispatch({ type: 'INITIAL_RENDER' });
});
