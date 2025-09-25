import SearchBar from "../components/SearchBar/SearchBar"

function temp(a: string){
  a+1
}

export default function Main() {
  return(<>
    <SearchBar handleSearch={temp} />
  </>)
}