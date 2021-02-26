import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  align-items: center;
`;

const SearchBarContainer = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  border: none;
  padding: 0.3rem 0.3rem 0.3rem 4rem;
  height: 2.5rem;
  width: 20rem;
  box-shadow: 3px 4px 5px 1px rgba(0, 0, 0, 0.1);
  font-family: inherit;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.mainTextColor};

  &::placeholder {
    color: ${({ theme }) => theme.mainTextColor};
  }

  &:focus {
    outline: none;
  }
`;

const SearchBarIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 20%;
  color: ${({ theme }) => theme.mainTextColor};
`;

const Filter = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterButton = styled.button`
  width: 10rem;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: flex-start;
  font-family: inherit;
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.mainTextColor};
  box-shadow: 3px 4px 5px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const FilterContent = styled.div`
  position: absolute;
  border-radius: 5px;
  top: 120%;
  background-color: ${({ theme }) => theme.headerBackground};
  width: 100%;
  padding: 0.5rem;
  box-shadow: 3px 4px 5px 1px rgba(0, 0, 0, 0.1);
`;

const FilterOption = styled.span`
  display: block;
  color: ${({ theme }) => theme.mainTextColor};

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
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
  color: ${({ theme }) => theme.mainTextColor};
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
        <SearchBarContainer>
          <SearchBar
            placeholder="Search for a country..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchBarIconContainer>
            <FontAwesomeIcon icon={faSearch} />
          </SearchBarIconContainer>
        </SearchBarContainer>
        <Filter>
          <FilterButton
            onClick={() => setFilterVisible(!filterVisible)}
            onBlur={() => setFilterVisible(false)}
          >
            Filter by region
          </FilterButton>
          {filterVisible && (
            <FilterContent>
              <FilterOption onClick={setFilterHandler}>Africa</FilterOption>
              <FilterOption onClick={setFilterHandler}>America</FilterOption>
              <FilterOption onClick={setFilterHandler}>Asia</FilterOption>
              <FilterOption onClick={setFilterHandler}>Europe</FilterOption>
              <FilterOption onClick={setFilterHandler}>Oceania</FilterOption>
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
