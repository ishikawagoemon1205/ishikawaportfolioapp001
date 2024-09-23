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
// ref computed
// -----------------------------------------------------------------------------------------

    const displayCurrentPageIndex = ref(1);
    const dataCurrentPageIndex = computed(
        (): number => {
            return displayCurrentPageIndex.value - 1;
        }
    );
    const displayTotalPage = computed(
        (): number => {
            return contentsDate.value.content.length * 10;
        }
    );
    const contentsDate = ref({
        titile: "",
        content:[
            ["",""],
        ],
        programType: "",
    });
    const addNoteProgramOptions = ref<programOption[]>([
        {value:"HTML"},
        {value:"CSS"},
        {value:"JavaScript"},
        {value:"TypeScript"},
        {value:"vue"},
        {value:"Nuxt"},
        {value:"Ptython"},
        {value:"AWS"},
    ])

    const validationDate = ref(); // 配列　[A,B] A:配列のエラー値 B:contentsDate.contentの入力がされていない配列のindex番号
    const validationValue = ref('');

// -----------------------------------------------------------------------------------------
// useState
// -----------------------------------------------------------------------------------------

    const useStateModalStyle = useState<{property: boolean}>('currentModalStyle');

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    const changeDisabledModalStyle = () => {
        useStateModalStyle.value = false;
    };

    const modalValidationChecker = () => {

        // コンテンツデータに入力漏れがないかをチェックし、以下のように結果を表示させる。
        // 返された数字が 0:値に問題なし -1:1つ目の値が空　-2:2つ目の値が空　-3:両方とも空
        let validationErrorIndexs = contentsDate.value.content
            .map((arrayValue,index) =>
            arrayValue[0] === '' 
                    ? arrayValue[1] === '' ? -3 : -1
                    : arrayValue[1] === '' ? -2 : 0
            );
        // 上記の結果から0未満要するに入力漏れのあるindex番号とエラー数値を配列で表示する
        let validationErrorIndex = validationErrorIndexs
            .flatMap((arrayValue,index) =>
                arrayValue < 0
                    ? [arrayValue,index] : [] 
            );
        validationDate.value = validationErrorIndex

        if(validationDate.value.length === 0){
            validationValue.value = "";
            contentsDate.value.content.push(
                ["",""]
            );
            displayCurrentPageIndex.value = displayCurrentPageIndex.value + 1;
        }else{
            displayCurrentPageIndex.value = validationDate.value[1]+1;
            if(validationDate.value[0] === -1){
                validationValue.value = "コンテンツタイトルを入力してください";
            }else if(validationDate.value[0] === -2){
                validationValue.value = "コンテンツ説明文を入力してください";
            }else if(validationDate.value[0] === -3){
                validationValue.value = "コンテンツタイトル、説明文を入力してください";
            }
        }

    }

    const addNewContentPage = () => {

        modalValidationChecker();

        displayCurrentPageIndex.value = contentsDate.value.content.length;

    };

    const deleteCurrentPage = () => {

        if(contentsDate.value.content.length > 1){
            if(confirm("現在のページを削除しますか？")){
                contentsDate.value.content.splice(dataCurrentPageIndex.value,1);
                displayCurrentPageIndex.value = displayCurrentPageIndex.value - 1; 
            }
        };

    };

    const deleteModal = () => {

        if(confirm("すべてのノートを削除しますか？")){
            contentsDate.value.titile = "";
            contentsDate.value.content.splice(0,contentsDate.value.content.length);

            contentsDate.value.content.push(["",""]);

            changeDisabledModalStyle();
        };

    };

    const submitNote = async () => {
        
        modalValidationChecker();

        let sendContentDate = contentsDate.value.content;
        console.log(sendContentDate)

        const convertToObjects = (contentWrapper:any) => {
            return contentWrapper.map((item, index) => {
                let obj = {};
                item.forEach((value, i) => {
                    obj[`part${i+1}`] = value;
                })
                return obj;
            });
        };

        console.log(convertToObjects(sendContentDate))

        if(validationDate.value.length === 0){
            if(confirm("ノートを登録します。よろしいですか？")){
                try {
                    let titile = contentsDate.value.titile;
                    let content = convertToObjects(contentsDate.value.content);
                    let programType = contentsDate.value.programType;
                    let docRef = await addDoc(collection(db,'notedata'),{
                        titile: titile,
                        content: content,
                        programType: programType,
                        createdAt: new Date(),
                    });
                    contentsDate.value.titile = "";
                    contentsDate.value.content.splice(0,contentsDate.value.content.length);
                    contentsDate.value.programType = "";
                    contentsDate.value.content.push(["",""]);
                    changeDisabledModalStyle();
                } catch (e) {
                    confirm('送信エラーが発生しました');
                }
            }
        }

    }

