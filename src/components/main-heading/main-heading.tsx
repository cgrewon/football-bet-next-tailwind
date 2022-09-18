import { Button } from '@chakra-ui/react'
import IBaseProps from '@src/interfaces/IBaseProps'
import { useAddLeagueModal, useAddTicketModal, useStep } from '@src/store/store'
import Image from 'next/image'
import React from 'react'

const MainHeading: React.FC<IBaseProps> = () => {
  const step = useStep((store) => store.step)

  const openAddLeague = useAddLeagueModal((store) => store.setIsOpen)
  const openAddTicket = useAddTicketModal((store) => store.setIsOpen)

  return (
    <div
      data-testid="main-heading-h1"
      className="flex flex-row items-center sm:flex-row justify-between sm:items-center w-100 text-xl text-gray-900 py-[22px] my-[30px] border-b border-solid border-b-[#A3A3A3]"
    >
      <div>
        <h5 className=" inline text-[18px] font-bold leading-[30px] ">Football League Bet</h5>
      </div>
      <div className="min-w-[50px] text-right ml-1">
        <Button
          variant={'solid'}
          colorScheme="linkedin"
          mx={2}
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
        >
          Add League
        </Button>
      </div>
    </div>
  )
}

export default MainHeading
