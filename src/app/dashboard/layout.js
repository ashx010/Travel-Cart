import React from 'react'
import { SessionWrapper } from '../../components/SessionWrapper'

export default function DashboardLayout({ children }) {
  return (
    <section>
      <h1>Dashboard</h1>
      <SessionWrapper>
        {children}
      </SessionWrapper>
    </section>
  )
}
