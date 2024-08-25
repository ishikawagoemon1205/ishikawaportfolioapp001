<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// interface
// -----------------------------------------------------------------------------------------

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
// useState
// -----------------------------------------------------------------------------------------

    const EnabledModalStyle = useState<{property: boolean}>(
        'currentModalStyle', 
        () => {
            return {
                property:<boolean> false,
            }
    });

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const changeModalStyleEnabled = () => {
        EnabledModalStyle.value.property = true;
        console.log(EnabledModalStyle.value.property);
    }

// -----------------------------------------------------------------------------------------
// テンプレート内で起動する関数
// -----------------------------------------------------------------------------------------

    const clickButton = (property:string) => {

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
                <div class="w-[250px] h-[calc(100vh-140px)]">
                    <div class="w-[250px] h-[80%] fixed w-[200px] h-[500px] p-[10px] space-y-[10px]">
                        <ButtonsHtml @click="clickButton('html')" :style="{background: skillButtonColor.html}"></ButtonsHtml>
                        <ButtonsCss @click="clickButton('css')" :style="{background: skillButtonColor.css}"></ButtonsCss>
                        <ButtonsJavascript @click="clickButton('javascript')" :style="{background: skillButtonColor.javascript}"></ButtonsJavascript>
                        <ButtonsTypescript @click="clickButton('typescript')" :style="{background: skillButtonColor.typescript}"></ButtonsTypescript>
                        <ButtonsVue @click="clickButton('vue')" :style="{background: skillButtonColor.vue}"></ButtonsVue>
                        <ButtonsNuxtjs  @click="clickButton('nuxt')" :style="{background: skillButtonColor.nuxt}"></ButtonsNuxtjs>
                        <ButtonsPython  @click="clickButton('python')" :style="{background: skillButtonColor.pythone}"></ButtonsPython>
                        <ButtonsAws  @click="clickButton('aws')" :style="{background: skillButtonColor.aws}"></ButtonsAws>
                    </div>
                    <div class="w-[250px] h-[10%] mt-[calc(55vh)] fixed">
                        <button @click="changeModalStyleEnabled" class=" w-[200px] h-[60px] rounded-[5px] bg-blue hover:bg-Lblue transition duration-300">
                            <div class="flex items-center justify-center space-x-[8px]">
                                <PlusOutlined :style="{color: '#ffffff'}" />
                                <h4 class="text-[#ffffff]">Add</h4>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>