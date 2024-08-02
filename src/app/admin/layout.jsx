import React from 'react'
import { SessionWrapper } from '../../components/SessionWrapper'
import style from './admin.module.css'
import Navbar from "@/components/Navbar/Navbar.jsx";

export default function AdminLayout({children}) {
  return (
    <>
    <Navbar styleChange={true} />
    <section className={style['LayoutBackground']}>
      <SessionWrapper>
        {children}
      </SessionWrapper>
    </section>
    </>
  )
}
