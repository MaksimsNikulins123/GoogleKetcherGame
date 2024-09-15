// import { SelectComponent } from "./Select/Select.component.js";

export function DropDownListComponent(data) {
    //  console.log("SettingsComponent created")

    const localState = {
        prevButtonTitle: data.title,
        cleanupFunctions: [],
        
    }
    const element = document.createElement('div');
    element.classList.add('dropdown');

    render(element, data)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, data) {

    element.innerHTML = '';

    const select = document.createElement('button');
    select.classList.add('dropdown-toggle')
    select.setAttribute('type', 'button');
    select.textContent = data.title;


    const list = document.createElement('ul');
    list.classList.add('dropdown-menu', 'hide')
    for (let index = 0; index < data.payload.length; index++) {
        const listItem = document.createElement('li');
        listItem.classList.add('dropdown-item');
        listItem.setAttribute('data-value', `option${index + 1}`)
        listItem.innerHTML = `${data.payload[index]}`;
        list.append(listItem);
    }

    select.addEventListener('click', () => {
        document.querySelectorAll('ul').forEach(element => {
            element.classList.add('hide')            
        });
        _toggleDropDownList(list);

        list.addEventListener('click', (e) => { 
            list.classList.add('hide')
            console.log(e.target.innerHTML)
        } )    
      
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