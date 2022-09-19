import { Button, HStack, Select } from '@chakra-ui/react'
import { ILeague, ILeagueRes } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import Api from '@src/services/api'
import { useAddLeagueModal, useAddTicketModal, useCurrentLeagueStore, useStep } from '@src/store/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MainHeading: React.FC<IBaseProps> = () => {
  
  const openAddLeague = useAddLeagueModal((store) => store.setIsOpen)
  const openAddTicket = useAddTicketModal((store) => store.setIsOpen)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [leagues, setLeagues] = useState<ILeague[]>([])
  const setCurrentLeague = useCurrentLeagueStore(state=>state.setLeague);
  const currentLeague = useCurrentLeagueStore(state=>state.league);
  const clearCurrentLeague = useCurrentLeagueStore(state=>state.clearLeague);

  const [curLeagueId, setCurLeagueId] = useState<number>()

  const loadLeagues = async () => {
    setIsLoading(true)

    const data: ILeagueRes = await Api.getLeagues(0, 100)
    setLeagues(data.data)

    setIsLoading(false)
  }

  useEffect(() => {
    loadLeagues()
  }, [])

  const getLeague = async(leagueId: number)=>{
    setIsLoading(true)

    const data: ILeague = await Api.getOneLeague(leagueId)

    setCurrentLeague(data);

    setIsLoading(false);

  }

  useEffect(()=>{

    if (curLeagueId) {
      //* loading league detail
      //* then select league store

      getLeague(curLeagueId);
    } else {
      clearCurrentLeague()
    }

  },[curLeagueId])

  return (
    <div
      data-testid="main-heading-h1"
      className="flex flex-row items-center sm:flex-row justify-between sm:items-center w-100 text-xl text-gray-900 py-[22px] my-[30px] border-b border-solid border-b-[#A3A3A3]"
    >
      <HStack>
        <h5 className=" inline text-[18px] font-bold leading-[30px] ">Football League Bet</h5>
        <Select
          placeholder="Select League"
          value={curLeagueId}
          onChange={(e) => {
            setCurLeagueId(parseInt(e.target.value))
          }}
        >
          {leagues.map((one) => {
            return (
              <option key={one.id} value={one.id}>
                {one.name}
              </option>
            )
          })}
        </Select>
      </HStack>
      <div className="min-w-[50px] text-right ml-1">
        <Button
          variant={'solid'}
          colorScheme="linkedin"
          mx={2}
          disabled={!currentLeague}
          onClick={() => {
            openAddTicket(true)
          }}
        >
          Add Ticket
        </Button>
        <Button
          variant={'solid'}
          colorScheme="teal"
          mx={2}
          onClick={() => {
            openAddLeague(true)
          }}
          isLoading={isLoading}
        >
          Add League
        </Button>
      </div>
    </div>
  )
}

export default MainHeading
