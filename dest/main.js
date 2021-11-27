//homepage
//scroll from over slider 
$(window).on('load', function(){
    let slider = $('.slider')
    let sliderHeight = slider.height();
    let menuFix = $('.menu_fixed');
    let headerFix_height = menuFix.height();
    let overlay_gray = $('.overlay_gray');
    let close_menu = $('.menu_more .close');
    $(document).scroll(function() {
        console.log(window.pageYOffset)
        if(window.pageYOffset>sliderHeight ){
            //menuFix.css({top:headerFix_height * -1});
            menuFix.addClass('active');
        }
        else{
            //menuFix.css({top:0});
            menuFix.removeClass('active');
        }
    })
    // let wWindow = window.innerWidth
    // $(window).on('resize', function(){
    //     //console.log(1)
    //     let wWindow = window.innerWidth
    //     console.log(wWindow)
    //     if(wWindow < 992){
    //         menuFix.addClass('active');
    //     }
    // })
    //back to top
    let backTop = $('.back-to-top')

    backTop.on('click',function(e){
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

    // click home
    let home = $('.home');
    let menu_more = $('.menu_more')
    home.on('click',function(e){
        menu_more.addClass('active')
        overlay_gray.css('display', 'block')
        e.stopPropagation()
    })
    overlay_gray.on('click',function(e){
        menu_more.removeClass('active')
        overlay_gray.css('display', 'none')
    })
    close_menu.on('click',function(e){
        menu_more.removeClass('active')
        overlay_gray.css('display', 'none')
    })
    //click menu nav in mobile
    let hamberger = $('.menu_fixed .header__menu .hamberger')
    let nav = $('.nav__menu')
    hamberger.on('click',function(e){
        nav.toggleClass('active')
        hamberger.toggleClass('active')
    })

    // flickity
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,   
        autoPlay: 2000,
        pauseAutoPlayOnHover: false ,
        // on : {
        //     ready: function() {
        //         console.log('Flickity is ready');
        //         $('.flickity-page-dots').appendTo('.left');
        //     },
        //     change:function(index) {
        //         console.log(index)
        //         //let flkty =  $('.main-carousel').flickity.data('flickity');
        //         // var cellNumber = flkty.selectedIndex + 1;
        //          numberPage.text(`0${index+1}`) 
        //          list_dot.removeClass('active')
        //          list_dot.eq(index).addClass('active')
        //     }
        // }
      });
})



