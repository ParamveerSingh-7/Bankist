'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  // first we have to get the cooredinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // here we specified it into an object and given left top and behavior property

  // mordern and better way to add scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// this is not effecient as we are putting the same callback function on all three elements to make it more effecient we have something called event delegation and we do that by using the callback function on the parent element of all the elements in this example the parent element is the nav__links container which contains all these links therefore we will put our event handeler on it
// in event delegation we have two steps first is that we add event listener to the common parent element of all the elements we are interested in
// and second step is that in that event listener determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // with e.target we can see where the event happened
  console.log(e.target);
  // Matching strategy: checking whether event has the nav__links class
  if (e.target.classList.contains('nav__link')) {
    console.log('LINKS');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Building tabbed components
// a tabbed component can appear in many different ways but what they all have in common is that they all have some kind of tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const taabsContent = document.querySelectorAll('.operations__content');

tabs.forEach(tab =>
  tab.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('TAB');
  })
);
// this is not effecient therefore we use event delegation and select a common parent of these tabs
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // Guard Clause

  // Active Tab
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  taabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active ')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  console.log(clicked.dataset);
});

// Menu Fade Animation
const linksContainer = document.querySelector('.nav__links');

const handleHover = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
// passing arguments into handeler
linksContainer.addEventListener('mouseover', handleHover.bind(0.5));

linksContainer.addEventListener('mouseout', handleHover.bind(1));

// Implementing a Sticky Navigation: The Scroll Event
// so the scroll event is available on the window and not document
// this event fires each time we scroll
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function (e) {
//   e.preventDefault();
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     document.querySelector('.nav').classList.add('sticky');
//   } else {
//     document.querySelector('.nav').classList.remove('sticky');
//   }
// });
// this is pretty bad approach as scroll event almost fires everytime we do a small change therefore its not effecient

// A better way : intersection obserever API
// this API allows our code to basically observe changes to the way in which a certain target element intersects with another element or the way in which it intersects the viewport
// const obsCallback = function (enteries, observer) {
//   enteries.forEach(entry => console.log(entry));
// };
// // this callback function will be called each time that the observed element which is our target element ("section1") intersects with the root element at the threshold we defined
// // this function will get called by two arguments eneteries and observer
// // the eneteries here is the array of thresholds as we give multiple threshold values
// // as we scroll our target element( section 1 ) comes in the viewport therefore it intersects with the viewport and therefore we got an entry
// const obsOptions = {
//   root: null,
//   // threshold: 0.1, // 10%
//   threshold: [0, 0.2], // 10%
// };
// // root is basically the element which the target is intersecting
// // null will select the full viewport as we want it to intersect with the viewport
// // threshold is the percentage of intersection at which the observer callback will be called
// // to use the intersection observer API we need to first create a new intersection observer
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // now we will use this observer to observe a certain target which is section 1 in this case
// observer.observe(section1);
// so when do we want our navigation to be sticky , we want it when our header is completely out of the viewport or when the header section is no longer visible then we want our navigation to be visible
// so lets start by selection our header element
// when our header will completely move out of the viewport the treshold at that point will be 0%
const header = document.querySelector('.header');
const navHeight = document.querySelector('.nav').getBoundingClientRect().height;
const stickyNav = function (enetries) {
  const [entry] = enetries;
  console.log(entry);
  if (!entry.isIntersecting)
    document.querySelector('.nav').classList.add('sticky');
  else document.querySelector('.nav').classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: `-90px`,
  // this root margin is a box of 90px which will be applied outside of our target element
});
headerObserver.observe(header);

// Revealing elements on scroll
const allSections = document.querySelectorAll('.section');
const revealSection = function (enteries, observe) {
  const [entry] = enteries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);

const loadImg = function (enteries, obserever) {
  const [entry] = enteries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');

slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

// transformX value for first slide shold be 0% second slide should be 100% then third 200% and so on
let curSlide = 0;
const maxSlides = slides.length;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
btnRight.addEventListener('click', function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  );
  activateDot(curSlide);
});
btnLeft.addEventListener('click', function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  );
  activateDot(curSlide);
});
// pressing keys for slider
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') {
    const leftkey = function () {
      if (curSlide === 0) {
        curSlide = maxSlides - 1;
      } else {
        curSlide--;
      }

      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
      );
    };
    activateDot(curSlide);
    leftkey();
  }
});
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') {
    const rightkey = function () {
      if (curSlide === maxSlides - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
      );
    };
    rightkey();
    activateDot(curSlide);
  }
});

