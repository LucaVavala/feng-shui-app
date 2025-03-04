document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calculate").addEventListener("click", function() {
      let attackValue = parseInt(document.getElementById("attackValueBox").value, 10) || 0;
      let results = [];
      
      for (let i = 0; i < 100; i++) {
        let plusDie = rollExplodingDie();
        let minusDie = rollExplodingDie();
        let trialResult = attackValue + plusDie.value - minusDie.value;
        let displayResult = trialResult.toString();
        
        if (plusDie.initial === 6 && minusDie.initial === 6) {
          displayResult += "!";
        }
        
        results.push(displayResult);
      }
      
      // Create a new unordered list element
      const ul = document.createElement("ul");
      ul.style.listStyle = "none"; // Remove default bullets if desired
      ul.style.padding = "0";
      
      // Create a list item for each result
      results.forEach(result => {
        const li = document.createElement("li");
        li.textContent = result;
        li.style.cursor = "pointer";  // Make it clear the item is clickable
        li.style.padding = "5px 0";
        
        // When the list item is clicked, remove it
        li.addEventListener("click", function() {
          li.remove();
        });
        
        ul.appendChild(li);
      });
      
      // Display the unordered list in the #values element
      const valuesElem = document.getElementById("values");
      valuesElem.innerHTML = ""; // Clear any previous content
      valuesElem.appendChild(ul);
    });
    
    function rollExplodingDie() {
      let total = 0;
      let initial;
      let first = true;
      
      while (true) {
        let roll = Math.floor(Math.random() * 6) + 1;
        if (first) {
          initial = roll;
          first = false;
        }
        total += roll;
        if (roll < 6) break;
      }
      
      return { value: total, initial: initial };
    }
  });