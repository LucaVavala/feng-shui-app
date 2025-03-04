document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("calculate").addEventListener("click", function() {
    let attackValue = parseInt(document.getElementById("attackValueBox").value, 10) || 0;
    let results = [];
    
    for (let i = 0; i < 100; i++) {
      let plusDie = rollExplodingDie();
      let minusDie = rollExplodingDie();
      let trialResult = attackValue + plusDie.value - minusDie.value;
      let displayResult = trialResult.toString();
      
      // If both dice’s very first roll were 6, mark with an exclamation
      if (plusDie.rolls[0] === 6 && minusDie.rolls[0] === 6) {
        displayResult += "!";
      }
      
      // Append detailed dice roll info
      displayResult += " (Plus: " + plusDie.rolls.join(", ") + " | Minus: " + minusDie.rolls.join(", ") + ")";
      
      results.push(displayResult);
    }
    
    // Create an unordered list to display each result as a separate list item
    const ul = document.createElement("ul");
    ul.style.listStyle = "none"; // Remove default bullets
    ul.style.padding = "0";
    
    results.forEach(result => {
      const li = document.createElement("li");
      li.textContent = result;
      li.style.cursor = "pointer";  // So it looks clickable for deletion
      li.style.padding = "5px 0";
      
      // Remove the list item when it's clicked
      li.addEventListener("click", function() {
        li.remove();
      });
      
      ul.appendChild(li);
    });
    
    // Display the list in the #values element
    const valuesElem = document.getElementById("values");
    valuesElem.innerHTML = ""; // Clear previous content
    valuesElem.appendChild(ul);
  });
  
  // Updated rollExplodingDie function records all individual rolls.
  function rollExplodingDie() {
    let total = 0;
    let rolls = [];
    while (true) {
      let roll = Math.floor(Math.random() * 6) + 1;
      rolls.push(roll);
      total += roll;
      // Continue rolling if a 6 is rolled
      if (roll < 6) break;
    }
    return { value: total, rolls: rolls };
  }
});
