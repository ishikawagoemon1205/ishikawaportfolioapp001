<script setup lang="ts">

// -----------------------------------------------------------------------------------------
// import
// -----------------------------------------------------------------------------------------

import type {userDate} from '@/interfaces'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, addDoc } from 'firebase/firestore';

// -----------------------------------------------------------------------------------------
// interface
// -----------------------------------------------------------------------------------------

    interface Skill {
        name: string;
        bg1: string;
        bg2: string;
        pass: string;
        assessment: number;
        experience: number;
        studied: number;
        focus: number;
        description: string;
        framework1: string;
        framework1status: number;
        framework2: string;
        framework2status: number;
        framework3: string;
        framework3status: number;
        framework4: string;
        framework4status: number;
    }

    interface Portfolio {
        name: string;
        period: string;
        backgroundImg: string;
        skill1: string;
        skill2: string;
        skill3: string;
        link: any;
    }

    interface inquiryUserData {
        isVisible: boolean;
        name: string;
        emailAddress: string;
        inquiry: string;
    }


// -----------------------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------------------

    // 各スキルの詳細情報のRef
    const skillItems:Ref<Skill[]> = ref([
        {name: "HTML", bg1: "#FF7000", bg2: "#FF4900", pass: "htmlIcon.png", assessment: 5, experience: 2, studied: 2, focus: 1, description: "HTMLは主にWeb開発の基盤として約2年間、学習と実務を行ってまいりました。過去のプロジェクトではレスポンシブデザインや高度な図形描写などに取り組みユーザーエクスペリエンスを向上させることに成功しました。現在はSEOの最適化方法などを部分を学習しております。", framework1: "",framework1status: 0, framework2: "", framework2status: 0, framework3: "", framework3status: 0, framework4: "", framework4status: 0},
        {name: "CSS", bg1: "#6FBEEE", bg2: "#3C8FDD", pass: "cssIcon.png", assessment: 5, experience: 2, studied: 2, focus: 1 , description: "HTMLの学習と並走してCSSに関しても技術を高めました。もともとUIUXデザインをメインで行っていたこともあり、高度なユーザーインターフェースの提案から実装まで行うことができます。またTailwindCssなどのフレームワークを活用しスピーディ且つ可読性の高いコード作成が可能です。", framework1: "Tailwind CSS",framework1status: 5, framework2: "", framework2status: 0, framework3: "", framework3status: 0, framework4: "", framework4status: 0},
        {name: "JavaScript", bg1: "#F2B807", bg2: "#F28907", pass: "jsIcon.png", assessment: 4, experience: 1, studied: 2, focus: 3 , description: "JavaScriptは主にWebアプリケーションの開発を行い、現在参画しているプロジェクトでも使用している最も自分が得意とする言語です。ただ動作するプログラムではなくできる限り短く、可読性の高いコードを作成を心がけております。TypeScriptも開発経験があるため対応可能です。", framework1: "vue.js",framework1status: 3, framework2: "Nuxt.js", framework2status: 3, framework3: "TypeScript", framework3status: 3, framework4: "Node.js", framework4status: 2},
        {name: "TypeScript", bg1: "#5FCDD9", bg2: "#04BFAD", pass: "jsIcon.png", assessment: 2, experience: 1, studied: 1, focus: 4 , description: "", framework1: "",framework1status: 0, framework2: "", framework2status: 0, framework3: "", framework3status: 0, framework4: "", framework4status: 0},
        {name: "vue.js", bg1: "#066464", bg2: "#033649", pass: "vueIcon.png", assessment: 3, experience: 1, studied: 1, focus: 3 , description: "フロントエンド開発では主にNuxt.jsを使用しており、そのため必然的にvue.jsも学習してまいりました。Ant-Design-vueなどのフレームワークを活用した高度なインターフェースを作成することが可能です。", framework1: "Nuxt.js",framework1status: 3, framework2: "Ant Design", framework2status: 4, framework3: "Vue Router", framework3status: 3, framework4: "", framework4status: 0},
        {name: "Nuxt.js", bg1: "#29F294", bg2: "#1F92BF", pass: "favicon.ico", assessment: 3, experience: 1, studied: 1, focus: 3, description: "vue.jsと並走してフロントエンド開発使用してまいりました。当サイトもNuxt.jsで作成されております。SNSアプリや業務管理システムなどのWebアプリケーションの開発経験があります。", framework1: "auto-animate",framework1status: 2, framework2: "google-signin", framework2status: 2, framework3: "", framework3status: 0, framework4: "", framework4status: 0},
        {name: "Python", bg1: "#D9B504", bg2: "#1B6C8C", pass: "pythonIcon.png", assessment: 2, experience: 0, studied: 1, focus: 5, description: "現在最も学習しているプログラミング言語です。実務経験はありませんが、webスクレイピングや簡単なAI作成を独自で行った経験があります。土日返上で学習を続けているのですが、もし案件がございましたら積極的に参画させていただきたく思います。", framework1: "Django",framework1status: 2, framework2: "B-Soup", framework2status: 2, framework3: "Pandas", framework3status: 2, framework4: "", framework4status: 0},
        {name: "AWS", bg1: "#F2A007", bg2: "#D95D41", pass: "awsIcon.png", assessment: 1, experience: 0, studied: 1, focus: 4, description: "AWSは実務経験はありませんが、「CodeCommit」「Lambda」「AWS Amplify」「S3」などを個人開発レベルで使用した経験があります。", framework1: "CodeCommit",framework1status: 2, framework2: "Lambda", framework2status: 1, framework3: "Amplify", framework3status: 2, framework4: "S3", framework4status: 1},
        {name: "Nocode", bg1: "#0487D9", bg2: "#037F8C", pass: "wordpressIcon.png", assessment: 4, experience: 3, studied: 3, focus: 1 , description: "UIUXデザインを行ていた際は、WordPress、Wix、Bubbleなどのノーコードツールで開発を行っておりました。プロトタイプ開発などでスピーディな開発が可能です。", framework1: "WordPress",framework1status: 3, framework2: "Wix", framework2status: 5, framework3: "Bubble", framework3status: 3, framework4: "Adalo", framework4status: 2},
    ]);

    // スキル詳細表示カ所の値を保持するRef
    const skillDescription:Ref<Skill> = ref({
        name: "HTML",
        bg1: "#FF7000",
        bg2: "#FF4900",
        pass: "htmlIcon.png",
        assessment: 4, 
        experience: 2, 
        studied: 2, 
        focus: 1, 
        description: "HTMLは主にWeb開発の基盤として約2年間、学習と実務を行ってまいりました。過去のプロジェクトではレスポンシブデザインや高度な図形描写などに取り組みユーザーエクスペリエンスを向上させることに成功しました。現在はSEOの最適化方法などを部分を学習しております。",
        framework1: "",
        framework1status: 0,
        framework2: "",
        framework2status: 0,
        framework3: "",
        framework3status: 0,
        framework4: "",
        framework4status: 0,
    })

    // ポートフォリオのコンテンツの値を保持するRef
    const portfoliocontents:Ref<Portfolio[]> = ref([ 
        {name: "下北沢自動車学校", period: "2024/05" , backgroundImg: "portfolio001.png" , skill1: "htmlIcon.png" , skill2: "cssIcon.png" , skill3: "wordpressIcon.png" , link: "https://www.shimokitazawa-ds.com/" },
        {name: "ギャラリー国立", period: "2024/05" , backgroundImg: "portfolio002.png" , skill1: "htmlIcon.png" , skill2: "cssIcon.png" , skill3: "wix.png" , link: "" },
    ])

    // 問い合わせフォームの入力値を保持するRef
    const inputCurrentUserData:Ref<inquiryUserData> = ref({
        isVisible: true,
        name: "",
        emailAddress: "",
        inquiry: "",
    })

    // 問い合わせフォームの入力値をtsで保持するRef
    const setCurrentUserData:Ref<inquiryUserData> = ref({
        isVisible: false,
        name: "",
        emailAddress: "",
        inquiry: "",
    })

    // 問い合わせ完了画面の情報を保持するRef
    const finishInquiry:Ref<boolean> = ref(false)

    // コンタクトフォームのバリデーションエラーを表示するRef
    const validationErrorAlert = ref({
        
        name: {
            message: "",
        },
        emailAddress: {
            message: "",
        },
        inquiry: {
            message: "",
        },
    })

    // ユーザーデータを格納するRef
    const userList:any = ref([])

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
// DBの情報取得 クエリ処理
// -----------------------------------------------------------------------------------------

    // firebaseの情報を取得

        // firebaseの設定を環境変数から取得する　nuxt.confのfirebaseConfigを読み込むことでfirebaseと接続を行う
        const firebaseConfig = useRuntimeConfig().public.firebaseConfig;
        // firebaseを初期化する
        const app = initializeApp(firebaseConfig);
        // databaseのインターフェイスを取得する
        const db = getFirestore(app);

        // クエリ処理

            // firebaseのユーザーデータ取得し、
            const firebaseGetUserDate  = async () => {
                // portfolio001をクエリする
                let q = query(
                    collection(db,'portfolio001')
                )
                // クエリからドキュメントを取得
                let querySnapshot1 = await getDocs(q);
                // ドキュメントをref指定しているuserListに格納する
                querySnapshot1.forEach((doc) => {
                    userList.value.push({
                        id: doc.id,
                        name: doc.data().name,
                        emailAddress: doc.data().emailAddress,
                        inquire: doc.data().inquire,
                    })
                })
                console.log(userList)
                console.log(userList.value[0].name)
            }

            

