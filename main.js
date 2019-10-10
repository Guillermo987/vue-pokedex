let app = new Vue({
  el: "#app",
  data: () => ({
    searchText: '',
    typeColor: {
      grass: "#78C850",
      poison: "#A040A0",
      fire: "#F08030",
      flying: "#A890F0",
      water: "#6890F0",
      bug: "#A8B820",
      normal: "#A8A878",
      electric: "#F8D030"
    },
    pokemons: [],
    selectedTypes: []
  }),

  computed: {
    filteredPokemons() {
      return this.pokemons
        .filter(pokemon => pokemon.name.includes(this.searchText.toLowerCase()))
        .filter(pokemon => {
          if(this.selectedTypes.length) {
             return pokemon.types.every(type => this.selectedTypes.includes(type));
          }
          return true;
        });
    }
  },
  methods: {
    /**
     * @description helper method to remove an element from array
     * @returns the original array without the selected element
     */
    _arrayRemove(arr, value) {
      return arr.filter((el) =>{
          return el != value;
      });
   },

   /**
    * @description method to remove pokemon from the list
    */
    removePokemon(pokemonToRemove) {
      this.pokemons = this._arrayRemove(this.pokemons, pokemonToRemove)
    },

    /**
     * listener for checkbox value changed
     */
    typeSelected(evt) {
      
      const filtered = this.pokemons.filter((pokemon) => {
         return pokemon.types.includes(checked);
      });
      this.pokemons = filtered
    }
  },

  /**
   * when the component has been created
   */
  created () {
    fetch("https://api.jsonbin.io/b/5ab37f77989617146bd6eb29")
      .then(response => response.json())
      .then(pokemons => {
        this.pokemons = pokemons;
      });
  }
});

