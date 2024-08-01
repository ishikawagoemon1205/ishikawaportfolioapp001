<script setup lang="ts">

</script>

<template>
    <div class="w-screen h-screen">
        <div class="w-[100%] h-[100%]">
            <Header class="z-[100] px-[4%]"></Header>
            <slot/>
            <Footer class="bottom-0 z-[100] px-[4%]"></Footer>
        </div>
    </div>
</template>

<style>
html {
    font-family: "BIZ UDPGothic", sans-serif;
} 
</style>