// -----------------------------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------------------------

    // メモ
    const stateOfUserDate = useState<{emailAddress: string, inquiry: string}>('stateIdOfUserDate', () => {
        return {
            emailAddress: inputCurrentUserData.value.emailAddress,
            inquiry: inputCurrentUserData.value.inquiry,
        }
    })

    // フォームを確認画面に変更する関数
    const setReviewInquiry = () => {

        // フォームの入力値をtsで保持するRefに入れ替える
        setCurrentUserData.value.name = inputCurrentUserData.value.name;
        setCurrentUserData.value.emailAddress = inputCurrentUserData.value.emailAddress;
        setCurrentUserData.value.inquiry = inputCurrentUserData.value.inquiry;
        inputCurrentUserData.value.name = "";
        inputCurrentUserData.value.emailAddress = "";
        inputCurrentUserData.value.inquiry = "";

        console.log("動作確認")

        // 入力確認のUIに切り替わる
        inputCurrentUserData.value.isVisible = false;
        setCurrentUserData.value.isVisible = true;

    }

    // 問い合わせ内容をfirebaseのdbに保存する関数
    const saveInquiryToFirebase = async () => {

        console.log("データ保存をトライ")

        try {
            let name = setCurrentUserData.value.name;
            let emailAddress = setCurrentUserData.value.name;
            let inquiry = setCurrentUserData.value.name;
            let docRef = await addDoc(collection(db, 'portfolio001'),{
                name: name,
                emailAddress: emailAddress,
                inquiry: inquiry,
                createdAt: new Date()
            })
        } catch (e) {
            console.error('Error adding document: ', e);
        }

    }

    const allClearSkillButtonColor = () => {

        for(let key in skillButtonColor.value){
            skillButtonColor.value[key] = "#ffffff"
        }
    }


// -----------------------------------------------------------------------------------------
// DOMライフサイクルフック
// -----------------------------------------------------------------------------------------

    onMounted(async () => {
        
        // ユーザー情報を取得
        // firebaseGetUserDate()

    });

