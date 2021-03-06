<template>
    <div class="slide" ref="slide">
        <div class="slide-group" ref="slideGroup">
            <slot>
            </slot>
        </div>
        <!--<img src="../../assets/img/prev.png" alt="" class="prev" v-if="showPrev" @click="prev">
        <img src="../../assets/img/qianjin.png" alt="" class="next" v-if="showNext" @click="next">-->
        <div v-if="showDot" class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { addClass } from '../../utils/dom'
    import BScroll from 'better-scroll'

    const COMPONENT_NAME = 'slide'

    export default {
        name: COMPONENT_NAME,
        props: {
            showPrev: {
              type: Boolean,
              default: false
            },
            showNext: {
              type: Boolean,
              default: false
            },
            allowEmit: {
              type: Boolean,
              default: false
            },
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            },
            showDot: {
                type: Boolean,
                default: true
            },
            click: {
                type: Boolean,
                default: true
            },
            threshold: {
                type: Number,
                default: 0.3
            },
            speed: {
                type: Number,
                default: 400
            }
        },
        data () {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted () {
            this.update();
            window.addEventListener('resize', () => {
                if (!this.slide || !this.slide.enabled) {
                    return
                }
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    if (this.slide.isInTransition) {
                        this._onScrollEnd()
                    } else {
                        if (this.autoPlay) {
                            this._play()
                        }
                    }
                    this.refresh()
                }, 60)
            })
        },
        activated () {
            if (!this.slide) {
                return
            }
            this.slide.enable()
            let pageIndex = this.slide.getCurrentPage().pageX
            console.log('pageIndex', pageIndex)
            this.slide.goToPage(pageIndex, 0, 0)
            this.currentPageIndex = pageIndex
            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated () {
            this.slide.disable()
            clearTimeout(this.timer)
        },
        beforeDestroy () {
            this.slide.disable()
            clearTimeout(this.timer)
        },
        methods: {
            update () {
                if (this.slide) {
                    this.slide.destroy()
                }
                this.$nextTick(() => {
                    this.init()
                })
            },
            refresh () {
                this._setSlideWidth(true)
                this.slide.refresh()
            },
            prev () {
                this.slide.prev()
            },
            next () {
                this.slide.next()
            },
            goToPage (index) {
              this.slide.goToPage(index)
            },
            init () {
                clearTimeout(this.timer)
                this.currentPageIndex = 0
                this._setSlideWidth()
                if (this.showDot) {
                    this._initDots()
                }
                this._initSlide()

                if (this.autoPlay) {
                    this._play()
                }
            },
            _setSlideWidth (isResize) {
                this.children = this.$refs.slideGroup.children

                let width = 0
                let slideWidth = this.$refs.slide.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slide-item')

                    child.style.width = slideWidth + 'px'
                    width += slideWidth
                }
                if (this.loop && !isResize) {
                    width += 2 * slideWidth
                }
                this.$refs.slideGroup.style.width = width + 'px'
            },
            _initSlide () {
                this.slide = new BScroll(this.$refs.slide, {
                    scrollX: true,
                    scrollY: true,
                    momentum: false,
                    // freeScroll: true,
                    // eventPassthrough: 'vertical',
                    snap: {
                        loop: this.loop,
                        threshold: this.threshold,
                        speed: this.speed
                    },
                    bounce: false,
                    stopPropagation: true,
                    click: this.click
                })

                this.slide.on('scrollEnd', this._onScrollEnd);

                this.slide.on('touchEnd', () => {
                    if (this.autoPlay) {
                        this._play()
                    }
                })

                this.slide.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _onScrollEnd () {
                let pageIndex = this.slide.getCurrentPage().pageX;
                this.currentPageIndex = pageIndex;
                if (this.allowEmit) this.$root.eventBus.$emit('scrollEnd', this.currentPageIndex);
                // console.log('1111111111', this.currentPageIndex)
                if (this.autoPlay) {
                    this._play()
                }
            },
            _initDots () {
                this.dots = new Array(this.children.length)
            },
            _play () {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.slide.next()
                }, this.interval)
            }
        },
        watch: {
            loop () {
                this.update()
            },
            autoPlay () {
                this.update()
            },
            speed () {
                this.update()
            },
            threshold () {
                this.update()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/variable.styl"

    .slide
        min-height: 1px
        overflow-x hidden
        .slide-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slide-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                /*img*/
                    /*display: block*/
                    /*width: 100%*/
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            transform: translateZ(1px)
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-light-grey-s
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-white
</style>
