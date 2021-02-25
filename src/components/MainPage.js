import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigationContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SearchBar = styled.input`
  border: none;
  padding: 0.3rem 0.3rem 0.3rem 4rem;
  height: 2.5rem;
  width: 20rem;
  box-shadow: 3px 4px 5px 1px rgba(0, 0, 0, 0.1);
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

const Filter = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterButton = styled.button``;

const FilterContent = styled.div`
  position: absolute;
`;

const FilterOption = styled.span`
  display: block;
`;

const PreviewContainer = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 264px));
  grid-gap: 3rem;

  justify-content: center;
`;

const PreviewItem = styled.div`
  width: 100%;
  height: 336px;
  box-shadow: 3px 4px 5px 1px rgba(0, 0, 0, 0.1);
`;

const PreviewItemFlag = styled.img`
  width: 264px;
  height: 160px;
`;

const PreviewItemInfoContainer = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const PreviewInfoName = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0;
`;

const PreviewInfoLabel = styled.span`
  margin-right: 0.5rem;
  font-weight: 700;
`;

const PreviewInfo = styled.span``;

export default function MainPage({ countries }) {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.includes(searchKeyword) &&
          country.region.includes(activeFilter)
      )
    );
  }, [searchKeyword, activeFilter, countries]);

  const setFilterHandler = (e) => {
    setActiveFilter(e.target.innerHTML);
  };

  return (
    <MainContainer>
      <NavigationContainer>
        <SearchBar
          placeholder="Search for a country..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Filter>
          <FilterButton onClick={() => setFilterVisible(!filterVisible)}>
            Filter by region
          </FilterButton>
          {filterVisible && (
            <FilterContent>
              <FilterOption onClick={setFilterHandler}>America</FilterOption>
              <FilterOption onClick={setFilterHandler}>Africa</FilterOption>
              <FilterOption onClick={setFilterHandler}>Europe</FilterOption>
            </FilterContent>
          )}
        </Filter>
      </NavigationContainer>
      <PreviewContainer>
        {filteredCountries.map((country) => {
          return (
            <Link to={`/${country.numericCode}`}>
              <PreviewItem key={country.numericCode}>
                <PreviewItemFlag src={country.flag} />
                <PreviewItemInfoContainer>
                  <PreviewInfoName>{country.name}</PreviewInfoName>
                  <PreviewInfo>
                    <PreviewInfoLabel>Population:</PreviewInfoLabel>
                    {country.population}
                  </PreviewInfo>
                  <PreviewInfo>
                    <PreviewInfoLabel>Region:</PreviewInfoLabel>
                    {country.region}
                  </PreviewInfo>
                  <PreviewInfo>
                    <PreviewInfoLabel>Capital:</PreviewInfoLabel>
                    {country.capital}
                  </PreviewInfo>
                </PreviewItemInfoContainer>
              </PreviewItem>
            </Link>
          );
        })}
      </PreviewContainer>
    </MainContainer>
  );
}
