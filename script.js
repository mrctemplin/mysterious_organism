// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}

const pAequorFactory = (_specimenNum, _dna) => {
    return {
        _specimenNum,
        _dna,
        mutate () {
            const mutatingBase = Math.floor(Math.random() * this._dna.length);
            let newBase = this._dna[mutatingBase];
            while (this._dna[mutatingBase] === newBase) {
            newBase = returnRandBase();
            }
            
            this._dna[mutatingBase] = newBase; 
    
            return this._dna;
    
        },
        compareDNA (pAequor) {
            let counter = 0;
            for (let i = 0; i < pAequor._dna.length; i++) {
            if (pAequor._dna[i] === this._dna[i]) {
                counter++;
            }
            }
            console.log(counter);
            const percentage = (counter / pAequor._dna.length * 100).toFixed(2);
    
            console.log(`Specimen #${this._specimenNum} and Specimen #${pAequor._specimenNum} have ${percentage}% DNA in common.`);
    
            return percentage;
        },
        willLikelySurvive () {
            let counter = 0;
            for (let i = 0; i < this._dna.length; i++) {
            if (this._dna[i] === 'C' || this._dna[i] === 'G') {
                counter++;
            }
            }
    
            return counter / this._dna.length >= 0.6;
            
        },
        complementStrand () {
            const complementaryStrand = [];
    
            for (let i = 0; i < this._dna.length; i++) {
                switch (this._dna[i]) {
                    case 'A':
                    complementaryStrand.push('T');
                    break;
                    case 'T':
                    complementaryStrand.push('A');
                    break;
                    case 'C':
                    complementaryStrand.push('G');
                    break;
                    case 'G':
                    complementaryStrand.push('C');
                    break;
                    default:
                    console.log('Unidentified DNA base..?');
            }
            }
    
            return complementaryStrand;
        }
    }
}

const createInstances = () => {
    const pAequorArray = [];
  
    for (let i = 0; i < 30; i++) {
        let pAequorInstance = pAequorFactory(i + 1, mockUpStrand());
        while (!pAequorInstance.willLikelySurvive()) {
        pAequorInstance = pAequorFactory(i + 1, mockUpStrand());
        } 
        pAequorArray.push(pAequorInstance);
    }
  
    return pAequorArray;
  
}

const pAequor = createInstances();