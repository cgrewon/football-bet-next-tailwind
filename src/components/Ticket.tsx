import { Box, Flex, Grid, GridItem, HStack, IconButton, Text } from '@chakra-ui/react'
import { ILeague, ITicket } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import { getIMatchRowFrom, IMatchRow } from '@src/interfaces/IMatchRow'
// import { ITeamBoxProps } from '@src/interfaces/ITeamBoxProps'
import { useAddTicketModal, useCurrentLeagueStore, useCurrentTicketStore } from '@src/store/store'
import React, { useEffect, useState } from 'react'
import { MatchRow } from './MatchRow'
import {
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons'
import Api from '@src/services/api'


export interface ITicketProps extends IBaseProps {
  ticket: ITicket
}

const Ticket: React.FC<ITicketProps> = ({ ticket }) => {
  const currentLeague = useCurrentLeagueStore((state) => state.league)
  const setCurLeague = useCurrentLeagueStore((state) => state.setLeague)
  const setCurTicket = useCurrentTicketStore((state) => state.setTicket)
  const clearCurTicket = useCurrentTicketStore((state) => state.clear)
  const showAddTicketModal = useAddTicketModal(state=>state.setIsOpen);


  const [rowData, setRowData] = useState<IMatchRow[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let matches = currentLeague?.matches.map((one) => getIMatchRowFrom(one, ticket.pickTeams))
    setRowData(matches || [])
  }, [ticket])

  const onEdit = ()=>{
    setCurTicket(ticket);
    showAddTicketModal(true);
  }

  const onDelete = async()=>{
    if(confirm('Are you sure to  remove this?')) {
      setIsLoading(true)

      await Api.deleteTicket(ticket.id)
      
      clearCurTicket()

      const league: ILeague = await Api.getOneLeague(currentLeague!.id)

      setCurLeague(league);

      setIsLoading(false)
    }
  }

  return (
    <Box py={3} border="1px solid gray" w={'350px'} mx="auto">
      <Flex px={3} py={0} w={'full'} justify="space-between" alignItems={'center'}>
        <Text>User: {ticket.user_name}</Text>
        <HStack>
          <IconButton aria-label='edit' size={'xs'} colorScheme={'blue'} icon={<EditIcon />} onClick={onEdit}/>
          <IconButton aria-label='delete' size={'xs'} colorScheme={'red'} icon={<DeleteIcon/>} onClick={onDelete}/>
        </HStack>
      </Flex>
      {rowData.map((row, index) => {
        return <MatchRow match={row} key={'mathc_row_' + index} rowIndex={index} />
      })}
    </Box>
  )
}

export default Ticket
