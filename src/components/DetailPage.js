import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BackButton = styled.span``;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(2, minmax(0, 560px));
  height: 100vh;
  max-height: 401px;

  @media (max-width: 1200px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 30%;
    width: 90vw;
  }
`;

const CountryFlagContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ flag }) => flag});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const CountryDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 30%;
  grid-template-areas:
    "one two"
    "border border";
  align-items: center;
  color: ${({ theme }) => theme.mainTextColor};

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 30%;
    grid-template-areas:
      "one"
      "two"
      "border";
  }
`;

const CountryDetailOne = styled.div``;

const CountryDetailTwo = styled.div``;

const CountryName = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
`;

const CountryInfo = styled.p`
  margin: 0.5rem 0;
`;

const CountryInfoLabel = styled.span`
  font-weight: 700;
  margin-right: 0.3rem;
`;

const CountryInfoDetail = styled.span``;

const BordersContainer = styled.div`
  grid-area: border;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const BorderItem = styled.span`
  padding: 0.2rem 1rem;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 0.4rem 0.5rem;
`;

const LanguageItem = styled.span`
  margin-right: 0.3rem;
`;

export default function DetailPage({ countries }) {
  const [country, setCountry] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    setCountry(countries.filter((item) => item.numericCode === id));
  }, [id, countries]);

  return (
    <>
      {country.length !== 0 ? (
        <MainContainer>
          <InfoContainer>
            <CountryFlagContainer flag={country[0].flag} />
            <CountryDetailsContainer>
              <CountryDetailOne>
                <CountryName>{country[0].name}</CountryName>
                <CountryInfo>
                  <CountryInfoLabel>Native Name:</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].nativeName}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Population:</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].population}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Region:</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].region}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Sub Region:</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].subregion}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Capital:</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].capital}</CountryInfoDetail>
                </CountryInfo>
              </CountryDetailOne>
              <CountryDetailTwo>
                <CountryInfo>
                  <CountryInfoLabel>Top Level Domain:</CountryInfoLabel>
                  <CountryInfoDetail>
                    {country[0].topLevelDomain}
                  </CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Currencies:</CountryInfoLabel>
                  {country[0].currencies.map((currency) => {
                    return (
                      <CountryInfoDetail>{currency.code}</CountryInfoDetail>
                    );
                  })}
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Languages:</CountryInfoLabel>
                  <CountryInfoDetail>
                    {country[0].languages.map((language) => {
                      return <LanguageItem>{language.name},</LanguageItem>;
                    })}
                  </CountryInfoDetail>
                </CountryInfo>
              </CountryDetailTwo>
              <BordersContainer>
                <CountryInfoLabel>Border Countries:</CountryInfoLabel>
                {country[0].borders.map((border) => {
                  return <BorderItem>{border}</BorderItem>;
                })}
              </BordersContainer>
            </CountryDetailsContainer>
          </InfoContainer>
        </MainContainer>
      ) : null}
    </>
  );
}
