export function SettingsComponent() {
    //  console.log("SettingsComponent created")
    const element = document.createElement('div');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    // console.log("SettingsComponent render")
    element.append('Settings will be here');
}