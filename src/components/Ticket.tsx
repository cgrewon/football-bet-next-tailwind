
import React, { useEffect, useState } from 'react'
import { ILeague, ITicket } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import { getIMatchRowFrom, IMatchRow } from '@src/interfaces/IMatchRow'
// import { ITeamBoxProps } from '@src/interfaces/ITeamBoxProps'
import { useAddTicketModal, useCurrentLeagueStore, useCurrentTicketStore } from '@src/store/store'
import {  IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Api from '@src/services/api'
import { MatchRow } from './MatchRow'

export interface ITicketProps extends IBaseProps {
  ticket: ITicket
}

const Ticket: React.FC<ITicketProps> = ({ ticket }) => {
  
  const currentLeague = useCurrentLeagueStore((state) => state.league)
  const setCurLeague = useCurrentLeagueStore((state) => state.setLeague)
  const setCurTicket = useCurrentTicketStore((state) => state.setTicket)
  const clearCurTicket = useCurrentTicketStore((state) => state.clear)
  const showAddTicketModal = useAddTicketModal((state) => state.setIsOpen)

  const [rowData, setRowData] = useState<IMatchRow[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const matches = currentLeague?.matches.map((one) => getIMatchRowFrom(one, ticket.pickTeams))
    setRowData(matches || [])
  }, [ticket])

  const onEdit = () => {
    setCurTicket(ticket)
    showAddTicketModal(true)
  }

  const onDelete = async () => {
    if (confirm('Are you sure to  remove this?')) {
      setIsLoading(true)

      await Api.deleteTicket(ticket.id)

      clearCurTicket()

      const league: ILeague = await Api.getOneLeague(currentLeague!.id)

      setCurLeague(league)

      setIsLoading(false)
    }
  }

  return (
    <div className="py-3 border border-gray-400 w-[350px] mx-auto">
      <div className='flex flex-row px-3 py-0 w-[100%] justify-between items-center'>
        <div>User: {ticket.user_name}</div>
        <div className='flex flex-row items-center'>
          <IconButton aria-label="edit" size="xs" mr={1} colorScheme="blue" icon={<EditIcon />} onClick={onEdit} />
          <IconButton aria-label="delete" size="xs" colorScheme="red" icon={<DeleteIcon />} onClick={onDelete} />
        </div>
      </div>
      {rowData.map((row, index) => {
        return <MatchRow match={row} key={`mathc_row_${index}`} rowIndex={index} />
      })}
    </div>
  )
}

export default Ticket