const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
      );
    };
    goToSlide(slide);
    activateDot(slide);
  }
});
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);
//-----------------------------------------------------------------

/*
// Selecting Elements
            
// actually we have a new way of selecting the entire document
// just document is not enough to select the document element
// for example if we want apply a css style to entire page then we need to use the document.documentElement( )
console.log(document.documentElement); // selects the entire HTML
// we can also select the head and the body
// as for these selectors we don't need to write any selector
console.log(document.head);
console.log(document.body);

// Otherwise for other things we need to the query selector
const header = document.querySelector('header');
// if we want to select multiple elements then we have to use
const allSections = document.querySelectorAll('.section');
console.log(allSections);
// this will return a node list of the elements that are in section
// the above elements are not only available on document but on other elements as well
document.getElementById('section--1');
// here we write the id name itself without the selector
const allButtons = document.getElementsByTagName('button');
// lets say we want to select all the buttons
console.log(allButtons);
// this returns a HTML collection that's different from the node list because HTML collection is so called live collection that means if the DOM changes collection is also immediately updated automatically
// if we removes one of the button from the HTML then this HTML collection will update to 8 buttons insted of 9 which it as showing before
// sometimes its very useful to have a HTML collection like this which updates aautomatically

// We can also delete elements from DOM programmatically also not just manually as we did it for the button above
// But the same does not happen with the node list
// That means if we delete elements from node list and then log it to the console then also it will show the same number of items in the node list as before as it didn't update by itself

console.log(document.getElementsByClassName('btn'));
// again this is similar to getElementByTagName and getElementById
// here also we don't need to specify the selector(.) before the class name
// and this will also return a live HTML collection
*/
//-----------------------------------------------------------------
/*
// Creating and Inserting Elements

// we can create HTML elements using the insertAdjacent html that we learnt before in bankist application
// more comlete way to create elements is by using createElement in which we have to pass the tag name as string
const message = document.createElement('div');
// this will return a DOM element therefore we can store it in a variable
// this elements is not yet anywhere in the DOM all this is a DOM object which we can use now to do something on it and is not yet in the DOM itself
// it is nowhere on our webpage if we want it on our page we have to manually insert it
// we can add class to it
message.classList.add('cookie-message');
// we can add text to it
// message.textContent = 'We use Cookies for improved functionality and analytics';
// this only inserts text
// but we can also insert HTML
message.innerHTML =
  'We use Cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button>';
// now we have this element now all we have to do is to insert it into the DOM
header.prepend(message);
// prepending just added the message as the first child of the header element
header.append(message);
// append adds it as the last child
// what we see here is that the element is only inserted once as message is a live element living in the DOM from now therefore it cannot be at multiple places at same time
// now what if we want to insert the copies of the inserted element
// for that we will clone it
// header.append(message.cloneNode(true));
// this will display the prepended and appended message both
// header.after(message);
// this will insert the message after the header element
// header.before(message);
// this will insert the message before the header element
*/
//-----------------------------------------------------------------
/*
// Delete message

// lets add a functionality which will remove the message element on clicking the got it button
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    // this remove method is very new earlier we used to select the parent element and then delete its child
    message.parentElement.removeChild(message);
  });
*/
//-----------------------------------------------------------------
/*
// Styles

// we already learnt how to add styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// these styles are set as inline styles so the styles directly in the DOM
// now for css custom properties or the css variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');
*/
//-----------------------------------------------------------------
/*
// Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.src);
console.log(logo.designer);
// we can't get the non-standard attributes from the css file to get them we have a different method
console.log(logo.getAttribute('designer'));

// just as we read these attributes we can also set them
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
// there is also a setattribute
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
console.log(logo.company);

// the src above that is displayed on the console is different from the one from the HTML
// thats because it's the absolute url which is logged on the console
// to get the url one from the HTML one
console.log(logo.src);
console.log(logo.getAttribute('src'));
// same is true for the href attribute of the link
*/
//-----------------------------------------------------------------
/*
// Data Attributes

// data attributes are special kind of attributes that start with the word data
// what special about this is that it is at dataset
console.log(logo.dataset.versionNumber);
*/
//-----------------------------------------------------------------
/*
// Classes

logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
// don't use
logo.className = 'jonas';
// as this will will overwrite all the classes
// use classList

// to gets the coordinates of scrolling
console.log(window.pageXOffset, window.pageYOffset);
// to get the height and width of the view port
console.log(
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);
*/
//--------------------------------------------------------------------------------------------
/*
// Types of events and event handlers

// An event is basically a signal that is generated by a certain DOM node and the signal means that something has happened for example a click,scroll , a key press certainly everything that happens on the web generates an event

// Now lets take a look at the another type of event which is the mouse enter event
// mouse enter is somewhat like a hover in css that fires when the mouse enters a certain area
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great you are reading the heading :D');
// });

// // another type of using event handeler function and that is by adding the onevent directly on the element
// // although it is oldschool type so it is recommended to use the addEventListener
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great you are reading the heading :D');
// };

// the reason why addEventListener is better is that it allows us add multiple event listeners to the same event
// and the second advantage of the addEventListener is that we can remove the handeler when not in use
// but to do that first we need to export the function into a named function
const alerth1 = function (e) {
  alert('addEventListener: Great you are reading the heading :D -------');
  // h1.removeEventListener('click', alerth1);
};
h1.addEventListener('click', alerth1);

setTimeout(() => h1.removeEventListener('click', alerth1), 3000);

// there is a third way of adding events which is by using HTML atrributes and this one should not be used
*/
//--------------------------------------------------------------------------------------------
/*
// Event Propagation In Practice Specially Event Bubbling

// lets start by creating a color
// rgb(255,255,255)
// lets create a random number generator
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

// on clicking the features icon the background color of nav__links container and nav container also changes though it should not as we are only clicking the feature link not its container this is because of bubbling as we click on the link it acts as if the event happens on its parent elements also
// but when we click on the parent element lets say nav__links the color of the child keeps unchanged and the color keeps changing for its parent element which is nav in this case
// we can also stop the event propagation by stopPropagation method (in practice its not a good idea to stop the propagation but it can be helpful sometimes)
*/
//--------------------------------------------------------------------------------------------
/*
// DOM Traversing
// DOM traversing is basically walking through the dom which means we can select an element based on another element and this is very important as sometimes we need to select elements relative to another elements for example a direct child or a direct parent element
const h1 = document.querySelector('h1');

// Traversing downwards : or selecting child elements
// first way of doing that is using query selectors as we know they work on elements as well
console.log(h1.querySelectorAll('.highlight'));
// if there were other elements with highlight class in the document they will not be selected as they are not the children of the h1 element
// Sometimes we need direct childrens of any element for that we can do
console.log(h1.childNodes); // this will give everything which is the child of the h1 element
console.log(h1.children); // this will only give the child elements
// to get the first child element
h1.firstElementChild.style.color = 'blue';
// to get the last child element
h1.lastElementChild.style.color = 'yellow';

// Traversing upwards: or selecting parents
console.log(h1.parentNode); // for direct parents
console.log(h1.parentElement);
// but most of the time we need a parent element which is not the direct parent of any element and is very far away in the DOM for that we have the closest() method
h1.closest('.header').style.background = 'grey';

// Traversing sidewards: selecting siblings
// and for some reason in javascript we can only select the direct siblings of any element
console.log(h1.previousElementSibling); // null as h1 itself is the first child and have no sibling element before it
console.log(h1.nextElementSibling);
// now if we need all the siblings then we can do a trick and that is to move up to the parent element and read all the children from there
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
// all the other siblings are 50% smaller now
*/

