import { ExternalLink } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="header flex flex-col items-center">
        <h2 className="text-3xl font-bold">Electricity Calculator</h2>
        <h6> Created by Anish Khari</h6>
        <a
          className="flex underline items-center hover:text-slate-500 transition-all"
          href="https://github.com/anishkharii/electricitycalculator"
          target="_blank"
          rel="noreferrer"
        >
          Github <ExternalLink size={15} />
        </a>
      </div>
  )
}

export default Header