// -----------------------------------------------------------------------------------------
// テンプレート内で起動する関数
// -----------------------------------------------------------------------------------------

    // Skillボタンをクリックしたい際に、スキル概要が切り替わる関数
    const onClickSkillButton = (property:string) => {

        console.log(`クリック名称:${property}`)

        // クリックしたスキルボタンの名称
        let onClickedSkillName = property;
        
        // スキル情報の詳細を持つRefに対してループ処理する
        for(let i = 0 ; i < skillItems.value.length ; i++){

            // クリックしたスキル名称とループしているスキル名称が同じとき処理を行う
            if(skillItems.value[i].name === onClickedSkillName){

                // skillDiscription内の値をすべて入れ替える

                skillDescription.value.name = skillItems.value[i].name;
                skillDescription.value.bg1 = skillItems.value[i].bg1;
                skillDescription.value.bg2 = skillItems.value[i].bg2;
                skillDescription.value.pass = skillItems.value[i].pass;
                skillDescription.value.assessment = skillItems.value[i].assessment;
                skillDescription.value.experience = skillItems.value[i].experience;
                skillDescription.value.studied = skillItems.value[i].studied;
                skillDescription.value.focus = skillItems.value[i].focus;
                skillDescription.value.description = skillItems.value[i].description;
                skillDescription.value.framework1 = skillItems.value[i].framework1;
                skillDescription.value.framework1status = skillItems.value[i].framework1status;
                skillDescription.value.framework2 = skillItems.value[i].framework2;
                skillDescription.value.framework2status = skillItems.value[i].framework2status;
                skillDescription.value.framework3 = skillItems.value[i].framework3;
                skillDescription.value.framework3status = skillItems.value[i].framework3status;
                skillDescription.value.framework4 = skillItems.value[i].framework4;
                skillDescription.value.framework4status = skillItems.value[i].framework4status;

                break;

            }

        }

    }

    // コンタクトフォームから送信確認ボタンを押したときに起動する関数
    const onCheckInquiryDates = () => {

        // バリデーションチェック

            // emailのバリデーション
                
                // バリデーションチェックコード
                let emailCheckCode:any = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

                // バリデーションに問題がないかを返す
                let emailCheckedAnswer:boolean = inputCurrentUserData.value.emailAddress.match(emailCheckCode) ? true : false;

            // 氏名に値が入っているかを確認するバリデーション
            let nameCheckedAnswer:boolean = inputCurrentUserData.value.name !== "" ? true : false;

            // 問い合わせ内容に値が入っているかを確認するバリデーション
            let inquiryCheckedAnswer:boolean = inputCurrentUserData.value.inquiry !== "" ? true : false;

        // バリデーションエラーメッセージを一度消す

        validationErrorAlert.value.name.message = "";
        validationErrorAlert.value.emailAddress.message = "";
        validationErrorAlert.value.inquiry.message = "";

        console.log(nameCheckedAnswer);
        console.log(emailCheckedAnswer);
        console.log(inquiryCheckedAnswer);

        // バリデーションの結果に応じて処理を行う
        if(nameCheckedAnswer === true){
            
            if(emailCheckedAnswer === true){

                if(inquiryCheckedAnswer === true){

                    // 確認画面を表示
                    setReviewInquiry();

                }else if(inquiryCheckedAnswer === false){

                    validationErrorAlert.value.inquiry.message = "問い合わせ内容が入力されていません";

                }

            }else if(emailCheckedAnswer === false){

                validationErrorAlert.value.emailAddress.message = "メールアドレスの入力が正しくありません";

                if(inquiryCheckedAnswer === true){

                }else if(inquiryCheckedAnswer === false){
                    
                    validationErrorAlert.value.inquiry.message = "問い合わせ内容が入力されていません";

                }

            }

        }else if(nameCheckedAnswer === false){

            validationErrorAlert.value.name.message = "氏名が入力されていません";
            
            if(emailCheckedAnswer === true){

                if(inquiryCheckedAnswer === true){

                }else if(inquiryCheckedAnswer === false){

                    validationErrorAlert.value.inquiry.message = "問い合わせ内容が入力されていません";

                }

            }else if(emailCheckedAnswer === false){

                validationErrorAlert.value.emailAddress.message = "メールアドレスの入力が正しくありません";

                if(inquiryCheckedAnswer === true){

                }else if(inquiryCheckedAnswer === false){

                    validationErrorAlert.value.inquiry.message = "問い合わせ内容が入力されていません";

                }

            }

        }

    }

    // フォームの送信ボタンを押したときに起動する関数
    const sendInquiryDates = () => {

        saveInquiryToFirebase();
        setCurrentUserData.value.isVisible = false;
        finishInquiry.value = true;
    }

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
    <div class="w-[100%] h-[100%] relative z-[1]">
        <div class="absolute w-[100%] h-[calc(100%-140px)] top-[90px]">
            <!-- トップコンテンツ -->
            <!-- PC表示 -->
            <div class="hidden sm:flex w-[100%] h-[100%] px-[4%] py-[2%] bg-BGwhite">
                <div class="w-[50%] h-[100%] bg-Dblue">
                    <div class="w-[100%] h-[50%] pt-[100px] flex flex-col items-center justify-center">
                        <h4 class="fontZenDoc text-[50px] text-white">Welcome to</h4>
                        <h4 class="fontZenDoc text-[50px] text-white">My Portfolio!</h4>
                    </div>
                    <div class="w-[100%] h-[50%] flex flex-col items-center justify-center space-y-[30px]">
                        <div class="w-[70%] h-[30px] rounded-[6px] flex items-center justify-center bg-white text-Dblue">
                            <button>ブログはこちら</button>
                        </div>
                        <div class="w-[70%] h-[30px] rounded-[6px] flex items-center justify-center text-white">
                            <h4>詳細プロフィールは↓</h4>
                        </div>
                    </div>
                </div>
                <Swiper
                class="w-[50%] h-[100%]"
                :modules="[SwiperAutoplay, SwiperEffectCreative]"
                :slides-per-view="1"
                :loop="true"
                :effect="'creative'"
                :autoplay="{
                    delay: 8000,
                    disableOnInteraction: true
                }"
                :creative-effect="{
                    prev: {
                    shadow: false,
                    translate: ['-20%', 0, -1]
                    },
                    next: {
                    translate: ['100%', 0, 0]
                    }
                }"
                >
                    <SwiperSlide>
                        <div class="w-[100%] h-[100%] bg-BGwhite">                          
                            <div class="w-[100%] h-[50%] pt-[70px] flex flex-col items-center justify-center text-[40px] fontZenDoc">
                                <h4>Optimal UX</h4>
                                <h4>Design Solutions</h4>
                            </div>
                            <div class="w-[100%] h-[50%] flex">
                                <div class="w-[40%] h-[100%] flex items-center justify-center">
                                    <img class="w-[150px] h-[150px]" src="@/public/ideaIcon.png">
                                </div>
                                <div class="w-[60%] h-[100%] flex items-center justify-center">
                                    <div class="w-[100%] h-[150px] pr-[15%] flex items-center">
                                        <p class="overflow-wrap text-[20px]">バリュープロポジションの解像度を高め、最適なUXの提案と、設計からPMFまでを総合的にサポートします。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="w-[100%] h-[100%] bg-gray">                          
                            <div class="w-[100%] h-[50%] pt-[70px] flex flex-col items-center justify-center text-[40px] fontZenDoc">
                                <h4>Responsive</h4>
                                <h4>UI Design</h4>
                            </div>
                            <div class="w-[100%] h-[50%] flex">
                                <div class="w-[40%] h-[100%] flex items-center justify-center">
                                    <img class="w-[150px] h-[150px]" src="@/public/uiuxIcon.png">
                                </div>
                                <div class="w-[60%] h-[100%] flex items-center justify-center">
                                    <div class="w-[100%] h-[150px] pr-[15%] flex items-center">
                                        <p class="overflow-wrap text-[20px]">パソコン、スマートフォンなどWebを表示するデバイスごとに最適なUIを表示するレスポンシブデザインができます。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <!-- スマホ表示 -->
            <div class="sm:hidden w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[100%] flex items-center justify-center">
                    <div class="w-[300px] h-[300px] topGradientBorder">
                        <div class="w-[100%] h-[60%] p-[30px]">
                            <h2 class="text-[30px] fontZenDoc text-center">Thank you for visiting my website</h2>
                        </div>
                        <div class="w-[100%] h-[40%] flex flex-col items-center justify-center space-y-4">
                            <div class="w-[90%] h-[30%] flex justify-center bg-[#1400F9] text-white rounded-[6px]">
                                <button>ブログはこちらから</button>
                            </div>
                            <div class="w-[100%] h-[20%] flex justify-center">
                                <p>詳細プロフィールは↓</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Background　コンテンツ -->
            <!-- PC表示 -->
            <div class="hidden sm:flex w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <!-- 左側 -->
                <div class="w-[45%] h-[100%] flex justify-end items-center justify-center">
                    <div class="w-[100%] h-[150px] space-y-[10px] flex flex-col items-center">
                        <h4 class="fontZenDoc text-[50px]">Background</h4>
                        <div class="w-[80%] h-[2px] borderGradationColor"></div>
                        <p class="fontZenDoc text-[14px]">2020 - 2024</p>
                    </div>
                </div>
                <!-- 右側 -->
                <div class="w-[50%] h-[100%] flex items-center justify-center">
                    <div class="w-[80%] h-[90%] bg-Lgray shadow-lg rounded-[10px]">
                        <Swiper
                            class="w-[100%] h-[100%]"
                            :modules="[SwiperAutoplay, SwiperEffectCards]"
                            :slides-per-view="1"
                            :loop="true"
                            :effect="'cards'"
                            :autoplay="{
                                delay: 1500000,
                                disableOnInteraction: true
                            }"
                        >
                            <SwiperSlide>
                                <!-- プロフィール概要 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <!-- プロフィールイメージ -->
                                    <div class="w-[100%] h-[45%] flex items-center justify-center">
                                        <div class="w-[170px] h-[170px]">
                                            <img src="@/public/profileImg.png">
                                        </div>
                                    </div>
                                    <!-- 名前 -->
                                    <div class="w-[100%] h-[10%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-[30px]">Atsuhiro&nbsp;Ishikawa</h4>
                                    </div>
                                    <!-- 紹介分 -->
                                    <div class="w-[100%] h-[45%] px-[10%] pb-[30px] flex items-center justify-center">
                                        <p class="text-sm leading-[24px]">石川敦大です。2023年7月からWebエンジニアをしております。前職ではUIUXデザインの仕事を個人事業主として行っておりましたが、将来的にWebサービスの設計からデザイン、開発まで一貫して行える人材になりたいという思いがあり、現在はエンジニアとして修業中です。また大学在学中に起業経験で培った知識をもとに、0→1フェーズでの事業の立ち上げにも貢献させていただくことができます。幅広くお客様の事業に貢献いたします。ご連絡お待ちしております。</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background1 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[75%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg001.jpeg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">2020</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">Let's start up !</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[25%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">January 28th</p>
                                        <h4 class="text-sm">建築学生だった学生時代。何か自分にしか出来ない何かを求めて、起業を志しました。</h4>
                                        <h4 class="text-sm">数々のビジネスコンテストに出場し、優勝することを経験しました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background2 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[75%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg005.png">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.6)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">2021</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">Gave up (._.)</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[25%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">October</p>
                                        <h4 class="text-sm">起業経験がない中、仲間を集め、プロトタイプの開発、営業活動を行いましたが</h4>
                                        <h4 class="text-sm">どのアイディアも初期ユーザーの獲得が難航し、起業を諦めました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background3 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[75%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg007.jpeg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.6)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">2022</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">Introspection</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[25%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">April</p>
                                        <h4 class="text-sm">自分を恨みました。アイディアには価値はなく、人が求め続けることに価値がある。</h4>
                                        <h4 class="text-sm">そのことに気付き　「人に求められることで、人生を熱中させよう」　と決心しました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background4 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[75%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg008.jpg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.6)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">2023</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">UX UI</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[25%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">January</p>
                                        <h4 class="text-sm">起業時代に培ったUIUXスキルのスキルを活かすために、</h4>
                                        <h4 class="text-sm">知人からHPデザインの仕事を引き受け、WordPressなどで開発を始めました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background5 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[75%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg009.jpg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.6)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">2023</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[50px]">Web Developer</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[25%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">July</p>
                                        <h4 class="text-sm">プログラミングに熱中し、それが学べるSES企業に就職しました。</h4>
                                        <h4 class="text-sm">フロントエンドメインとし、Pythonを使ったデータ分析なども学習中。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <!-- スマホ表示 -->
            <div class="sm:hidden w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[15%] flex flex-col items-center justify-center space-y-2">
                    <h4 class="fontZenDoc text-[20px]">Background</h4>
                    <div class="w-[80%] h-[2px] borderGradationColor"></div>
                    <p class="fontZenDoc text-[10px]">2020 - 2024</p>
                </div>
                <div class="w-[100%] h-[85%] relative">
                    <div class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <Swiper
                            class="w-[100%] h-[100%]"
                            :modules="[SwiperAutoplay, SwiperEffectCards]"
                            :slides-per-view="1"
                            :loop="true"
                            :effect="'cards'"
                            :autoplay="{
                                delay: 1500000,
                                disableOnInteraction: true
                            }"
                        >
                            <SwiperSlide>
                                <!-- プロフィール概要 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <!-- プロフィールイメージ -->
                                    <div class="w-[100%] h-[45%] flex items-center justify-center">
                                        <div class="w-[150px] h-[150px]">
                                            <img src="@/public/profileImg.png">
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[10%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-[20px]">Atsuhiro Ishikawa</h4>
                                    </div>
                                    <div class="w-[100%] h-[45%] p-[20px]">
                                        <p class="text-[10px]">石川敦大です。2023年7月からWebエンジニアをしております。前職ではUIUXデザインの仕事を個人事業主として行っておりましたが、将来的にWebサービスの設計からデザイン、開発まで一貫して行える人材になりたいという思いがあり、現在はエンジニアとして修業中です。また大学在学中に起業経験で培った知識をもとに、0→1フェーズでの事業の立ち上げにも貢献させていただくことができます。幅広くお客様の事業に貢献いたします。ご連絡お待ちしております。</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background1 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[60%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg001.jpeg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[40px]">2020</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[30px]">Let's start up !</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[40%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">January 28th</p>
                                        <h4 class="text-xs">建築学生だった学生時代。何か自分にしか出来ない何かを求めて、起業を志しました。</h4>
                                        <h4 class="text-xs">数々のビジネスコンテストに出場し、優勝することを経験しました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background2 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[60%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg005.png">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[40px]">2021</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[30px]">Gave up (._.)</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[40%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">October</p>
                                        <h4 class="text-xs">起業経験がない中、仲間を集め、プロトタイプの開発、営業活動を行いましたが</h4>
                                        <h4 class="text-xs">どのアイディアも初期ユーザーの獲得が難航し、起業を諦めました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background3 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[60%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg007.jpeg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[40px]">2022</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[30px]">Introspection</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[40%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">April</p>
                                        <h4 class="text-xs">自分を恨みました。アイディアには価値はなく、人が求め続けることに価値がある。</h4>
                                        <h4 class="text-xs">そのことに気付き　「人に求められることで、人生を熱中させよう」　と決心しました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background4 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[60%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg008.jpg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[40px]">2023</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[30px]">UX UI</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[40%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">January</p>
                                        <h4 class="text-xs">起業時代に培ったUIUXスキルのスキルを活かすために、</h4>
                                        <h4 class="text-xs">知人からHPデザインの仕事を引き受け、WordPressなどで開発を始めました。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <!-- Background5 -->
                                <div class="w-[100%] h-[100%] bg-Lgray rounded-[10px]">
                                    <div class="relative w-[100%] h-[60%] rounded-[10px]">
                                        <img class="absolute w-[100%] h-[100%] object-cover rounded-[10px]" src="@/public/backgroundImg009.jpg">
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px] bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[40px]">2023</h4></div>
                                        </div>
                                        <div class="absolute w-[100%] h-[100%] rounded-[10px]">
                                            <div class="p-[20px]"><h4 class="fontZenDoc text-Lgray text-[30px]">Web Developer</h4></div>
                                        </div>
                                    </div>
                                    <div class="w-[100%] h-[40%] p-[20px] space-y-2 rounded-[10px]">
                                        <p class="fontZenDoc">July</p>
                                        <h4 class="text-xs">プログラミングに熱中し、それが学べるSES企業に就職しました。</h4>
                                        <h4 class="text-xs">フロントエンドメインとし、Pythonを使ったデータ分析なども学習中。</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <!-- Skill　コンテンツ -->
            <!-- PC表示 -->
            <div class="hidden sm:flex w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <!-- 左側 -->
                <div class="w-[50%] h-[100%] flex items-center justify-center">
                    <div class="w-[90%] h-[90%]">
                        <div class="w-[100%] h-[30%] p-[20px] flex flex-wrap">
                            <ButtonsHtml @click="onClickSkillButton('HTML')"></ButtonsHtml>
                            <ButtonsCss @click="onClickSkillButton('CSS')"></ButtonsCss>
                            <ButtonsJavascript @click="onClickSkillButton('JavaScript')"></ButtonsJavascript>
                            <ButtonsTypescript @click="onClickSkillButton('TypeScript')"></ButtonsTypescript>
                            <ButtonsVue @click="onClickSkillButton('vue.js')"></ButtonsVue>
                            <ButtonsNuxtjs @click="onClickSkillButton('Nuxt.js')"></ButtonsNuxtjs>
                            <ButtonsPython @click="onClickSkillButton('Python')"></ButtonsPython>
                            <ButtonsAws @click="onClickSkillButton('AWS')"></ButtonsAws>
                        </div>
                        <div class="w-[100%] h-[70%] drop-shadow-lg rounded-[10px] p-[30px]" :style="{background: `linear-gradient(to right, ${skillDescription.bg1}, ${skillDescription.bg2})`}">
                            <div class="w-[100%] h-[20%] items-center">
                                <h4 class="fontZenDoc text-white text-[30px]">{{ skillDescription.name }}</h4>
                                <div class="x-[100%] h-[2px] bg-white"></div>
                            </div>
                            <div class="w-[100%] h-[50%] flex">
                                <!-- 左側 -->
                                <div class="w-[50%] h-[100%] flex flex-col">
                                    <!-- スキルプロパティ タイトル -->
                                    <div class="w-[100%] h-[20%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-white">Summary</h4>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Assessment</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.assessment >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.assessment }}★</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Experience</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.experience >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.experience }}Y</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Studied</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.studied >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.studied }}Y</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Focus</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.focus >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.focus }}★</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 右側 -->
                                <div class="w-[50%] h-[100%]">
                                    <!-- スキルプロパティ タイトル -->
                                    <div class="w-[100%] h-[20%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-white">Others</h4>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework1 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework1status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework1status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework2 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework2status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework2status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework3 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework3status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework3status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework4 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework4status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework4status }}★</div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center justify-center">
                                <p class="text-white text-[14px]">{{ skillDescription.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右側 -->
                <div class="w-[45%] h-[100%] flex justify-end items-center justify-center">
                    <div class="w-[100%] h-[150px] space-y-[10px] flex flex-col items-center">
                        <h4 class="fontZenDoc text-[50px]">Skill</h4>
                        <div class="w-[80%] h-[2px] borderGradationColor"></div>
                        <p class="fontZenDoc text-[14px]">2021 - 2024</p>
                    </div>
                </div>
            </div>
            <!-- スマホ表示 -->
            <div class="sm:hidden w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[15%] flex flex-col items-center justify-center space-y-2">
                    <h4 class="fontZenDoc text-[20px]">Skill</h4>
                    <div class="w-[80%] h-[2px] borderGradationColor"></div>
                    <p class="fontZenDoc text-[10px]">2021 - 2024</p>
                </div>
                <div class="w-[100%] h-[85%]">
                    <div class="w-[100%] h-[30%] p-[20px] flex flex-wrap">
                        <ButtonsHtml @click="onClickSkillButton('HTML'),clickButton('html')" :style="{background: skillButtonColor.html}"></ButtonsHtml>
                        <ButtonsCss @click="onClickSkillButton('CSS'),clickButton('css')" :style="{background: skillButtonColor.css}"></ButtonsCss>
                        <ButtonsJavascript @click="onClickSkillButton('JavaScript'),clickButton('javascript')" :style="{background: skillButtonColor.javascript}"></ButtonsJavascript>
                        <ButtonsTypescript @click="onClickSkillButton('TypeScript'),clickButton('typescript')" :style="{background: skillButtonColor.typescript}"></ButtonsTypescript>
                        <ButtonsVue @click="onClickSkillButton('vue.js'),clickButton('vue')" :style="{background: skillButtonColor.vue}"></ButtonsVue>
                        <ButtonsNuxtjs @click="onClickSkillButton('Nuxt.js'),clickButton('nuxt')" :style="{background: skillButtonColor.nuxt}"></ButtonsNuxtjs>
                        <ButtonsPython @click="onClickSkillButton('Python'),clickButton('python')" :style="{background: skillButtonColor.pythone}"></ButtonsPython>
                        <ButtonsAws @click="onClickSkillButton('AWS'),clickButton('aws')" :style="{background: skillButtonColor.aws}"></ButtonsAws>
                    </div>
                    <div class="w-[100%] h-[70%] p-[2px]">
                        <div class="w-[100%] h-[90%] drop-shadow-lg rounded-[10px] p-[15px]" :style="{background: `linear-gradient(to right, ${skillDescription.bg1}, ${skillDescription.bg2})`}">
                            <div class="w-[100%] h-[20%] items-center">
                                <h4 class="fontZenDoc text-white text-[30px]">{{ skillDescription.name }}</h4>
                                <div class="x-[100%] h-[2px] bg-white"></div>
                            </div>
                            <div class="w-[100%] h-[50%] flex">
                                <!-- 左側 -->
                                <div class="w-[50%] h-[100%] flex flex-col">
                                    <!-- スキルプロパティ タイトル -->
                                    <div class="w-[100%] h-[20%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-white">Summary</h4>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Assessment</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.assessment >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.assessment >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.assessment }}★</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Experience</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.experience >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.experience >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.experience }}Y</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Studied</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.studied >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.studied >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.studied }}Y</div>
                                        </div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[11px] text-white">Focus</div>
                                        <div class="w-[50%] h-[100%] flex">
                                            <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                                <img v-show="skillDescription.focus >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                                <img v-show="skillDescription.focus >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            </div>
                                            <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.focus }}★</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 右側 -->
                                <div class="w-[50%] h-[100%]">
                                    <!-- スキルプロパティ タイトル -->
                                    <div class="w-[100%] h-[20%] flex items-center justify-center">
                                        <h4 class="fontZenDoc text-white">Others</h4>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework1 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework1status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework1status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework1status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework2 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework2status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework2status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework2status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework3 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework3status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework3status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework3status }}★</div>
                                    </div>
                                    <!-- スキルプロパティ -->
                                    <div class="w-[100%] h-[20%] flex">
                                        <div class="w-[50%] h-[100%] px-[10px] flex items-center fontZenDoc  text-[12px] text-white">{{ skillDescription.framework4 }}</div>
                                        <div class="w-[70%] h-[100%] flex items-center space-x-[3px]">
                                            <img v-show="skillDescription.framework4status >= 1" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 2" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 3" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 4" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                            <img v-show="skillDescription.framework4status >= 5" class="w-[10px] h-[10px]" src="@/public/starIcon.png">
                                        </div>
                                        <div class="w-[30%] h-[100%] flex items-center justify-center fontZenDoc text-[12px] text-white">{{ skillDescription.framework4status }}★</div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[100%] h-[30%] flex items-center justify-center">
                                <p class="text-white text-[12px]">{{ skillDescription.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- portfolio -->
            <!-- PC表示 -->
            <div class="hidden sm:block w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[25%] flex flex-col items-center">
                    <div class="w-[100%] h-[80%] flex items-center justify-center">
                        <h4 class="fontZenDoc text-center text-[50px]">Portfolio</h4>
                    </div>
                    <div class="w-[100%] h-[20%] flex items-top justify-center">
                        <div class="w-[80%] h-[1px] borderGradationColor"></div>
                    </div>
                </div>
                <div class="w-[100%] h-[75%]">
                    <div class="w-[100%] h-[100%] flex flex-wrap">
                        <div v-for="portfoliocontent in portfoliocontents" class="h-[50%] m-1 aspect-square rounded-[10px] bg-Lgray hover:border-solid hover:border hover:border-Lblue">
                            <NuxtLink :to="portfoliocontent.link" target="_blank">
                                <div class="relative w-[100%] h-[60%]">
                                    <div class="absolute w-[100%] h-[100%]">
                                        <img class="w-[100%] h-[100%] object-cover rounded-[10px]" :src="`/_nuxt/public/${portfoliocontent.backgroundImg}`">
                                    </div>
                                    <div class="absolute w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] rounded-t-[10px]"></div>
                                    <div class="absolute  w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] rounded-t-[10px] flex items-center justify-center opacity-0 hover:opacity-100">
                                        <h4 class="fontZenDoc text-white text-center">クリックして開く</h4>
                                    </div>
                                </div>
                                <div class="w-[100%] h-[20%] p-[10px]">
                                    <h4>{{ portfoliocontent.name }}</h4>
                                </div>
                                <div class="w-[100%] h-[20%] p-[10px] space-x-1 flex items-center ">
                                    <img class="w-[20px] h-[20px]" :src="`/_nuxt/public/${portfoliocontent.skill1}`">
                                    <img class="w-[20px] h-[20px]" :src="`/_nuxt/public/${portfoliocontent.skill2}`">
                                    <img class="w-[20px] h-[20px]" :src="`/_nuxt/public/${portfoliocontent.skill3}`">
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- スマホ表示 -->
            <div class="sm:hidden w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[15%] flex flex-col items-center justify-center space-y-2">
                    <h4 class="fontZenDoc text-[20px]">Portfolio</h4>
                    <div class="w-[80%] h-[2px] borderGradationColor"></div>
                    <p class="fontZenDoc text-[10px]"></p>
                </div>
                <div class="w-[100%] h-[80%] p-[20px] flex flex-wrap">
                    <div class="w-[100%] h-[100%] shadow-lg rounded-[10px]">
                        <Swiper
                            :height="300"
                            :modules="[SwiperAutoplay, SwiperEffectCreative]"
                            :slides-per-view="1"
                            :loop="true"
                            :effect="'creative'"
                            :autoplay="{
                                delay: 8000,
                                disableOnInteraction: true
                            }"
                            :creative-effect="{
                                prev: {
                                shadow: false,
                                translate: ['-20%', 0, -1]
                                },
                                next: {
                                translate: ['100%', 0, 0]
                                }
                            }"
                            class="w-[100%] h-[100%]"
                        >
                            <SwiperSlide v-for="portfoliocontent in portfoliocontents" class="w-[100%] h-[100%] rounded-[10px] bg-BGwhite">
                                <NuxtLink :to="portfoliocontent.link" target="_black">
                                    <div class="w-[100%] h-[100%]">
                                        <div class=" w-[100%] h-[70%]">
                                            <div class="relative w-[100%] h-[100%]">
                                                <div class="absolute w-[100%] h-[100%]">
                                                    <img class="w-[100%] h-[100%] object-cover rounded-top-[10px]" :src="`/_nuxt/public/${portfoliocontent.backgroundImg}`">
                                                </div>
                                                <div class="absolute w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] rounded-t-[10px]"></div>
                                                <div class="absolute  w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] rounded-t-[10px] flex items-center justify-center opacity-0 hover:opacity-100">
                                                    <h4 class="fontZenDoc text-white text-center">クリックして開く</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-[100%] h-[30%] p-[20px]">
                                            <div class="w-[100%] h-[50%] flex items-center">
                                                <h4 class="text-[20px]">{{ portfoliocontent.name }}</h4>
                                            </div>
                                            <div class="w-[100%] h-[50%] flex items-center space-x-4 ">
                                                <img class="w-[30px] h-[30px]" :src="`/_nuxt/public/${portfoliocontent.skill1}`">
                                                <img class="w-[30px] h-[30px]" :src="`/_nuxt/public/${portfoliocontent.skill2}`">
                                                <img class="w-[30px] h-[30px]" :src="`/_nuxt/public/${portfoliocontent.skill3}`">
                                            </div>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <!-- contact -->
            <!-- PC表示 -->
            <div class="hidden sm:block w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[25%] flex flex-col items-center">
                    <div class="w-[100%] h-[80%] flex items-center justify-center">
                        <h4 class="fontZenDoc text-center text-[50px]">Contact</h4>
                    </div>
                    <div class="w-[100%] h-[20%] flex items-top justify-center">
                        <div class="w-[80%] h-[1px] borderGradationColor"></div>
                    </div>
                </div>
                <div v-if="inputCurrentUserData.isVisible" class="w-[100%] h-[75%] flex flex-col items-center text-center space-y-2">
                    <p class="text-red text-left">{{ validationErrorAlert.name.message }}</p>
                    <a-input class="w-[500px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.name" placeholder="氏名" />
                    <p class="text-red">{{ validationErrorAlert.emailAddress.message }}</p>
                    <a-input class="w-[500px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.emailAddress" placeholder="メールアドレス" />
                    <p class="text-red">{{ validationErrorAlert.inquiry.message }}</p>
                    <a-textarea class="w-[500px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.inquiry" :rows="6" placeholder="問い合わせ内容を100文字以内で入力" :maxlength="100" />
                    <a-button @click="onCheckInquiryDates()" class="w-[500px]" type="primary">送信確認</a-button>
                </div>
                <div v-if="setCurrentUserData.isVisible" class="w-[100%] h-[75%] flex flex-col items-center justify-center text-center space-y-3">
                    <div>
                        <div class="w-[500px] h-[30px]">
                            <h4>お名前</h4>
                        </div>
                        <div class="w-[500px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[500px] h-[30px]">
                            <p>{{ setCurrentUserData.name }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="w-[500px] h-[30px]">
                            <h4>メールアドレス</h4>
                        </div>
                        <div class="w-[500px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[500px] h-[30px]">
                            <p>{{ setCurrentUserData.emailAddress }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="w-[500px] h-[30px]">
                            <h4>お問い合わせ内容</h4>
                        </div>
                        <div class="w-[500px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[500px] h-[30px]">
                            <p>{{ setCurrentUserData.inquiry }}</p>
                        </div>
                    </div>
                    <div>
                        <a-button @click="sendInquiryDates()" class="w-[500px]" type="primary">送信</a-button>
                    </div>
                </div>
                <div v-if="finishInquiry" class="w-[100%] h-[75%] flex flex-col items-center justify-center">
                    <h4>お問い合わせ完了</h4>
                    <h4>折り返し連絡いたします。</h4>
                </div>
            </div>
            <!-- スマートフォン表示 -->
            <div class="sm:hidden w-[100%] h-[100%] px-[4%] bg-BGwhite">
                <div class="w-[100%] h-[15%] flex flex-col items-center justify-center space-y-2">
                    <h4 class="fontZenDoc text-[20px]">Contact</h4>
                    <div class="w-[80%] h-[2px] borderGradationColor"></div>
                    <p class="fontZenDoc text-[10px]"></p>
                </div>
                <div v-if="inputCurrentUserData.isVisible" class="w-[100%] h-[75%] flex flex-col items-center text-center space-y-2">
                    <p class="text-red text-left">{{ validationErrorAlert.name.message }}</p>
                    <a-input class="w-[300px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.name" placeholder="氏名" />
                    <p class="text-red">{{ validationErrorAlert.emailAddress.message }}</p>
                    <a-input class="w-[300px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.emailAddress" placeholder="メールアドレス" />
                    <p class="text-red">{{ validationErrorAlert.inquiry.message }}</p>
                    <a-textarea class="w-[300px] bg-[rgb(0,0,0,0)]" v-model:value="inputCurrentUserData.inquiry" :rows="8" placeholder="問い合わせ内容を100文字以内で入力" :maxlength="100" />
                    <a-button @click="onCheckInquiryDates()" class="w-[300px]" type="primary">送信確認</a-button>
                </div>
                <div v-if="setCurrentUserData.isVisible" class="w-[100%] h-[75%] flex flex-col items-center justify-center text-center space-y-3">
                    <div>
                        <div class="w-[300px] h-[30px]">
                            <h4>お名前</h4>
                        </div>
                        <div class="w-[300px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[300px] h-[30px]">
                            <p>{{ setCurrentUserData.name }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="w-[300px] h-[30px]">
                            <h4>メールアドレス</h4>
                        </div>
                        <div class="w-[300px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[300px] h-[30px]">
                            <p>{{ setCurrentUserData.emailAddress }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="w-[300px] h-[30px]">
                            <h4>お問い合わせ内容</h4>
                        </div>
                        <div class="w-[300px] h-[10px] flex items-top justify-center">
                            <div class="w-[100%] h-[2px] borderGradationColor"></div>
                        </div>
                        <div class="w-[300px] h-[30px]">
                            <p>{{ setCurrentUserData.inquiry }}</p>
                        </div>
                    </div>
                    <div>
                        <a-button @click="sendInquiryDates()" class="w-[300px]" type="primary">送信</a-button>
                    </div>
                </div>
                <div v-if="finishInquiry" class="w-[100%] h-[75%] flex flex-col items-center justify-center">
                    <h4>お問い合わせ完了</h4>
                    <h4>折り返し連絡いたします。</h4>
                </div>
            </div>
            <!-- space -->
            <div class="w-[100%] h-[50px] bg-green">space</div>
        </div>
    </div>
</template>