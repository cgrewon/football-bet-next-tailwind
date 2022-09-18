import { Grid } from '@chakra-ui/react'
import IBaseProps from '@src/interfaces/IBaseProps'
import React from 'react'
import Ticket from './Ticket'

const TicketGridView: React.FC<IBaseProps> = (props) => {
  return (
    <Grid w="full" gridTemplateColumns={'repeat( auto-fit, minmax(350px, 1fr))'} gap={10} justifyContent="center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((one) => {
        return <Ticket key={one}/>
      })}
    </Grid>
  )
}

export default TicketGridView
