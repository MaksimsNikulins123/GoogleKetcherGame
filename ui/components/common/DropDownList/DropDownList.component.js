import { GAME_STATUSES } from "../../../../core/constans.js";

export function DropDownListComponent(buttonTitle, list, getValue, gameStatus) {
    // console.log(data)
    // console.log("Dropdown Component created")

    const localState = {
        gameStatus: gameStatus,
        buttonDisabilityStatus: gameStatus === GAME_STATUSES.SETTINGS ? false : true,
        buttonTitle: buttonTitle,
        list: list,
        cleanupFunctions: [],
        getValue,

    }
    const element = document.createElement('div');
    element.classList.add('dropdown');

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {

    // console.log('Dropdown component render')

    element.innerHTML = '';

    const select = document.createElement('button');
    select.classList.add('dropdown-toggle')
    select.setAttribute('type', 'button');
    select.innerHTML = localState.buttonTitle;
    select.disabled = localState.buttonDisabilityStatus;

    const list = document.createElement('ul');
    list.classList.add('dropdown-menu', 'hide')
    for (let index = 0; index < localState.list.length; index++) {
        const listItem = document.createElement('li');
        listItem.classList.add('dropdown-item');
        listItem.setAttribute('data-value', `option${index + 1}`)
        listItem.innerHTML = `${localState.list[index]}`;
        list.append(listItem);
    }

    select.addEventListener('click', () => {
        document.querySelectorAll('ul').forEach(element => {
            element.classList.add('hide')
        });
        _toggleDropDownList(list);

        list.addEventListener('click', (e) => {
            list.classList.add('hide')

            const prevValue = localState.buttonTitle
            const newValue = e.target.innerHTML

            localState.buttonTitle = e.target.innerHTML

            if (prevValue !== newValue) {
                localState.getValue({
                    prevValue,
                    newValue
                })
            }
        })

    })
    element.append(select, list);
}


function _toggleDropDownList(list) {

    if (list.classList.contains('hide') == true) {
        list.classList.remove('hide');
    } else {
        list.classList.add('hide');
    }

}
