<script setup lang="ts">
import type { TransitionProps } from 'vue';


const {$gsap:gsap} = useNuxtApp();

let tl: gsap.core.Timeline = gsap.timeline() // gsap.core.Timelineはgsap特有のタイムラインオブジェクトのデータ型
const   transition: TransitionProps = {
    name: 'page',
    mode: "out-in",
    onEnter: (el, done) => {
        tl.to('.js-mask',{left: '500vh'})
        done()
    },
    onBeforeLeave: (el) => {
        tl.set('.js-mask',{left: '-200vh'})
    },
    onLeave: (el, done) => {
        tl.to('.js-mask',{
            left: 0,
            duration: 0.3,
        })
        done()
    },
}

</script>

<template>
    <NuxtLayout>
        <NuxtPage :transition="transition" />
        <div class="overlay js-mask"></div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
$transition-mask-color: rgb(0, 59, 220);
.overlay {
  position: fixed;
  top: 0;
  left: -200vw;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: $transition-mask-color;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
  }
  &:before {
    right: 100vw;
    background: linear-gradient(
      to top left,
      $transition-mask-color 50%,
      transparent 50%
    );
  }
  &:after {
    left: 100vw;
    background: linear-gradient(
      to bottom right,
      $transition-mask-color 50%,
      transparent 50%
    );
  }
}
</style>