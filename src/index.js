const slider = document.getElementById('slider');
const slider_list = slider.querySelectorAll('.slider_list,.slider_list_current');
const current = document.getElementById('current');

class Slider {
    constructor(slider,circles) {
        this.slider = slider;
        this.circles = circles;
        this.total = slider.length;
        this.current = 0;
        this.render()
    }

    registerPlugins(...plugins) {
        plugins.forEach(plugin => plugin(this));
    }

    nextItem() {
        if (this.current === this.total - 1) {
            this.current = 0;
        } else {
            this.current++;
        }
        this.updateSlider();
        this.render();
    }

    prevItem() {
        if (this.current === 0) {
            this.current = this.total - 1;
        } else {
            this.current--;
        }
        this.updateSlider();
        this.render();
    }

    start() {
        this.stop();
        this._timer = setInterval(() => this.nextItem(), 4399);
    }
    stop() {
        clearInterval(this._timer);
    }

    updateSlider() {
        this.slider.forEach(v => {
            v.className = 'slider_list'
        });
        this.slider[this.current].className = 'slider_list_current';
    }

    render() {
        this.circles.innerHTML = '';
        this.slider.forEach(v => {
            let span = document.createElement('span');
            this.circles.append(span);
        });

        const spans = this.circles.querySelectorAll('span');
        spans[this.current].className = 'current';

        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener('click', () => {
                this.start()
                this.current = i;
                spans.forEach(v => {
                    v.className = '';
                })
                spans[i].className = 'current';
                this.updateSlider();
            })
        }
    }
}

let my_slider = new Slider(slider_list,current);
my_slider.start();
my_slider.registerPlugins(pluginNext, pluginprev);

function pluginNext(slider) {
    const next = document.querySelector('.next');
    next.addEventListener('click', () => {
        slider.nextItem();
        slider.start()
    });
}

function pluginprev(slider) {
    const prev = document.querySelector('.previous');
    prev.addEventListener('click', () => {
        slider.prevItem();
        slider.start()
    });
}