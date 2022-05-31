
export interface HackerRankSearchResult{
    data:Movie[],
    page:number,
    per_page:number,
    total:number,
    total_pages:number
  }
  
  export interface Movie{
    Title:string;
    Year:number;
    imdbID:string
  }
  

export class MovieAPI{

    loading:boolean;
    result:HackerRankSearchResult|null;
    page:number;
    sortKey:string;
    sortDirection:boolean;
    updatedFn:(null|(() => void));

    constructor(){
        this.loading = false;
        this.result = null;
        this.sortKey = "Title"
        this.sortDirection = false;
        this.page = 1;
        this.updatedFn = null;
    }

    async updated(){
        if(this.updatedFn != null)
            this.updatedFn();
    }

    subscribe(fn:()=>void){
        this.updatedFn = fn;   
    }

    unsubscribe(){
        this.updatedFn = null;
    }  

    async load():Promise<void>{
        
        this.loading = true;
        this.updated();
        let result = await fetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${this.page}`);
        let json: HackerRankSearchResult = await result.json() as HackerRankSearchResult; // assume consistent well formed data
        this.result = json;
        this.loading = false;
        this.updated();
      }
      
      async firstPage(){
          this.page = 1;
          await this.load();
      }

      
    async lastPage(){
        if(this.result != null){
            this.page = this.result.total_pages;
            await this.load();
        }
    }

    async nextPage(){
        if(this.result != null){
            let total = this.result.total_pages;
            if(this.page < total)
                this.page++;
            await this.load();
        }
    }

    async prevPage(){
        if(this.page > 1){
            this.page--;
            await this.load();
        }
    }


}


  


