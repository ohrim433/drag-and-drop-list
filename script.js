const tasksListElement = document.querySelector('.tasks__list');
const tasksElements = tasksListElement.querySelectorAll('.tasks__item');

for (const task of tasksElements) {
    task.draggable = true;
}

tasksListElement.addEventListener('dragstart',
    event => event.target.classList.add('selected')
);

tasksListElement.addEventListener('dragend',
    event => event.target.classList.remove('selected')
);

const getNextElement = (cursorPosition, currentElement) => {
    // get object with sizes and coords
    const currentElementCoord = currentElement.getBoundingClientRect();
    // find vertical coord of a current element center
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition > currentElementCenter) ?
        currentElement.nextElementSibling :
        currentElement;

    return nextElement;
}

tasksListElement.addEventListener('dragover', event => {
    event.preventDefault();

    const activeElement = tasksListElement.querySelector('.selected');
    const currentElement = event.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains('tasks__item');

    if (!isMoveable) return;

    const nextElement = getNextElement(event.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    tasksListElement.insertBefore(activeElement, nextElement);
});
