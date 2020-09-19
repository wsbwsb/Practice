(() => {
    const actions = {
        birdFlies(key) {
            if (key) {
                document.querySelector(
                    '[data-index="2"] .bird'
                ).style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector(
                    '[data-index="2"] .bird'
                ).style.transform = 'translateX(-100%)';
            }
        },
        birdFlies2(key) {
            if (key) {
                document.querySelector(
                    '[data-index="5"] .bird'
                ).style.transform = `translate(${window.innerWidth}px, ${
                    -window.innerHeight * 0.7
                }px)`;
            } else {
                document.querySelector(
                    '[data-index="5"] .bird'
                ).style.transform = 'translateX(-100%)';
            }
        },
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화된 (visible 클래스가 붙은) .graphoc-item을 지정
    let ioindex;

    const io = new IntersectionObserver((enteries, observer) => {
        ioindex = enteries[0].target.dataset.index * 1; //인덱스번호가 문자열로 출력되는데 숫자로 출력되게 하기위해 1을 곱해준다.
    });

    for (i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        // stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let temp = 0;
        // for (i = 0; i < stepElems.length; i++)
        for (i = ioindex - 1; i < ioindex + 2; i++) {
            step = stepElems[i];
            if (!step) continue;

            boundingRect = step.getBoundingClientRect();

            temp++;

            if (
                boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8
            ) {
                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();
})();
