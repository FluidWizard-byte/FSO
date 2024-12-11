import { useEffect, useState } from "react"
import axios from "axios"
import countriesService from './services/countries'

const App=()=>{
  const [countryName, setNewCountryName] = useState('')  
  const [countries,setNewCountries]=useState([])
  const [filteredCountry,setFilteredCountry]=useState([])

  const searchString=(target,searchTerm)=>{
    const regex = new RegExp(searchTerm, 'i')
    return regex.test(target);
  }

  const showDetails=(countryName)=>{
    const result=filteredCountry.filter(cntry=>cntry.name.common===countryName)
    setFilteredCountry(result)
  }

  const countryChanged=(event)=>{
   setNewCountryName(event.target.value)
  }

  useEffect(()=>{
    countriesService.getAll().then((data)=>{
      setNewCountries(data)
    })
  },[])

  useEffect(()=>{
    const result=countries.filter((country)=>searchString(country.name.common,countryName))
    setFilteredCountry(result)
  },[countryName])
  
    return(
      <div>
        <form>
          find countries <input value={countryName}  onChange={countryChanged}/> 
        </form>
        <DisplayCountry countriesList={filteredCountry} btnClick={showDetails}/>
      </div> 
    )
}

const DisplayCountry=({countriesList,btnClick})=>{
  var countriesCount=countriesList.length
  if(countriesCount>0){
    if(countriesCount>10){
      return(
        <div>
          <p>Too many matches, please narrow the search.</p>
        </div>
      )
    }
   else{
    if(countriesCount==1){
      return(
        <div>
          
          {countriesList.map(country=><DisplayIndividualCountry key={country.cca2} country={country}/>)}
             
        </div>
      )
    }
    else{
      return(
        <div>
          <ul>
            {countriesList.map(country=><li key={country.cca2}>{country.name.common} <button onClick={()=>{btnClick(country.name.common)}}>show</button></li>)}
          </ul>
        </div>
      )
    }
   }
  }
  else{
    return null
  }
  
}

const DisplayIndividualCountry=({country})=>{
  return(
    <div>
      <h1>
      {country.name.common}
      </h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>Languages:</h2>
      
      {
        Object.values(country.languages).map(language => <li key={language}>{language}</li>)
      }
      <br/>
      <img src={country.flags.png} alt="Country Flag" />
    </div>
      
  )
}

export default App