</script>

<template>
    <div class="w-[100%] h-[100%] flex justify-center items-center">
        <div class="w-[800px] h-[500px] rounded-[10px] bg-BGwhite">
            <div class="w-[100%] h-[10%] rounded-[10px] px-[20px] flex justify-end items-end">
                <Button @click="changeDisabledModalStyle">
                    <CloseOutlined :style="{ color: '#000000' , fontSize: '28px' }"/>
                </Button>
            </div>
            <div class="w-[100%] h-[90%] p-[30px]">
                <div class="w-[100%] h-[100%]">
                    <div class="w-[100%] h-[60%] overflow-y-auto">
                        <div class="w-[100%] h-[70px]">
                            <div class="w-[100%] h-[60px] p-[4px] flex justify-center">
                                <input type="text" v-model="contentsDate.titile" placeholder="タイトルを入力してください"  class="text-[30px] w-[98%] h-[100%] bg-BGwhite  order-none focus:outline-none font-bold">
                            </div>
                            <div class="w-[100%] h-[10px] p-[4px] flex items-center">
                                <div class="w-[100%] h-[2px] rounded-[10px] borderGradationColor"></div>
                            </div>
                        </div>
                        <div class="w-[100%] h-[40px] p-[4px] flex justify-center">
                            <input type="text" v-model="contentsDate.content[dataCurrentPageIndex][0]" placeholder="コンテンツタイトルを入力してください"  class="text-[20px] w-[98%] h-[100%] bg-BGwhite order-none focus:outline-none font-bold">
                        </div>
                        <div class="w-[100%] h-auto p-[4px] flex justify-center">
                            <input type="text" v-model="contentsDate.content[dataCurrentPageIndex][1]" placeholder="コンテンツの説明文を入力してください"  class="text-[15px] w-[98%] h-[100%] bg-BGwhite order-none focus:outline-none">
                        </div>
                    </div>
                    <div class="w-[100%] h-[30px] px-[10px] flex items-center">
                        <h4 class="text-red">{{ validationValue }}</h4>
                    </div>
                    <div class="w-[100%] h-[40px]">
                        <a-pagination v-model:current="displayCurrentPageIndex" v-model:total="displayTotalPage" />
                    </div>
                    <div class="w-[100%] h-[40px]">
                        <a-auto-complete v-model:value="contentsDate.programType" :options="addNoteProgramOptions" style="width: 200px;" placeholder="言語の種類を選択"></a-auto-complete>
                    </div>
                    <div class="w-[100%] h-[50px] px-[10px] flex items-center space-x-2">
                        <a-tooltip title="ページを追加" color="blue">
                            <button @click="addNewContentPage" class="w-[40px] h-[40px] rounded-[6px] flex justify-center items-center bg-gray hover:bg-blue transition duration-300">
                                <PlusOutlined :style="{color: '#ffffff'}" />
                            </button>
                        </a-tooltip>
                        <a-tooltip title="ページを削除" color="blue">
                            <button @click="deleteCurrentPage" class="w-[40px] h-[40px] rounded-[6px] flex justify-center items-center bg-gray hover:bg-blue transition duration-300">
                                <MinusOutlined :style="{color: '#ffffff'}" />
                            </button>
                        </a-tooltip>
                        <a-tooltip title="すべてのページ削除" color="blue">
                            <button @click="deleteModal" class="w-[40px] h-[40px] rounded-[6px] flex justify-center items-center bg-gray hover:bg-blue transition duration-300">
                                <DeleteOutlined :style="{color: '#ffffff'}" />
                            </button>
                        </a-tooltip>
                        <a-tooltip title="送信する" color="blue">
                            <button @click="submitNote" class="w-[40px] h-[40px] rounded-[6px] flex justify-center items-center bg-gray hover:bg-blue transition duration-300">
                                <SendOutlined :style="{color: '#ffffff'}" />
                            </button>
                        </a-tooltip>
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