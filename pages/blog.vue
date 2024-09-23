<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// import
// -----------------------------------------------------------------------------------------
    
    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, getDocs, query, addDoc, Timestamp } from 'firebase/firestore';

// -----------------------------------------------------------------------------------------
// interface
// -----------------------------------------------------------------------------------------

    interface programOption {
        value: string;
    }

    interface inquireNoteData {
        title: string;
        content: any;
        programType: string;
        createdAt: Timestamp;
    }

// -----------------------------------------------------------------------------------------
// firebase　設定
// -----------------------------------------------------------------------------------------

    // firebaseの情報を取得

        // firebaseの設定を環境変数から取得する　nuxt.confのfirebaseConfigを読み込むことでfirebaseと接続を行う
        const firebaseConfig = useRuntimeConfig().public.firebaseConfig;
        // firebaseを初期化する
        const app = initializeApp(firebaseConfig);
        // databaseのインターフェイスを取得する
        const db = getFirestore(app);

// -----------------------------------------------------------------------------------------
// firebase　クエリ処理
// -----------------------------------------------------------------------------------------

    const firebaseGetNotedata = async () => {
        let q = query(
            collection(db,'notedata')
        );
        let querySnapshot1 = await getDocs(q);
        let obtainedData:any = [];
        querySnapshot1.forEach((doc) => {
            obtainedData.push({
                id: doc.id,
                time: doc.data().createdAt,
                title: doc.data().titile,
                content: doc.data().content,
                programType: doc.data().programType,
            });
        });
        noteList.value = obtainedData;
    }

// -----------------------------------------------------------------------------------------
// ref
// -----------------------------------------------------------------------------------------

    const skillButtonColor = ref({
        HTML: "#ffffff",
        CSS: "#ffffff",
        JavaScript: "#ffffff",
        TypeScript: "#ffffff",
        vue: "#ffffff",
        Nuxt: "#ffffff",
        Ptython: "#ffffff",
        AWS: "#ffffff",
        all: "#ffffff",
    });

    const skillDisplay = ref({
        HTML: false,
        CSS: false,
        JavaScript: false,
        TypeScript: false,
        vue: false,
        Nuxt: false,
        Ptython: false,
        AWS: false,
        Flutter: false,
    })

    const noteList:any = ref();
    const selectNoteListArray:any = ref([]);
    const selectNoteList:any = ref();

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

    const EnabledNoteStyle = useState<{property: boolean}>(
        'currentNoteStyle',
        () => {
            return {
                property:<boolean> false,
                selectNoteId:<string> "",
                selectNoteTitle:<string> "",
                selectNoteTimeNanoseconds:<number> 0,
                selectNoteTimeSeconds:<number> 0,
                selectNoteProgramtype:<string> "",
                selectNoteContent:<any> undefined,
            }
        }
    )

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const allClearSkillButton = () => {
        Object.keys(skillButtonColor.value).forEach(key => {
            skillButtonColor.value[key] = "#ffffff";
        })
    }

    const setupSelectNoteList = (property) => {

        selectNoteListArray.value.splice(0,selectNoteListArray.value.length);

        if(property === "all"){
            selectNoteListArray.value.push(noteList.value);
        }else{
            selectNoteListArray.value.push(noteList.value.filter(item => item.programType === property));
        }

        let list:any = [];
        console.log(selectNoteListArray.value)
        selectNoteListArray.value.forEach((subArray, index) => {

            subArray.forEach((innerArray, index) => {
                console.log(innerArray)
                list.push(innerArray)
            })
        });
        selectNoteList.value = list;
    }

// -----------------------------------------------------------------------------------------
// テンプレート内で起動する関数
// -----------------------------------------------------------------------------------------

    const clickButton = (property:string) => {

        allClearSkillButton();

        setupSelectNoteList(property);

        if(property === "HTML"){
            skillButtonColor.value.HTML = "#00E0FF";
        }else if(property === "CSS"){
            skillButtonColor.value.CSS = "#00E0FF";
        }else if(property === "JavaScript"){
            skillButtonColor.value.JavaScript = "#00E0FF";
        }else if(property === "TypeScript"){
            skillButtonColor.value.TypeScript = "#00E0FF";
        }else if(property === "vue"){
            skillButtonColor.value.vue = "#00E0FF";
        }else if(property === "Nuxt"){
            skillButtonColor.value.Nuxt = "#00E0FF";
        }else if(property === "Ptython"){
            skillButtonColor.value.Ptython = "#00E0FF";
        }else if(property === "AWS"){
            skillButtonColor.value.AWS = "#00E0FF";
        }else if(property === "all"){
            skillButtonColor.value.all = "#00E0FF";
        }
    }

    const changeModalStyleEnabled = () => {
        EnabledModalStyle.value = true;
    }

    const changeNoteStyleEnabled = (item:any) => {
        EnabledNoteStyle.value.property = true;
        console.log(EnabledNoteStyle.value);
        console.log(EnabledNoteStyle.value.property);
        EnabledNoteStyle.value.selectNoteId = item.id;
        EnabledNoteStyle.value.selectNoteTitle = item.title;
        EnabledNoteStyle.value.selectNoteTimeNanoseconds = item.time.nanoseconds;
        EnabledNoteStyle.value.selectNoteTimeSeconds = item.time.seconds;
        EnabledNoteStyle.value.selectNoteProgramtype = item.programType;
        EnabledNoteStyle.value.selectNoteContent = item.content;
    }

