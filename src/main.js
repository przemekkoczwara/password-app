import './sass/main.scss';

const passwordDisplay = document.getElementById('password'); // pass display
const copyFeedback = document.querySelector('.copy-feedback'); // copy display
const copyButton = document.querySelector('.copy-btn'); //copy
const counter = document.getElementById('counter-range'); // counter
const slider = document.getElementById('password-range'); // slider
const checkboxes = document.querySelectorAll('.checkbox__input'); // all checkboxes
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
  passwordDisplay.value = '';
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

// copy-btn

copyButton.addEventListener('click', () => {
  const copiedValue = passwordDisplay.value;

  if (copiedValue === '') {
    alert('First, generate password !');
    return;
  }

  navigator.clipboard
    .writeText(copiedValue)
    .then(() => {
      console.log('Copied:', copiedValue);
      copyFeedback.style.display = 'block';
    })
    .catch((error) => {
      console.log('Copied error:', error);
      alert('Error - try again!');
    });
});

function generatePassword() {
  let availableChars = '';
  let checkboxCount = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const type = checkbox.id;
      availableChars += charsets[type];
      checkboxCount++;
      console.log('Type:', type);
    }
  });

  if (availableChars === '') {
    alert('Select chceckbox');
  }

  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const random = Math.floor(Math.random() * availableChars.length);
    password += availableChars[random];
  }

  passwordDisplay.value += password;
  console.log('Generated pass:', password);

  // password power

  let level = checkboxCount; // 1 2 3 4

  const labels = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG'];
  const levelColors = [
    colors.accentRed,
    colors.accentOrange,
    colors.accentYellow,
    colors.accentGreen,
  ];

  strenthLabel.textContent = labels[level - 1] || labels[labels.length - 1];

  strengthLevels.forEach((element, index) => {
    if (index < level) {
      element.classList.add('active');
      element.style.backgroundColor = levelColors[level - 1];
    } else {
      element.classList.remove('active');
      element.style.backgroundColor = '';
    }
  });
}

generateButton.addEventListener('click', generatePassword);
