const hoverBoxes :NodeListOf<Element> = document.querySelectorAll('.box');
hoverBoxes?.forEach((box: Element) => {
    box.addEventListener('mouseover', (event:any) => {

        const prevSibling = event.target?.previousElementSibling;
        const prevPrevSibling = prevSibling?.previousElementSibling;

        const nextSibling = event.target?.nextElementSibling;
        const nextNextSibling = nextSibling?.nextElementSibling;

        event.target.classList.add('hovered');

        if(prevPrevSibling) {
            prevPrevSibling.classList.add('prev2');
            // add prev2 class to the element before previous
        }

        if(prevSibling) {
            prevSibling.classList.add('prev1');
            // add prev1 class to the previous element
        }

        if(nextNextSibling) {
            nextNextSibling.classList.add('next2');
            // add next2 class to the element after next
        }

        if(nextSibling) {
            nextSibling.classList.add('next1');
            // add next1 class to the next element
        }

    });

    box.addEventListener('mouseout', (event:any) => {
        const parent = event.target?.parentElement;
        const siblings = parent?.querySelectorAll('.next1, .next2, .prev1, .prev2, .hovered');

        siblings?.forEach((sibling: Element) => {
            sibling.classList.remove('next1', 'next2', 'prev1', 'prev2', 'hovered');
            // remove all hover classes from siblings
        })
    })
})