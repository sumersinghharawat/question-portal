import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid(props) {
    var product = props.data;
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonBase sx={{ width: "100%", height: "100%" }}>
            <Img alt="complex" src={product.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" component="div">
                <span>{ product.discount_cost>0 ? <span><del>{product.cost}DH</del> &nbsp;&nbsp;{product.discount_cost}</span> : product.cost }DH</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {'RLH'+product.id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
