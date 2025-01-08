document.querySelector('#show-login').addEventListener('click',function(){
    document.querySelector('.popup').classList.add('active');
});
document.querySelector('.popup .close-btn').addEventListener('click',function(){
    document.querySelector('.popup').classList.remove('active');
});



// sign up
document.querySelector('#s-show-signup').addEventListener('click',function(){
    document.querySelector('.s-popup').classList.add('active');
});
document.querySelector('.s-popup .s-close-btn').addEventListener('click',function(){
    document.querySelector('.s-popup').classList.remove('active')});