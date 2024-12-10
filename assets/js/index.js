  
//   MAIN JS FILE

window.addEventListener('load', function () {
  $("#pre_loader").fadeOut("slow");
})

  // Hide preloader

// Hide Enter
function enterAeximius() {
  $("#enter_circle").html(
      '<svg height="200" width="200">' +
      '<circle class="circle" cx="100" cy="100" r="97" stroke="#000" stroke-width="4" fill-opacity="0" />' +
      '</svg>');
  $("#enter").delay(1000).fadeOut("slow");

  // Play all the videos
  //var videos = document.querySelectorAll('video');
  //videos.forEach(function(item) {
  //    item.play();
  //});

  // Play the music
  play();

  // Cookie Policy
  if (localStorage.getItem('cookieConcent') != 'shown') {
      setTimeout(function() {
          $("#cookieConsent").fadeIn(200);
      }, 7000);
      $(".cookieConsentOK").click(function() {
          $("#cookieConsent").fadeOut(200);
          localStorage.setItem('cookieConcent', 'shown');
      });
  }
}


/*Play Sound */

function play() {
  var audio = document.getElementById("playAudio");
  audio.play();
}

var mainAudio = document.getElementById("playAudio");
var isPlaying = false;

function togglePlay() {
  isPlaying ? mainAudio.pause() : mainAudio.play();
};

mainAudio.onplaying = function() {
  isPlaying = true;
};
mainAudio.onpause = function() {
  isPlaying = false;
};

/*Play Sound end */

var menuText = gsap.timeline()

menuText.from(".menu-word",{
      xPercent: -50

})




// Open & Close menu
function openMenu() {

  gsap.from(".menu-word", 1, {
      opacity: 0,
      transformOrigin: "left",
      stagger: 0.2
    
  })

  $("#navmenu").slideDown({ duration: 1000,
      easing: 'easeOutCubic'});
}

function closeMenu() {
  $("#navmenu").slideUp({ duration: 1000,
      easing: 'easeOutCubic'});
}

// Set copyright date in the menu
var currentDate = new Date();
$(".copyright_year").html(currentDate.getFullYear());

// Open & Close contact form
function openContactForm() {
  $("#contact_form").fadeIn("slow");
}

function closeContactForm() {
  $("#contact_form").fadeOut("slow");
}

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#site-wrapper", {
  scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
      return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
      };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#site-wrapper").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


//<-----------------------//Main animation//---------------------->

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

function draw() {
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight * 2;
}
draw();

