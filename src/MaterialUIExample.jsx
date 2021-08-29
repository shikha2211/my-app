import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import {AddIcon, EditIcon} from '@material-ui/core/Icon';
import React from 'react';


class MaterialUIExample extends React.Component {
    render(){
        return (
          <Container maxWidth="sm">
            <React.Fragment>
              <CssBaseline />
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Hello World!")}
              >
                Hello World
              </Button>
            </React.Fragment>

            <Fab color = "secondary" aria-label="edit" >
              <EditIcon />
              
            </Fab>
          </Container>
        );

    }

}

export default MaterialUIExample;