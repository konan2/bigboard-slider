function Slider(target, params) {
  var parent = document.querySelector(target);
  var frontPieceSelector = '#bigboard-slides .front';
  var backPieceSelector = '#bigboard-slides .back';
  var frontPieces = document.querySelectorAll(frontPieceSelector);
  var backPieces = document.querySelectorAll(backPieceSelector);
  var elemImg = document.querySelector(target).children;
  var attrArr = [];
  var index = 0;
  var count = 0;
  var slidesCount = params.slicesNum;
  var sliderWidth = $(target).innerWidth();
  var slideSliceWidth = sliderWidth / slidesCount;
  var htmlSlides = '';
  var slideBgSize = slidesCount * 100;


  function initSlider() {

    document.querySelector(target).setAttribute("style", "height: 0; overflow: hidden;");

    var slidesContainer = document.createElement('div');
    slidesContainer.id = 'bigboard-slides';
    parent.parentNode.insertBefore(slidesContainer, parent.nextSibling);

    for (var i = 0; i < params.slicesNum; i++) {
      htmlSlides += '<div class="bigboard-slice bigboard-slice-' + (i + 1) + '"><figure class="front"></figure><figure class="back"></figure></div>';
    }
    
    slidesContainer.innerHTML = htmlSlides;
    setSlice();
    sliderHeightFunc();
    incSlice();
  };

  initSlider();

  function setSlice() {
    var sliderWidth = parent.offsetWidth;
    var slideSliceWidth = sliderWidth / slidesCount;
  
    $('#bigboard-slides .bigboard-slice').css({
      'width': slideSliceWidth + 'px'
    });

    function setSliceBg() {

      for (var i = 0; i < elemImg.length; i++) {
        var attrArrItem = elemImg[i].getAttribute('src');
        attrArr.push(attrArrItem);
      }

      if (count % 2 === 0) {
        setBg(frontPieceSelector, attrArr[index]);

      } else {
        setBg(backPieceSelector, attrArr[index]);
      }

    }

    setSliceBg();

    function setBg(selector, url) {

      var slices = document.querySelectorAll(selector);
      for (var k = 0; k < params.slicesNum; k++) {
        var cssObj = 'background: url(' + url + ') no-repeat; background-size:' + slideBgSize + '%';
        slices[k].setAttribute('style', cssObj);
      }
    }

    function setBgPos(selector) {
      $(selector).each(function (x) {
        $(this).css({
          'background-position': -slideSliceWidth * x + 'px 0'
        });
      });
    }

    setBgPos(frontPieceSelector);
    setBgPos(backPieceSelector);

    // set the flip speed
    $('.bigboard-slice').css({
      'transition': 'transform ' + params.flipSpeed + 's',
      'webkit-transition': 'transform ' + params.flipSpeed + 's'
    });
  }

  //////////////////////// Detect the slider height

  function sliderHeightFunc() {

    var minHeight = 9999999999;
    var elemImgArray = Array.prototype.slice.call(elemImg);
    for (var itemIndex in elemImgArray) {
      if (minHeight > elemImgArray[itemIndex].height) {
        minHeight = elemImgArray[itemIndex].height;
      }
    }

    document.querySelector('#bigboard-slides').style.height = minHeight + 'px';
  }

  function incSlice() {
    index++;
    if (index === attrArr.length) {
      index = 0;
    }
    count++;
  }

  function sliderFlipFunc() {
    var slideIndex = 0;
    var interval = setInterval(function () {
      if (++slideIndex <= params.slicesNum) {
        $('#bigboard-slides .bigboard-slice-' + slideIndex).toggleClass('flipped');
      } else {
        clearInterval(interval);
        interval = null;
      }
    }, params.speed);
  };

  function SliderInterval() {
    setSlice();
    incSlice();
    sliderFlipFunc();
  }

  var interval = setInterval(function () {
    SliderInterval();
  }, params.slideInterval);

  $(window).resize(function () {
    setSlice();
    sliderHeightFunc();
  });

  // Function for start/stop the main interval

  $(function () {
    var timer = null;

    window.onfocus = function () {
      if (timer !== null) return;
      timer = setInterval(function () {
        SliderInterval();
      }, params.slideInterval);
    };

    window.onblur = function () {
      clearInterval(interval);
      clearInterval(timer);
      timer = null;
    };
  });

}