//------------------------------------------------------------------------------------
/*
// LifeCycle DOM Events
// lets take a look at different DOM events that took place during the lifecycle of a webpage
// By lifecycle we mean righht from the moment we access it uptil we close it

// first event that we need to talk about is DOM content loaded
// this event is fired as soon as the HTML is completely parsed which means the HTML has been downloaded and converted into the DOM tree
//  also all scripts must be downloaded and executed before the DOM content loaded event can happen
// this event don't wait to load images and any other resources
// so just HTML and JS need to be loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});
// so from this we can execute code only after the DOM is available
// and also we want all our code to be executed after the DOM is ready
// but that doesn't mean that we should wrap our code in an event listener like above
// we don't do that bcs we have the script tag which is the one that imports all our js into the HTML right at the end of the body
// so this is the last thing that will be red in an HTML

// next is the load event
// load event is fired on window as soon as the HTML is parsed and all the images and external resources are loaded
// so basically when a complete page is finished loading this is event  is fired
window.addEventListener('load', function (e) {
  console.log('Page Fully Loaded', e);
});

// last is the before unload event which also get fired on the window
// this event is created immediately before a user is about to leave a page
// so basically we use this event to ask users if they are 100% sure that they want to leave the page
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/

//--------------------------------------------------------------------------------

// Effecient Script Loading : defer and async
