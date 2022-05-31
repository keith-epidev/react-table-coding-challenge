
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
    searchString:string;
    updatedFn:(null|(() => void));
    abortController:AbortController|null;

    constructor(){
        this.loading = false;
        this.result = null;
        this.sortKey = "Title"
        this.sortDirection = false;
        this.page = 1;
        this.searchString = "";
        this.updatedFn = null;
        this.abortController = null;

        
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
        try{
        if(this.abortController != null)
            this.abortController.abort();

        this.abortController = new AbortController();
        
        

        this.loading = true;
        this.updated();
        let searchStr = this.searchString == "" ? "" : `&Title=${this.searchString}`
        const url =`https://jsonmock.hackerrank.com/api/movies/search/?page=${this.page}${searchStr}`;
        console.log(url);
        let result = await fetch(url,{signal:this.abortController.signal});
        let json: HackerRankSearchResult = await result.json() as HackerRankSearchResult; // assume consistent well formed data
        this.result = json;
        this.loading = false;
        this.updated();

        }catch(E:any){
            if(E.message != "The user aborted a request.")
                throw E;
        }
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


    async setSearchString(value:string){
        this.searchString = value;
        await this.load();
    }

}


  


