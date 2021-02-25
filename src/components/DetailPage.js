import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const BackButton = styled.button``;

const MainContainer = styled.div`
  display: flex;
  height: calc(100vh - 5rem);
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 560px));
  height: 100vh;
  max-height: 401px;
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
  grid-template-rows: 1fr 20%;
  grid-template-areas:
    "one two"
    "border border";
`;

const CountryDetailOne = styled.div``;

const CountryDetailTwo = styled.div``;

const CountryName = styled.span``;

const CountryInfo = styled.p``;

const CountryInfoLabel = styled.span``;

const CountryInfoDetail = styled.span``;

const BordersContainer = styled.div`
  grid-area: border;
`;

const BorderItem = styled.span``;

export default function DetailPage({ countries }) {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    setCountry(countries.filter((item) => item.numericCode === id));
    setLoading(false);
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
                  <CountryInfoLabel>Native Name</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].nativeName}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Population</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].population}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Region</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].region}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Sub Region</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].subregion}</CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Capital</CountryInfoLabel>
                  <CountryInfoDetail>{country[0].capital}</CountryInfoDetail>
                </CountryInfo>
              </CountryDetailOne>
              <CountryDetailTwo>
                <CountryInfo>
                  <CountryInfoLabel>Top Level Domain</CountryInfoLabel>
                  <CountryInfoDetail>
                    {country[0].topLevelDomain}
                  </CountryInfoDetail>
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Currencies</CountryInfoLabel>
                  {country[0].currencies.map((currency) => {
                    return (
                      <CountryInfoDetail>{currency.code}</CountryInfoDetail>
                    );
                  })}
                </CountryInfo>
                <CountryInfo>
                  <CountryInfoLabel>Languages</CountryInfoLabel>
                  <CountryInfoDetail></CountryInfoDetail>
                </CountryInfo>
              </CountryDetailTwo>
              <BordersContainer>
                <CountryInfoLabel>Borders</CountryInfoLabel>
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
