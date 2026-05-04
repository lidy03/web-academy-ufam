const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const imageFilenames = [
    'pic1.jpeg',
    'pic2.jpeg',
    'pic3.jpeg',
    'pic4.jpeg',
    'pic5.jpeg',
] 

/* Declaring the alternative text for each image file */

const altText = {
    'pic1.jpeg': 'Clove',
    'pic2.jpeg': 'Reyna',
    'pic3.jpeg': 'Sage',
    'pic4.jpeg': 'Neon',
    'pic5.jpeg': 'Vyse'
};

/* Looping through images */

for (const image of imageFilenames){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', altText[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
        const imgSrc = e.target.getAttribute('src');
        const imgAlt = e.target.getAttribute('alt');

        displayImage(imgSrc, imgAlt);
    });
}

function displayImage(src, alt) {
    displayedImage.setAttribute('src', src);
    displayedImage.setAttribute('alt', alt);
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark'){
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighthen';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else{
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
})