;(function(window,$){

    var TabBar = function(options){
        var _this = this;

        if(this.constructor != TabBar){
            return new TabBar(options);
        }

        //默认参数
        var settings = {
            tabEle:'.js-tab',
            triggerType:'click',
            effect:'default',
            invoke:1,
            auto:false
        }

        //合并配置参数
        this.config = $.extend(settings,options);
        const config = this.config;

        //绑定tab元素
        this.tabEle = $(config.tabEle);
        //tab nav
        this.tabItems = this.tabEle.find('.tab_nav li');
        //tab content
        this.contentItems = this.tabEle.find('.tab_content li');

        this.init();
    }

    TabBar.prototype = {
        init:function(){
            var _this = this;
            const config = this.config;

            //tab nav事件
            this.tabItems.on(config.triggerType,function(){
                _this.clearAutoPlay();
                const index = _this.tabItems.index(this);
                _this.config.invoke = index;
                _this.switch();
            })

            

            //默认第几张
            this.tabItems.eq(this.config.invoke).trigger(config.triggerType);

            if(this.config.auto){
                this.autoPlay();
                this.tabItems.on('mouseout',function(){
                    _this.autoPlay();
                })
                //tab content事件
                this.contentItems.on('mouseover',function(){
                    _this.clearAutoPlay();
                })

                this.contentItems.on('mouseout',function(){
                    _this.autoPlay();
                })
            }
        },

        //切换
        switch:function(){
            var _this = this;
            const invoke = this.config.invoke;

            //tab nav
            _this.tabItems.each(function(item,i){
                $(this).removeClass('current');
            })
            _this.tabItems.eq(invoke).addClass('current');
            //tab content
            _this.contentItems.eq(invoke).fadeIn();

            _this.contentItems.eq(invoke).siblings().fadeOut();
        },

        //自动切换
        autoPlay:function(){
            var _this = this;
            const len = this.tabItems.length;
            const t = this.config.auto;
            this.timer = window.setInterval(function(){
                _this.config.invoke = _this.config.invoke + 1;
                _this.config.invoke = _this.config.invoke % len;
                _this.switch();
            },t);
        },

        //清除自动切换
        clearAutoPlay:function(){
            clearInterval(this.timer)
        }
    }

    Object.defineProperty(TabBar.prototype,'constructor',{
        enumerable:false,
        value:TabBar
    })

    // 导出到window
    window.TabBar = TabBar;
})(window,jQuery)