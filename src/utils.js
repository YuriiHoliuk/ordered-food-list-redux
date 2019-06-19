export const createElement = (className = '', content = '', tag = 'div') => {
  const element = document.createElement(tag);

  element.classList.add(...className.split(' '));

  if (typeof content === 'string') {
    element.textContent = content;
  } else if (Array.isArray(content)) {
    element.append(...content);
  } else {
    element.appendChild(content);
  }

  return element;
};