const frameCount = 470;
const currentFrame = index => (
  `Diamond Anim/Diamond Anim_${(index + 1).toString().padStart(5, '0')}.jpg`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  scrollTrigger: {
      trigger: "#home",
      pin: true,
      start: "top top",
      scroller: "#site-wrapper",
      scrub: true,
      ease: Power4.easeInOut,
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  //console.log("images " + images[0]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.width);
}


/* Scroll Triggers (Fade main video and Anim Trigger */

let tl = gsap.timeline({
  scrollTrigger: {
      trigger: "#home",
      start: "top top",
      pin: true,
      scrub: 1,
      scroller: "#site-wrapper"
  }
});

tl
  .from(".video-cover", {
      autoAlpha: 1
  })
  .to(".video-cover", {
      autoAlpha: 0
  });

tl
  .from("#scroll_circle", {
      autoAlpha: 1
  })
  .to("#scroll_circle", {
      autoAlpha: 0
  });

tl
  .to(".hero-txt", {
      xPercent: -120,
      duration: 1000,
      ease: "expo"
  });



 






let tl12 = gsap.timeline({
  scrollTrigger: {
      trigger: "#home",
      start: "top top",
      pin: true,
      scrub: true,
      scroller: "#site-wrapper"
  }
});
tl12
  .to("#main-decor", {
      width: 0,
      opacity: 0,
      duration: 100,
      ease: "expo"
  });

/*-------- Intro begin --------*/

let tl11 = gsap.timeline({
  scrollTrigger: {
      trigger: "#intro_backdrop",
      start: "top top",
      end: "=+340%",
      pin: true,
      scrub: true,
      scroller: "#site-wrapper"
  }
});

tl11

  .from("#intro_backdrop", {
      opacity: 0,
      duration: 0.2
  }, 0)
  .to("#intro_backdrop", {
      opacity: 0,
      duration: 0.2
  }, 1)


var targets = document.querySelectorAll(".intro");

targets.forEach(target => {
  const tl6 = gsap.timeline({
          defaults: {
              duration: 1
          },
          scrollTrigger: {
              trigger: target,
              scrub: true,
              start: "center 100%",
              //end: "center 20%",
              scroller: "#site-wrapper",
          }
      })
      .fromTo(target, {
          y: 50
      }, {
          y: -50
      })
      .from(target, {
          opacity: 0,
          scale: 1.5,
          duration: 1
      }, 0)
      .to(target, {
          opacity: 0,
          duration: 1
      }, 0.8)
});



 
          
gsap.from(".wire-text", {
  opacity: 0,
  scale: 1.4,
  duration: 1,

  scrollTrigger: {
      trigger: ".wire-text",
      scrub: true,
      start: "center 100%",
      //end: "center 20%",
      scroller: "#site-wrapper",
  }
})

   
  


/*--------Intro end--------*/


const container = document.querySelector('#rotate');

const tl1 = gsap.timeline({
  scrollTrigger: {
      trigger: "#rotate",
      scroller: "#site-wrapper",
      scrub: true,
      start: "-350%"
  }
})

tl1
  .to(container, {
      rotation: 360 * 2,
      duration: 3,
      ease: 'expo',
  }, 1)

const container16 = document.querySelector('#rotate3');

const tl16 = gsap.timeline({
  scrollTrigger: {
      trigger: "#rotate3",
      scroller: "#site-wrapper",
      scrub: true,
      //markers: true,
      start: "-350%"
  }
})

tl16
  .to(container16, {
      rotation: 360 * 2,
      duration: 3,
      ease: 'expo',
  }, 1)



var partners = document.querySelectorAll(".partners h1");

partners.forEach(target => {
  const tl42 = gsap.timeline({
      defaults: {
          duration: 1
      },
      scrollTrigger: {
          trigger: target,
          scrub: true,
          start: "center 100%",
          //end: "center 20%",
          scroller: "#site-wrapper",
      }
  })

  .from(target, {
          opacity: 0,
          scale: 1.3,
          duration: 1
      }, 0)
      .to(target, {
          duration: 1
      }, 0.8)
});






/*Wireframe animation code*/

// Wrap every letter in a span
// Wrap every letter in a span


/*var textWrapper = document.querySelector('.wire-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
  targets: '.wire-text .letter',
  translateX: [50,0],
  translateZ: 0,
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 1200,
  delay: (el, i) => 500 + 30 * i
}).add({
  targets: '.wire-text .letter',
  translateX: [0,-50],
  opacity: [1,0],
  easing: "easeInExpo",
  duration: 1200,
  delay: (el, i) => 100 + 30 * i
      
});*/


/*Wireframe animation code end*/

/*Line animation code*/
const title = document.querySelector('#decoration');

const tl4 = gsap.timeline({
  scrollTrigger: {
      trigger: ".txtsection",
      scroller: "#site-wrapper",
      scrub: true,
      //markers: true,
      start: "-80%",
  }
})

tl4
  .from(title, {
      width: "0px",
  })
  .to(title, {
      width: "50px",
      duration: 3,
      ease: 'expo',
  }, 1)
  /*Line animation code end*/




/* ----- STAMP ANIMATION BEGIN --------*/
const stamp = document.querySelector('#topstamp');

const tl7 = gsap.timeline({
  scrollTrigger: {
      trigger: "#topstamp",
      scroller: "#site-wrapper",
      scrub: true,
      //markers: true,
      start: "-500%"
  }
})

tl7
  .to(stamp, {
      rotation: 360 * 2,
      duration: 3,
      ease: 'expo',
  }, 1)




const stamp2 = document.querySelector('#bottomstamp');

const tl8 = gsap.timeline({
  scrollTrigger: {
      trigger: "#bottomstamp",
      scroller: "#site-wrapper",
      scrub: true,
      //markers: true,
      start: "-700%"
  }
})

tl8
  .to(stamp2, {
      rotation: -360 * 2,
      duration: 3,
      ease: 'expo',
  }, 1)




//MENU SOUNDS
function PlaySound(soundobj) {
  var thissound = document.getElementById(soundobj);
  thissound.play();
}

function StopSound(soundobj) {
  var thissound = document.getElementById(soundobj);
  thissound.pause();
  thissound.currentTime = 0;
}
//SOUND SCRIPT END 


//CAROUSEL

$('#owl_carousel').owlCarousel({
  loop: true,
  autoplay: true,
  dots: true,
  nav: false,
  responsive: {
      0: {
          items: 1,
      },
      600: {
          items: 2,
      },
      1000: {
          items: 2,
      }
  }
})


//main text animation
const mainTextAnim = function() {
// WITHOUT SPLITTING.JS
//window.addEventListener("load", function () {
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split("-")
        .map(function (word) {
          return word
            .split(" s")
            .map(function (word) {
              return '<span class="word">'+ word + "</span>";
            })
            //.join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;

          line = [];
          lines.push(line);
          console.log(lines)
        }
      }
      line.push(word);
    }
    console.log(lines);
    return lines;
  };

  splitLines("#reveal-text");

  let revealText = document.querySelectorAll("#reveal-text");

  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    console.log(lines)

    gsap.set(element, { autoAlpha: 1 });

  //   gsap.from(element, 3, {
  //     autoAlpha: 0,
  //     //rotation: "270",
  //     yPercent: -100,
  //     delay: 0.3,
  //     ease: Power4.easeOut,
  //     //stagger: 2,
      
  //   });
 
  
    
  });
//});

};










