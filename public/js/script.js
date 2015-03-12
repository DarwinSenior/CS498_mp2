var divs = document.getElementsByClassName('alert');
for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis);
  /*
  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);*/
}

$(document).ready(function(){
  $(".typewriter").typewriter({"speed" : 50});
  $('#menu').slicknav();
  $('.slicknav_menu').addClass("show-for-small-only header");
  prepareForm();
  smoothScrolling();
  window.onscroll = menubareffect;
  $('.frame').slick({dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1});
  $(".js-video-control").click(function(e) {
    playVideo($(this));
    e.preventDefault();
  });
  $(document).foundation();
  editorSetting();
  footer();
});

function editorSetting(){
  // var editor = ace.edit("editor");
  // editor.setTheme("ace/theme/tomorrow");
  // editor.getSession().setMode("ace/mode/markdown");
  // setInterval(renderEditor, 1000);
  // editor.getSession().setUseWrapMode(true);
  function renderEditor(){
    var text = $("#hehe").html();
    text = text.replace(/<br>/g, "\n");
    console.log(text);
    $("#markdown-html").html(marked(text));
  }
  $(document).on('open.fndtn.reveal', '[data-reveal]', renderEditor);
  // $("#destop-modal").reveal({"open", renderEditor});
}

function footer(){
   var footer = $("#footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
}

function playVideo(el) {
    var videoId = el.data('video');
    var video = document.getElementById(videoId);

    if (video.paused) {
        // Play the video
        video.play();
        el.removeClass('paused').addClass('playing');
    }
    else {
        // Pause the video
        video.pause();
        el.removeClass('playing').addClass('paused');
    }
}

function menubareffect(ev){
  if ($(window).scrollTop()<=35){
    $('.header').addClass('sticky resized');
    $('.header').removeClass('shadow fixed');
  }else{
    $('.header').addClass('shadow fixed');
    $('.header').removeClass('sticky resized');
  }
  var targets = ["#Introduction", "#Video", "#Examples", "#RegistrationLogin"];
  for (var i=0; i<targets.length; i++){
    if(isScrolledIntoView($(targets[i]))){
      var selected = $("a[href="+targets[i]+"]");
      selected.addClass("selected");
      selected.parent().siblings().children().removeClass("selected");
      break;
    }
  }
}

function isScrolledIntoView(elem){
    //alert("method invoked");
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var docViewMiddle = docViewTop + $(window).height()/2;
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return (elemTop<docViewMiddle) && (elemBottom>docViewMiddle);
}

function smoothScrolling() {
  var menuoffset = 53;
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top-menuoffset
          }, 1000);
        return false;
      }
    }
  });
}

//=================Sign up and register effects============
//for input
function prepareForm(){
  function checkfocus(e) {
    
    var $this = $(this),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }
  }
  $(".form").find("input").each(function(){
    if ($(this).val()!=''){
      $(this).prev('label').addClass('active');
    }
  });
  $('.form').find('input, textarea').on('keyup blur focus', checkfocus);
  $('#tab-rl a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
    $('.tag-content > div').not(target).hide();
    $(target).fadeIn(600);
  });
  $("#login").hide();
}

//=========== For the scrolling ============


//=========== For typewriting ============
// From http://www.jqueryscript.net/demo/Minimal-jQuery-Animated-Text-Typing-Effect-Best-Typewriter/
// With a little aternation to add effect of mouse 
(function($, w, d, undefined) {

  function typewriter() {

    // Globals 
    var self = this, speed;

    function init(element, options) {
            // Set Globals
      var str;
      var indice = 0;

      self.options = $.extend( {}, $.fn.typewriter.options, options );
      $currentElement = $(element);
      elementStr = $currentElement.text().replace(/\s+/g, ' ');
      dataSpeed  = $currentElement.data("speed") || self.options.speed;
      $currentElement.empty();
      var showText = setInterval(
				function(){
					if (indice++ < elementStr.length) {
						$currentElement.find('.cursor').remove();
			      		$currentElement.append(elementStr[indice]);
			      		$currentElement.append('<span class="cursor">x</span>');
			    		}else{
			    			clearInterval(showText);
			    		}
				}, dataSpeed);
      // self.animation = setInterval(function(){animate_calification()}, 20);
    }
    // Metodos publicos
    return {
      init: init
    }
  }
  // Plugin jQuery
  $.fn.typewriter = function(options) {
    return this.each(function () {
    	var writer =  new typewriter();
      writer.init(this, options);
      $.data( this, 'typewriter', writer);
    });
  };

  $.fn.typewriter.options = {
    'speed' : 300
  };

})(jQuery, window, document);