export function DropDownListComponent(buttonTitle, list, getValue) {
    // console.log(data)
    // console.log("Dropdown Component created")

    const localState = {
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


// const settingsButtonElements = document.getElementsByClassName('dropdown-toggle');
        
//         console.log(settingsButtonElements.length)

//         for (let index = 0; index < settingsButtonElements.length; index++) {
//             const element = settingsButtonElements[index];
//             // element.classList.add('disabled')
//             element.disabled = true;
//             //  return element.disabled;
//             console.log(element)
            
//         }
        
        // const buttonArray = Array.from(settingsButtonElements)
        // settingsButtonElements.forEach((settingsButtonElement) => {settingsButtonElement.classList.add('disabled')})
        
      
        // settingsButtonElements.map(settingsButtonElement => console.log(settingsButtonElement));
        
        // console.log(typeof(buttonArray))
        // console.log(Array.from(settingsButtonElements))


        // settingsButtonElement.disabled = true;