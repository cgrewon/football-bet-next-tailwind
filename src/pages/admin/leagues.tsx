import React, { useState, useEffect } from 'react'
import { ILeagueRes, ILeague } from '@src/interfaces'
import Api from '@src/services/api'
import Layout from '@src/components/layout'
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useCurrentLeagueStore } from '@src/store/store'

export default function AdminLeagues() {
  //   const [isLoading, setIsLoading] = useState<boolean>(false)
  const [leagues, setLeagues] = useState<ILeague[]>([])

  const curLeagueStore = useCurrentLeagueStore((store) => store)

  const loadLeagues = async () => {
    // setIsLoading(true)

    const data: ILeagueRes = await Api.getLeagues(0, 100)
    setLeagues(data.data)

    // setIsLoading(false)
  }

  const onRemoveLeague = async (id: number) => {
    console.log('remove id:', id)

    if (confirm('Are you sure to remove this league?')) {
      await Api.deleteLeague(id)
      loadLeagues()
    }
  }

  useEffect(() => {
    loadLeagues()
  }, [])

  return (
    <Layout>
      <div className=" flex flex-row items-center">
        <h1 className=" text-xl ">Admin</h1>
        <span className="mx-4">/</span>
        <span>leagues</span>
      </div>

      <div className="mt-5 flex flex-col items-center pt-10">
        <table className="min-w-[30%] ">
          <thead>
            <tr className=" bg-teal-900 text-teal-500">
              <th>Id</th>
              <th>League Name</th>
              <th>Matches</th>
              <th />
            </tr>
          </thead>
          <tbody className=" text-center">
            {leagues.map((one, index) => {
              return (
                <tr key={one.id} className="hover:bg-slate-600 h-[40px]">
                  <td className="text-center">{one.id}</td>
                  <td className="text-center">{one.name}</td>
                  <td className="text-center">{one.matches.length}</td>
                  <td className="text-center">
                    <a
                      href="/"
                      target="_blank"
                      onClick={() => {
                        console.log('set current league: ', one)
                        curLeagueStore.setLeague(one)
                      }}
                    >
                      <IconButton
                        mx={2}
                        icon={<ExternalLinkIcon />}
                        size="xs"
                        colorScheme="teal"
                        aria-label="icon button"
                      />
                    </a>
                    <IconButton
                      icon={<DeleteIcon />}
                      size="xs"
                      colorScheme="red"
                      aria-label="icon button"
                      onClick={() => onRemoveLeague(one.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