// -----------------------------------------------------------------------------------------
// DOMライフサイクルフック
// -----------------------------------------------------------------------------------------

    onMounted(async () => {
            
        firebaseGetNotedata();

    });

</script>

<template>
    <div class="w-[100%] h-[100%] bg-BGwhite relative z-[1]">
        <div class="absolute w-[100%] h-auto top-[90px]">
            <!-- ページ構成 -->
            <!-- PC表示 -->
            <div class="w-[100%] h-[100%] px-[4%] py-[0%] flex bg-BGwhite">
                <!-- コンテンツゾーン -->
                <div class="w-[calc(100%-250px)] h-[100%] bg-BGwhite">
                    <div class="w-[100%] h-[calc(100vh-140px)] bg-BGwhite flex flex-wrap overflow-auto">
                        <div v-for="item in selectNoteList" :key="item.id">
                            <div class="w-[300px] h-[400px] m-[10px] p-[10px] rounded-[10px] bg-[#ffffff] relative border-[#ffffff] hover:border-2 hover:border-Lblue transition duration-300">
                                <div class="absolute top-[0] w-[280px] h-[70px] flex items-center">
                                    <h4 class="text-[20px] font-bold">{{ item.title }}</h4>
                                </div>
                                <div class="absolute top-[70px] w-[280px] h-[10px] flex items-center">
                                    <div class="w-[100%] h-[2px] bg-[#BFBFBF]"></div>
                                </div>
                                <div class="absolute top-[90px] w-[280px] h-[60px] rounded-[10px]">
                                    <h6 class="text-[16px] font-bold">
                                        {{ item.content[0].part1 }}
                                    </h6>
                                </div>
                                <div class="absolute top-[120px] w-[280px] h-[160px] overflow-hidden">
                                    <h6 class="text-[12px]">{{ item.content[0].part2 }}</h6>
                                </div>
                                <div class="absolute top-[350px] w-[280px] h-[40px] flex items-center justify-center">
                                    <a-button @click="changeNoteStyleEnabled(item)" type="text">詳細はこちら</a-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[250px] h-[calc(100vh-140px)]">
                    <div class="w-[250px] h-[80%] fixed w-[200px] h-[500px] p-[10px] space-y-[10px]">
                        <ButtonsAll @click="clickButton('all')" :style="{background: skillButtonColor.all}"></ButtonsAll>
                        <ButtonsHtml @click="clickButton('HTML')" :style="{background: skillButtonColor.HTML}"></ButtonsHtml>
                        <ButtonsCss @click="clickButton('CSS')" :style="{background: skillButtonColor.CSS}"></ButtonsCss>
                        <ButtonsJavascript @click="clickButton('JavaScript')" :style="{background: skillButtonColor.JavaScript}"></ButtonsJavascript>
                        <ButtonsTypescript @click="clickButton('TypeScript')" :style="{background: skillButtonColor.TypeScript}"></ButtonsTypescript>
                        <ButtonsVue @click="clickButton('vue')" :style="{background: skillButtonColor.vue}"></ButtonsVue>
                        <ButtonsNuxtjs  @click="clickButton('Nuxt')" :style="{background: skillButtonColor.Nuxt}"></ButtonsNuxtjs>
                        <ButtonsPython  @click="clickButton('Ptython')" :style="{background: skillButtonColor.Ptython}"></ButtonsPython>
                        <ButtonsAws  @click="clickButton('AWS')" :style="{background: skillButtonColor.AWS}"></ButtonsAws>
                    </div>
                    <div class="w-[250px] h-[10%] mt-[calc(55vh)] fixed">
                        <button @click="changeModalStyleEnabled" class=" w-[200px] h-[60px] rounded-[5px] bg-blue hover:bg-Lblue transition duration-300">
                            <a-tooltip title="誰でもご自由に追加してください" color="blue">
                                <div class="flex items-center justify-center space-x-[8px]">
                                    <PlusOutlined :style="{color: '#ffffff'}" />
                                    <h4 class="text-[#ffffff]">Add</h4>
                                </div>
                            </a-tooltip>
                        </button>
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



<!-- [[Target]]
: 
Array(6)
0
: 
{id: 'A7xDAYyKsn04y7H6m1du', time: _Timestamp, title: '22:16', content: Array(3), programType: 'TypeScript'}
1
: 
{id: 'FlhDJMzC7xCPpQIS1j6u', time: _Timestamp, title: 'TypeScript楽しい', content: Array(4), programType: Array(4)}
2
: 
{id: 'J9DG9rO0JqNUsG3MpTEz', time: _Timestamp, title: '22:20', content: Array(3), programType: 'TypeScript'}
3
: 
{id: 'PPh2vzIUG4Z5X5axaunC', time: _Timestamp, title: '', content: Array(2), programType: Array(2)}
4
: 
{id: 'apWYU6eIaEG9ChSFvLlp', time: undefined, title: undefined, content: Array(2), programType: ''}
5
: 
{id: 'x2HosVZ1HyHfFockMpp0', time: _Timestamp, title: 'Java', content: Array(4), programType: ''}
length
: 
6 -->
