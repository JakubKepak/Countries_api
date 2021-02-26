import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.headerBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
`;

const HeaderInnerContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.mainTextColor};
`;

const Logo = styled.span`
  font-weight: 800;
`;

const ThemeSwitchButton = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ThemeSwitchButtonText = styled.span`
  margin-left: 0.4rem;
`;

export default function Header({ setTheme }) {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <Logo>Where in the world?</Logo>
        <ThemeSwitchButton onClick={setTheme}>
          <FontAwesomeIcon icon={faMoon} />
          <ThemeSwitchButtonText>Dark mode</ThemeSwitchButtonText>
        </ThemeSwitchButton>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
}
