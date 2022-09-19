import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { ITicket } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import { getIMatchRowFrom, IMatchRow } from '@src/interfaces/IMatchRow'
// import { ITeamBoxProps } from '@src/interfaces/ITeamBoxProps'
import { useCurrentLeagueStore, useLeague } from '@src/store/store'
import React, { useEffect, useState } from 'react'
import { MatchRow } from './MatchRow'

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


export interface ITicketProps extends IBaseProps {
  ticket: ITicket
}


const Ticket: React.FC<ITicketProps> = ({ticket}) => {
  
  const currentLeague = useCurrentLeagueStore(state=>state.league);
  const [rowData, setRowData] = useState<IMatchRow[]>([]);

  useEffect(()=>{

    let matches= currentLeague?.matches.map(one=>getIMatchRowFrom(one, ticket.pickTeams));
    setRowData(matches || []);

  }, [ticket])


  return (
    <Box py={3} border="1px solid gray" w={'350px'} mx="auto">
      <Box px={3} py={1}>
        <Text>User: {ticket.user_name}</Text>
      </Box>
      {rowData.map((row, index) => {
        return (
          <MatchRow match={row} key={'mathc_row_' + index} rowIndex={index} />
          
        )
      })}
    </Box>
  )
}

export default Ticket
