

export default class BeerService {

    constructor(url) {
        this.url = url;
    }

    async getBeers() {

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

        return(this.beers);
    }

    changeFavorite(data) {

        let index = this.beers.indexOf(data);
        this.beers[index].favorite = !this.beers[index].favorite;

        let favoritesIndex = this.favoritesIDs.indexOf(data.id);
        if (!data.favorite) {
            this.favoritesIDs.splice(favoritesIndex, 1);
        } else {
            this.favoritesIDs.push(data.id);
        }
        localStorage.setItem('favorites', this.favoritesIDs);

        return this.beers;
    }

}