<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// ref
// -----------------------------------------------------------------------------------------

    const skillButtonColor = ref({
        html: "#ffffff",
        css: "#ffffff",
        javascript: "#ffffff",
        typescript: "#ffffff",
        vue: "#ffffff",
        nuxt: "#ffffff",
        pythone: "#ffffff",
        aws: "#ffffff",
    })

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const allClearSkillButtonColor = () => {

        for(let key in skillButtonColor.value){
            skillButtonColor.value[key] = "#ffffff"
        }

    }

// -----------------------------------------------------------------------------------------
// テンプレート内で起動する関数
// -----------------------------------------------------------------------------------------

    const clickButton = (property:string) => {

        allClearSkillButtonColor();

        if(property === "html"){
            skillButtonColor.value.html = "#00E0FF";
        }else if(property === "css"){
            skillButtonColor.value.css = "#00E0FF";
        }else if(property === "javascript"){
            skillButtonColor.value.javascript = "#00E0FF";
        }else if(property === "typescript"){
            skillButtonColor.value.typescript = "#00E0FF";
        }else if(property === "vue"){
            skillButtonColor.value.vue = "#00E0FF";
        }else if(property === "nuxt"){
            skillButtonColor.value.nuxt = "#00E0FF";
        }else if(property === "python"){
            skillButtonColor.value.pythone = "#00E0FF";
        }else if(property === "aws"){
            skillButtonColor.value.aws = "#00E0FF";
        }
    }

</script>

<template>
    <div class="w-[100%] h-[100%] bg-BGwhite relative z-[1]">
        <!-- <div class="absolute w-[100%] h-[calc(100%-140px)] top-[90px]"> -->
        <div class="absolute w-[100%] h-auto top-[90px]">
            <!-- ページ構成 -->
            <!-- PC表示 -->
            <div class="w-[100%] h-[100%] px-[4%] py-[0%] flex bg-BGwhite">
                <!-- コンテンツゾーン -->
                <div class="w-[calc(100%-250px)] h-[100%] bg-BGwhite">
                    <div class="w-[100%] h-[calc(100vh-140px)] bg-BGwhite">
                        <!-- Flutter -->
                         <BlogcontentsFlutter></BlogcontentsFlutter>
                    </div>
                </div>
                <div class="w-[250px] h-[100%]">
                    <div class="fixed w-[200px] h-[500px] p-[10px] space-y-[10px]">
                        <ButtonsHtml @click="clickButton('html')" :style="{background: skillButtonColor.html}"></ButtonsHtml>
                        <ButtonsCss @click="clickButton('css')" :style="{background: skillButtonColor.css}"></ButtonsCss>
                        <ButtonsJavascript @click="clickButton('javascript')" :style="{background: skillButtonColor.javascript}"></ButtonsJavascript>
                        <ButtonsTypescript @click="clickButton('typescript')" :style="{background: skillButtonColor.typescript}"></ButtonsTypescript>
                        <ButtonsVue @click="clickButton('vue')" :style="{background: skillButtonColor.vue}"></ButtonsVue>
                        <ButtonsNuxtjs  @click="clickButton('nuxt')" :style="{background: skillButtonColor.nuxt}"></ButtonsNuxtjs>
                        <ButtonsPython  @click="clickButton('python')" :style="{background: skillButtonColor.pythone}"></ButtonsPython>
                        <ButtonsAws  @click="clickButton('aws')" :style="{background: skillButtonColor.aws}"></ButtonsAws>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>