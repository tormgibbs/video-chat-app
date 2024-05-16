// import { makeStyles } from "@mui/material/styles"
import { css } from '@emotion/react'


export const appStyles = () => {
  return {
    appBar: css`
      border-radius: 15px;
      margin: 30px 100px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 600px;
      border: 2px solid black;

      @media (max-width: 600px) {
        width: 90%;
      }
    `,
    wrapper: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    `,
  }
}

export const optionStyles = () => {
  return {
    root: css`
      display: flex;
      flex-direction: column;
    `,
    gridContainer: css`
      width: 100%;

      @media (max-width: 600px) {
        flex-direction: column;
      }
    `,
    container: css`
      width: 600px;
      margin: 35px 0;
      padding: 0;

      @media (max-width: 600px) {
        width: 80%;
      }
    `,
    margin: css`
      margin-top: 20px;
    `,
    padding: css`
      padding: 20px;
    `,
    paper: css`
      padding: 10px 20px;
      border: 2px solid black;
    `,
  }
}


export const cameraViewStyles = () => {
  return {
    video: css`
      width: 550px;

      @media (max-width: 600px) {
        width: 300px;
      }
    `,
    gridContainer: css`
      justify-content: center;

      @media (max-width: 600px) {
        flex-direction: column;
      }
    `,
    paper: css`
      padding: 10px;
      border: 2px solid black;
      margin: 10px;
    `,
  }
}