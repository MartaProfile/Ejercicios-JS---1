// --------------------------------------------------------------------------------
/* EXERCISE 1 */
// --------------------------------------------------------------------------------


export function generateCrossMatrix(n) {

    if (n % 2 === 0) {
      throw new Error('The size of the array must be an odd number');
    }

  
  let array1 = [];

  for (let i = 0; i < n; i++) {
    array1[i] = [];

    for (let x = 0; x < n; x++) {
      array1[i][x] = ' ';
    }
      array1[i][i] = 'X';
      array1[i][n - 1 - i] = 'X'; 
  }

  return array1;
}


// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export const SportTypes = {
  Individual: Symbol('Individual'),
  Collective: Symbol('Collective'),
};

export class Sport {
  constructor(name, playersByTeam, type) {
    this.name = name;
    this.playersByTeam = playersByTeam;
    this.type = type;

    if (this.type === SportTypes.Individual && this.playersByTeam > 1) {
      throw new Error(`Invalid configuration: ${this.name} is an individual sport but has ${this.playersByTeam} player(s).`)
    }

    if (this.type === SportTypes.Collective && this.playersByTeam < 2) {
      throw new Error(`Invalid configuration: ${this.name} is a collective sport but has ${this.playersByTeam} player(s).`)
    }
  }

  getName() {
    return this.name;
  };

  getPlayersByTeam() {
    return(`Each team has ${this.playersByTeam} players.`)
  };

  getType() {
    return this.type;
  };

  getScore() {
    throw new Error("The 'getScore' function must be implemented in child classes.");
  };

  updateScore() {
    throw new Error("The 'updateScore' function must be implemented in child classes.");
  };

}




// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
// Exercise 4.1

export class Football extends Sport {
  constructor(name, playersByTeam, type, surface){
    super(name, playersByTeam, type)
    this.surface = surface;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getSurface(){
    return this.surface;
  };

  getScore(){
    return {
      "homeScore": this.homeScore,
      "awayScore": this.awayScore,
    };
  };
      
  updateScore (who) {
    if (who === 'home') {
          this.homeScore++;

    } else if (who === 'away') {
          this.awayScore++;
    }
  }
}


// Exercise 4.2

export class Basketball extends Sport {
  constructor(name, playersByTeam, type){
    super(name, playersByTeam, type)
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getPlayersByMatch () {
    let totalJugadores = this.playersByTeam * 2;
    return (`Each team has ${this.playersByTeam} players. In total ${totalJugadores} players participate in each match.`)
  };


  getScore () {
    return {
      "homeScore": this.homeScore,
      "awayScore": this.awayScore,
    };
  }


  updateScore (who, points) {

    if (points < 1 || points > 3) {
      throw new Error('Between 1 and 3 points!');
    }

    if (who === 'home') {
      this.homeScore += points;

    } else if (who === 'away') {
      this.awayScore += points;
    }
  }
}




// Exercise 4.3

export class Tennis extends Sport {
  constructor(name, playersByTeam, type, totalSets){
    super(name, playersByTeam, type)
    this.totalSets = totalSets;
    this.setsAGanar = Math.ceil(this.totalSets / 2);
    this.homeScore = {
      sets: 0,
      games: 0,
      points: 0
    };
    this.awayScore = {
      sets: 0,
      games: 0,
      points: 0
    };
    this.matchFinished = false;
  }

  getTotalSets() {
     return this.totalSets;
  }

  getScore() {
    return {
      homeScore: this.homeScore,
      awayScore: this.awayScore,
    };
  }

  updateScore (who) {
    
    let currentScore = (who === 'home') ? this.homeScore : this.awayScore;
    let otherScore = (who === 'home') ? this.awayScore : this.homeScore;

    if (this.matchFinished) {
      throw new Error("Match finished");
    }

    if (currentScore.points === 40) {
        currentScore.games++;
        currentScore.points = 0;
        otherScore.points = 0; 

        if (currentScore.games === 6) {
            currentScore.sets++;
            currentScore.games = 0;
            otherScore.games = 0;   
        }

        if (currentScore.sets >= this.setsAGanar) {
          this.matchFinished = true;
        }

    } else {
      currentScore.points += (currentScore.points === 30) ? 10 : 15;
    } 
  }
}




// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export function Dance(name, style, level, duration) {
    this.name = name;
    this.style = style;
    this.level = ['Easy', 'Intermediate', 'Advanced'].includes(level) ? level : 'Intermediate';
    this.duration = duration;

    this.isStyle = function(style) {
        return this.style === style;
    };
};


Dance.prototype.getInfo = function() {
  return {
    Name: this.name,
    Style: this.style,
    Level: this.level,
    Duration: this.duration,
  }
};


Dance.prototype.setLevel = function(newLevel) {
    return this.level = newLevel;
};




// --------------------------------------------------------------------------------
// EXERCISE 6 (OPTIONAL)
// --------------------------------------------------------------------------------

Dance.prototype.calculateCost = function (rateText) {

    const extraerPrecio = rateText.match(/\b\d+(\.\d+)?\b/g);

    if (!extraerPrecio) {
      throw new Error("Failed to extract rate from provided text");
    }

    const precioClase = parseFloat(extraerPrecio[0]);

    let expectedCost;

    switch (this.level) {
      case 'Easy':
        expectedCost = (precioClase * this.duration) * 1;
        break;

      case 'Intermediate':
        expectedCost = (precioClase * this.duration) * 1.5;
        break;

      case 'Advanced':
        expectedCost = (precioClase * this.duration) * 2;
        break;
    }

    return expectedCost;
}
