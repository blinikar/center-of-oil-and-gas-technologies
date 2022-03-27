

export default class BeerService {

    beers=[];
    initialized = false;

    constructor(url) {
        this.url = url;
    }

    async initBeersFromAPI() {

        let response = await fetch(this.url+'/beers');
        this.beers = await response.json();
        this.favoritesIDs = localStorage.getItem('favorites');
        
        if (this.favoritesIDs == null) {
            this.favoritesIDs = [];
            localStorage.setItem('favorites', this.favoritesIDs);
        } else {
            this.favoritesIDs = this.favoritesIDs.split(',');
        }
        this.favoritesIDs = this.favoritesIDs.map(Number);

        this.beers.map((beer) => {
            beer.favorite = this.favoritesIDs.includes(beer.id); 
        });

        this.initialized = true;
    }

    getBeers() {
        return this.beers;
    }

    getIndexById(beerId) {

        let index = -1;
        this.beers.forEach((beer) => {
            if (beer.id == beerId) {
                index = this.beers.indexOf(beer);
                return; 
            }
        });

        return index;
    }

    changeFavorite(beerId, state) {

        let index = this.getIndexById(beerId);
        
        this.beers[index].favorite = !this.beers[index].favorite;

        let favoritesIndex = this.favoritesIDs.indexOf(beerId);
        if (state) {
            this.favoritesIDs.splice(favoritesIndex, 1);
        } else {
            this.favoritesIDs.push(beerId);
        }
        localStorage.setItem('favorites', this.favoritesIDs);

        return this.beers;
    }

}