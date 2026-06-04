document.getElementById('wisdomForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const keyword = document.getElementById('wisdomInput').value.trim().toLowerCase();
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.textContent = '';

  switch (keyword) {

    case 'xmas':
      document.body.className = ''; // ←リセット
      document.body.classList.add('xmas');
      document.getElementById('wisdomForm').className = '';
      document.getElementById('wisdomForm').classList.add('xmas-border');
      break;

    case 'happynewyear':
      document.body.className = '';
      document.body.classList.add('happynewyear');
      document.getElementById('wisdomForm').className = '';
      document.getElementById('wisdomForm').classList.add('happynewyear-border');
      break;

 
case '星空':
  document.body.className = '';
  document.body.classList.add('starry');

  const form = document.getElementById('wisdomForm');
  form.className = '';
  form.classList.add('starry-border');

  if (!document.querySelector('.wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    wrapper.innerHTML = `
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    `;


    document.body.appendChild(wrapper);
  }

  //  スクロール用
  if (!document.querySelector('.space')) {
    const space = document.createElement('div');
    space.classList.add('space');
    document.body.appendChild(space);
  }

  break;



    default:
      errorMessage.textContent = 'ページが見つかりません';
  }
});