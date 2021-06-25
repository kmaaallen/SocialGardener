export const theme = {
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
    redText: {
      color: '#8b0000'
    },
    skeletonCard: {
      display: 'flex',
      marginBottom: 15
    },
    skeletonContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25
    },
    skeletonCover: {
      width: '150px',
      minHeight: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '15px auto',
    },
    skeletonUserName: {
      width: '60px',
      height: '15px',
      backgroundColor: '#7cb342',
      marginBottom: 7
    },
    skeletonCreated: {
      width: '60px',
      height: '10px',
      backgroundColor: '#ccc',
      marginBottom: 7
    },
    skeletonFullLine: {
      width: '100%',
      height: '20px',
      backgroundColor: '#444',
      marginBottom: 7
    },
    skeletonHalfLine: {
      width: '50%',
      height: '20px',
      backgroundColor: '#444',
      marginBottom: 7
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    marginVertical15: {
      margin: '15px 0px',
    },
    button: {
      margin: '15px',
      position: 'relative'
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
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      border: '1px solid #ccc',
      marginBottom: '20px'
    },
    floatRight: {
      float: 'right'
    },
    floatLeft: {
      float: 'left'
    },
    positionAbsolute: {
      position: 'absolute'
    },
    padding15: {
      padding: '15px'
    },
    body2: {
      fontSize: '0.875rem',
      verticalAlign: 'super',
      paddingLeft: '10px'
    },
    profileImage: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginTop: '15px'
    },
  }
}