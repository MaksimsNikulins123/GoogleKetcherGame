export function BurgerComponent() {
    // console.log("Burger Component created")

    const element = document.createElement('button');
    element.classList.add('burger-btn');

    const settingsElement = document.getElementById('settings');
    const startButtonElement = document.getElementById('start-btn')

    element.addEventListener('click', () => {
        if (settingsElement.classList.contains('active') == true) {
            settingsElement.classList.remove('active');
            startButtonElement.classList.remove('hide');
        } else {
            settingsElement.classList.add('active');
            startButtonElement.classList.add('hide');
            
        }
        
       
    })

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