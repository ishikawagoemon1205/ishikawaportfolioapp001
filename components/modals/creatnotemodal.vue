<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// useState
// -----------------------------------------------------------------------------------------

    const useStateModalStyle = useState('currentModalStyle');

// -----------------------------------------------------------------------------------------
// computed
// -----------------------------------------------------------------------------------------

const modalStyle = computed(
        ():boolean => {
        return useStateModalStyle.value.property
    })

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const changeDisabledModalStyle = () => {
        useStateModalStyle.value.property = false;
    }


</script>

<template>
    <div class="w-[100%] h-[100%] flex justify-center items-center">
        <div class="w-[800px] h-[500px] rounded-[10px] bg-BGwhite">
            <div class="w-[100%] h-[50px] rounded-[10px] px-[20px] flex justify-end items-center">
                <Button @click="changeDisabledModalStyle">
                    <CloseOutlined :style="{ color: '#000000' , fontSize: '28px' }"/>
                </Button>
            </div>
        </div>
    </div>
</template>