import './sass/main.scss';

const passwordDisplay = document.getElementById('password'); // pass display
const copyFeedback = document.querySelector('.copy-feedback'); // copy display
const copyButton = document.querySelector('.copy-btn'); //copy
const counter = document.getElementById('counter-range'); // counter
const slider = document.getElementById('password-range'); // slider
const chceckboxes = document.querySelectorAll('.checkbox__input'); // all checkboxes
const strenthLabel = document.getElementById('strength__value'); // labels
const strengthLevels = document.querySelectorAll('.level-item'); // levels
const generateButton = document.querySelector('.btn'); // buttoons

/// colors

const colors = {
  grey: '#18171f',
  accentGreen: '#a4ffaf',
  accentYellow: '#f8cd65',
  accentOrange: '#fb7c58',
  accentRed: '#f64a4a',
};
// code

let passwordLength = 10;

const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

// slider

slider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  counter.textContent = passwordLength;
  updateSliderStyle();
});

function updateSliderStyle() {
  const min = slider.min || 0;
  const max = slider.max || 20;
  const value = slider.value;

  const percentage = ((value - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(
      to right,
      ${colors.accentGreen} 0%,
      ${colors.accentGreen} ${percentage}%,
      ${colors.grey} ${percentage}%,
      ${colors.grey} 100%
    )`;
}
