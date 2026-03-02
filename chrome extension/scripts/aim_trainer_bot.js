const clickTargetElement = async () => {
    let targetCount = 0;
    const SELECTOR = '[data-aim-target="true"]';

    while (targetCount < 31) {
        let targetElement;
        while (!targetElement) {
            targetElement = document.querySelector(SELECTOR);
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        ['mousedown', 'mouseup', 'click'].forEach(type =>
            targetElement.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))
        );
        console.log('Clicked on the "view-target" element');

        while (document.querySelector(SELECTOR) === targetElement) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        targetCount++;
    }

    console.log('Completed 31 target element clicks');
};

clickTargetElement();
