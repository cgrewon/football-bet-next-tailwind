import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@src/components/layout'

import { useRouter } from 'next/router'
import { useStep } from '@src/store/store'
import TicketGridView from '@src/components/TicketGridView'
import MainHeading from '@src/components/main-heading/main-heading'
import AddLeagueModal from '@src/components/AddLeagueModal'
import AddTicketModal from '@src/components/AddTicketModal'

const Home: NextPage = () => {
  const router = useRouter()
  const setStep = useStep((store) => store.setStep)

  useEffect(() => {
    setStep(1)
  }, [setStep])

  return (
    <Layout>
      <MainHeading/>
      <TicketGridView />
      <AddLeagueModal/>
      <AddTicketModal />
    </Layout>
  )
}

export default Home
