export interface IFilm{
    Title:string,
    Year : string,
    imdbID :string,
    Type : string,
    Poster:string
}
export interface IData {
    data : IFilm[] | null
    currentPage : number,
    searchValue : string,
    isLoading:string
}
export interface MainReqProps{
    searchValue :string,
    currentPage : number
}
export interface MainRes{
    Search : IFilm[],
    Response :string,
    totalResults:string
}
export interface SecRes{
    Title:string,
    Year : string
    Rated :string,
    Runtime:string,
    Genre:string,
    Poster:string,
    Director:string,
    Writer : string,
    Actors : string,
    Plot : string,
    Language : string,
    Country: string,
    Awards: string,
    Type:string,
    Metascore:string
}