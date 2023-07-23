
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ハンバーガー、ドロワー
    $(".js-hamburger, .js-drawer, .sp-nav__items > a").click(function () {
        $(".js-hamburger").toggleClass("is-open");
        $("body").toggleClass("is-open");
        $(".header").toggleClass("is-open");
        $(".js-drawer").fadeToggle();
    });

// スライダー
// js-top-mv-sp-swiper
    let topMvSpSwipeOption = {
        loop: true,
        effect: 'fade',
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        speed: 1200,
    }
    const swiper = new Swiper(".js-top-mv__sp-swiper", topMvSpSwipeOption)

// js-top-mv-pc-swiper
    let topMvPcSwipeOption = {
        loop: true,
        effect: 'fade',
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
        speed: 1500,
    }
    new Swiper(".js-top-mv__pc-swiper", topMvPcSwipeOption)

// js-top-campaign__swiper
    let topCampaignSwipeOption = {
        loop: true,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
        speed: 700,
        slidesPerView: 1.2,
        spaceBetween: 24,
        breakpoints: {
            1024: { // 1024px以上
                slidesPerView: 3.5,
            }
        },
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


document.addEventListener('DOMContentLoaded',function(){
    const mm = gsap.matchMedia();
    // opening
    let openingTL = gsap.timeline();
    let turtleImages = document.querySelectorAll('.js-top-mv__animation-image > *');
    let mvTitles = document.querySelectorAll('.js-top-mv__title > *');
    // 767px以下の時
    mm.add('(max-width:767px)',function(){
        openingTL
        .to('.js-header',{delay:.5,y:0, duration:1})
        .to(mvTitles,{autoAlpha:1, duration:1.3, ease:'power1.in'},'-=.7')
        .to('body',{overflow:'visible'})
    });
    // 768px以上の時
    mm.add('(min-width:768px)',function(){
        openingTL
        .to(mvTitles,{delay:.5, autoAlpha:0, duration:1 ,ease:'power4.in', color: '#fff'})
        .to(turtleImages,{delay:.5, y:0,duration:2.5 ,ease:'power4.out', stagger:{each:.2}},'-=1')
        .to('.js-header',{y:0, duration:1},'-=1.3')
        .to(mvTitles,{autoAlpha:1, duration:2, ease:'power4.in'},'-=1.5')
        .to('body',{overflow:'visible'})
    });

    // 画像アニメーション
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
})

