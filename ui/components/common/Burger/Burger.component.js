export function BurgerComponent() {
    console.log("Burger Component created")

    // const localState = {
    //     isChecked: soundStatus,
    //     getValue: getValue
    // }


    const element = document.createElement('div');
    element.classList.add('burger');

    element.addEventListener('click', () => {
        if (element.classList.contains('active') == true) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
        
       
    })

    // render(element, localState)
    render(element)

    return {
        element,
        cleanup: () => {},
    };
}



async function render(element) {
    console.log('Burger Component render')

    element.innerHTML = '';

    const burgerBox = document.createElement('div')
    burgerBox.classList.add('burger-box')
    
    const burgerInner = document.createElement('div');
    burgerInner.classList.add('burger-inner');

    burgerBox.append(burgerInner);

    element.append(burgerBox)
  
}