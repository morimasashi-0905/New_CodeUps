
// クッキー登録
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// クッキーを取得
function getCookie(name) {
    const value = "; " + document.cookie;// 全てのクッキーの文字列を取得し、先頭に"; "を追加
    const parts = value.split("; " + name + "=");// クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
    if (parts.length === 2){
        return parts.pop().split(";").shift();// 名前が見つかった場合、その値を取得し返します
    }else{
        return "";// 名前が見つからなかった場合、空の文字列を返します
    }
}

// 初回ローディング
function playAnimation(){
    const mm = gsap.matchMedia();
    let openingTL = gsap.timeline();
    let turtleImages = document.querySelectorAll('.js-top-mv__animation-image > *');
    let mvTitles = document.querySelectorAll('.js-top-mv__title > *');
    let body = document.querySelector('body');
    body.classList.add('is-open');
    // 767px以下の時
    mm.add('(max-width:767px)',function(){
        openingTL
        .to('.js-header',{delay:.5,y:0, duration:1})
        .to(mvTitles,{autoAlpha:1, duration:1.3, ease:'power1.in'},'-=.7')
        .add(() => {
            body.classList.remove('is-open');
            setCookie("animationPlayed", "true", 1/24);//1時間
        });
    });
    // 768px以上の時
    mm.add('(min-width:768px)',function(){
        openingTL
        .to(mvTitles,{delay:.5, autoAlpha:0, duration:1 ,ease:'power4.in', color: '#fff'})
        .to(turtleImages,{delay:.5, y:0,duration:2.5 ,ease:'power4.out', stagger:{each:.2}},'-=1')
        .to('.js-header',{y:0, duration:1},'-=1.3')
        .to(mvTitles,{autoAlpha:1, duration:2, ease:'power4.in'},'-=1.5')
        .add(() => {
            body.classList.remove('is-open');
            setCookie("animationPlayed", "true", 1/24);//1時間
        });
    });
}
// 2回目以降のリロード
function hideAnimation(){
    let turtleImages = document.querySelectorAll('.js-top-mv__animation-image > *');
    let mvTitles = document.querySelectorAll('.js-top-mv__title > *');
    gsap.set('.js-header',{y:0})
    gsap.set(mvTitles,{autoAlpha:1, color:'#fff'})
    gsap.set(turtleImages,{y:0})
}

// クッキー判定とアニメーション実行
document.addEventListener("DOMContentLoaded", function() {
    const animationPlayed = getCookie("animationPlayed");
    if (animationPlayed) {
        hideAnimation();
    } else {
        playAnimation();
    }
});

// 画像アニメーション
document.addEventListener("DOMContentLoaded", function() {
    const mm = gsap.matchMedia();
    mm.add('(max-width:767px)',function(){
        gsap.utils.toArray('.js-image').forEach(Image =>{
            let img = Image.querySelector('img');
            let span = Image.querySelector('span');
            let TL = gsap.timeline({scrollTrigger:{
                trigger: Image,
                start: 'top 100%',
                toggleActions:'play none none reverse',
            }})
            TL
            .to(img, {delay:.5, duration:.5, x:0, ease:'power:4'})
            .to(span, {duration:.5, x:0, ease:'power:4'},'<=')
            .to(span, {delay:.2, duration:.5, x:'-101%', ease:'power:4'})
        });
    });
    mm.add('(min-width:768px)',function(){
        gsap.utils.toArray('.js-image').forEach(Image =>{
            let img = Image.querySelector('img');
            let source = Image.querySelector('source');
            let span = Image.querySelector('span');
            let TL = gsap.timeline({scrollTrigger:{
                trigger: Image,
                start: 'top 100%',
                toggleActions:'play none none reverse',
            }})
            TL
            .to(img, {delay:.5, duration:.5, x:0, ease:'power:4'})
            .to(source, {duration:.5, x:0, ease:'power:4'},'<=')
            .to(span,{duration:.5, x:0, ease:'power:4'},'<=')
            .to(span, {delay:.2, duration:.5, x:'-101%', ease:'power:4'})
        });
    })
});




jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // ハンバーガー、ドロワー
    $(".js-hamburger, .js-drawer, .sp-nav__items > a").click(function () {
        $(".js-hamburger").toggleClass("is-open");
        $(".header").toggleClass("is-open");
        $(".js-drawer").fadeToggle();
        $("body").toggleClass("is-open");
    });

    // スライダー
    // mv-sp-swiper
    let topMvSpSwipeOption = {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1200,
    }
    const swiper = new Swiper(".js-top-mv__sp-swiper", topMvSpSwipeOption)

    // mv-pc-swiper
    let topMvPcSwipeOption = {
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 1500,
    }
    new Swiper(".js-top-mv__pc-swiper", topMvPcSwipeOption)

    // キャンペーンのswiper
    let topCampaignSwipeOption = {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 700,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    };
    new Swiper(".js-top-campaign__swiper", topCampaignSwipeOption)


    // 初期はボタンを非表示に
    var topButton = $('.page-top');
    topButton.hide();
    // スクロールするとボタンを表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
        topButton.fadeIn();
        } else {
        topButton.fadeOut();
        }
    });

    // page-topボタンをフッターに被らないように
    var footer = document.querySelector(".footer");
    window.addEventListener("scroll", function() {
        var visibleFooterHeight = window.innerHeight - footer.getBoundingClientRect().top;
        var isFooterVisible = footer.getBoundingClientRect().top < window.innerHeight;
        gsap.to(".page-top", {
            y: isFooterVisible ? -visibleFooterHeight : 0,
            duration: .1,
            ease: "power2.inOut"
        });
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topButton.click(function () {
        $('body,html').animate({
        scrollTop: 0
        }, 300, 'swing');
        return false;
    });

    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
    $(document).on('click', 'a[href*="#"]', function () {
        let time = 400;
        let header = $('.header').innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $('html,body').animate({ scrollTop: targetY }, time, 'swing');
        return false;
    });

});



