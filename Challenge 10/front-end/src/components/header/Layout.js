import styled from 'styled-components';

export const HeaderContainer = styled.div`
  grid-column: 1/4;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 12.3125rem 39fr 12.3125rem;
  @media (max-width: 1020px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const Logo = styled.div`
  font-family: 'Pluto Sans Cond Regular';
  background-color: ${(props) => props.theme.primary};
  text-align: center;
  grid-column: 1/2;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: 47fr 120fr;
  column-gap: 0.5625rem;
  justify-content: center;
  align-content: center;
  padding: 0.875rem 1.5625rem;
  border-bottom: 0.0625rem solid ${(props) => props.theme.secondary};

  .jobsity-logo {
    grid-column: 1;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-self: center;
    align-self: center;
  }

  .jobsity-text-logo {
    grid-column: 2;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-self: center;
    align-self: center;
  }
  @media (max-width: 1020px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const UserProfile = styled.div`
  background-color: ${(props) => props.theme.lightPrimary};
  text-align: center;
  grid-column: 3/4;
  grid-row: 1/2;
  border-bottom: 0.0625rem solid ${(props) => props.theme.secondary};

  .user-border-wrapper {
    display: grid;
    grid-template-columns: 164fr 75fr;
    height: 100%;
    width: 100%;
    padding: 0.625rem 0rem;
    box-sizing: border-box;
    position: relative;
  }

  .user-name-dropdown {
    font-family: 'Pluto Sans Cond Regular';
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.6875rem;
    border-left: 0.0625rem solid ${(props) => props.theme.secondaryText};
    cursor: pointer;
  }

  .user-name-text {
    display: inline-block;
    margin-right: 0.75rem;
  }

  .user-image-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circular-image-wrapper {
    width: 2.125rem;
    height: 2.125rem;
    border: 0.125rem solid ${(props) => props.theme.secondary};
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    justify-content: center;
  }

  .user-image {
    max-height: 100%;
  }

  .log-out {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${(props) => props.theme.lightPrimary};
    padding-right: 0.75rem;
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.secondaryText};
    cursor: pointer;
    z-index: 3;
  }
  @media (max-width: 1020px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;
