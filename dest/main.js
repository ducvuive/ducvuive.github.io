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
    // remove ghost images
    document.addEventListener("dragstart", function( event ) {
        event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
      }, false);

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
    //load 
    let load =  $('.load');
    load.css('display', 'none')
    // flickity
    let _nextSlide = $('.homepage .__next')
    let _preSlide = $('.homepage .__pre')
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        //fullscreen: true,
        prevNextButtons: false,   
        autoPlay: 2000,
        pauseAutoPlayOnHover: false ,
        draggable: false,
        on : {
            ready: function()  {
                _preSlide.on('click', function(e){
                    $('.main-carousel').flickity('previous',true)
                })
                _nextSlide.on('click', function(e){
                    $('.main-carousel').flickity('next',true)
                })
            }
        },
             change:function(index) {
            
         }
      });
      let _next = $('.product_detail ._next')
      let _pre = $('.product_detail ._pre')
      $('.detail_carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        fullscreen: true,
        draggable: false,
        on:{
            ready: function()  {
                _pre.on('click', function(e){
                    $('.detail_carousel').flickity('previous',true)
                })
                _next.on('click', function(e){
                    $('.detail_carousel').flickity('next',true)
                })
            }
        }
      });

})

//service page
let bt_service = $('.service .btn')
function btn_removeAcitve(){
    bt_service.removeClass('active')    
}

bt_service.on('click',function(e){
    btn_removeAcitve()
    $(this).addClass('active')
})


// page

let page = $('.pager .btn')
console.log(page)
function pager_removeAcitve(){
    page.removeClass('active')
}

page.on('click',function(e){
    pager_removeAcitve()
    $(this).addClass('active')
})

//product_detail
let btn_product_detail = $('.product_detail .btn')
function product_detail_removeAcitve(){
    btn_product_detail.removeClass('active')
}

btn_product_detail.on('click',function(e){
    product_detail_removeAcitve()
    $(this).addClass('active')
})

//aboutus
let btn_aboutus = $('.aboutus .btn')
function aboutus_removeAcitve(){
    btn_aboutus.removeClass('active')
}

btn_aboutus.on('click',function(e){
    aboutus_removeAcitve()
    $(this).addClass('active')
})
// projectpage

let dropdown = $('.projectpage .dropdown .btn')
let dropdown_list = $('.projectpage .dropdown')
let dropdown_direction = $('.projectpage .dropdown .btn img')
console.log(dropdown)
dropdown.on('click',function(e){
    dropdown_list.toggleClass('active')
    console.log(1)
    dropdown_direction.toggleClass('active')
    e.stopPropagation()
})

$(document).on('click',function(e){
    dropdown_list.removeClass('active')
    dropdown_direction.removeClass('active')
})