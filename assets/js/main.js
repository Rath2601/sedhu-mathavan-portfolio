/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

/*===== WORK HOVER GIST =====*/
const workImages = document.querySelectorAll('.work__img');

workImages.forEach(img => {
  const gist = img.getAttribute('data-gist');
  let isActive = false;
  
  // Mouse events for desktop
  img.addEventListener('mouseenter', () => {
    const overlay = img.querySelector('.work__overlay');
    const existingGist = overlay.querySelector('.work__gist');
    
    if (!existingGist && gist) {
      const gistElement = document.createElement('div');
      gistElement.className = 'work__gist';
      gistElement.textContent = gist;
      overlay.appendChild(gistElement);
    }
  });
  
  img.addEventListener('mouseleave', () => {
    const overlay = img.querySelector('.work__overlay');
    const gistElement = overlay.querySelector('.work__gist');
    if (gistElement) {
      gistElement.remove();
    }
  });
  
  // Touch events for mobile
  img.addEventListener('touchstart', (e) => {
    // Don't prevent default to allow link navigation
    const overlay = img.querySelector('.work__overlay');
    
    if (!isActive) {
      // Show overlay
      img.classList.add('work__img--active');
      isActive = true;
      
      // Add gist if not exists
      const existingGist = overlay.querySelector('.work__gist');
      if (!existingGist && gist) {
        const gistElement = document.createElement('div');
        gistElement.className = 'work__gist';
        gistElement.textContent = gist;
        overlay.appendChild(gistElement);
      }
    }
  });
});

// Close any active work card when clicking outside
document.addEventListener('touchstart', (e) => {
  if (!e.target.closest('.work__img')) {
    workImages.forEach(img => {
      img.classList.remove('work__img--active');
      const overlay = img.querySelector('.work__overlay');
      const gistElement = overlay.querySelector('.work__gist');
      if (gistElement) {
        gistElement.remove();
      }
    });
  }
}); 

sr.reveal('.home__content',{}); 
sr.reveal('.about__img, .about__subtitle, .about__text',{delay: 400}); 
sr.reveal('.work__img, .contact__input',{interval: 200});
