<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------------------

    const props = defineProps({
        pagepass: String,
    })

// -----------------------------------------------------------------------------------------
// useRoute
// -----------------------------------------------------------------------------------------

    

// -----------------------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------------------

    const headerIconsProperties:any = ref([
        {
            id: 'Home',
            imgpass: 'homeIcon.png',
            bgcolor: '#EFEFF0',
            pagePass: '/home',
        },
        {
            id: 'Blog',
            imgpass: 'blogIcon.png',
            bgcolor: '#EFEFF0',
            pagePass: '/blog',
        },
        {
            id: 'X',
            imgpass: 'twitterIcon.png',
            bgcolor: '#EFEFF0',
            pagePass: '/home',
        },
    ])

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    // 現在のページ情報を取得して、ヘッダーアイコンの色を切り替える関数
    const changeHeaderIconColor = (pass:any) => {

        if(pass === '/home'){
            headerIconsProperties.value[0].bgcolor = "#00E0FF";
            headerIconsProperties.value[1].bgcolor = "#EFEFF0";
            headerIconsProperties.value[2].bgcolor = "#EFEFF0";
        }else if(pass === '/blog'){
            headerIconsProperties.value[0].bgcolor = "#EFEFF0";
            headerIconsProperties.value[1].bgcolor = "#00E0FF";
            headerIconsProperties.value[2].bgcolor = "#EFEFF0";
        }else if(pass === '/twitter'){
            headerIconsProperties.value[0].bgcolor = "#EFEFF0";
            headerIconsProperties.value[1].bgcolor = "#EFEFF0";
            headerIconsProperties.value[2].bgcolor = "#00E0FF";
        }
    }

// -----------------------------------------------------------------------------------------
// DOMライフサイクル
// -----------------------------------------------------------------------------------------

    onMounted(() :void => {

        let route = useRoute()
        let pass = route.path

        changeHeaderIconColor(pass)

    })

</script>


<template>
    <div class="w-[100%] h-[90px] bg-BGwhite fixed">
        <!-- PC表示 -->
        <div class="hidden sm:flex w-[100%] h-[80px] pt-[20px]">
            <div class="w-[400px] h-[100%] flex items-center">
                <h4 class="w-[100%] text-center fontZenDoc text-[30px]">Atsuhiro&nbsp;Ishikawa</h4>
            </div>
            <div class="w-[calc(100%-400px)] h-[100%] pr-[30px] flex items-center justify-end space-x-4">
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/home">
                        <div @click="changeHeaderIconColor('/home')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[0].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/homeIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">Home</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/blog">
                        <div @click="changeHeaderIconColor('/blog')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[1].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/blogIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">Blog</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/home">
                        <div @click="changeHeaderIconColor('/home')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[2].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/twitterIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">X</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- スマホ表示 -->
        <div class="sm:hidden flex w-[100%] h-[100%] pt-[20px]">
            <div class="w-[150px] h-[100%] flex flex-col items-center">
                <h4 class="w-[100%] h-[30%] pt-[10px] text-center fontZenDoc text-[20px]">Atsuhiro</h4>
                <h4 class="w-[100%] h-[30%] pt-[15px] text-center fontZenDoc text-[20px]">Ishikawa</h4>
            </div>
            <div class="w-[calc(100%-150px)] h-[100%] flex items-center justify-end pr-[10px]">
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/home">
                        <div @click="changeHeaderIconColor('/home')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[0].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/homeIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">Home</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/blog">
                        <div @click="changeHeaderIconColor('/blog')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[1].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/blogIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">Blog</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="w-[60px] h-[60px] p-[4px]">
                    <NuxtLink to="/home">
                        <div @click="changeHeaderIconColor('/home')" class="w-[100%] h-[100%] rounded-[6px] drop-shadow hover:border-solid hover:border hover:border-Lblue" :style="{background: `${headerIconsProperties[2].bgcolor}`}">
                            <div class="w-[100%] h-[70%] flex items-center justify-center">
                                <img class="w-[30px] h-[30px]" src="@/public/twitterIcon.png">
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center">
                                <p class="w-[100%] h-[100%] fontZenDoc text-center text-[10px]">X</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="w-[100%] h-[6px]">
            <div class="w-[100%] h-[3px] borderGradationColor"></div>
        </div>
    </div>
</template>

<style>

.fontZenDoc {
    font-family: "Zen Dots", sans-serif;
}

.borderGradationColor {
    background: linear-gradient(to right, #00E0FF, #1400F9);
}

.topGradientBorder{
    border: 5px solid;
    border-image: linear-gradient(135deg, #00E0FF, #1400F9) 1;
    background-color: rgb(255, 255, 255, 0);
}


</style>