import SearchIcon from '../../../assets/icons/SearchIcon'
import st from './Search.module.scss'

export default function Search() {
  return (
      <div className={st.root}>
          <SearchIcon />
          <input type="text" placeholder='Поиск' />
      </div>
  )
}