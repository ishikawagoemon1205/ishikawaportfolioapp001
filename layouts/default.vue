<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// interface
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// ref
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// useState
// -----------------------------------------------------------------------------------------

    const useStateModalStyle = useState<{property: boolean}>('currentModalStyle');

    const useStateNoteStyle = useState<{property: boolean}>('currentNoteStyle');

// -----------------------------------------------------------------------------------------
// computed
// -----------------------------------------------------------------------------------------

    const modalStyle = computed(
        ():any => {
        return useStateModalStyle.value
    });

    const noteStyle = computed(
        ():boolean => {
        return useStateNoteStyle.value.property
    });

    const test = computed(
        ():any => {
            return useStateNoteStyle.value
        }
    )


// -----------------------------------------------------------------------------------------
// DOMライフサイクルフック
// -----------------------------------------------------------------------------------------

    onMounted(async () => {
            
        useStateModalStyle.value= false;
    
    });


// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------


</script>

<template>
    <div class="w-screen h-screen relative">
        <div class="absolute w-[100%] h-[100%]">
            <Header class="z-[100] px-[4%]"></Header>
            <slot/>
            <Footer class="bottom-0 z-[100] px-[4%]"></Footer>
        </div>
        <!-- モーダル -->
        <div v-if="useStateModalStyle" class="absolute w-[100%] h-[100%] z-[200]">
            <div class="w-[100%] h-[100%] fixed bg-Dgray bg-opacity-50">
                <ModalsCreatnotemodal></ModalsCreatnotemodal>
            </div>
        </div>
        <!-- ノート表示 -->
         <!-- 以下でuseState関連のエラーが出るためいったんコメントアウト -->
        <!-- <div v-if="noteStyle" class="absolute w-[100%] h-[100%] z-[200]">
            <div class="w-[100%] h-[100%] fixed bg-Dgray bg-opacity-50">
                <ModalsDetailnote></ModalsDetailnote>
            </div>
        </div> -->
    </div>
</template>

<style>
html {
    font-family: "BIZ UDPGothic", sans-serif;
} 
</style>