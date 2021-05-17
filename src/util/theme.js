export default {
    palette: {
      primary: {
        light: '#aee571',
        main: '#7cb342',
        dark: '#4b830d',
        contrastText: '#000000'
      },
      secondary: {
        light: '#629749',
        main: '#33691e',
        dark: '#003d00',
        contrastText: '#000000'
      },
    },
    overrides: {
      MuiButton: {
        containedSecondary: {
          color: '#ffffff'
        }
      }
    },
    classes: {
      form: {
        textAlign: 'center',
      },
  
      pageTitle: {
        margin: '15px 0px',
      },
  
      textField: {
        margin: '15px 0px',
      },
  
      button: {
        marginTop: '15px',
        position: 'relative'
      },
  
      loader: {
        position: 'absolute',
      },
  
      generalError: {
        color: 'red',
        fontSize: '0.8em'
      },
  
      signUpText: {
        marginTop: '15px',
        fontSize: '0.8em'
      },
  
      signUpLink: {
        color: '#33691e',
        textDecoration: "underline"
      }
    }
  }