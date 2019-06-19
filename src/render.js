import { createElement } from './utils.js';
import { clearSelection, moveSelectionDown, moveSelectionUp, selectItem } from './actions.js';

export const renderControls = (state, dispatch) => {
  const { selectedIndex, foodList } = state;

  const upButton = createElement('button button--up', 'Move Up', 'button');
  const isUpDisabled = selectedIndex === null || selectedIndex === 0;

  isUpDisabled
    ? upButton.setAttribute('disabled', 'disabled')
    : upButton.removeAttribute('disabled');
  upButton.addEventListener('click', event => {
    event.stopPropagation();

    dispatch(moveSelectionUp());
  });

  const downButton = createElement('button button--down', 'Move Down', 'button');
  const isDownDisabled = selectedIndex === null || selectedIndex === (foodList.length - 1);

  isDownDisabled
    ? downButton.setAttribute('disabled', 'disabled')
    : downButton.removeAttribute('disabled');
  downButton.addEventListener('click', event => {
    event.stopPropagation();

    dispatch(moveSelectionDown());
  });

  return createElement('controls', [upButton, downButton]);
};

export const renderList = (state, dispatch) => {
  const { selectedIndex, foodList } = state;
  const list = foodList.map(({ name, emoji }, index) => {
    const isSelected = selectedIndex === index;
    const foodItem = createElement(
      `food-item${isSelected ? ' is-selected' : ''}`,
      `${name} - ${emoji}`,
      'li',
    );

    foodItem.addEventListener('click', (event) => {
      event.stopPropagation();

      dispatch(
        isSelected
          ? clearSelection()
          : selectItem(index),
      );
    });

    return foodItem;
  });

  return createElement('food', list, 'ul');
};
