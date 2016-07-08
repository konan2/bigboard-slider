function Slider(target, params) {
  var parent = document.querySelector(target);
  var slidesContainer = document.createElement('div');
  slidesContainer.id = 'bigboard-slides';
  var frontPieceSelector = '#bigboard-slides .front';
  var backPieceSelector = '#bigboard-slides .back';
  var elemImg = document.querySelector(target).children;
  var attrArr = [];
  var index = 0;
  var count = 0;
  var slidesCount = params.slicesNum;
  var htmlSlides = '';
  var slideBgSize = slidesCount * 100;

  function initSlider() {
    parent.setAttribute("style", "height: 0; overflow: hidden;");
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

    for (var i = 0; i < slidesContainer.childNodes.length; i++) {
      slidesContainer.childNodes[i].style.cssText = 'width:' + slideSliceWidth + 'px;' + 'transition: transform ' + params.flipSpeed + 's',
      'webkit-transition: transform ' + params.flipSpeed + 's';
    }

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
        var selectorArr = document.querySelectorAll(selector)
        var selectorArrLength = document.querySelectorAll(selector).length;
        for (var m = 0; m < selectorArrLength; m++){
          selectorArr[m].style.backgroundPosition = -slideSliceWidth * m + 'px 0';
      }
    }

    setBgPos(frontPieceSelector);
    setBgPos(backPieceSelector);

  }

     setSlice();
  //////////////////////// Detect the slider height

  function sliderHeightFunc() {

    var minHeight = 9999999999;
    var elemImgArray = Array.prototype.slice.call(elemImg);
    for (var itemIndex in elemImgArray) {
      if (minHeight > elemImgArray[itemIndex].height) {
        minHeight = elemImgArray[itemIndex].height;
      }
    }
    slidesContainer.style.height = minHeight + 'px';
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
        document.querySelector("#bigboard-slides .bigboard-slice-" + slideIndex).classList.toggle("flipped");
      } else {
        clearInterval(interval);
        interval = null;
      }
    }, params.speed);
  };

  // Set the slider interval

  function SliderInterval() {
    incSlice();
    sliderFlipFunc();
  }

  var interval = setInterval(function () {
    SliderInterval();
  }, params.slideInterval);

  // On window resize

  window.onresize = function(event) {
    setSlice();
    sliderHeightFunc();
  };

  // Function for start/stop the main interval

  (function () {
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
  })();

}
