import styled from 'styled-components';

export const LoginContainer = styled.div`
  background-color: #6EC1E4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const LoginForm = styled.form`
  background-color: #FFFFFF;
  border-radius: 20%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
`;

export const Title = styled.form`
  font-family: 'Pluto Sans Bold';
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export const EmailLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-family: 'Pluto Sans';
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const EmailInput = styled.input`
  border-radius: 20%;
  border: 0.0625rem solid #6EC1E4;
  border-radius: 1rem 1rem 1rem 1rem;
  height: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const PasswordLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-family: 'Pluto Sans';
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const PasswordInput = styled.input`
  border-radius: 20%;
  border: 0.0625rem solid #6EC1E4;
  border-radius: 1rem 1rem 1rem 1rem;
  height: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const SubmitButton = styled.input`
  border-radius: 1rem;
  font-family: 'Pluto Sans';
`;
