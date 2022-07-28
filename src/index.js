const slider = document.getElementById('slider');
const slider_list = slider.querySelectorAll('.slider_list,.slider_list_current');
const current = document.getElementById('current');

class Slider {
    //接收轮播列表和小圆点容器
    constructor(slider,circles) {
        this.slider = slider;//轮播列表
        this.circles = circles;//小圆点容器
        this.total = slider.length;//轮播图数量
        this.current = 0;//当前显示的图片索引
        this.render()//渲染小圆点
    }

    registerPlugins(...plugins) {
        plugins.forEach(plugin => plugin(this));
    }

    //更改索引并刷新轮播图
    nextItem() {
        if (this.current === this.total - 1) {
            this.current = 0;
        } else {
            this.current++;
        }
        this.updateSlider();
        this.render();
    }

    //更改索引并刷新轮播图
    prevItem() {
        if (this.current === 0) {
            this.current = this.total - 1;
        } else {
            this.current--;
        }
        this.updateSlider();
        this.render();
    }

    //开始自动轮播
    start() {
        this.stop();//停止之前的自动轮播
        this._timer = setInterval(() => this.nextItem(), 4399);
    }
    //停止自动轮播
    stop() {
        clearInterval(this._timer);
    }

    //更新轮播图类名，实现轮播
    updateSlider() {
        this.slider.forEach(v => {
            v.className = 'slider_list'
        });
        this.slider[this.current].className = 'slider_list_current';
    }

    render() {
        this.circles.innerHTML = '';
        //渲染小圆点
        this.slider.forEach(v => {
            let span = document.createElement('span');
            this.circles.append(span);
        });

        const spans = this.circles.querySelectorAll('span');
        spans[this.current].className = 'current';//更改当前小圆点的样式

        //给小圆点注册点击事件
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

let my_slider = new Slider(slider_list,current);//创建一个轮播图实例
my_slider.start();//开始自动轮播
my_slider.registerPlugins(pluginNext, pluginprev);//注册插件

function pluginNext(slider) {//接收slider实例
    const next = document.querySelector('.next');
    next.addEventListener('click', () => {
        slider.nextItem();
        slider.start()
    });
}

function pluginprev(slider) {//接收slider实例
    const prev = document.querySelector('.previous');
    prev.addEventListener('click', () => {
        slider.prevItem();
        slider.start()
    });
}