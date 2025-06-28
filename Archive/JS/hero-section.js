function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
      document.getElementById('menu').style.borderBottomRightRadius = '0';
      document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
      document.getElementById('menu').style.borderRadius = '10px';
  }
}

async function readJsonFile(filePath) {
  try {
      const response = await fetch(filePath);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      const valuesList = Object.values(jsonData);
      return valuesList;
  } catch (error) {
      console.error('Error reading JSON file:', error);
      return [];
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  var typedOutput = document.getElementById('typed-output');
  var gradients = ['gradient-text-1', 'gradient-text-2', 'gradient-text-3'];
  var currentIndex = 0;

  var strings = await readJsonFile("Data/knowledge.json");
  
  var options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 70,
      loop: true,
      preStringTyped: function(arrayPos) {
          // Remove previous gradient classes
          gradients.forEach(className => {
              typedOutput.classList.remove(className);
          });
          // Add current gradient class
          typedOutput.classList.add(gradients[currentIndex]);
          currentIndex = (currentIndex + 1) % gradients.length;
      }
  };

  var typed = new Typed("#typed-output", options);
})