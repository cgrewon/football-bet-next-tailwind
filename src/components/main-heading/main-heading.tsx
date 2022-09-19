import { Button, HStack, Select, Flex, Text, Box } from '@chakra-ui/react'
import { ILeague, ILeagueRes } from '@src/interfaces'
import IBaseProps from '@src/interfaces/IBaseProps'
import Api from '@src/services/api'
import {
  useAddLeagueModal,
  useAddTicketModal,
  useCurrentLeagueStore,
  useLeagueItemsStore,
  useStep,
} from '@src/store/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MainHeading: React.FC<IBaseProps> = () => {
  const openAddLeague = useAddLeagueModal((store) => store.setIsOpen)
  const openAddTicket = useAddTicketModal((store) => store.setIsOpen)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { leagueItems, setLeagueItems } = useLeagueItemsStore((state) => state)

  const setCurrentLeague = useCurrentLeagueStore((state) => state.setLeague)
  const currentLeague = useCurrentLeagueStore((state) => state.league)
  const clearCurrentLeague = useCurrentLeagueStore((state) => state.clearLeague)

  const [curLeagueId, setCurLeagueId] = useState<number>()

  const loadLeagues = async () => {
    setIsLoading(true)

    const data: ILeagueRes = await Api.getLeagues(0, 100)
    setLeagueItems(data.data)

    setIsLoading(false)
  }

  useEffect(() => {
    loadLeagues()
  }, [])

  const getLeague = async (leagueId: number) => {
    setIsLoading(true)

    const data: ILeague = await Api.getOneLeague(leagueId)

    setCurrentLeague(data)

    setIsLoading(false)
  }

  useEffect(() => {
    if (curLeagueId) {
      //* loading league detail
      //* then select league store

      getLeague(curLeagueId)
    } else {
      clearCurrentLeague()
      setCurLeagueId(-1)
    }
  }, [curLeagueId])

  return (
    <Flex data-testid="main-heading-h1" p={3} justify={'space-between'} mb={5} alignItems="center" bg={'#011e28'}>
      <HStack>
        <Box>
          <Text fontWeight={'bold'} fontSize={'15px'}>
            Football League Bet
          </Text>
        </Box>
        <Select
          placeholder="Select League"
          value={curLeagueId}
          size='sm'
          rounded={5}
          onChange={(e) => {
            setCurLeagueId(parseInt(e.target.value))
          }}
        >
          {leagueItems?.map((one) => {
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
          colorScheme="orange"
          mx={2}
          size='sm'
          onClick={() => {
            loadLeagues()
            clearCurrentLeague()
            setCurLeagueId(-1)
          }}
        >
          Refresh
        </Button>
        <Button
          variant={'solid'}
          colorScheme="linkedin"
          mx={2}
          size='sm'
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
          size='sm'
          onClick={() => {
            openAddLeague(true)
          }}
          isLoading={isLoading}
        >
          Add League
        </Button>
      </div>
    </Flex>
  )
}

export default MainHeading
