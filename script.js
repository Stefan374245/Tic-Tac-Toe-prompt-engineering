let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle'; // Startspieler

function init() {
  render();
}

function handleCellClick(index) {
    if (!fields[index]) {
      fields[index] = currentPlayer; // Setze das Symbol des aktuellen Spielers
  
      // Aktualisiere nur das angeklickte Feld
      const cell = document.querySelector(`td[data-index="${index}"]`);
      cell.innerHTML = currentPlayer === 'circle' ? createCircleSVG() : createCrossSVG();
  
      // Gewinnprüfung
      if (checkWinner(currentPlayer)) {
        alert(`${currentPlayer === 'circle' ? 'Kreis' : 'Kreuz'} hat gewonnen!`);
        resetGame();
      } else if (fields.every((field) => field !== null)) {
        alert('Unentschieden!');
        resetGame();
      } else {
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Spieler wechseln
      }
    }
  }
  
  function render() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        tableHtml += `<td data-index="${index}" onclick="handleCellClick(${index})"></td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
  }
  function createCircleSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          stroke="#00b0ef" 
          stroke-width="4" 
          fill="none"> <!-- Kein Füllung, nur Rahmen -->
          <animate 
            attributeName="stroke-dasharray" 
            from="0, 251.2" 
            to="251.2, 0" 
            dur="0.6s" <!-- Dauer auf 3 Sekunden verlängert -->
            fill="freeze" />
        </circle>
      </svg>
    `;
  }
  function createCrossSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="20" y2="20" stroke="#ff69b4" stroke-width="6" stroke-linecap="round"> <!-- Pink für das Kreuz -->
          <animate attributeName="x2" from="20" to="80" dur="0.5s" fill="freeze" />
          <animate attributeName="y2" from="20" to="80" dur="0.5s" fill="freeze" />
        </line>
        <line x1="80" y1="20" x2="80" y2="20" stroke="#ff69b4" stroke-width="6" stroke-linecap="round"> <!-- Pink für das Kreuz -->
          <animate attributeName="x2" from="80" to="20" dur="0.5s" fill="freeze" />
          <animate attributeName="y2" from="20" to="80" dur="0.5s" fill="freeze" />
        </line>
      </svg>
    `;
  }

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    let hasWon = true;

    for (let j = 0; j < combination.length; j++) {
      if (fields[combination[j]] !== player) {
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  currentPlayer = 'circle';
  render();
}
