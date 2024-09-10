<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// import
// -----------------------------------------------------------------------------------------
    

// -----------------------------------------------------------------------------------------
// interface
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// firebase　設定
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// ref computed
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// useState
// -----------------------------------------------------------------------------------------

    const useStateNoteStyle = useState<{property: boolean}>('currentNoteStyle');

// -----------------------------------------------------------------------------------------
// computed
// -----------------------------------------------------------------------------------------

    const notePropety = computed(
        ():any => {
            return useStateNoteStyle.value
    });

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const onclickBack = () => {
        useStateNoteStyle.value.property = false;
    }

</script>

<template>
    <div class="w-[100%] h-[100%] flex justify-center items-center">
        <div class="w-[1000px] h-[600px] rounded-[10px] bg-BGwhite">
            <div class="w-[100%] h-[60px] px-[20px] flex items-center space-x-[4px]">
                <LeftOutlined />
                <button @click="onclickBack">戻る</button>
            </div>
            <div class="w-[100%] h-[540px] px-[20px] overflow-auto">
                <div class="w-[100%] h-[70px]">
                    <h2 class="text-[40px]">{{ notePropety.selectNoteTitle }}</h2>
                </div>
                <div class="w[100%] h-[10px] flex items-center justify-center">
                    <div class="w-[100%] h-[2px] borderGradationColor"></div>
                </div>
                <div v-for="item in notePropety.selectNoteContent">
                    <div class="w-[100%] h-[70px] py-[10px]">
                        <h2 class="text-[40px]">{{ item.part1 }}</h2>
                    </div>
                    <div class="w-[100%] h-auto py-[10px]">
                        <h2 class="text-[20px]">{{ item.part2 }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>

.borderGradationColor {
    background: linear-gradient(to right, #00E0FF, #1400F9);
}

</style>