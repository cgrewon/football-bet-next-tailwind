import IBaseProps from './IBaseProps'
import { IMatchRow } from './IMatchRow'

export interface IMatchRowProps extends IBaseProps {
  match?: IMatchRow
  rowIndex?: number
  onTeamClick?: (matchId: number, teamIndex: number) => void
}
