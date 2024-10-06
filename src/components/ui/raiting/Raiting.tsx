import React from 'react'
import st from "./Raiting.module.scss"
import { StarIcon } from '../../../assets/icons/StarIcon'

type Props = {
    rate: number,
    sx?: React.CSSProperties,
}

function changeColor(rate: number) {
    if (rate >= 8) {
            return "rgba(165, 148, 0, 1)";
    }
    else if (rate >= 7) {
        return "rgba(48, 142, 33, 1)";
    }
    else if (rate >= 6) {
        return "rgba(119, 119, 119, 1)";
    }
    else {
        return "rgba(200, 32, 32, 1)";
    }
}

export default function Raiting({rate, sx={}}: Props) {
  return (
      <div className={st.root} style={{ backgroundColor: changeColor(rate), ...sx }} >
          <StarIcon />
          <span>{rate}</span>
    </div>
  )
}