var hoverBoxes = document.querySelectorAll('.box');
hoverBoxes === null || hoverBoxes === void 0 ? void 0 : hoverBoxes.forEach(function (box) {
    box.addEventListener('mouseover', function (event) {
        var _a, _b;
        var prevSibling = (_a = event.target) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
        var prevPrevSibling = prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.previousElementSibling;
        var nextSibling = (_b = event.target) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
        var nextNextSibling = nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.nextElementSibling;
        event.target.classList.add('hovered');
        if (prevPrevSibling) {
            prevPrevSibling.classList.add('prev2');
            // add prev2 class to the element before previous
        }
        if (prevSibling) {
            prevSibling.classList.add('prev1');
            // add prev1 class to the previous element
        }
        if (nextNextSibling) {
            nextNextSibling.classList.add('next2');
            // add next2 class to the element after next
        }
        if (nextSibling) {
            nextSibling.classList.add('next1');
            // add next1 class to the next element
        }
    });
    box.addEventListener('mouseout', function (event) {
        var _a;
        var parent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentElement;
        var siblings = parent === null || parent === void 0 ? void 0 : parent.querySelectorAll('.next1, .next2, .prev1, .prev2, .hovered');
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.classList.remove('next1', 'next2', 'prev1', 'prev2', 'hovered');
            // remove all hover classes from siblings
        });
    });
});
