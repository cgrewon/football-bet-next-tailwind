import { Grid, VStack, Box } from '@chakra-ui/react'
import { ITicket } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import { useCurrentLeagueStore } from '@src/store/store'
import React from 'react'
import Ticket from './Ticket'

const TicketGridView: React.FC<IBaseProps> = (props) => {
  const currentLeague = useCurrentLeagueStore((state) => state.league)

  return (
    <Grid w="full" gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr))" gap={10} justifyContent="center">
      {currentLeague &&
        currentLeague!.tickets?.map((ticket: ITicket) => {
          return <Ticket key={ticket.id} ticket={ticket} />
        })}
    </Grid>
  )
}

export default TicketGridView
