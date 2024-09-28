export function BurgerComponent(elements) {
    // console.log("Burger Component created")
    // console.log(elements)

    // const localState = {
    //     isChecked: soundStatus,
    //     getValue: getValue
    // }


    const element = document.createElement('button');
    element.classList.add('burger-btn');

    const startButton = document.getElementsByClassName('start-btn')

    element.addEventListener('click', () => {
        if (elements.classList.contains('active') == true) {
            elements.classList.remove('active');
            startButton[0].classList.remove('hide');
        } else {
            elements.classList.add('active');
            startButton[0].classList.add('hide');
            
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
    // console.log('Burger Component render')

    element.innerHTML = '';

    for (let index = 0; index < 3; index++) {

        const burgerSpan = document.createElement('span')
        element.append(burgerSpan);
        
    }
  
}