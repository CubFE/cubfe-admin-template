interface ClickOutsideElement extends HTMLElement {
    clickOutsideEvent?: (event: MouseEvent) => void;
}

const clickOutside = {
    beforeMount(el: ClickOutsideElement, binding: any) {
        el.clickOutsideEvent = function (event: MouseEvent) {
            // 检查点击是否在元素之外
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: ClickOutsideElement) {
        document.body.removeEventListener('click', el.clickOutsideEvent!);
    }
};

export default clickOutside;